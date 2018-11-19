/*
function createPlayer(callback, jugador) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/jugadores',
        data: JSON.stringify(jugador),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugador) {
        console.log("Player created: " + JSON.stringify(jugador));
        callback(jugador);
    })
}
*/

window.onbeforeunload = function(){
    if(game.state.current === 'matchingState'){
    	if(Project.jugador != undefined){ deletePlayer(CatCatcher.player.id); delete CatCatcher.player; }
    }
    if(game.state.current === 'levelState'){
    	if(CatCatcher.player != undefined){
    		deletePlayer(CatCatcher.player.id); delete CatCatcher.player;
    	}
    }
}

/*

function deletePlayer(playerId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8080/jugadores/' + playerId
    }).done(function (player) {
        console.log("Deleted player " + playerId)
    })
}
*/