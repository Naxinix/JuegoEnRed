Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
        game.load.image('background','../assets/images/background.jpg');
        game.load.image('play','../assets/images/interface/play.png');
        game.load.image('spaceship','../assets/images/sprites/spaceship.png');
        game.load.image('selected','../assets/images/sprites/selected.png');
        game.load.image('arrow','../assets/images/sprites/arrow.png');
        game.load.image('minimap','../assets/images/interface/Minimap.jpg');
        game.load.image('position','../assets/images/sprites/position.jpg');
        game.load.image('lf1','../assets/images/interface/lifebar1.jpg');
        game.load.image('lf2','../assets/images/interface/lifebar2.jpg');
        game.load.image('bullet','../assets/images/sprites/bullet.png');
        game.load.image('blackhole','../assets/images/sprites/blackhole.png');
        game.load.image('blackhole2','../assets/images/sprites/blackhole2.png');
        game.load.image('polvoEstelarAzul','../assets/images/sprites/polvoEstelarAzul.png');
        game.load.image('polvoEstelarVerde','../assets/images/sprites/polvoEstelarVerde.png');
        game.load.image('polvoEstelarAmarillo','../assets/images/sprites/polvoEstelarAmarillo.png');
        game.load.spritesheet('lootShip','../assets/images/sprites/LootSpriteSheet.png',192,128,2);
        game.load.image('lootShipIcon','../assets/images/sprites/lootShipIcon.png');
        game.load.image('mark','../assets/images/interface/mark.png');
        game.load.image('ultimate','../assets/images/interface/ultimate.jpg');
        game.load.image('graviton','../assets/images/sprites/graviton.png');
        game.load.spritesheet('disrupter','../assets/images/sprites/DisrupterSpriteSheet.png',96,64,5);
        game.load.spritesheet('assault','../assets/images/sprites/AssaultSpriteSheet.png',96,64,2);
        game.load.image('strategist','../assets/images/sprites/spaceship.png');
        game.load.image('area','../assets/images/interface/area.png');
        game.load.image('area2','../assets/images/interface/area2.jpg');
        game.load.image('info','../assets/images/interface/info.png');
        game.load.image('select','../assets/images/interface/select.png');
        game.load.image('playselected','../assets/images/interface/playselected.png');
        game.load.image('playnoselected','../assets/images/interface/playnoselected.png');
        game.load.image('seleccionclase','../assets/images/interface/seleccionclase.png');
        game.load.image('comojugar','../assets/images/interface/comojugar.png');
        game.load.image('volver','../assets/images/interface/volver.jpg');
        game.load.image('disrupterinfo','../assets/images/interface/disrupterinfo.jpg');
    },

    create: function() {
        
        this.state.start('menuState');
    },

    update: function() {

    }
}