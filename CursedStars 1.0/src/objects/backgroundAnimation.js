var mPlayers = 3;
function createBackgroundAnimation(){
    createWorld(1000,1000,mPlayers);
    initClases();

    claseAnim1 = new Disrupter();
    claseAnim2 = new Assault();
    claseAnim3 = new Strategist();
    claseLoot = null;

    game.time.events.loop(Phaser.Timer.SECOND, createLootShip, this);
    
    createSpaceship(0,claseAnim1,true,100,100);
    createSpaceship(1,claseAnim2,true,400,100);
    createSpaceship(2,claseAnim3,true,700,400);

    shipDir1 = ((game.rnd.frac())*2 - 1)/100;
    shipDir2 = ((game.rnd.frac())*2 - 1)/100;
    shipDir3 = ((game.rnd.frac())*2 - 1)/100;
}

function updateAnim(){
    updateSpaceship(0,claseAnim1,true,1);
    updateSpaceship(1,claseAnim2,true,2);
    updateSpaceship(2,claseAnim3,true,0);
    updateLootship(claseAnim1);

    //colisiones
    /*for (var i = 0; i < mPlayers; i++){
        for (var j = 0; j < mPlayers; j++){
            collision(i,j);
        }
    }*/

    //rotacion naves
    spaceship[0].rotation += shipDir1;
    spaceship[1].rotation += shipDir2;
    spaceship[2].rotation += shipDir3;

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
}