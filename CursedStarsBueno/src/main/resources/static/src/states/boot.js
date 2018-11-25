var Project = {}

Project.bootState = function(game) {

}

Project.bootState.prototype = {

    preload: function() {
        game.load.spritesheet('loading','../assets/images/interface/loadingScreenSpriteSheet1.png',400,225,6);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('preloadState'); //pasar de un estado a otro
    },

    update: function() {

    }
}
