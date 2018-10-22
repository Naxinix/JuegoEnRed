Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
        game.load.image('background','../assets/images/background.jpg');
        game.load.image('play','../assets/images/play.png');
        game.load.image('spaceship','../assets/images/spaceship.png');
        game.load.image('assault','../assets/images/spaceship.png');
        game.load.image('selected','../assets/images/selected.jpg');
        game.load.image('arrow','../assets/images/arrow.png');
        game.load.image('minimap','../assets/images/Minimap.jpg');
        game.load.image('position','../assets/images/position.jpg');
        game.load.image('bullet', '../assets/images/bullet.png');

    },

    create: function() {
        
        this.state.start('menuState');
    },

    update: function() {

    }
}