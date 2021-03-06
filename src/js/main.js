'use strict';

var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'naapurinkauhu-game');

window.Utils = require('./utils');
window.playerState = {
    currentLevel: 'Game'
}

game.state.add('Boot', require('./states/boot'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('GameOver', require('./states/gameover'));
game.state.add('Game', require('./states/game'));

game.state.start('Boot');
