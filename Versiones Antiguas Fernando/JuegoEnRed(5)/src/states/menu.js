Project.menuState = function(game) {

}

Project.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var s = game.add.sprite(0, 0, 'background');
   // var text = "Proyecto";
    //var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    var titulo=game.add.sprite(20,20,'titulo');

   // var t = game.add.text(0, 0, text, style);

   var play = game.add.sprite(130, 300, 'seleccionclase');
   s.scale.setTo(1.5,1);
   play.scale.setTo(0.7,0.7);
    play.inputEnabled = true;
   play.events.onInputDown.add(this.listener, this);

   var como = game.add.sprite(130, 400, 'comojugar');
   como.scale.setTo(0.7,0.7);
   como.inputEnabled=true;
   como.events.onInputDown.add(this.listener2, this);

    },

    update: function() {

    },
    

    listener: function(){
        this.state.start('chooseState');
    },
    
    listener2: function(){
        this.state.start('controlsState');
    }
}