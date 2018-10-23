var Project = {}

Project.bootState = function(game) {

}

Project.bootState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('preloadState'); //pasar de un estado a otro
    },

    update: function() {

    }
}