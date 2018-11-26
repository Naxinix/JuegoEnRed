Project.menuState = function(game) {

}

function start(){
    music.fadeIn(4000);
}

function overplay(){
    button.play();
    play2 = game.add.sprite(130, 300, 'seleccionclase');
    play2.scale.setTo(0.7,0.7);
}
function overcomo(){
    button.play();
    como2 = game.add.sprite(130, 400, 'comojugar');
    como2.scale.setTo(0.7,0.7);
}

function outplay(){
	if(play2!=null)
		play2.destroy();
}
function outcomo(){
	if(como2!=null)
		como2.destroy();
}

Project.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
	//se crea la animacion de fondo con las naves
    	createBackgroundAnimation();
    	
        var titulo=game.add.sprite(20,20,'titulo');
        tituloAnim=titulo.animations.add('tituloAnim');
        titulo.animations.play('tituloAnim',5,false);
        var play = game.add.sprite(130, 300, 'seleccionclase_noselec');
        var como = game.add.sprite(130, 400, 'comojugar_noselec');
        var play2=null;
        var como2=null;
        
       	play.scale.setTo(0.7,0.7);
        play.inputEnabled = true;
        play.events.onInputDown.add(this.listener, this);
        play.events.onInputOver.add(overplay, this);
        play.events.onInputOut.add(outplay,this);

        como.scale.setTo(0.7,0.7);
        como.inputEnabled=true;
        como.events.onInputDown.add(this.listener2, this);
        como.events.onInputOver.add(overcomo, this);
        como.events.onInputOut.add(outcomo, this);
        
        music = game.add.audio('menu');
        if(!sonando){
        music.onDecoded.add(start, this);
        sonando=true;
        }
        //music.play();
        button=game.add.audio('button');

    },

    update: function() {
    	updateAnim();
    },
    

    listener: function(){
        this.state.start('chooseState');
    },
    
    listener2: function(){
        this.state.start('controlsState');
    }
}
