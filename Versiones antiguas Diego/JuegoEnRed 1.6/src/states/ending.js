Project.endingState = function(game) {

}

Project.endingState.prototype = {

    preload: function() {
        
    },

    create: function() {
        var s = game.add.sprite(0, 0, 'background');
        var text = "GAME OVER";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(250, 100, text, style);

        var play = game.add.sprite(300, 300, 'play');
        play.scale.setTo(0.5,0.5);
        play.inputEnabled = true;
        play.events.onInputDown.add(this.listener, this);
    },

    update: function() {

    },
    
    listener: function(){
        this.state.start('chooseState');
    }
    
}