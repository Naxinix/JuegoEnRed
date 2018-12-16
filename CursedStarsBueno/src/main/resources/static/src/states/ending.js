Project.endingState = function(game) {

}

Project.endingState.prototype = {

    preload: function() {
        
    },

    create: function() {/*
    if(Project.player1!=undefined){
    deletePlayer(Project.player1.id);
    delete Project.player1;
    }
    	*/
    var s = game.add.sprite(0, 0, 'background');
    s.scale.setTo(1.5,1);
  //  var sonidofinal;
    musica_level.stop();

   if(!win){
   var gameover = game.add.sprite(40, 50, 'gameover');
   sonidofinal=game.add.audio('derrota');
   sonidofinal.play();
   }else{
   var victoria = game.add.sprite(40, 50, 'victoria');   
   sonidofinal=game.add.audio('victoria');
   sonidofinal.play();
   }
   var reintentar=game.add.sprite(270,250,'reintentar');
   var salir=game.add.sprite(270, 350, 'salir');

   reintentar.scale.setTo(0.7,0.7);
   salir.scale.setTo(0.7,0.7);

   reintentar.inputEnabled=true;
   salir.inputEnabled=true;

   reintentar.events.onInputDown.add(this.listener2, this);
   salir.events.onInputDown.add(this.listener, this);
   


    },

    update: function() {

    },
    

    listener: function(){
    	sonidofinal.stop();
        this.state.start('menuState');
    },

    listener2: function(){
    	sonidofinal.stop();
        this.state.start('chooseState');
    }
    
    
}
