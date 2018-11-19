Project.levelState = function(game) {

}

//tamaño del mundo
var worldsize = [3000,3000];

var playersMax = 20;


Project.levelState.prototype = {
		
    init() {
	//se inicializan las variables necesarias
	initClases();
	initUltimates();
	initPowerUps();
	    
	if (game.player1.id == 1) {
		game.player2 = {id: 2}
	} else {
		game.player2 = {id: 1}
	}
	    
	putPlayer();
        getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	classSelected2 = game.player2.clasS;
        });
    },

    preload: function() {
        
    },

    create: function() {
        //se inicializa el mundo con las dimensiones indicadas y se crea el polvo estelar y los blackHoles
        createWorld(worldsize[0], worldsize[1],playersMax); //width and height (dimensions of the world), maxP (size of the players list)
        createPolvoEstelar();
        createBlackHole();

        //clase es el tipo de nave
        clase = null;
        claseDummy = new Disrupter(300,200); //valor por defecto
        claseLoot = null;
        switch(game.player1.classS){
            case 1:
            clase = new Disrupter(300,200);
            break;
            case 2:
            clase = new Assault(200,200);
            break;
            case 3:
            clase = new Strategist(200,200);
            break;
        }
	    
        createSpaceship(0, clase, false, game.player1.x, game.player1.y); //playerIndex (numero identificador del jugador), playerClass (la clase que posee el jugador),
                                                    					  //bot (true->Es un bot, false->Es un jugador), x e y (posicion inicial del jugador)
        game.camera.follow(spaceship[0]);
        
        this.crearNaveEnemiga();
        game.time.events.add(Phaser.Timer.QUARTER, this.crearNaveEnemiga, this);

        initInterface(); //se inicializa lo ultimo para evitar solapamiento con el resto de objetos

        //LOOPS
        game.time.events.loop(Phaser.Timer.SECOND, counterPE, this); //loop de aparicion de polvo estelar
        game.time.events.loop(Phaser.Timer.SECOND, counterBH, this); //loop de aparicion de agujeros negros
        game.time.events.loop(Phaser.Timer.SECOND, createLootShip, this); //loop de aparicion de naves loot
        game.time.events.loop(Phaser.Timer.SECOND, updateUltimate, this); //loop de la gestion de la carga de ultimates
        game.time.events.loop(Phaser.Timer.SECOND, clase.UltTime, this); //loop de la gestion de la duracion de ultimates
        game.time.events.loop(Phaser.Timer.SECOND, speedBoostTime, this); //loop de gestion del speedBoost
        game.time.events.loop(Phaser.Timer.HALF, trap, this); //loop para gestion de trampa Strategist
    },

    update: function() {
    	
        updateInterface(); //evita que los elementos de la interfaz se solapen entre si
        //devuelve true cuando la nave muere
        if(updateSpaceship(0, clase, false)){   //playerIndex (numero identificador del jugador), playerClass (la clase que posee el jugador)
            this.listener();                    //bot (true->Es un bot, false->Es un jugador)
        } 
        
        if(updateSpaceship(1, clase, false)){
            claseDummy.weapon.destroy();
            claseDummy = null;
        }
        
        updateLootship(clase); //whoShotMrLootShip (nave que ha dado el tiro de gracia a la nave loot)
        updateWorld(clase, 0); //playerClass (nave afectada), playerIndex (numero identificador del jugador)
        updateUltimates(clase, 0); //playerClass (nave a la que afecta el daño), playerIndex (numero identificador del jugador)
        updateGrav(0); //playerIndex (numero identificador del jugador)
	    
        //COLISIONES
        if(players[0] != null){
            //colision de balas de jugador con nave dummy
            collisions(1, 0); //shotIndex (indice del que recibe el disparo), shooterIndex (indice del que dispara)
            
            //colision de balas de dummy con nave jugador
            if(claseDummy != null) collisions(0, 1);

            //colision de balas de jugador con nave loot
            if(claseLoot != null) collisions(20, 0);
        }

        controles();
        putPlayer();
        getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	spaceshipParent[1].x = game.player2.x;
        	spaceshipParent[1].y = game.player2.y;
        	spaceshipParent[1].rotation=game.player2.rot;
        	//console.log("Posicion de player 2: " + game.player2 + " actualizada");
        })
        
    },
    
    //Debug de las balas para pruebas sobre parámetros
    render: function(){
        /*clase.weapon.debug();

        game.debug.body(spaceshipParent[0]);
        game.debug.body(spaceshipParent[1]);
        game.debug.body(lootShip);
    	game.debug.spriteInfo(spaceshipParent[0]);
       	game.debug.spriteInfo(spaceshipParent[1]);
	 */
    	
    },
        
    listener: function(){
        this.state.start('endingState');
    },
    
    crearNaveEnemiga: function(){
    	switch(classSelected2){
	        case 1:
	        claseDummy = new Disrupter(300,200);
	        break;
	        case 2:
	        claseDummy = new Assault(200,200);
	        break;
	        case 3:
	        claseDummy = new Strategist(200,200);
	        break;
	    }
		
    	if(typeof spaceshipParent[1] !== 'undefined') spaceshipParent[1].destroy();
		createSpaceship(1, claseDummy, false, game.player2.x, game.player2.y);
    }
}
