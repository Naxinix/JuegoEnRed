Project.levelState = function(game) {

}

//TIPOS ORGANIZADOS EN CLASES
function Disrupter(){
    this.maxSpeed=400;
    this.drag=300;
    this.health=200;
    this.sprite='spaceship';

    //bullets
    this.weapon = game.add.weapon(60, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 30;
    this.weapon.bulletAngleVariance = 10; //dispersion
}

function Assault(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.sprite='arrow';

    //bullets
    this.weapon = game.add.weapon(60, 'bullet');
    this.weapon.bulletSpeed = 3000;
    this.weapon.fireRate = 120;
    this.weapon.bulletAngleVariance = 3; //dispersion
}

function Strategist(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.sprite='spaceship';

    //bullets
    this.weapon = game.add.weapon(10, 'bullet');
    this.weapon.bulletSpeed = 1000;
    this.weapon.fireRate = 0;
    this.weapon.bulletAngleVariance = 12; //dispersion
}

Project.levelState.prototype = {

   

    preload: function() {
        
    },


    create: function() {
    
        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);
        minimap=game.add.sprite(600,50,'minimap');
        
     
        minimap.fixedToCamera=true;
      
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

        //spaceship es el body, la nave generica
        spaceship = game.add.sprite(600, 300, clase.sprite);
        
        //propiedades comunes a las 3 naves
        clase.weapon.trackSprite(spaceship, 0, 0);
        clase.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship) + 90;
        clase.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        clase.weapon.bulletKillDistance = 1200;
        clase.fireButton = game.input.activePointer.leftButton;

        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        spaceship.anchor.setTo(0.5,0.5);
        game.camera.follow(spaceship);
        spaceship.body.collideWorldBounds=true;


/*
        //DUMMY
        claseDummy = new Assault();

        spaceship2 = game.add.sprite(400, 300, claseDummy.sprite);
        
        //propiedades comunes a las 3 naves
        clase.weapon.trackSprite(spaceship, 0, 0);
        clase.weapon.bulletAngleOffset = game.physics.arcade.angleToPointer(spaceship) + 90;
        clase.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        clase.weapon.bulletKillDistance = 1200;
        clase.fireButton = game.input.activePointer.leftButton;

        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        spaceship.anchor.setTo(0.5,0.5);
        game.camera.follow(spaceship);
        spaceship.body.collideWorldBounds=true;
*/

    },

    update: function() {
        
        position=game.add.sprite(600+((spaceship.body.position.x)/15),50+((spaceship.body.position.y)/15),'position');
        position.fixedToCamera=true;
        position.lifespan=0.1;

        spaceship.rotation = game.physics.arcade.angleToPointer(spaceship);

      
        spaceship.body.acceleration.x=0;
        spaceship.body.acceleration.y=0;

        
        spaceship.body.maxVelocity.x= clase.maxSpeed;
        spaceship.body.maxVelocity.y= clase.maxSpeed;
        spaceship.body.drag.x=clase.drag;
        spaceship.body.drag.y=clase.drag;
        
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

        if (clase.fireButton.isDown)
        {
            clase.weapon.fireAtPointer();
        }

},

//debug para ver las stats de las balas
render: function() {
    clase.weapon.debug();
}

/*
destroySprite: function(sprite){
spite.destroy;
}
*/
  

}
