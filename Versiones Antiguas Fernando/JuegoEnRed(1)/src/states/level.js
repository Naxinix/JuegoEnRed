Project.levelState = function(game) {

}


Project.levelState.prototype = {

    

    preload: function() {
        
    },

    create: function() {
         var s = game.add.sprite(0, 0, 'background');
         spaceship = game.add.sprite(0, 0, 'spaceship');

        game.physics.enable(spaceship, Phaser.Physics.ARCADE);

    },

    update: function() {
        
        spaceship.body.velocity.x = 0;
        spaceship.body.velocity.y = 0;
        spaceship.body.angularVelocity = 0;
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            spaceship.body.velocity.y=500;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            spaceship.body.velocity.y=-500;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            spaceship.body.velocity.x=-500;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            spaceship.body.velocity.x=500;
        }
      
     
}
}