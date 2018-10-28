Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
        game.load.image('background','../assets/images/background.jpg');
        //game.load.image('play','../assets/images/play.png');
        game.load.image('spaceship','../assets/images/spaceship.png');
        game.load.image('assault','../assets/images/spaceship.png');
        game.load.image('selected','../assets/images/selected.jpg');
        game.load.image('arrow','../assets/images/arrow.png');
        game.load.image('minimap','../assets/images/Minimap.jpg');
        game.load.image('position','../assets/images/position.jpg');
        game.load.image('lf1','../assets/images/lifebar1.jpg');
        game.load.image('lf2','../assets/images/lifebar2.jpg');
        game.load.image('bullet','../assets/images/bullet.png');
        game.load.image('blackhole','../assets/images/blackhole.png');
        game.load.image('blackhole2','../assets/images/blackhole2.png');
        game.load.image('graviton','../assets/images/graviton.png');
        game.load.image('ultimate','../assets/images/ultimate.jpg');
        game.load.image('mark','../assets/images/mark.png');
        game.load.image('lootShipIcon','../assets/images/lootShipIcon.png');
        game.load.image('lootShip','../assets/images/lootShip.png');
        game.load.image('area','../assets/images/area.png');
        game.load.image('area2','../assets/images/area2.jpg');
        game.load.image('info','../assets/images/info.png');
        game.load.image('select','../assets/images/select.png');
        game.load.image('playselected','../assets/images/playselected.png');
        game.load.image('playnoselected','../assets/images/playnoselected.png');
        game.load.image('seleccionclase','../assets/images/seleccionclase.png');
        game.load.image('comojugar','../assets/images/comojugar.png');
        game.load.image('volver','../assets/images/volver.jpg');
        game.load.image('disrupterinfo','../assets/images/disrupterinfo.jpg');
        game.load.image('assaultInfo','../assets/images/assaultInfo.jpg');
        game.load.image('strategistInfo','../assets/images/strategistInfo.jpg');
        game.load.image('reintentar','../assets/images/reintentar.jpg');
        game.load.image('salir','../assets/images/salir.jpg');
        game.load.image('gameover','../assets/images/gameover.png');
        game.load.image('controles','../assets/images/controles.jpg');
        game.load.image('objetivo','../assets/images/objetivo.jpg');
        game.load.image('titulo','../assets/images/titulo.png');



   


    },

    create: function() {
        
        this.state.start('menuState');
    },

    update: function() {

    }
}