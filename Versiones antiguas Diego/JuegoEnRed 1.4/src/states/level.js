Project.levelState = function(game) {

}

var counter = 0;
var text = 0;
var text2 = 0;
var text3 = 0;
var ultCharged = false;
var clase = 0;

var ultiTime = 0;

var ultused = false;

var auxBH = 0;
var auxLS = 0;

var lootShipDir = 0;

///////////////////////////////////////TIPOS ORGANIZADOS EN CLASES//////////////////////////////////////////////
function Disrupter(){
    //propiedades
    this.maxSpeed = 300;
    this.drag = 300;
    this.maxHealth = 200;
    this.health = 200;
    this.ult = counter;
    this.sprite = 'spaceship';
    this.damage = 10;

    //bullets
    this.weapon = game.add.weapon(60, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 30;
    this.weapon.bulletAngleVariance = 10; //dispersion

    //METODOS
    this.Ultimate = disrupterUltimate;
    this.UltTime = disrupterTime; //tiempo de uso de la ulti
    this.DMG = recieveDMG;
}

function Assault(){
    //propiedades
    this.maxSpeed = 200;
    this.drag = 100;
    this.maxHealth = 200;
    this.health = 200;
    this.ult = counter;
    this.sprite = 'arrow';
    this.damage = 10;

    //bullets
    this.weapon = game.add.weapon(300, 'bullet');
    this.weapon.bulletSpeed = 3000;
    this.weapon.fireRate = 200;
    this.weapon.bulletAngleVariance = 3; //dispersion

    //METODOS
    this.DMG = recieveDMG;
    this.Ultimate = assaultUltimate;
    this.UltTime = assaultTime; //tiempo de uso de la ulti
}

function Strategist(){
    //propiedades
    this.maxSpeed = 200;
    this.drag = 100;
    this.maxHealth = 200;
    this.health = 200;
    this.ult = counter;
    this.sprite = 'spaceship';
    this.damage = 20;

    //bullets
    this.weapon = game.add.weapon(5, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 0;
    this.weapon.bulletAngleVariance = 5; //dispersion

    //METODOS
    this.DMG = recieveDMG;
}

function NaveLoot(){
    //propiedades
    this.maxSpeed = 100;
    this.drag = 100;
    this.maxHealth = 1000;
    this.health = 1000;
    this.sprite = 'lootShip';

    //METODOS
    this.DMG = recieveDMG;
}

//FUNCION DE GESTION DE DAÑO RECIBIDO
function recieveDMG(damageValue){
    this.health -= damageValue;
    if(this.maxHealth > 200 && this.sprite == 'spaceship') this.maxHealth = this.health; //tiene sentido comparar con el sprite, porque habrá un sprite distinto para cada nave
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////ULTIS DE CADA CLASE//////////////////////////////////////////////////////////
function disrupterUltimate(){
    this.maxHealth = 400;
    this.health = 400;
    text2.setText('Health:'+this.health+'/'+this.maxHealth);
    this.maxSpeed=600;
    text3.setText('Speed:'+this.maxSpeed);
}

function disrupterTime(){
   if(ultused){
        if(ultiTime<5){
            ultiTime++;
            text.setText('Ultimate time: ' + ultiTime);
            counter=0;
        } else{
            //this.reset();
            clase.maxSpeed=300;
            text3.setText('Speed:'+clase.maxSpeed);

            ultused=false;
        }
    }
}


function assaultUltimate(){
    game.add.tween(spaceship).to( { angle: 1000 }, 3500, Phaser.Easing.Linear.None, true);
    clase.weapon.trackSprite(spaceship, 0, 0, true);
    clase.weapon.autofire=true;
    clase.weapon.bulletSpeed = 300;
    clase.weapon.fireRate = 1;
}

function assaultTime(){
    if(ultused){
        if(ultiTime<3){
            ultiTime++;
            text.setText('Ultimate time: ' + ultiTime);
            counter=0;
        }else{
            clase.weapon.autofire=false;
            clase.weapon.bulletSpeed = 3000;
            clase.weapon.fireRate = 120;
            ultused=false;
           
        }
    }
}


//FUNCION DE GESTION DE ULTIMATES

function updateUltimate(){
    if(counter<9){
        counter++;
        text.setText('Ultimate charge: ' + counter);
    }
    else{
        text.setText('Ultimate charged! Press Q');
        ultCharged=true;
    }
}


//AGUJEROS NEGROS
function counterBH(){
    if(auxBH<10){
        auxBH++;
    }else{
        a=Math.floor(Math.random()*1632);
        b=Math.floor(Math.random()*1632);

        blackHole = game.add.sprite(a,b,'blackhole');

        game.world.sendToBack(blackHole);
        game.world.moveUp(blackHole);

        auxBH=0;
    }
}

//NAVE LOOT
function createLootShip(){
    lootShipDir = ((game.rnd.frac())*2 - 1)/100;
    if(claseLoot == null){
        if(auxLS<10){
            auxLS++;
        }else{
            claseLoot = new NaveLoot();

            a2=Math.floor(Math.random()*1632);
            b2=Math.floor(Math.random()*1632);

            lootShipParent = game.add.sprite(a2, b2, null);
            lootShip = game.add.sprite(0, 0, claseLoot.sprite);
            lootShipParent.addChild(lootShip);

            //barra de vida lootShip TODO ESTO DEBERIA ESTAR EN UN CONSTRUCTOR DE NaveLoot
            lootlf2 = game.add.sprite(-100,-100,'lf2');
            lootlf1 = game.add.sprite(-100,-100,'lf1');
            lootlf1.width = claseLoot.health/5;
            lootlf2.scale.setTo(1,0.2);
            lootlf1.scale.setTo(1,0.2);

            lootShipParent.addChild(lootlf2);
            lootShipParent.addChild(lootlf1);
            
            game.physics.enable(lootShip, Phaser.Physics.ARCADE);
            game.physics.enable(lootShipParent, Phaser.Physics.ARCADE);
            lootShip.anchor.setTo(0.5,0.5);
            lootShipParent.body.immovable = true;
            lootShip.body.immovable = true;
            lootShipParent.body.collideWorldBounds=true;

            auxLS=0;
        }
    }
}


Project.levelState.prototype = {

    preload: function() {
        
    },

    create: function() {

        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);

        //clase es el tipo de nave
        clase = null;
        switch(classSelected){
            case 1:
            clase = new Disrupter();
            break;
            case 2:
            clase = new Assault();
            break;
            case 3:
            clase = new Strategist();
            break;
        }


        //LOOPS

        //loop de aparicion de agujeros negros
        game.time.events.loop(Phaser.Timer.SECOND, counterBH, this);
        //loop de aparicion de naves loot
        game.time.events.loop(Phaser.Timer.SECOND, createLootShip, this);
        //loops de la gestion de ultimates
        game.time.events.loop(Phaser.Timer.SECOND, updateUltimate, this);
        game.time.events.loop(Phaser.Timer.SECOND, clase.UltTime, this);

        //texto ultis
        text = game.add.text(500, 500, 'Ultimate charge: 0',
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text.fixedToCamera=true;

        //añadimos la barra de vida
        lf2=game.add.sprite(50,500,'lf2');
        lf1=game.add.sprite(52.5,502.5,'lf1');
        lf2.fixedToCamera=true;
        lf1.fixedToCamera=true;
        //Como la barra es de 200 pixeles y tienen 200 de vida, el ancho de la barra es la vida que les queda 
        lf1.width=clase.health;

        //spaceship es el body, la nave generica
        spaceship = game.add.sprite(400, 300, clase.sprite);

        //propiedades comunes a las 3 naves
        clase.weapon.trackSprite(spaceship, 0, 0);
        clase.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship) + 90;
        clase.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        clase.weapon.bulletLifespan = 900;
        clase.fireButton = game.input.activePointer.leftButton;


        //DUMMY (SOLO USADO COMO BOT PARA PRUEBAS OFFLINE)
        claseDummy = new Assault();

        spaceship2Parent = game.add.sprite(800, 300, null);
        spaceship2 = game.add.sprite(0, 0, claseDummy.sprite);

        spaceship2Parent.addChild(spaceship2);

        claseDummy.weapon.trackSprite(spaceship2, 0, 0);
        claseDummy.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship2) + 90;
        claseDummy.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        claseDummy.weapon.bulletLifespan = 900;
        claseDummy.weapon.autofire = true;

        //barra de vida enemigo TODO ESTO DEBERIA ESTAR EN UN CONSTRUCTOR DE Assault/Disrupter/Strategist
        enemylf2 = game.add.sprite(-100,-50,'lf2');
        enemylf1 = game.add.sprite(-100,-50,'lf1');
        enemylf1.width = claseDummy.health;
        enemylf2.scale.setTo(1,0.2);
        enemylf1.scale.setTo(1,0.2);

        spaceship2Parent.addChild(enemylf2);
        spaceship2Parent.addChild(enemylf1);

        //NAVE LOOT
        claseLoot = null;
        lootShipParent = game.add.sprite(0, 0, null);
        lootShip = game.add.sprite(0, 0, null);

        //Agujero Negro
        blackHole = null;

        //Fisicas
        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        game.physics.enable(spaceship2, Phaser.Physics.ARCADE);
        
        spaceship.body.immovable = true;
        spaceship2.body.immovable = true;

        spaceship.anchor.setTo(0.5,0.5);
        spaceship2.anchor.setTo(0.5,0.5);

        game.camera.follow(spaceship);
        spaceship.body.collideWorldBounds=true;
        spaceship2.body.collideWorldBounds=true;

        //MINIMAPA
        minimap = game.add.sprite(600,50,'minimap');
        minimap.fixedToCamera = true;

        //Valores en pantalla (provisionales, para pruebas)
        text2 = game.add.text(0, 0, 'Health:'+clase.health+'/'+clase.maxHealth,
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text2.fixedToCamera = true;

        text3 = game.add.text(0, 20, 'Speed:'+clase.maxSpeed,
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text3.fixedToCamera = true;
    },

    update: function() {
        //organizacion por capas de los sprites para evitar que ciertos elementos de la interfaz se solapen
        game.world.bringToTop(spaceship);
        game.world.bringToTop(minimap);
        game.world.bringToTop(text);
        game.world.bringToTop(text2);
        game.world.bringToTop(text3);
        game.world.bringToTop(lf2);
        game.world.bringToTop(lf1);

        //actualizar posicion blackHole en minimapa
        if(blackHole != null){
            posbh = game.add.sprite(600+(blackHole.x/15),50+(blackHole.y/15),'blackhole2');
            posbh.fixedToCamera = true;
        }

        //actualizar posicion lootShip en minimapa
        if(claseLoot != null){
            posls = game.add.sprite(600+((lootShipParent.x-lootShip.offsetX)/15),50+((lootShipParent.y-lootShip.offsetY)/15),'lootShipIcon');
            posls.fixedToCamera = true;
            posls.lifespan = 0.1;
        }

        //actualizar posicion en minimapa
        position = game.add.sprite(600+((spaceship.body.position.x)/15),50+((spaceship.body.position.y)/15),'position');
        position.fixedToCamera = true;
        position.lifespan = 0.1;

        //Rotacion y aceleracion de la naves
        spaceship.rotation = game.physics.arcade.angleToPointer(spaceship);
        spaceship2.rotation = game.physics.arcade.angleBetween(spaceship2Parent, spaceship);
        lootShip.rotation += lootShipDir;
      
        spaceship.body.acceleration.x = 0;
        spaceship.body.acceleration.y = 0;
        
        spaceship.body.angularVelocity = 0;

        //pasamos los valores de la clase al body de la nave
        spaceship.body.maxVelocity.x = clase.maxSpeed;
        spaceship.body.maxVelocity.y = clase.maxSpeed;
        spaceship.body.drag.x = clase.drag;
        spaceship.body.drag.y = clase.drag;

        //movimiento nave loot
        if(claseLoot != null){
            lootShipParent.body.acceleration.x = claseLoot.maxSpeed*Math.cos(lootShip.rotation - 1.57);
            lootShipParent.body.acceleration.y = claseLoot.maxSpeed*Math.sin(lootShip.rotation - 1.57);
        }
        
        //representacion visual de la salud del jugador y gestion de la muerte del mismo
        if(clase.health > 0)
        {
            lf2.width = clase.maxHealth;
            lf1.width = clase.health;
        } else
        {
            lf1.width = 0;
            this.listener();
        }

        //representacion visual de la salud del dummy y gestion de la muerte del mismo
        if(claseDummy != null) if(claseDummy.health > 0)
        {
            enemylf2.width = claseDummy.maxHealth;
            enemylf1.width = claseDummy.health;
        } else
        {
            enemylf1.width = 0;
            spaceship2Parent.destroy();
            claseDummy.weapon.destroy();
            claseDummy = null;
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
        }

        //COLISIONES A ver como coño hacemos esto en online
        game.physics.arcade.collide(spaceship2, clase.weapon.bullets, function(enemy, bullet){ bullet.kill(); claseDummy.DMG(clase.damage);});
        if(claseDummy != null) game.physics.arcade.collide(spaceship, claseDummy.weapon.bullets, function(enemy, bullet){ bullet.kill(); clase.DMG(claseDummy.damage);});
        if(claseLoot != null) game.physics.arcade.collide(lootShip, clase.weapon.bullets, function(enemy, bullet){ bullet.kill(); claseLoot.DMG(clase.damage);});

        //controles
        if (game.input.keyboard.isDown(Phaser.Keyboard.S))//movimiento
        {
            spaceship.body.acceleration.y=clase.maxSpeed;//
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W))//
        {
            spaceship.body.acceleration.y=-clase.maxSpeed;//
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.A))//
        {
            spaceship.body.acceleration.x=-clase.maxSpeed;//
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.D))//
        {
            spaceship.body.acceleration.x=clase.maxSpeed;//
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q))//ulti
        {
            if(ultCharged){
                counter=0;
                ultiTime=0;
                ultused=true;
                clase.Ultimate();
            }
        }
        if (clase.fireButton.isDown)//disparo
        {
            clase.weapon.fireAtPointer();

            //Disparo de escopeta para strategist
            if(classSelected == 3)
            {
                for(var i = 0; i < 9; i++)
                {
                    clase.weapon.fireAtPointer();
                }
            }
        }
        
        //disparo automático del dummy (provisional)
        if(claseDummy != null) claseDummy.weapon.fireAtSprite(spaceship);
    },

    //debug de las balas para pruebas
    render: function(){
        clase.weapon.debug();
    },

    listener: function(){
        this.state.start('endingState');
    }
}
