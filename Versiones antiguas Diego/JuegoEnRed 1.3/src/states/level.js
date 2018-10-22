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

///////////////////////////////////////TIPOS ORGANIZADOS EN CLASES//////////////////////////////////////////////
function Disrupter(){
    this.maxSpeed=300;
    this.drag=300;
    this.health=50;
    this.ult=counter;
    this.sprite='spaceship';

    //bullets
    this.weapon = game.add.weapon(60, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 30;
    this.weapon.bulletAngleVariance = 10; //dispersion


    //METODOS
    this.Ultimate=disrupterUltimate;
    this.UltTime=disrupterTime; //tiempo de uso de la ulti
    this.DMG=recieveDMG;
}


function Assault(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.ult=counter;
    this.sprite='arrow';

    //bullets
    this.weapon = game.add.weapon(60, 'bullet');
    this.weapon.bulletSpeed = 3000;
    this.weapon.fireRate = 120;
    this.weapon.bulletAngleVariance = 3; //dispersion

    //METODOS
    this.DMG=recieveDMG;
}

function Strategist(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.ult=counter;
    this.sprite='spaceship';

    //bullets
    this.weapon = game.add.weapon(5, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 0;
    this.weapon.bulletAngleVariance = 5; //dispersion
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////ULTIS DE CADA CLASE//////////////////////////////////////////////////////////
function disrupterUltimate(){
    this.health=400;
    text2.setText('Health:'+this.health);
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
            clase.maxSpeed=100;
            text3.setText('Speed:'+clase.maxSpeed);

            ultused=false;
        }
    }
}

//FUNCION DE GESTION DE ULTIMATE

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

function recieveDMG(){
    this.health -= 20;
}


Project.levelState.prototype = {

    preload: function() {
        
    },

    create: function() {
    
        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);

        //clase es el tipo de nave, cuyas caracteristicas le pasaremos a spaceship
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

        //Ulti
        text = game.add.text(500, 500, 'Ultimate charge: 0',
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text.fixedToCamera=true;

        game.time.events.loop(Phaser.Timer.SECOND, updateUltimate, this);

        //añadimos la barra de vida
        lf2=game.add.sprite(50,500,'lf2');
        lf1=game.add.sprite(52.5,502.5,'lf1');
        lf2.fixedToCamera=true;
        lf1.fixedToCamera=true;

        game.time.events.loop(Phaser.Timer.SECOND, clase.UltTime, this);

        //spaceship es el body, la nave generica
        spaceship = game.add.sprite(400, 300, clase.sprite);

        //propiedades comunes a las 3 naves
        clase.weapon.trackSprite(spaceship, 0, 0);
        clase.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship) + 90;
        clase.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        clase.weapon.bulletLifespan = 900;
        clase.fireButton = game.input.activePointer.leftButton;


        //DUMMY
        claseDummy = new Disrupter();

        spaceship2 = game.add.sprite(800, 300, claseDummy.sprite);

        claseDummy.weapon.trackSprite(spaceship2, 0, 0);
        claseDummy.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship2) + 90;
        claseDummy.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        claseDummy.weapon.bulletLifespan = 900;
        claseDummy.weapon.autofire = true;

        //Valores en pantalla (provisionales, para pruebas)
        text2 = game.add.text(0, 0, 'Health:'+clase.health,
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text2.fixedToCamera=true;

        text3 = game.add.text(0, 20, 'Speed:'+clase.maxSpeed,
        { font: "24px Arial", fill: "#ffffff", align: "center" });
        text3.fixedToCamera=true;

        

        //Como la barra es de 200 pixeles y tienen 200 de vida, el ancho de la barra es la vida que les queda 
        lf1.width=clase.health;

        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        game.physics.enable(spaceship2, Phaser.Physics.ARCADE);

        spaceship.body.immovable = true;
        spaceship2.body.immovable = true;

        //spaceship2.body.onCollide = new Phaser.Signal();
        //spaceship2.body.onCollide.add(recieveDMG, this);

        spaceship.anchor.setTo(0.5,0.5);
        spaceship2.anchor.setTo(0.5,0.5);

        spaceship2.rotation = -3.1415/2;

        game.camera.follow(spaceship);
        spaceship.body.collideWorldBounds=true;
        spaceship2.body.collideWorldBounds=true;

        //MINIMAPA
        minimap=game.add.sprite(600,50,'minimap');
        minimap.fixedToCamera=true;

    },

    update: function() {
        
        position=game.add.sprite(600+((spaceship.body.position.x)/15),50+((spaceship.body.position.y)/15),'position');
        position.fixedToCamera=true;
        position.lifespan=0.1;

        spaceship.rotation = game.physics.arcade.angleToPointer(spaceship);
        spaceship2.rotation = game.physics.arcade.angleBetween(spaceship2, spaceship);
      
        spaceship.body.acceleration.x = 0;
        spaceship.body.acceleration.y = 0;
        
        spaceship.body.maxVelocity.x = clase.maxSpeed;
        spaceship.body.maxVelocity.y = clase.maxSpeed;
        spaceship.body.drag.x = clase.drag;
        spaceship.body.drag.y = clase.drag;
        
        if(clase.health > 0){
            lf1.width = clase.health;
        } else{
            lf1.width = 0;
            //matar jugador
        }

        //COLISIONES
        game.physics.arcade.collide(spaceship2, clase.weapon.bullets, function(enemy, bullet){ bullet.kill(); claseDummy.DMG();});
        game.physics.arcade.collide(spaceship, claseDummy.weapon.bullets, function(enemy, bullet){ bullet.kill(); clase.DMG();});
        //game.physics.arcade.collide(spaceship2, clase.weapon.bullets);
        //game.physics.arcade.collide(spaceship, spaceship2);

        if (game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            spaceship.body.acceleration.y=clase.maxSpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            spaceship.body.acceleration.y=-clase.maxSpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            spaceship.body.acceleration.x=-clase.maxSpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            spaceship.body.acceleration.x=clase.maxSpeed;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q))
        {
            if(ultCharged){
                counter=0;
                ultiTime=0;
                ultused=true;
                clase.Ultimate();
            }
        }
        if (clase.fireButton.isDown){
            clase.weapon.fireAtPointer();

            //Disparo de escopeta para strategist
            if(classSelected == 3){
                for(var i = 0; i < 9; i++){
                    clase.weapon.fireAtPointer();
                }
            }
        }

        claseDummy.weapon.fireAtSprite(spaceship);

    },

    render: function(){
        clase.weapon.debug();
    }
}
