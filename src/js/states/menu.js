var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    var x = this.game.width / 2
      , y = this.game.height / 2;

    this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Naapurinkauhu' );
    this.titleTxt.align = 'center';
    this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

    this.startTxt = this.add.bitmapText(x, y + this.titleTxt.height + 5, 'minecraftia', 'Press screen to start');
    this.startTxt.align = 'center';
    this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

    this.input.onDown.add(this.onDown, this);
  },

  update: function () {

  },

  onDown: function () {
    this.game.state.start('Game');
    //this.game.scale.startFullScreen();
  }
};
