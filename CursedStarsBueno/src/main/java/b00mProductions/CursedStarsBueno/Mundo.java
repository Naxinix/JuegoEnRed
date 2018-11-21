package b00mProductions.CursedStarsBueno;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class Mundo{
	
	private List<Vector<Integer>> polvoPos = new ArrayList<Vector<Integer>>(50);
	private List<Vector<Integer>> bhPos = new ArrayList<Vector<Integer>>(10);

	
	
	Mundo(){
		
	}



	public List<Vector<Integer>> getPolvoPos() {
		return polvoPos;
	}



	public void setPolvoPos(List<Vector<Integer>> polvoPos) {
		this.polvoPos = polvoPos;
	}



	public List<Vector<Integer>> getBhPos() {
		return bhPos;
	}



	public void setBhPos(List<Vector<Integer>> bhPos) {
		this.bhPos = bhPos;
	}


}
