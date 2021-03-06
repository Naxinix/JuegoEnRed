package b00mProductions.CursedStarsBueno;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Vector;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MundoController {

	Mundo mundo = new Mundo();
	 List<Vector<Integer>> polvoP = new ArrayList<Vector<Integer>>(50);
	 List<Vector<Integer>> bhP = new ArrayList<Vector<Integer>>(10);
	 Random rnd = new Random();


	// Con POST creamos un nuevo mundo
	@PostMapping(value = "/mundo")
	@ResponseStatus(HttpStatus.CREATED)
	public Mundo newMundo() {
		mundo = new Mundo();
		polvoP.clear();
		bhP.clear();
		rnd = new Random();
		
		for(int i=0; i<50; i++) {
			Vector<Integer> v = new Vector<Integer>();
			v.add(0,rnd.nextInt(3000));
			v.add(1,rnd.nextInt(3000));
			v.add(2,0);
			
			polvoP.add(v);
			
		}
		
		for(int i=0; i<10; i++) {
			Vector<Integer> w= new Vector<Integer>();
			w.add(0,rnd.nextInt(2700));
			w.add(1,rnd.nextInt(2700));
			
			bhP.add(w);
			
		}
		
		mundo.setPolvoPos(polvoP);
		mundo.setBhPos(bhP);
		mundo.setLsRot(0);
		mundo.setLsPosX(0);
		mundo.setLsPosY(0);
		mundo.setLsHp(1000);
		return mundo;
		
		
	}

	
	@GetMapping(value = "/mundo")
	public ResponseEntity<Mundo> getMundo() {

		if (mundo != null) {
			return new ResponseEntity<>(mundo, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	@PutMapping(value = "/mundo")
	public ResponseEntity<Mundo> updateMundo(@RequestBody Mundo savedMundo) {

		if (savedMundo != null) {
			mundo=savedMundo;
			return new ResponseEntity<>(savedMundo, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
}
