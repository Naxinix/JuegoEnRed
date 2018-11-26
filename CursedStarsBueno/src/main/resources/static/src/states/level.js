Project.levelState = function(game) {

}

//tamaño del mundo
var worldsize = [3000,3000];

var playersMax = 20;

var win;

var done=false;

var done2=false
var done3=false;
var enemyGravActive=false;
var gravEnemy;
var areaEnemy;
bombEnemy = new Array(10);

Project.levelState.prototype = {
		
		init() {
		    //se inicializan las variables necesarias
			initClases();
	        initUltimates();
	        initPowerUps();
	        //se inicializa el mundo con las dimensiones indicadas y se crea el polvo estelar y los blackHoles
	        //width and height (dimensions of the world), maxP (size of the players list)
	        initWorld(worldsize[0],worldsize[1],playersMax);
	        //area=game.add.sprite(0,0,null);
		        
			if (game.player1.id == 1) {
				game.player2 = {id: 2}
			} else {
				game.player2 = {id: 1}
			}
			  getWorld( function (updateWorld1) {
		        	game.world1 = JSON.parse(JSON.stringify(updateWorld1));
		        	polvo=game.world1.polvoPos;
		        	bh=game.world1.bhPos;
		        });
			putPlayer();
	        getPlayer( function (updatePlayer2) {
	        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
	        	classSelected2 = game.player2.clasS;
	        });

			
		},

    preload: function() {
        
    },

    create: function() {
       
	    //es necesario crear el polvo estelar y los agujeros negros un poco mas tarde debido a que api rest no actualiza las variables inmediatamente
    	   game.time.events.add(Phaser.Timer.QUARTER, createPolvoEstelar, this);
    	   game.time.events.add(Phaser.Timer.QUARTER, createBlackHole, this);
    	   
    	   sonando=false;
           music.stop();
           beamm= game.add.audio('beamm');
           beamm.loopFull();
           beamm.volume=0.1;
        
    
           var sonidofinal=game.add.audio('derrota');
           var sonidofinal2=game.add.audio('victoria');
       
        //clase es el tipo de nave
        clase = null;
        clase2=new Disrupter(300,200);
        switch(game.player1.classS){
            case 1:
            clase = new Disrupter(300,200);
            break;
            case 2:
            clase = new Assault(200,200)
            break;
            case 3:
            clase = new Strategist(200,200);
            break;
        }
        
        createSpaceship(0, clase, false, game.player1.x, game.player1.y); //playerIndex (numero identificador del jugador), playerClass (la clase que posee el jugador),
                                                    //bot (true->Es un bot, false->Es un jugador), x e y (posicion inicial del jugador)
        
	//se crea la nave enemiga como disrupter por defecto, y un cuarto de segundo despues se sobreescribe con el valor de classSelected2 correcto
        //esto se hace por la imposibilidad de recibir de servidor el valor de classSelected2 a tiempo para la creacion de la nave enemiga
        this.crearNaveEnemiga();
        game.time.events.add(Phaser.Timer.QUARTER, this.crearNaveEnemiga, this);
	    
        game.camera.follow(spaceship[0]);

        initInterface(); //se inicializa lo ultimo para evitar solapamiento con el resto de objetos

        //LOOPS
        game.time.events.loop(Phaser.Timer.SECOND, counterPE, this); //loop de aparicion de polvo estelar
        game.time.events.loop(Phaser.Timer.SECOND, counterBH, this); //loop de aparicion de agujeros negros
        game.time.events.loop(Phaser.Timer.SECOND, createLootShip, this); //loop de aparicion de naves loot
        game.time.events.loop(Phaser.Timer.SECOND*3, updateUltimate, this); //loop de la gestion de la carga de ultimates
        game.time.events.loop(Phaser.Timer.SECOND, clase.UltTime, this); //loop de la gestion de la duracion de ultimates
        game.time.events.loop(Phaser.Timer.SECOND, speedBoostTime, this); //loop de gestion del speedBoost
        game.time.events.loop(Phaser.Timer.HALF, trap, this); //loop para gestion de trampa Strategist
        game.time.events.loop(Phaser.Timer.HALF, trapMe, this); //loop para gestion de trampa Strategist
    },

    update: function() {
    	
        updateInterface(); //evita que los elementos de la interfaz se solapen entre si
        //devuelve true cuando la nave muere
        if(updateSpaceship(0, clase, false)){   //playerIndex (numero identificador del jugador), playerClass (la clase que posee el jugador)
            this.listener();                    //bot (true->Es un bot, false->Es un jugador)
        } 
      
	    //actualizar nave de player2
        if(clase2.alive==false){
        	spaceshipParent[1].destroy();
        	win=true;
        	this.listener();
        }
        
        updateLootship();
        updateWorld(clase, 0); //playerClass (nave afectada), playerIndex (numero identificador del jugador)
        updateUltimates(clase, 0); //playerClass (nave a la que afecta el daño), playerIndex (numero identificador del jugador)
       	//updateGrav(0); //playerIndex (numero identificador del jugador)
        
	    //COLISIONES
        game.physics.arcade.collide(spaceshipParent[0], clase2.weapon.bullets, function(enemy, bullet){
        	//console.log("nave 1 alcanzada");
        	
        	clase.DMG(clase2.damage); //recibe el daño
        	
		//efecto visual en la nave de una explosion y un color rojo momentaneo
        	spaceship[0].tint = 0xff5555;
        	ex1 = explosions.getBottom();
        	explosions.bringToTop(ex1);
        	ex1.visible = true;
        	ex1.x = bullet.x;
        	ex1.y = bullet.y;
        	anim = ex1.animations.add('explosion');
        	anim.play(10, false);
        	anim.onComplete.add(function(){
        		explosions.setAll('position.x',-1000);
        		spaceship[0].tint = 0xffffff;
        	});
		
        	bullet.kill();
        });
        game.physics.arcade.collide(spaceshipParent[1], clase.weapon.bullets, function(enemy, bullet){
        	//console.log("nave 2 alcanzada");
        	
        	clase2.DMG(clase.damage);
        	counter += clase.damage*ultMultiplier;
        	
        	ex2 = explosions.getBottom();
        	explosions.bringToTop(ex2);
        	ex2.visible = true;
        	ex2.x = bullet.x;
        	ex2.y = bullet.y;
        	anim = ex2.animations.add('explosion');
        	anim.play(10, false);
        	anim.onComplete.add(function(){
        		explosions.setAll('position.x',-1000);
        	});
		
        	bullet.kill();
        });
        game.physics.arcade.collide(lootShipParent, clase.weapon.bullets, function(enemy, bullet){
		claseLoot.DMG(clase.damage);
		
        	console.log("nave loot alcanzada");
        	ex3 = explosions.getBottom();
        	explosions.bringToTop(ex3);
        	ex3.visible = true;
        	ex3.x = bullet.x;
        	ex3.y = bullet.y;
        	anim = ex2.animations.add('explosion');
        	anim.play(10, false);
        	anim.onComplete.add(function(){
        		explosions.setAll('position.x',-1000);
        	});
		
        	bullet.kill();
        });
	
        game.physics.arcade.overlap(spaceshipParent[1],area,function(){isTrapped=true; game.world.moveUp(area);});
        game.physics.arcade.overlap(spaceshipParent[0],areaEnemy,function(){imTrapped=true; game.world.moveUp(areaEnemy);});
        
        /*if(clase.health<=0){
        	spaceshipParent[0].destroy();
        	win=false;
        	clase.alive=false;
        	putPlayer();
        	this.state.start('endingState');
        }
        if(clase2.alive==false){
        	spaceshipParent[1].destroy();
        	win=true;
        	this.state.start('endingState');
        }*/
        
        //para mostrar la ulti del assault correctamente cuando un enemigo la usa
        if(clase2.usingUlt==true && classSelected2==2){
        	if(!done){
        	 game.add.tween(spaceship[1]).to( { angle: 1000 }, 3500, Phaser.Easing.Linear.None, true); //Rota el sprite
        	}
        		done=true;
        	    clase2.weapon.trackSprite(spaceship[1], 0, 0, true);
        	    clase2.weapon.autofire = true; //dispara solo
        	    clase2.weapon.bulletSpeed = 300;
        	    clase2.weapon.fireRate = 1;
        	    //clase2.usingUlt=false;
        }
        
	    //para mostrar la trampa correctamente cuando un enemigo la usa
        if(enemyGravActive==true){
        	if(!done2){
        		areaEnemy = game.add.sprite(spaceshipParent[1].x,spaceshipParent[1].y,'area2'); //area es el rango de acción del graviton
        	    game.physics.enable(areaEnemy, Phaser.Physics.ARCADE); 
        	    //area.visible=false;
        	    game.world.sendToBack(areaEnemy);
        	    gravEnemy=game.add.sprite(spaceshipParent[1].x,spaceshipParent[1].y,'graviton');
        	
        	}
        	done2=true;
        }
        if(enemyGravActive==false){
        	if(gravEnemy!=undefined){
        		gravEnemy.destroy();
        		done2=false;
        	}
        	
        }
        
	
        if(clase2.usingUlt == false && classSelected2 == 2){
            done = false;
            //clase2.weapon.trackSprite(spaceship[1], 0, 0, true);
    	    //clase2.weapon.autofire = false; //dispara solo
    	    clase2.weapon.bulletSpeed = 3000;
    	    clase2.weapon.fireRate = 200;
        }
        
	    //para mostrar la ulti del strategist correctamente cuando un enemigo la usa
        if(clase2.usingUlt==true && classSelected2==3){
        	if(!done3){
        	bombEnemy[0] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+100,spaceshipParent[1].y-spaceshipParent[1].offsetY+75,'bomb');
            bombEnemy[1] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-100,spaceshipParent[1].y-spaceshipParent[1].offsetY+75,'bomb');
            bombEnemy[2] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY-100,'bomb');
            //circulo exterior
            bombEnemy[3] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY-175,'bomb');
            bombEnemy[4] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY-175,'bomb');
            bombEnemy[5] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY+200,'bomb');
            bombEnemy[6] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY+175,'bomb');
            bombEnemy[7] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY+175,'bomb');
            bombEnemy[8] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY-200,'bomb');
            bombEnemy[9] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY,'bomb');
            bombEnemy[10] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY,'bomb');

            for(n=0;n<10;n++){
                game.physics.enable(bombEnemy[n], Phaser.Physics.ARCADE);
            }
        	}
        	done3=true;
        }
        
        if(clase.alive) controles();
        
	    //puts y gets necesarios en cada iteracion para actualizar la info
        if (game.player1.id == 1){
        	putWorld();
        } else {
        	getWorld( function (updateWorld1) {
            	game.world1 = JSON.parse(JSON.stringify(updateWorld1));
            	polvo = game.world1.polvoPos;
            	lootShip.rotation = game.world1.lsRot;
            	lootPosX = game.world1.lsPosX;
            	lootPosY = game.world1.lsPosY;
            	if(claseLoot != null) claseLoot.health = game.world1.lsHP;
    	    });
        	//console.log("Nave Loot en -> x: " + lootPosX + ", y: " + lootPosY);
        }

        putPlayer();
        getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	spaceshipParent[1].x = game.player2.x;
        	spaceshipParent[1].y = game.player2.y;
        	spaceship[1].rotation=game.player2.rot;
        	classSelected2=game.player2.classS;
        	clase2.alive=game.player2.alive;
        	clase2.usingUlt=game.player2.usingUlt;
        	clase2.deployed=enemyGravActive;
        	if(game.player2.disparando){
        		clase2.weapon.fireAngle=(spaceship[1].angle)+360;
        		clase2.weapon.autofire=true;
        	}else{
        		clase2.weapon.autofire=false;
        	}
        	//console.log("Posicion de player 2: " + game.player2 + " actualizada");
        })
        
        
        
    },
    
    //Debug de las balas para pruebas sobre parámetros
    render: function(){
        /*clase.weapon.debug();

        game.debug.body(spaceshipParent[0]);
        game.debug.body(spaceshipParent[1]);
        game.debug.body(lootShip);*/
    	//game.debug.spriteInfo(spaceshipParent[0]);
     	//game.debug.spriteInfo(spaceship[0]);
    	
    },
        
    listener: function(){
        this.state.start('endingState');
    },
    
    crearNaveEnemiga: function(){
    	switch(classSelected2){
	        case 1:
	        clase2 = new Disrupter(300,200);
	        break;
	        case 2:
	        clase2 = new Assault(200,200);
	        break;
	        case 3:
	        clase2 = new Strategist(200,200);
	        break;
	    }
		
    	if(typeof spaceshipParent !== 'undefined' && typeof spaceshipParent[1] !== 'undefined') spaceshipParent[1].destroy();
		createSpaceship(1, clase2, false, game.player2.x, game.player2.y);
    }
}
