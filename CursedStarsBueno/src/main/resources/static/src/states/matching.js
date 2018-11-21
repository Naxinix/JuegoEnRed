Project.matchingState = function(game){
    
}

//var user;
var n_jugadores;
Project.matchingState.prototype = {

    preload: function() {
    },

    create: function() {
    	
    	createPlayer();
    	createWorld();
   
    },

    update: function() {
    	
    	getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
			}
		});
    
    }
   
}

