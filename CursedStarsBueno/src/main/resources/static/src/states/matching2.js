Project.matching2State = function(game){
    
}

Project.matching2State.prototype = {

    preload: function() {
    	
    },
    
    create: function() {
    	countdown = 3;
    	pFoundSprite = 'playersFound2';
    	playersFound = game.add.sprite(300,400,pFoundSprite);
    	playersFound.scale.setTo(0.1,0.1);
    	
    	dataworld ={
    			type: 'WORLD'
  	  	}
      	
  	  	ws.send(JSON.stringify(dataworld))
  	  	
    	text = game.add.text(320,100,countdown,{ font: "px Arial", fill: "#ffffff", align: "center", fontSize: "250px"});
    	
    	game.time.events.loop(Phaser.Timer.SECOND, function() { countdown--; }, this);
    	game.time.events.add(Phaser.Timer.SECOND * countdown, function(){ game.state.start('levelState'); }, this);
    },
    
    update: function() {
    	text.setText(countdown);
    	
    	playersFound.loadTexture(pFoundSprite,0);
    	
    	switch(n_jugadores){
    		case 0:
    			pFoundSprite = 'playersFound0';
    			break;
    		case 1:
    			pFoundSprite = 'playersFound1';
    			break;
    		case 2:
    			pFoundSprite = 'playersFound2';
    			break;
    		default:
    			break;
		}
    }
}
