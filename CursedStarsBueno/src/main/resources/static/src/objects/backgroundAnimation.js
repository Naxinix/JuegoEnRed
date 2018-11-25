var mPlayers = 4; //numero de naves en la animacion
var target1 = 2; //tres variables que indican la nave a la que dispara inicialmente cada una
var target2 = 3;
var target3 = 1;
var target4 = 0;
var arrayForTarget2 = [0,2,3]; //array de naves a las que puede disparar la nave 2
var arrayForTarget3 = [0,1,3]; //array de naves a las que puede disparar la nave 3

function createBackgroundAnimation(){
    initClases();
    initWorld(800,600,mPlayers);
    
    claseAnim1 = new Disrupter(300,200);
    claseAnim2 = new Assault(200,200);
    claseAnim3 = new Strategist(200,200);
    claseAnim4 = new Disrupter(300,200);
    
    //cada 2 segundos se recalcula el target de cada nave
    game.time.events.loop(Phaser.Timer.SECOND * 2, function() {
    	target1 = game.rnd.integerInRange(1,2);
    	target2 = game.rnd.pick(arrayForTarget2);
    	target3 = game.rnd.pick(arrayForTarget3);
    	target4 = game.rnd.integerInRange(0,2);
    }, this);
    
    createSpaceship(0,claseAnim1,true,600,100);
    createSpaceship(1,claseAnim2,true,100,200);
    createSpaceship(2,claseAnim3,true,700,400);
    createSpaceship(3,claseAnim4,true,300,500);
    
    //en caso de no tener target la rotacion de cada nave varia de forma aleatoria
    shipDir1 = ((game.rnd.frac())*2 - 1)/100;
    shipDir2 = ((game.rnd.frac())*2 - 1)/100;
    shipDir3 = ((game.rnd.frac())*2 - 1)/100;
    shipDir4 = ((game.rnd.frac())*2 - 1)/100;
}

function updateAnim(){
    updateSpaceship(0,claseAnim1,true,target1);
    updateSpaceship(1,claseAnim2,true,target2);
    updateSpaceship(2,claseAnim3,true,target3);
    updateSpaceship(3,claseAnim4,true,target4);

    //rotacion naves
    spaceship[0].rotation += shipDir1;
    spaceship[1].rotation += shipDir2;
    spaceship[2].rotation += shipDir3;
    spaceship[3].rotation += shipDir4;

    //movimiento naves
    if(claseAnim1 != null){
        //la nave se movera con una velocidad maxSpeed en la direccion que apunta
        spaceshipParent[0].body.acceleration.x = claseAnim1.maxSpeed*Math.cos(spaceship[0].rotation);
        spaceshipParent[0].body.acceleration.y = claseAnim1.maxSpeed*Math.sin(spaceship[0].rotation);
    }
    if(claseAnim2 != null){
        //la nave se movera con una velocidad maxSpeed en la direccion que apunta
        spaceshipParent[1].body.acceleration.x = claseAnim2.maxSpeed*Math.cos(spaceship[1].rotation);
        spaceshipParent[1].body.acceleration.y = claseAnim2.maxSpeed*Math.sin(spaceship[1].rotation);
    }
    if(claseAnim3 != null){
        //la nave se movera con una velocidad maxSpeed en la direccion que apunta
        spaceshipParent[2].body.acceleration.x = claseAnim3.maxSpeed*Math.cos(spaceship[2].rotation);
        spaceshipParent[2].body.acceleration.y = claseAnim3.maxSpeed*Math.sin(spaceship[2].rotation);
    }
    if(claseAnim4 != null){
        //la nave se movera con una velocidad maxSpeed en la direccion que apunta
        spaceshipParent[3].body.acceleration.x = claseAnim4.maxSpeed*Math.cos(spaceship[3].rotation);
        spaceshipParent[3].body.acceleration.y = claseAnim4.maxSpeed*Math.sin(spaceship[3].rotation);
    }
}

