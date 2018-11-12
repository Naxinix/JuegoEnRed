Project.menuState = function(game) {

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

        como.scale.setTo(0.7,0.7);
        como.inputEnabled = true;
        como.events.onInputDown.add(this.listener2, this);

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
