Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
        game.load.image('background','../assets/images/background.jpg');
        game.load.image('play','../assets/images/play.png');
        game.load.image('spaceship','../assets/images/spaceship.png');
        game.load.image('assault','../assets/images/spaceship.png');
        game.load.image('selected','../assets/images/selected.png');
        game.load.image('arrow','../assets/images/arrow.png');
        game.load.image('minimap','../assets/images/Minimap.jpg');
        game.load.image('position','../assets/images/position.jpg');
        game.load.image('lf1','../assets/images/lifebar1.jpg');
        game.load.image('lf2','../assets/images/lifebar2.jpg');
        game.load.image('bullet','../assets/images/bullet.png');
        game.load.image('blackhole','../assets/images/blackhole.png');
        game.load.image('blackhole2','../assets/images/blackhole2.png');
        game.load.image('lootShip','../assets/images/lootShip.png');
        game.load.image('lootShipIcon','../assets/images/lootShipIcon.png');
        game.load.image('mark','../assets/images/mark.png');
        game.load.image('ultimate','../assets/images/ultimate.jpg');
        game.load.image('graviton','../assets/images/graviton.png');
    },

    create: function() {
        
        this.state.start('menuState');
    },

    update: function() {

    }
}