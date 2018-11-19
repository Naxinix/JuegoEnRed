Project.matchingState = function(game){
    
}

//var user;
var n_jugadores;
Project.matchingState.prototype = {

    preload: function() {
    },

    create: function() {
    	
    	this.createPlayer();
    	/*
    	$.ajax({
    		method : "POST",
    		url : 'http://localhost:8080/jugadores',
    		data: {id:0},
    		processData : false,
    		headers : {
    			"Content-Type" : "application/json"
    		}
    	}).done(function(jugador) {
    		 console.log("Player created");
    	});
    	
    	
        text = "Esperando jugadores..\nJugadores en lobby: "
        style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
        spr_text = game.add.text(300, 50, text, style);
        
        
        Project.jugador={
        		id:0
        };
        
        if (Project.jugador != undefined) {
            createPlayer( function(jugadorId){
            	Project.jugador.id = jugadorId;
            }, Project.jugador);
        */    
    
        
        
       
    },

    update: function() {
    	/*
        if(n_jugadores){n_jugadores.destroy()};
    	$.ajax({
    		method : "GET",
    		url : 'http://localhost:8080/jugadores',
    		processData : false,
    		headers : {
    			"Content-Type" : "application/json"
    		}
    	}).done(function(jugadores) {
    		text=jugadores;
    	    //style2 = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
    	    //texted= game.add.text(300, 60, text2, style2);
    		console.log("Numero actual de jugadores: " + jugadores);
    		// Jugador 1
    	});
    		if (text == 2) {
    			this.state.start('levelState');
    		}
    	
        style = { font: "40px Times New Roman", fill: "#FFFFFF", align: "center" };
        n_jugadores = game.add.text(300, 100, text, style);
        */
    	this.getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
			}
		});
    
    },
    
    getNumPlayers: function (callback) {
        $.ajax({
            url: 'http://localhost:8080/jugadores',
        }).done(function (data) {
            callback(data);
        })
    },
    
    createPlayer: function () {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/jugadores',
            processData: false,
            headers: {
                "Content-Type": "application/json"
            },
        }).done(function (data) {
            console.log("Player created: " + JSON.stringify(data));
           game.player1 = data
        })
    }
}

