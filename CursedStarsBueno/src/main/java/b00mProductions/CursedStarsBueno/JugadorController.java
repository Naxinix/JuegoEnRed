package b00mProductions.CursedStarsBueno;

import java.util.Collection;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class JugadorController {
	
	Map<Long, Jugador> jugadores = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);
	Random rnd = new Random();


	// Con GET recuperamos el número de jugadores
	@GetMapping(value = "/jugadores")
	public Collection<Jugador> getPlayers() {
		return jugadores.values();
	}

	// Con POST creamos un nuevo jugador
	@PostMapping(value = "/jugadores")
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador newJugador() {
		Jugador jugador = new Jugador();
		long id = nextId.incrementAndGet();
		jugador.setId(id);
		jugador.setX(rnd.nextInt(700));
		jugador.setY(rnd.nextInt(500));
		jugador.setRot(0.0);
		jugador.setDisparando(false);
		jugador.setAlive(true);
		jugador.setClassS(0);
		jugadores.put(jugador.getId(), jugador);
		return jugador;
	}

	// Con este GET, podemos recuperar la información particular de cada uno de los
	// jugadores
	@GetMapping(value = "/jugadores/{id}")
	public ResponseEntity<Jugador> getJugador(@PathVariable long id) {
		Jugador jugador = jugadores.get(id);
		if (jugador != null) {
			return new ResponseEntity<>(jugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este PUT actualizamos la información del jugador con ID = id
	@PutMapping(value = "/jugadores/{id}")
	public ResponseEntity<Jugador> updateJugador(@PathVariable long id, @RequestBody Jugador jugador) {
		Jugador savedPlayer = jugadores.get(jugador.getId());
		if (savedPlayer != null) {
			jugadores.put(id, jugador);
			return new ResponseEntity<>(jugador, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Con este DELETE borramos el jugador con ID = id
	@DeleteMapping(value = "/jugadores/{id}")
	public ResponseEntity<Jugador> borraJugador(@PathVariable long id) {
		Jugador savedPlayer = jugadores.get(id);
		if (savedPlayer != null) {
			jugadores.remove(savedPlayer.getId());
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	

	
	/*
	
	private List<Jugador> jugadores = new ArrayList<>();
	
	
	@RequestMapping(value="/jugadores",method=RequestMethod.GET)
	public List<Jugador> getJugadores(){
		return jugadores;	
	}
	
	
	@RequestMapping(value="/jugadores",method=RequestMethod.POST)
	public ResponseEntity<Boolean> addJugador(){
		Jugador a = new Jugador();
		jugadores.add(a);
		return new ResponseEntity<>(true, HttpStatus.CREATED);
		
		
	}
	
	@RequestMapping(value = "/jugadores", method = RequestMethod.GET)
	public int getNumPlayers() {
		return jugadores.size();
	}
	
	@RequestMapping(value = "/jugadores/{id}", method = RequestMethod.GET)
	public ResponseEntity<Jugador> getJugador(@PathVariable int id) {
		Jugador savedPlayer = jugadores.get(id);

		if (savedPlayer != null) {
			return new ResponseEntity<>(savedPlayer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	}
*

	/*
	@RequestMapping(value="/jugadores", method=RequestMethod.DELETE)
	public ResponseEntity<Jugador> borraJugador() {
		jugadores.remove(arg0)
		
	return new ResponseEntity<>(HttpStatus.OK);
		
	}
	*/
}
