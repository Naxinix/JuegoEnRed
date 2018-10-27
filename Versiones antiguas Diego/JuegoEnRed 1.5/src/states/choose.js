Project.chooseState = function(game) {

}

Project.chooseState.prototype = {

    preload: function() {
        
    },

    create: function() {
        classSelected = 0;
        var s = game.add.sprite(0, 0, 'background');
        s.scale.setTo(1.75,1.75);
        var text = "SELECT YOUR CLASS";
        var style = { font: "px Arial", fill: "#ff0044", align: "center", fontSize: "30px"};
        var t = game.add.text(game.world.centerX-150, game.world.centerY-200, text, style);

        assault = game.add.sprite(game.world.centerX-350, game.world.centerY-100, 'assault');
        disrupter = game.add.sprite(game.world.centerX-100, game.world.centerY-100, 'assault');
        strategist = game.add.sprite(game.world.centerX+150, game.world.centerY-100, 'assault');
        playButton = game.add.sprite(game.world.centerX-100, game.world.centerY+200, 'assault');

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

        playButton.scale.setTo(0.3,0.3);
    },

    update: function() {
        if(playButtonClickable == null && classSelected != 0){
            playButtonClickable = game.add.sprite(game.world.centerX-100, game.world.centerY+200, 'selected');
            playButtonClickable.scale.setTo(0.3,0.3);
            playButtonClickable.inputEnabled = true;
            playButtonClickable.events.onInputDown.add(this.listenerout, this);
        }
    },

    listener1: function () {
        this.destroyOthers();
        classSelected = 1;
        assaultSelected = game.add.sprite(game.world.centerX-350, game.world.centerY-100, 'selected');
        assaultSelected.scale.setTo(0.3,0.3);
    },

    listener2: function () {
        this.destroyOthers();
        classSelected = 2;

        disrupterSelected = game.add.sprite(game.world.centerX-100, game.world.centerY-100, 'selected');
            
        disrupterSelected.scale.setTo(0.3,0.3);
    },

    listener3: function () {
        this.destroyOthers();
        classSelected = 3;

        strategistSelected = game.add.sprite(game.world.centerX+150, game.world.centerY-100, 'selected');

        strategistSelected.scale.setTo(0.3,0.3);
    },

    listenerout: function() {
        this.state.start('levelState');
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