Project.menuState = function(game) {

}

Project.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
    var s = game.add.sprite(0, 0, 'background');
    var text = "Proyecto";
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    var t = game.add.text(game.world.centerX-200, game.world.centerY-100, text, style);

   var play = game.add.sprite(game.world.centerX, game.world.centerY, 'play');
   s.scale.setTo(1.5,1);
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