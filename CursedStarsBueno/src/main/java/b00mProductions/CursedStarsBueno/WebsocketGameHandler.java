package b00mProductions.CursedStarsBueno;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WebsocketGameHandler extends TextWebSocketHandler {

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	boolean debug = true;
	JugadorController jugadorController = new JugadorController();
	Jugador jugador;
	MundoController mundoController = new MundoController();
	Mundo mundo;
	
	// Invoked after WebSocket negotiation has succeeded and the WebSocket
	// connection is opened and ready for use.
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
	}

	// Invoked after the WebSocket connection has been closed by either side, or
	// after a transport error has occurred. Although the session may technically
	// still be open, depending on the underlying implementation, sending messages
	// at this point is discouraged and most likely will not succeed.
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	// Invoked when a new WebSocket message arrives.
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		synchronized (sessions) {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode json = mapper.createObjectNode();

			switch (node.get("type").asText()) {
			case "JOIN":
				if (jugadorController.getPlayers().size() < 2) {
					jugador = jugadorController.newJugador();
					
					ObjectNode jsonPlayer = mapper.createObjectNode();
					jsonPlayer.put("id", jugador.getId());
					jsonPlayer.put("x", jugador.getX());
					jsonPlayer.put("y", jugador.getY());
					jsonPlayer.put("rot", jugador.getRot());
					jsonPlayer.put("disparando", jugador.isDisparando());
					jsonPlayer.put("classS", jugador.getClassS());
					jsonPlayer.put("alive", jugador.isAlive());
					jsonPlayer.put("usingUlt", jugador.isUsingUlt());
					jsonPlayer.put("deployed", jugador.isDeployed());

					json.put("type", "PLAYER_CREATED");
					json.putPOJO("player", jsonPlayer);
					//json.putPOJO("player", player);
					
				} else {
					//Jugador jugador = jugadorController.newJugador();
					json.put("type", "GAME_COMPLETE");
				}
				
				session.sendMessage(new TextMessage(json.toString()));
				
				json.put("other", "TRUE");
				sendOtherParticipants(session, json.toString());
				
				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;
			
			case "WORLD":
				if(session.getId().equals("0")) {
					mundo = mundoController.newMundo();
					
					ObjectNode jsonWorld = mapper.createObjectNode();
					
					ArrayNode arrayPolvo = jsonWorld.putArray("polvoPos");
					for (Vector<Integer> item : mundo.getPolvoPos()) {
						arrayPolvo.add(item.get(0));
						arrayPolvo.add(item.get(1));
						arrayPolvo.add(item.get(2));
					}
					
					ArrayNode arrayBH = jsonWorld.putArray("bhPos");
					for (Vector<Integer> item : mundo.getBhPos()) {
						arrayBH.add(item.get(0));
						arrayBH.add(item.get(1));
					}
					
					jsonWorld.put("lsRot", mundo.getLsRot());
					jsonWorld.put("lsPosY", mundo.getLsPosY());
					jsonWorld.put("lsPosX", mundo.getLsPosX());
					jsonWorld.put("lsHp", mundo.getLsHp());
					
					json.put("type", "WORLD_CREATED");
					json.putPOJO("world", jsonWorld);
					
					session.sendMessage(new TextMessage(json.toString()));
					sendOtherParticipants(session, json.toString());
				
					if (debug)
						System.out.println("[DEBUG] " + json.toString());
				}
				
				break;
				
			case "CHECK_PLAYERS":
				ObjectNode jsonPlayer = mapper.createObjectNode();
				jsonPlayer.put("n_players", jugadorController.getPlayers().size());
				
				json.put("type", "NUM_PLAYERS");
				json.putPOJO("contenido",jsonPlayer);
				
				session.sendMessage(new TextMessage(json.toString()));
				break;
				
			case "PUT":
				ObjectNode jsonPlayer1 = mapper.createObjectNode();
				
				jugador.setX(node.get("content").get("x").asInt());
				jugador.setY(node.get("content").get("y").asInt());
				jugador.setRot(node.get("content").get("rot").asDouble());
				jugador.setDisparando(node.get("content").get("disparando").asBoolean());
				jugador.setClassS(node.get("content").get("classS").asInt());
				jugador.setAlive(node.get("content").get("alive").asBoolean());
				jugador.setUsingUlt(node.get("content").get("usingUlt").asBoolean());
				jugador.setDeployed(node.get("content").get("deployed").asBoolean());
				
				
				jsonPlayer1.put("x", jugador.getX());
				jsonPlayer1.put("y", jugador.getY());
				jsonPlayer1.put("rot", jugador.getRot());
				jsonPlayer1.put("disparando", jugador.isDisparando());
				jsonPlayer1.put("classS", jugador.getClassS());
				jsonPlayer1.put("alive", jugador.isAlive());
				jsonPlayer1.put("usingUlt", jugador.isUsingUlt());
				jsonPlayer1.put("deployed", jugador.isDeployed());
				
				json.put("type", "UPDATE_STATE");
				json.putPOJO("player", jsonPlayer1);

				ObjectNode jsonWorld1 = mapper.createObjectNode();
				List<Vector<Integer>> auxList1 = new ArrayList<>(10);
				List<Vector<Integer>> auxList2 = new ArrayList<>(50);
				
				for(int i = 0; i < 20; i+= 2) {
					Vector<Integer> v = new Vector<Integer>();
					v.add(node.get("content").get("bhPos").get(i).asInt());
					v.add(node.get("content").get("bhPos").get(i+1).asInt());
					auxList1.add(i/2, v);
				}
				
				for(int i = 0; i < 150; i+= 3) {
					Vector<Integer> w = new Vector<Integer>();
					w.add(node.get("content").get("polvoPos").get(i).asInt());
					w.add(node.get("content").get("polvoPos").get(i+1).asInt());
					w.add(node.get("content").get("polvoPos").get(i+2).asInt());
					auxList2.add(i/3, w);
				}
				
				mundo.setBhPos(auxList1);
				mundo.setPolvoPos(auxList2);
				
				mundo.setLsRot(node.get("content").get("lsRot").asDouble());
				mundo.setLsPosY(node.get("content").get("lsPosY").asInt());
				mundo.setLsPosX(node.get("content").get("lsPosX").asInt());
				mundo.setLsHp(node.get("content").get("lsHp").asInt());
				
				
				ArrayNode arrayPolvo = jsonWorld1.putArray("polvoPos");
				for (Vector<Integer> item : mundo.getPolvoPos()) {
					arrayPolvo.add(item.get(0));
					arrayPolvo.add(item.get(1));
					arrayPolvo.add(item.get(2));
				}
				
				ArrayNode arrayBH = jsonWorld1.putArray("bhPos");
				for (Vector<Integer> item : mundo.getBhPos()) {
					arrayBH.add(item.get(0));
					arrayBH.add(item.get(1));
				}
				jsonWorld1.put("lsRot", mundo.getLsRot());
				jsonWorld1.put("lsPosY", mundo.getLsPosY());
				jsonWorld1.put("lsPosX", mundo.getLsPosX());
				jsonWorld1.put("lsHp", mundo.getLsHp());
				
				json.putPOJO("world", jsonWorld1);
				
				sendOtherParticipants(session, json.toString());
				
				if (debug)
					System.out.println("[DEBUG] " + json.toString());
				break;

			default:
				break;
			}
		}
	}
	
	private void sendOtherParticipants(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession participant : sessions) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(payload));
			}
		}
	}
}
