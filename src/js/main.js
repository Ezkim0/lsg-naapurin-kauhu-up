'use strict';

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;

//var game = new Phaser.Game((h > w) ? h : w, (h > w) ? w : h, Phaser.AUTO, 'naapurinkauhu-game');
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'naapurinkauhu-game');
//var game = new Phaser.Game(w, h, Phaser.AUTO, 'naapurinkauhu-game');

window.Utils = require('./utils');
window.playerState = {
    currentLevel: 'Game'
}

game.state.add('Boot', require('./states/boot'));
//game.state.add('Splash', require('./states/splash'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Menu', require('./states/menu'));
game.state.add('GameOver', require('./states/gameover'));
game.state.add('Game', require('./states/game'));

game.state.start('Boot');
