Project.preloadState = function(game) {

}

Project.preloadState.prototype = {

    preload: function() {
    	var l=game.add.sprite(game.world.centerX-150, game.world.centerY-112, 'loading');
    	idle = l.animations.add('idle');
    	l.animations.play('idle',5,true);
    	
    	
        game.load.image('background','../assets/images/background.jpg');
        game.load.image('minimap','../assets/images/interface/Minimap.jpg');
        game.load.image('marco_minimap','../assets/images/interface/marco_minimap.jpg');
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
        game.load.spritesheet('strategist','../assets/images/sprites/StrategistSpriteSheet.png',96,64,2);
        game.load.image('assault_static','../assets/images/sprites/assault_static.png');
        game.load.image('strategist_static','../assets/images/sprites/strategist_static.png');
        game.load.image('disrupter_static','../assets/images/sprites/disrupter_static.png');
        game.load.spritesheet('warning','../assets/images/interface/warning_ss.png',100,20,3);
        game.load.image('area','../assets/images/sprites/area.png');
        game.load.image('area2','../assets/images/sprites/area2.jpg');
        game.load.image('bomb','../assets/images/sprites/bomb.png');
        game.load.spritesheet('bomb_anim','../assets/images/sprites/bomb_anim.png',32,32,2);
        game.load.image('info','../assets/images/interface/info.png');
        game.load.image('select','../assets/images/interface/select.png');
        game.load.image('playselected','../assets/images/interface/playselected.png');
        game.load.image('playnoselected','../assets/images/interface/playnoselected.png');
        game.load.image('seleccionclase','../assets/images/interface/seleccionclase.png');
        game.load.image('comojugar','../assets/images/interface/comojugar.png');
        game.load.image('seleccionclase_noselec','../assets/images/interface/seleccionclase_noselec.png');
        game.load.image('comojugar_noselec','../assets/images/interface/comojugar_noselec.png');
        game.load.image('volver','../assets/images/interface/volver.jpg');
        game.load.image('disrupterinfo','../assets/images/interface/disrupterinfo.jpg');
        game.load.image('assaultInfo','../assets/images/interface/assaultInfo.jpg');
        game.load.image('strategistInfo','../assets/images/interface/strategistInfo.jpg');
        game.load.image('reintentar','../assets/images/interface/reintentar.jpg');
        game.load.image('salir','../assets/images/interface/salir.jpg');
        game.load.image('reintentar_noselec','../assets/images/interface/reintentar_noselec.jpg');
        game.load.image('salir_noselec','../assets/images/interface/salir_noselec.jpg')
        game.load.image('gameover','../assets/images/interface/gameover.png');
        game.load.image('controles','../assets/images/interface/controles.jpg');
        game.load.image('objetivo','../assets/images/interface/objetivo.jpg');
        game.load.spritesheet('titulo','../assets/images/interface/tituloSpriteSheet.png',720,300,7);
        game.load.image('chargePU','../assets/images/interface/chargePU.png');
        game.load.image('speedBoostPU','../assets/images/interface/speedBoostPU.png');
        game.load.image('chargePUOn','../assets/images/interface/chargePUOn.png');
        game.load.image('speedBoostPUOn','../assets/images/interface/speedBoostPUOn.png');
        game.load.image('selectedDisrupter','../assets/images/sprites/SelectedDisrupter.png');
        game.load.image('selectedAssault','../assets/images/sprites/SelectedAssault.png');
        game.load.image('selectedStrategist','../assets/images/sprites/selectedStrategist.png');
        game.load.image('reaper','../assets/images/sprites/reaper.png');
        game.load.image('lucio','../assets/images/sprites/lucio.png');
        game.load.image('hammond','../assets/images/sprites/hammond.png');
        game.load.image('victoria','../assets/images/interface/victoria.png');
        game.load.spritesheet('hit','../assets/images/sprites/hit.png',330,418,2);
        game.load.image('playersFound0','../assets/images/interface/playersFound0.png');
        game.load.image('playersFound1','../assets/images/interface/playersFound1.png');
        game.load.image('playersFound2','../assets/images/interface/playersFound2.png');
        game.load.audio('menu', '../assets/audio/menu.mp3');
        game.load.audio('button', '../assets/audio/button.mp3');
        game.load.audio('beamm', '../assets/audio/beamm.mp3');
        game.load.audio('victoria', '../assets/audio/victoria.mp3');
        game.load.audio('derrota', '../assets/audio/derrota.mp3');
        game.load.audio('ultiassault', '../assets/audio/ultiassault.mp3');
        game.load.audio('ultistrat', '../assets/audio/ultistrat.mp3');
        game.load.audio('ultimate_ready', '../assets/audio/ultimate_ready.mp3');
        game.load.audio('musica_level', '../assets/audio/musica_level.mp3');
        game.load.audio('alarm', '../assets/audio/alarm.mp3');
        game.load.audio('fuel', '../assets/audio/fuel.mp3');
        game.load.audio('explosion', '../assets/audio/explosion.mp3');
        
    },

    create: function() {
    	sonando=false;
        this.state.start('menuState');
    },

    update: function() {

    }
}
