package b00mProductions.CursedStarsBueno;

public class Jugador{
	private long id;
	private int x, y;
	private double rot;
	private boolean disparando;
	private int classS;
	private boolean alive;
	private boolean usingUlt;
	private boolean deployed;
	
	
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


	public boolean isDisparando() {
		return disparando;
	}


	public void setDisparando(boolean disparando) {
		this.disparando = disparando;
	}


	public int getClassS() {
		return classS;
	}


	public void setClassS(int classS) {
		this.classS = classS;
	}


	public boolean isAlive() {
		return alive;
	}


	public void setAlive(boolean alive) {
		this.alive = alive;
	}


	public boolean isUsingUlt() {
		return usingUlt;
	}


	public void setUsingUlt(boolean usingUlt) {
		this.usingUlt = usingUlt;
	}


	public boolean isDeployed() {
		return deployed;
	}


	public void setDeployed(boolean deployed) {
		this.deployed = deployed;
	}
	
	
	@Override
	public String toString() {
		String string =  "id: " +id+", x: "+x+", y: "+y+", rot: "+rot+", disparando: "+disparando+", classS: "+classS+", alive: "+alive+", usingUlt: "+usingUlt+", deployed: "+deployed;                      
		return string;//return "{\"id\":" + id + ",\"x\":" + x + ",\"y\":" + y + ",\"score\":" + score + "}";
	}

	
}
