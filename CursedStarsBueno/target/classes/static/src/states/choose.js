Project.chooseState = function(game) {

}
var d;
function p(pointer) {
    console.log(pointer.event);
}

Project.chooseState.prototype = {

    preload: function() {
        
    },

    create: function() {
        classSelected = 0;
        classSelected2 = 0;
        var s = game.add.sprite(0, 0, 'background');
        s.scale.setTo(1.5,1);
        var t = game.add.sprite(40,0,'select');
        disrupterInfo=game.add.sprite(230, 100, 'disrupterinfo');
        game.physics.enable(disrupterInfo, Phaser.Physics.ARCADE);
        
        assaultInfo=game.add.sprite(230, 100, 'assaultInfo');
        game.physics.enable(assaultInfo, Phaser.Physics.ARCADE);

        strategistInfo=game.add.sprite(230, 100, 'strategistInfo');
        game.physics.enable(strategistInfo, Phaser.Physics.ARCADE);
        
        disrupterInfo.visible=false;
        assaultInfo.visible=false;
        strategistInfo.visible=false;

        var volver=game.add.sprite(20, 540, 'volver');
        volver.scale.setTo(0.4,0.4);
        volver.inputEnabled = true;
        volver.events.onInputDown.add(this.listenervolver, this);

        disrupter = game.add.sprite(120, 200, 'selectedDisrupter');
        assault = game.add.sprite(370, 200, 'selectedAssault');
        strategist = game.add.sprite(620, 200, 'selectedStrategist');
        playButton = game.add.sprite(300, 500, 'playnoselected');
        infoDisrupter= game.add.sprite(20, 180, 'info');
        infoAssault= game.add.sprite(270, 180, 'info');
        infoStrategist= game.add.sprite(520, 180, 'info');
        


        infoDisrupter.inputEnabled=true;
        infoAssault.inputEnabled=true;
        infoStrategist.inputEnabled=true;
        game.input.addMoveCallback(p, this);


        playButtonClickable = null;
        assaultSelected = null;
        disrupterSelected = null;
        strategistSelected = null;

        disrupter.inputEnabled = true;
        disrupter.events.onInputDown.add(this.listener1, this);
        disrupter.anchor.setTo(0.3,0.3);

        assault.inputEnabled = true;
        assault.events.onInputDown.add(this.listener2, this);
        assault.anchor.setTo(0.3,0.3);

        strategist.inputEnabled = true;
        strategist.events.onInputDown.add(this.listener3, this);
        strategist.anchor.setTo(0.3,0.3);

        playButton.scale.setTo(0.7,0.7);
    },

    update: function() {
        if(playButtonClickable == null && classSelected != 0){
            playButtonClickable = game.add.sprite(300, 500, 'playselected');
            playButtonClickable.scale.setTo(0.7,0.7);
            playButtonClickable.inputEnabled = true;
            playButtonClickable.events.onInputDown.add(this.listenerout, this);
        }

        if(infoDisrupter.input.pointerOver()){
            infoDisrupter.alpha=1;
            game.world.bringToTop(disrupterInfo);
            disrupterInfo.visible=true;
        }else{
            infoDisrupter.alpha=0.5;
            disrupterInfo.visible=false;
        }

        if(infoAssault.input.pointerOver()){
            infoAssault.alpha=1;
            game.world.bringToTop(assaultInfo);
            assaultInfo.visible=true;
        }else{
            infoAssault.alpha=0.5;
            assaultInfo.visible=false;
        }

        if(infoStrategist.input.pointerOver()){
            infoStrategist.alpha=1;
            game.world.bringToTop(strategistInfo);
            strategistInfo.visible=true;
        }else{
            infoStrategist.alpha=0.5;
            strategistInfo.visible=false;
        }
    },

    listener1: function () {
        this.destroyOthers();
        classSelected = 1;
        disrupter.scale.setTo(1.25,1.25);
    },

    listener2: function () {
        this.destroyOthers();
        classSelected = 2;
        assault.scale.setTo(1.25,1.25);
    },

    listener3: function () {
        this.destroyOthers();
        classSelected = 3;
        strategist.scale.setTo(1.25,1.25);
    },

    listenerout: function() {
        this.state.start('matchingState');
    },

    listenervolver: function(){
        this.state.start('menuState');
    },

    destroyOthers: function() {
        assault.scale.setTo(1.0,1.0);
        disrupter.scale.setTo(1.0,1.0);
        strategist.scale.setTo(1.0,1.0);
    }
}
