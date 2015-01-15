var Gameover = function () {};

module.exports = Gameover;

Gameover.prototype = {

  create: function () {
    var x = this.game.width / 2
      , y = this.game.height / 2;

    this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Killed: ' + this.game.enemyKilled );
    this.titleTxt.align = 'center';
    this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

    //y = y + this.titleTxt.height + 5;
    this.startTxt = this.add.bitmapText(x, y + 50, 'minecraftia', 'GAME OVER');
    this.startTxt.align = 'center';
    this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;
    
    this.input.onDown.add(this.onDown, this);
  },

  update: function () {

  },

  onDown: function () {
    this.game.state.start('Menu');
    //this.game.state.start('Gameover');
  }
};
