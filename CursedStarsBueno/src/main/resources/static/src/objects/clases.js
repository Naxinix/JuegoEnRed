function initClases(){
    //variable que contendrá el tipo de clase seleccionada
    clase = 0;
    claseLoot=null;
    
    //nave jugador
    spaceshipParent = new Array(playersMax);
    spaceship = new Array(playersMax);

    //nave loot
    lootShipParent = game.add.sprite(0, 0, null);
    lootShip = game.add.sprite(0, 0, null);

    //variable para controlar el giro de la nave loot
    lootShipDir = 0;
    lootPosX=0;
    lootPosY=0;
    
    
    //variables relativas a la habilidad graviton del Strategist
    area = game.add.sprite(0, 0, null);
    grav = game.add.sprite(0, 0, null);
    gravActive = false;
    isTrapped = false;
    imTrapped= false;
    trapTime = 0;
}

class Disrupter {
    constructor(maxSpeed, maxHealth){
        //propiedades
        this.maxSpeed = maxSpeed;
        this.drag = 300;//rozamiento
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.sprite = 'disrupter';
        this.damage = 10; //daño que inflinge cada bala
        this.alive=true;
        this.usingUlt=false;
        
        //bullets
        this.weapon = game.add.weapon(60, 'bullet');
        this.weapon.bulletSpeed = 1000;
        this.weapon.fireRate = 30;
        this.weapon.bulletAngleVariance = 10; //dispersion
        //METODOS
        this.Ultimate = disrupterUltimate;
        this.UltTime = disrupterTime; //tiempo de uso de la ulti
    }
}

class Assault {
    constructor(maxSpeed, maxHealth){
        //propiedades
        this.maxSpeed = maxSpeed;
        this.drag = 100; 
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.sprite = 'assault';
        this.damage = 20;
        this.alive=true;
        this.usingUlt=false;

        //bullets
        this.weapon = game.add.weapon(300, 'bullet');
        this.weapon.bulletSpeed = 3000;
        this.weapon.fireRate = 200;
        this.weapon.bulletAngleVariance = 3; //dispersion

        //METODOS
        this.Ultimate = assaultUltimate;
        this.UltTime = assaultTime; //tiempo de uso de la ulti
    }
}

class Strategist {
    constructor(maxSpeed, maxHealth){
        //propiedades
        this.maxSpeed = maxSpeed;
        this.drag = 100;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.sprite = 'strategist';
        this.damage = 20;
        this.alive=true;
        this.usingUlt=false;
        //this.deployed=false;

        //bullets
        this.weapon = game.add.weapon(5, 'bullet');
        this.weapon.bulletSpeed = 1000;
        this.weapon.fireRate = 0;
        this.weapon.bulletAngleVariance = 5; //dispersion

        //METODOS
        this.Ultimate = strategistUltimate;
        this.UltTime = strategistTime; //tiempo de uso de la ulti
    }
}

class NaveLoot {
    constructor(maxSpeed, maxHealth){
        //propiedades
        this.maxSpeed = maxSpeed;
        this.drag = 100;
        this.maxHealth = maxHealth;
        this.health = 1000;
        this.sprite = 'lootShip';
        
        //METODOS
        this.DMG = recieveDMG;
    }
}

//Gestiona el daño recibido
function recieveDMG(damageValue){
    this.health -= damageValue;
    if(this.maxHealth > 200 && classSelected == 1 && damageValue > 0) this.maxHealth = this.health;
}

//Establece una trampa gravitón en el centro del mundo (STRATEGIST)
function setGrav(){
    next = 0;
    if(next>game.time.now){return;}
    area = game.add.sprite(spaceshipParent[0].x,spaceshipParent[0].y,'area2'); //area es el rango de acción del graviton
    game.physics.enable(area, Phaser.Physics.ARCADE); 
    //area.visible=false;
    game.world.sendToBack(area);
    grav = game.add.sprite(spaceshipParent[0].x,spaceshipParent[0].y,'graviton'); //grav es el sprite del graviton


    next = game.time.now + 1000; // delay de 1 segundo por cada graviton, evitando asi poner infinitos
    gravActive = true;
}

//Gestiona el efecto de una trampa deployeada y el tiempo que un jugador esta atrapado en ella
function trap(){
    if(isTrapped){
        if(trapTime<6){
            clase2.maxSpeed = 0;
            trapTime++;
        }else{
            area.destroy();
            grav.destroy();
            gravActive = false;
            isTrapped = false;
            trapTime = 0;
            clase2.maxSpeed = clase2.resetSpeed;
        }
    }
}

function trapMe(){
    if(imTrapped){
        if(trapTime<6){
            clase.maxSpeed = 0;
            trapTime++;
        }else{
            areaEnemy.destroy();
            gravEnemy.destroy();
            enemyGravActive = false;
            imTrapped = false;
            trapTime = 0;
            clase.maxSpeed = clase.resetSpeed;
        }
    }
}

//Permite destruir la trampa establecida
function killGrav(){
    grav.destroy();
    area.destroy();
    gravActive = false;
}

/*
function updateGrav(playerIndex){
    //Overlap y efecto con el area de efecto de la trampa del strategist (hace que esta sea visible y pone la variable ‘esta atrapado’ a verdadera
    game.physics.arcade.overlap(spaceshipParent[1],area,function(){isTrapped=true; game.world.moveUp(area);});
}
*/
//crea el sprite de la nave e inicializa las variables genericas de las naves
function createSpaceship(playerIndex,playerClass,bot,x,y){
   

    spaceshipParent[playerIndex] = game.add.sprite(x, y, null);
    spaceship[playerIndex] = game.add.sprite(0, 0, playerClass.sprite);
    
    idle = spaceship[playerIndex].animations.add('idle');
    spaceship[playerIndex].animations.play('idle', 10, true);
    
    spaceshipParent[playerIndex].addChild(spaceship[playerIndex]);

    //propiedades comunes a las 3 naves
    playerClass.DMG = recieveDMG;
    playerClass.powerUp = new Array(5);
    playerClass.resetSpeed = playerClass.maxSpeed;
    
    //propiedades de weapon comunes
    if(!bot){
        playerClass.weapon.trackSprite(spaceship[playerIndex], 0, 0);
        playerClass.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship[playerIndex]) + 90;
        playerClass.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        playerClass.weapon.bulletLifespan = 900;
        playerClass.fireButton = game.input.activePointer.leftButton;
        
        explosions=game.add.group();
        
        for(var i=0; i<50; i++){
        	exploAux=game.add.sprite(-1000, -1000, 'hit');
        	exploAux.scale.setTo(0.075,0.075);
        	exploAux.anchor.setTo(0.5,0.5);
        	explosions.add(exploAux);
        }
    } else{
        //el bot trackea al jugador 0. Esto es para las pruebas offline
        playerClass.weapon.trackSprite(spaceship[playerIndex], 0, 0);
        playerClass.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship[playerIndex]) + 90;
        playerClass.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        playerClass.weapon.bulletLifespan = 200; //modificamos el bulletLifespan de las balas del dummy para que las pruebas sean menos molestas
        playerClass.weapon.autofire = true;
        playerClass.damage = 2;
    }

    //barra de vida solo visible para los enemigos 
    enemylf2 = game.add.sprite(-100,-50,'lf2');
    enemylf1 = game.add.sprite(-100,-50,'lf1');
    enemylf1.width = playerClass.health;
    enemylf2.scale.setTo(1,0.2);
    enemylf1.scale.setTo(1,0.2);

    spaceshipParent[playerIndex].addChild(enemylf2);
    spaceshipParent[playerIndex].addChild(enemylf1);

    if(playerIndex == 0){
        enemylf1.visible = false;
        enemylf2.visible = false;
    }

    //Fisicas
    game.physics.enable(spaceshipParent[playerIndex], Phaser.Physics.ARCADE);
    game.physics.enable(spaceship[playerIndex], Phaser.Physics.ARCADE);

    spaceshipParent[playerIndex].body.setSize(50,50, -20, -20);
    spaceshipParent[playerIndex].body.immovable = true;
    spaceship[playerIndex].anchor.setTo(0.5,0.5);
    spaceshipParent[playerIndex].body.collideWorldBounds = true;
}

function updateSpaceship(playerIndex, playerClass, bot, target){
    //Rotacion y aceleracion de la naves
    spaceship[playerIndex].rotation = game.physics.arcade.angleToPointer(spaceshipParent[playerIndex]);
    
   
        spaceshipParent[playerIndex].body.acceleration.x = 0;
        spaceshipParent[playerIndex].body.acceleration.y = 0;
        
        spaceshipParent[playerIndex].body.angularVelocity = 0;

        //pasamos los valores de la clase al body de la nave
        spaceshipParent[playerIndex].body.maxVelocity.x = playerClass.maxSpeed;
        spaceshipParent[playerIndex].body.maxVelocity.y = playerClass.maxSpeed;
        spaceshipParent[playerIndex].body.drag.x = playerClass.drag;
        spaceshipParent[playerIndex].body.drag.y = playerClass.drag;
    

    //si es un bot debera apuntar hacia el jugador y disparar
    if(bot){
        spaceship[playerIndex].rotation = game.physics.arcade.angleBetween(spaceshipParent[playerIndex], spaceshipParent[target]);
        if(playerClass != null) playerClass.weapon.fireAtSprite(spaceship[target]);
    }

    //representacion visual de la salud de la nave y gestion de la muerte de la misma
    if(playerClass != null) if(playerClass.health > 0)
    {
    	if(playerIndex!=0){
        enemylf2.width = playerClass.maxHealth;
        enemylf1.width = playerClass.health;
    	}
    } else
    {
        enemylf1.width = 0;
        spaceshipParent[playerIndex].destroy();
        win=false;
        clase.alive=false;
        return true;
    }
}

function createLootShip(){
    //el slot 20 del array de jugadores se reserva para claseLoot (al final caben 20 jugadores + 1 nave loot)
    spaceshipParent[20] = lootShip;
    
    //se modifica la direccion de la nave loot en un valor aleatorio entre -0.01 y 0.01
    if(game.player.id==1) lootShipDir = ((game.rnd.frac())*2 - 1)/100;
    if(claseLoot == null){
        //bucle que espera 10 segundos y crea una nave Loot en una posicion random del mundo
        if(auxLS<10){
            auxLS++;
        }else{
            claseLoot = new NaveLoot(200,1000);
            if(game.player1.id==1){
            lootPosX=Math.floor(Math.random()*(worldsize[0]-200));//margen de 200 pixeles para evitar que se generen en el borde del mundo
            lootPosY=Math.floor(Math.random()*(worldsize[1]-200));
            }else{
            	lootPosX=0;
            	lootPosY=0;
            }
            
            //sprite vacio para evitar que la barra de vida de la nave gire junto a la misma. lootShipParent contiene a lootShip(el sprite que se visualiza y gira) y la barra de vida.
            lootShipParent = game.add.sprite(lootPosX, lootPosY, null);
            lootShip = game.add.sprite(0, 0, claseLoot.sprite);

            idle3 = lootShip.animations.add('idle3');
            lootShip.animations.play('idle3', 10, true);

            lootShipParent.addChild(lootShip);

            //barra de vida lootShip
            lootlf2 = game.add.sprite(-100,-100,'lf2');
            lootlf1 = game.add.sprite(-100,-100,'lf1');
            lootlf1.width = claseLoot.health/5;
            lootlf2.scale.setTo(1,0.2);
            lootlf1.scale.setTo(1,0.2);

            lootShipParent.addChild(lootlf2);
            lootShipParent.addChild(lootlf1);
            
            game.physics.enable(lootShip, Phaser.Physics.ARCADE);
            game.physics.enable(lootShipParent, Phaser.Physics.ARCADE);

            lootShip.body.setSize(64,64, 64, 32);
            lootShip.anchor.setTo(0.5,0.5);
            lootShipParent.body.immovable = true;
            lootShip.body.immovable = true;
            lootShipParent.body.collideWorldBounds=true;

            auxLS=0;
        }
    }
}

function updateLootship(){

    //movimiento nave loot
    if(claseLoot != null){
    	if(game.player1.id==1){
        //rotacion nave loot
        lootShip.rotation += lootShipDir
        
        //la nave se movera con una velocidad maxSpeed en la direccion que apunta
        lootShipParent.body.acceleration.x = claseLoot.maxSpeed*Math.cos(lootShip.rotation);
        lootShipParent.body.acceleration.y = claseLoot.maxSpeed*Math.sin(lootShip.rotation);
        lootPosX= lootShipParent.x;
        lootPosY= lootShipParent.y;
        }else{
        	lootShipParent.x=lootPosX;
        	lootShipParent.y=lootPosY;
        }
    }

    //representacion visual de la salud de la nave loot y gestion de la muerte de la misma
    if(claseLoot != null) if(claseLoot.health > 0)
    {
        lootlf2.width = claseLoot.maxHealth/5;
        lootlf1.width = claseLoot.health/5;
    } else
    {
        lootlf1.width = 0;
        lootShipParent.kill();
        lootShip.kill();
        claseLoot = null;
        //al morir la nave loot otorga un powerUp aleatorio al jugador que la ha matado
        if(game.player1.id == 1){
        auxRnd = game.rnd.between(0,1);
        clase.powerUp[auxRnd] = true;
        if(auxRnd == 0){
            chargePUsprite.loadTexture('chargePUOn', 0);
        } else if(auxRnd == 1){
            speedBoostPUsprite.loadTexture('speedBoostPUOn', 0);
        }
    }
  }
}
