game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')


game.state.add('bootState', Project.bootState)
game.state.add('preloadState', Project.preloadState)
game.state.add('menuState', Project.menuState)
game.state.add('controlsState', Project.controlsState)
game.state.add('chooseState', Project.chooseState)
game.state.add('matchingState', Project.matchingState)
game.state.add('levelState', Project.levelState)
game.state.add('endingState', Project.endingState)
  
game.state.start('bootState')
