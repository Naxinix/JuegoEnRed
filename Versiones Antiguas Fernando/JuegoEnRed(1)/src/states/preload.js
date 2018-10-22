Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
        game.load.image('background','../assets/images/background.jpg');
        game.load.image('play','../assets/images/play.png');
        game.load.image('spaceship','../assets/images/spaceship.jpg');

    },

    create: function() {
        
        this.state.start('menuState');
    },

    update: function() {

    }
}