package b00mProductions.CursedStarsBueno;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class Mundo{
	
	private List<Vector<Integer>> polvoPos = new ArrayList<Vector<Integer>>(50);
	private List<Vector<Integer>> bhPos = new ArrayList<Vector<Integer>>(10);
	private double lsRot;
	private int lsPosX;
	private int lsPosY;
	private int lsHp;

	
	
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



	public int getLsPosY() {
		return lsPosY;
	}



	public void setLsPosY(int lsPosY) {
		this.lsPosY = lsPosY;
	}



	public int getLsHp() {
		return lsHp;
	}



	public void setLsHp(int lsHp) {
		this.lsHp = lsHp;
	}



	public double getLsRot() {
		return lsRot;
	}



	public void setLsRot(double lsRot) {
		this.lsRot = lsRot;
	}



	public int getLsPosX() {
		return lsPosX;
	}



	public void setLsPosX(int lsPosX) {
		this.lsPosX = lsPosX;
	}


}
