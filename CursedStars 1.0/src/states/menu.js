Project.menuState = function(game) {

}
function start(){
    music.fadeIn(4000);
}

function overplay(){
    button.play();
}
function overcomo(){
    button.play();
}

Project.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
        createBackgroundAnimation();

        //var s = game.add.sprite(0, 0, 'background');
        var titulo = game.add.sprite(20,20,'titulo');
        var play = game.add.sprite(130, 300, 'seleccionclase');
        var como = game.add.sprite(130, 400, 'comojugar');
        
        //s.scale.setTo(1.5,1);
        play.scale.setTo(0.7,0.7);
        play.inputEnabled = true;
        play.events.onInputDown.add(this.listener, this);
        play.events.onInputOver.add(overplay, this);

        como.scale.setTo(0.7,0.7);
        como.inputEnabled = true;
        como.events.onInputDown.add(this.listener2, this);
               como.events.onInputOver.add(overcomo, this);

        music = game.add.audio('menu');
        if(!sonando){
        music.onDecoded.add(start, this);
        sonando=true;

    },

    update: function() {
        updateAnim();
    },
    

    listener: function(){
        this.state.start('chooseState');
    },
    
    listener2: function(){
        this.state.start('controlsState');
    }
}
