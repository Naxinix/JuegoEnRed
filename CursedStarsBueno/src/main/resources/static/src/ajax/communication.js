window.onbeforeunload = function(){
    if(game.state.current === 'matchingState'){
    	if(Project.jugador != undefined){
    		deletePlayer(Project.player.id); delete Project.player;
    	}
    }
    if(game.state.current === 'levelState'){
    	if(Project.player != undefined){
    		deletePlayer(Project.player.id); delete Project.player;
    	}
    }
}


//FUNCIONES DE JUGADOR
function getNumPlayers(callback) {
    $.ajax({
    	method: "GET",
        url: 'http://10.0.4.144:8080/jugadores',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        callback(data);
    })
}

function createPlayer() {
    $.ajax({
        method: "POST",
        url: 'http://10.0.4.144:8080/jugadores',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (data) {
        console.log("Player created: " + JSON.stringify(data));
        game.player1 = data;
    })
}

function putPlayer() {
	game.player1.classS = classSelected;
	if (typeof spaceshipParent !== 'undefined' && typeof spaceshipParent[0] !== 'undefined'){
		game.player1.x = spaceshipParent[0].x;
    	game.player1.y = spaceshipParent[0].y;
    	game.player1.rot= spaceship[0].rotation;
    	game.player1.disparando= clase.fireButton.isDown;
    	game.player1.alive= clase.alive;
    }
    $.ajax({
        method: "PUT",
        url: 'http://10.0.4.144:8080/jugadores/' + game.player1.id,
        data: JSON.stringify(game.player1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
    	//console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
    })
}

function getPlayer(callback) {
    $.ajax({
        method: "GET",
        url: 'http://10.0.4.144:8080/jugadores/' + game.player2.id,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.player2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
}


function deletePlayer(playerId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://10.0.4.144:8080/jugadores/' + playerId
    }).done(function (player) {
        console.log("Deleted player " + playerId)
    })
}

//FUNCIONES DE MUNDO
function createWorld() {
    $.ajax({
        method: "POST",
        url: 'http://10.0.4.144:8080/mundo',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        },
    }).done(function (data) {
        console.log("World created: " + JSON.stringify(data));
        game.world1 = data;
    })
}

function putWorld() {
	game.world1.polvoPos=polvo;
	game.world1.bhPos=bh;
    
    $.ajax({
        method: "PUT",
        url: 'http://10.0.4.144:8080/mundo',
        data: JSON.stringify(game.world1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
    	//console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
    })
}

function getWorld(callback) {
    $.ajax({
        method: "GET",
        url: 'http://10.0.4.144:8080/mundo',
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.world1 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
    
}



