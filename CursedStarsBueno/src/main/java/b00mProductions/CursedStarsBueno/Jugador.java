package b00mProductions.CursedStarsBueno;

public class Jugador{
	private long id;
	private int x, y;
	private double rot;
	private int classS;
	
	
	Jugador(){
		
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	public double getRot() {
		return rot;
	}

	public void setRot(double rot) {
		this.rot = rot;
	}
	
	public int getClassS() {
		return classS;
	}

	public void setClassS(int classS) {
		this.classS = classS;
	}
}
