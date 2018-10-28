Project.chooseState = function(game) {

}
var d;
function p(pointer) {

    // console.log(pointer.);
    console.log(pointer.event);

}

Project.chooseState.prototype = {

    preload: function() {
        
    },

    create: function() {
        classSelected = 0;
        var s = game.add.sprite(0, 0, 'background');
        s.scale.setTo(1.5,1);
      //  var text = "SELECT YOUR CLASS";
        //var style = { font: "px Arial", fill: "#ff0044", align: "center", fontSize: "30px"};
        var t = game.add.sprite(40,0,'select');
       // d= game.add.text(game.world.centerX-200, game.world.centerY-100, "me perdonas", { font: "65px Arial", fill: "#ff0044", align: "center" });
        //game.physics.enable(d, Phaser.Physics.ARCADE);
        //d.visible=false;
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
        volver.inputEnabled=true;
        volver.events.onInputDown.add(this.listenervolver, this);

        assault = game.add.sprite(50, 200, 'assault');
        disrupter = game.add.sprite(200, 200, 'assault');
        strategist = game.add.sprite(550, 200, 'assault');
        playButton = game.add.sprite(300, 500, 'playnoselected');
        infoDisrupter= game.add.sprite(20, 180, 'info');
        infoAssault= game.add.sprite(170, 180, 'info');
        infoStrategist= game.add.sprite(530,180, 'info');
        


        infoDisrupter.inputEnabled=true;
        infoAssault.inputEnabled=true;
        infoStrategist.inputEnabled=true;
        game.input.addMoveCallback(p, this);


        playButtonClickable = null;
        assaultSelected = null;
        disrupterSelected = null;
        strategistSelected = null;

        assault.scale.setTo(0.3,0.3);
        assault.inputEnabled = true;
        assault.events.onInputDown.add(this.listener1, this);

        disrupter.scale.setTo(0.3,0.3);
        disrupter.inputEnabled = true;
        disrupter.events.onInputDown.add(this.listener2, this);

        strategist.scale.setTo(0.3,0.3);
        strategist.inputEnabled = true;
        strategist.events.onInputDown.add(this.listener3, this);

        playButton.scale.setTo(0.7,0.7);
       // playButton.scale.setTo(5,5);
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
        assaultSelected = game.add.sprite(50, 200, 'selected');
        assaultSelected.scale.setTo(0.3,0.3);
    },

    listener2: function () {
        this.destroyOthers();
        classSelected = 2;

        disrupterSelected = game.add.sprite(300, 200, 'selected');
            
        disrupterSelected.scale.setTo(0.3,0.3);
    },

    listener3: function () {
        this.destroyOthers();
        classSelected = 3;

        strategistSelected = game.add.sprite(550, 200, 'selected');

        strategistSelected.scale.setTo(0.3,0.3);
    },

    listenerout: function() {
        this.state.start('levelState');
    },

    listenervolver: function(){
        this.state.start('menuState');
    },

    destroyOthers: function() {
        if(assaultSelected != null)
            assaultSelected.kill();
        if(disrupterSelected != null)
            disrupterSelected.kill();
        if(strategistSelected != null)
            strategistSelected.kill();
    }
}