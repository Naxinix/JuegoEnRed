// API de WebSocket
// https://developer.mozilla.org/es/docs/Web/API/WebSocket

debug = {
    ws: 1
}

// La URL a la cual se conecta, debe ser la URL con la cual el servidor WebSocket debe responder.
var ws = new WebSocket('ws://localhost:8080/CursedStarsBueno')

//Un monitor de eventos que es llamado cuando el estado readyState de la conexión Websocket cambia a OPEN. Esto indica que la conexión está lista para enviar y recibir datos. El evento es uno simple con el nombre "open".
ws.onopen = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
    }
}

// Un monitor de eventos que es llamado cuando un error ocurre. Esto es un evento simple llamado "error"
ws.onerror = function (error) {
    console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
}

// Un monitor de eventos que atiende una llamada cuando la conexión del WebSocket cambia a un estado CERRADO (CLOSED). El monitor recibe un CloseEvent llamado "cerrado".
ws.onclose = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha cerrado la conexion.')
    }
}

// Un monitor de eventos que es llamado cuando un mensaje es recibido desde un servidor. El monitor recibe un objeto MessageEvent llamado "mensaje".
ws.onmessage = function (message) {

    var msg = JSON.parse(message.data)

    //console.log('INFO RECIBIDA: ' + msg.type)

    switch (msg.type) {
        case "PLAYER_CREATED":
            console.log('@@@@@@ PLAYER CREATED @@@@@')
            console.log('id: ' + msg.player.id)
            
            //console.log('pos: (' + msg.player.x + ',' + msg.player.y + ')')
            
            if(msg.other == "TRUE") {
            	game.player2 = msg.player;
            } else {
            	game.player1 = msg.player;
            }
            
            break;
            
        case "WORLD_CREATED":
        	console.log('@@@@@@ WORLD CREATED @@@@@')
        	game.world1 = msg.world;
        	
        	break;
        	
        case "GAME_COMPLETE":
            console.log('##### GAME IS COMPLETE #####')
            
            break;
            
       case "NUM_PLAYERS":
        	n_jugadores = msg.contenido.n_players;
        	
        	break;
        	
       case "UPDATE_STATE":
    	   //console.log('pos: (' + msg.player.x + ',' + msg.player.y + ')')
    	   game.player2 = msg.player;
    	   game.world1 = msg.world;
    	   
    	   break;
	    	 
       default:           	
    	   break;
    }
}
