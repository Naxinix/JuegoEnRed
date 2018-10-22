Project.levelState = function(game) {

}

//TIPOS ORGANIZADOS EN CLASES
function Disrupter(){
    this.maxSpeed=400;
    this.drag=300;
    this.health=200;
    this.sprite='spaceship';

}

function Assault(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.sprite='arrow';
}

function Strategist(){
    this.maxSpeed=200;
    this.drag=100;
    this.health=200;
    this.sprite='spaceship';
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

        //spaceship es el body, la nave generica
        spaceship = game.add.sprite(400, 300, clase.sprite);
         
   

        game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        spaceship.anchor.setTo(0.5,0.5);
        game.camera.follow(spaceship);
        spaceship.body.collideWorldBounds=true;

    },

    update: function() {
        
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
     
}
}