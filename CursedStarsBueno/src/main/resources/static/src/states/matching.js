Project.matchingState = function(game){
    
}

var n_jugadores;
Project.matchingState.prototype = {

    preload: function() {
    	
    },
    
    create: function() {
    	pFoundSprite = 'playersFound0';
    	playersFound = game.add.sprite(300,100,pFoundSprite);
    	playersFound.scale.setTo(0.1,0.1);
    	
    	createPlayer();
    	createWorld();
    	text = game.add.text(250,50,"Esperando jugadores:",{ font: "px Arial", fill: "#ffffff", align: "center", fontSize: "30px"});
    },
    
    update: function() {
    	console.log(pFoundSprite);
    	playersFound.loadTexture(pFoundSprite,0);
		
    	getNumPlayers(function (numPlayers) {
    		switch(numPlayers.length){
	    		case 0:
	    			pFoundSprite = 'playersFound0';
	    			break;
	    		case 1:
	    			pFoundSprite = 'playersFound1';
	    			break;
	    		case 2:
	    			pFoundSprite = 'playersFound2';
	    			
	    			console.log ('##### COMIENZA EL JUEGO #####');
					game.state.start('levelState');
					
	    			break;
	    		default:
	    			break;
    		}
		});
    
    }
   
}
