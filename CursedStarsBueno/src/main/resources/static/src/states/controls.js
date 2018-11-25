Project.controlsState = function(game) {

}

Project.controlsState.prototype = {

    preload: function() {
        
    },

    create: function() {

    var s = game.add.tileSprite(0, 0, 800,600, 'background');
    //s.scale.setTo(1.5,1);

    var volver=game.add.sprite(20, 540, 'volver');
    volver.scale.setTo(0.4,0.4);
    volver.inputEnabled=true;
    volver.events.onInputDown.add(this.listener, this);

    var objetivo = game.add.sprite(20, 20, 'objetivo');
    objetivo.scale.setTo(0.9,0.9);
    var controles = game.add.sprite(170, 300, 'controles');
    controles.scale.setTo(0.9,0.9);

},

    update: function() {

    },
    

    listener: function(){
        this.state.start('menuState');
    }
    


    
}
