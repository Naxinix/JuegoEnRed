Project.levelState = function(game) {

}

//tamaño del mundo
var worldsize = [3000,3000];

var playersMax = 20;

var win;

var done=false;
var donee=false;
var doneee=false;
var done2 = false
var done3 = false;
var enemyGravActive = false;
var gravEnemy;
var areaEnemy;
bombEnemy = new Array(10);
lootId = 0;

Project.levelState.prototype = {
		
	init() {
	    //se inicializan las variables necesarias
		initClases();
        initUltimates();
        initPowerUps();
        //se inicializa el mundo con las dimensiones indicadas
        //width and height (dimensions of the world), maxP (size of the players list)
        initWorld(worldsize[0],worldsize[1],playersMax);
        
        //get World
		polvo = game.world1.polvoPos;
    	bh = game.world1.bhPos;
    	
        dataput = {
			type:"PUT",
			content:{
				//put Player
				x: game.player1.x,
				y: game.player1.y,
				rot: game.player1.rot,
				disparando: game.player1.disparando,
				classS: game.player1.classS,
				alive: game.player1.alive,
				usingUlt: game.player1.usingUlt,
				deployed: game.player1.deployed,
				health: game.player1.health,
				
				//put World (innecesario en este momento, por lo que se ponen valores inutiles)
				polvoPos: polvo,
				bhPos: bh,
				lsRot: game.world1.lsRot,
				lsPosY: game.world1.lsPosY,
				lsPosX: game.world1.lsPosX,
				lsHp: 1000
			}
		}
    	ws.send(JSON.stringify(dataput));
        
		if (game.player1.id == 1) {
			game.player2.id = 2;
		} else {
			game.player2.id= 2;
		}
		
		console.log(game.world1);
    	
		/*
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
		*/
	},

    preload: function() {
    	
    },

    create: function() {
		//es necesario crear el polvo estelar y los agujeros negros un poco mas tarde debido a que websockets no actualiza las variables inmediatamente
    	game.time.events.add(Phaser.Timer.QUARTER, createPolvoEstelar, this);
    	game.time.events.add(Phaser.Timer.QUARTER, createBlackHole, this);
    	
    	warning=game.add.sprite(50,478,'warning');
        idle3 = warning.animations.add('idle3');
        warning.fixedToCamera=true;
        game.physics.enable(warning, Phaser.Physics.ARCADE);
        warning.visible=false;
        
        reaper=game.add.sprite(190,450,'reaper');
        reaper.scale.setTo(0.2,0.2);
        reaper.fixedToCamera=true;
        game.physics.enable(reaper, Phaser.Physics.ARCADE);
        reaper.visible=false;
        
        lucio=game.add.sprite(190,450,'lucio');
        lucio.scale.setTo(0.4,0.4);
        lucio.fixedToCamera=true;
        game.physics.enable(lucio, Phaser.Physics.ARCADE);
        lucio.visible=false;
        
        hammond=game.add.sprite(190,450,'hammond');
        hammond.scale.setTo(0.4,0.4);
        hammond.fixedToCamera=true;
        game.physics.enable(hammond, Phaser.Physics.ARCADE);
        hammond.visible=false;
        
    	sonando = false;
    	music.stop();
    	beamm = game.add.audio('beamm');
    	beamm.loopFull();
    	beamm.volume = 0.1;
    	ultimate_ready=game.add.audio('ultimate_ready');
        musica_level=game.add.audio('musica_level');
        musica_level.play();
        musica_level.volume=0.7;

        alarm=game.add.audio('alarm');
        alarm.volume=0.5;

        fuel=game.add.audio('fuel');
        fuel.volume=0.3;

        explosion=game.add.audio('explosion');
        explosion.volume=0.3;
    

    	var sonidofinal = game.add.audio('derrota');
    	var sonidofinal2 = game.add.audio('victoria');
       
        //clase es el tipo de nave
        clase = null;
        clase2 = null;
        
        switch(classSelected){
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
        
        classSelected2 = game.player2.classS;
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
	        default:
	        clase2 = new Disrupter(300,200);
	        break;
	    }
        
        createSpaceship(0, clase, false, game.player1.x, game.player1.y); //playerIndex (numero identificador del jugador), playerClass (la clase que posee el jugador),
                                                    //bot (true->Es un bot, false->Es un jugador), x e y (posicion inicial del jugador)
        createSpaceship(1, clase2, false, game.player2.x, game.player2.y);
        
        //se crea la nave enemiga como disrupter por defecto, y un cuarto de segundo despues se sobreescribe con el valor de classSelected2 correcto
        //esto se hace por la imposibilidad de recibir de servidor el valor de classSelected2 a tiempo para la creacion de la nave enemiga
        //this.crearNaveEnemiga();
        //game.time.events.add(Phaser.Timer.QUARTER, this.crearNaveEnemiga, this);
	    
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
        	win = false;                    		//bot (true->Es un bot, false->Es un jugador)
        	this.listener();
        }
        
	    //actualizar nave de player2
        if(updateSpaceship(1, clase2, false)){
        	win = true;
            this.listener();
        }
        
        updateLootship(lootId);
        updateWorld(clase, 0); //playerClass (nave afectada), playerIndex (numero identificador del jugador)
        updateUltimates(clase, 0); //playerClass (nave a la que afecta el daño), playerIndex (numero identificador del jugador)
        
        lootId = 0;
        
	    //COLISIONES
        game.physics.arcade.collide(spaceshipParent[0], clase2.weapon.bullets, function(enemy, bullet){
        	
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
        	
        	lootId = game.player1.id;
        	claseLoot.DMG(clase.damage);
		
        	console.log("nave loot alcanzada");
        	ex3 = explosions.getBottom();
        	explosions.bringToTop(ex3);
        	ex3.visible = true;
        	ex3.x = bullet.x;
        	ex3.y = bullet.y;
        	anim = ex3.animations.add('explosion');
        	anim.play(10, false);
        	anim.onComplete.add(function(){
        		explosions.setAll('position.x',-1000);
        	});
		
        	bullet.kill();
        });
	
        game.physics.arcade.overlap(spaceshipParent[1],area,function(){isTrapped=true; game.world.moveUp(area);});
        game.physics.arcade.overlap(spaceshipParent[0],areaEnemy,function(){imTrapped=true; game.world.moveUp(areaEnemy);});
        
        //para mostrar la ulti del assault correctamente cuando un enemigo la usa
        if(clase2.usingUlt == true && classSelected2 == 2){
        	if(!done){
        	 game.add.tween(spaceship[1]).to( { angle: 1000 }, 3500, Phaser.Easing.Linear.None, true); //Rota el sprite
        	}
        		done = true;
        	    clase2.weapon.trackSprite(spaceship[1], 0, 0, true);
        	    clase2.weapon.autofire = true; //dispara solo
        	    clase2.weapon.bulletSpeed = 300;
        	    clase2.weapon.fireRate = 1;
        	    //clase2.usingUlt=false;
        }
        
	    //para mostrar la trampa correctamente cuando un enemigo la usa
        if(enemyGravActive == true){
        	if(!done2){
        		areaEnemy = game.add.sprite(spaceshipParent[1].x,spaceshipParent[1].y,'area2'); //area es el rango de acción del graviton
        	    game.physics.enable(areaEnemy, Phaser.Physics.ARCADE); 
        	    //area.visible=false;
        	    game.world.sendToBack(areaEnemy);
        	    gravEnemy=game.add.sprite(spaceshipParent[1].x,spaceshipParent[1].y,'graviton');
        	
        	}
        	done2=true;
        }
        if(enemyGravActive == false){
        	if(gravEnemy != undefined){
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
	        	bombEnemy[0] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+100,spaceshipParent[1].y-spaceshipParent[1].offsetY+75,'bomb_anim');
	            bombEnemy[1] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-100,spaceshipParent[1].y-spaceshipParent[1].offsetY+75,'bomb_anim');
	            bombEnemy[2] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY-100,'bomb_anim');
	            //circulo exterior
	            bombEnemy[3] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY-175,'bomb_anim');
	            bombEnemy[4] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY-175,'bomb_anim');
	            bombEnemy[5] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY+200,'bomb_anim');
	            bombEnemy[6] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY+175,'bomb_anim');
	            bombEnemy[7] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY+175,'bomb_anim');
	            bombEnemy[8] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX,spaceshipParent[1].y-spaceshipParent[1].offsetY-200,'bomb_anim');
	            bombEnemy[9] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX+200,spaceshipParent[1].y-spaceshipParent[1].offsetY,'bomb_anim');
	            bombEnemy[10] = game.add.sprite(spaceshipParent[1].x-spaceshipParent[1].offsetX-200,spaceshipParent[1].y-spaceshipParent[1].offsetY,'bomb_anim');
	
	            for(n=0;n<11;n++){
	                game.physics.enable(bombEnemy[n], Phaser.Physics.ARCADE);
	                idle5 = bombEnemy[n].animations.add('idle5');
	                bombEnemy[n].animations.play('idle5', 3, true);
	            }
        	}
        	done3=true;
        }
        for(j=0; j<11; j++){
        	game.physics.arcade.collide(spaceshipParent[0],bombEnemy[j],function(){explosion.play(); bombEnemy[j].kill(); clase.DMG(100);});
        }
        for(k=0; k<11; k++){
        	game.physics.arcade.collide(spaceshipParent[1],bomb[j],function(){explosion.play(); bomb[j].kill();});
        }
        
        if(clase.alive) controles();
        
        if(claseLoot != null){
        	HPaux = claseLoot.health;
        } else {
        	HPaux = 1000;
        }
        
        dataput = {
			type:"PUT",
			content:{
				//put Player
				x: spaceshipParent[0].x,
				y: spaceshipParent[0].y,
				rot: spaceship[0].rotation,
				disparando: clase.fireButton.isDown,
				classS: classSelected,
				alive: clase.alive,
				usingUlt: clase.usingUlt,
				deployed: gravActive,
				health: clase.health,
				
				//put World
				polvoPos: polvo,
				bhPos: bh,
				lsRot: lootShip.rotation,
				lsPosY: lootPosY,
				lsPosX: lootPosX,
				lsHp: HPaux
			}
		}
		ws.send(JSON.stringify(dataput)) //el primer put falla
		
		//get Player
		spaceshipParent[1].x = game.player2.x;
    	spaceshipParent[1].y = game.player2.y;
    	spaceship[1].rotation = game.player2.rot;
    	classSelected2 = game.player2.classS;
    	clase2.alive = game.player2.alive;
    	clase2.usingUlt = game.player2.usingUlt;
    	enemyGravActive = game.player2.deployed;
    	clase2.health = game.player2.health;
    	if(game.player2.disparando){
    		clase2.weapon.fireAngle = (spaceship[1].angle)+360;
    		clase2.weapon.autofire = true;
    	}else{
    		clase2.weapon.autofire = false;
    	}
    	
    	//get World
    	if(game.player1.id != 1) {
	    	polvo = game.world1.polvoPos;
	    	lootShip.rotation = game.world1.lsRot;
	    	lootPosX = game.world1.lsPosX;
	    	lootPosY = game.world1.lsPosY;
    	}
    	
    	if(claseLoot != null) if(claseLoot.health > game.world1.lsHp) {
    		claseLoot.health = game.world1.lsHp;
    	}
    	
        /*
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
            	if(claseLoot != null) claseLoot.health = game.world1.lsHp;
    	    });
        	//console.log("Nave Loot en -> x: " + lootPosX + ", y: " + lootPosY);
        }

        /*
        putPlayer();
        getPlayer( function (updatePlayer2) {
        	game.player2 = JSON.parse(JSON.stringify(updatePlayer2));
        	spaceshipParent[1].x = game.player2.x;
        	spaceshipParent[1].y = game.player2.y;
        	spaceship[1].rotation=game.player2.rot;
        	classSelected2=game.player2.classS;
        	clase2.alive=game.player2.alive;
        	clase2.usingUlt=game.player2.usingUlt;
        	//clase2.deployed=enemyGravActive;
        	enemyGravActive=game.player2.deployed;
        	if(game.player2.disparando){
        		clase2.weapon.fireAngle=(spaceship[1].angle)+360;
        		clase2.weapon.autofire=true;
        	}else{
        		clase2.weapon.autofire=false;
        	}
        	//console.log("Posicion de player 2: " + game.player2 + " actualizada");
        })
        
        */
        
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
    }
    /*
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
	*/
    }

