var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    var x = this.game.width / 2
      , y = this.game.height / 2;

    
    this.logoText = this.add.bitmapText(x, y - 200, 'minecraftia', 'LSG', 164 );
    this.logoText.align = 'center';
    this.logoText.x = this.game.width / 2 - this.logoText.textWidth / 2;

    this.desciptionTxt = this.add.bitmapText(x, y + 10, 'minecraftia', 'LITTLE SHITTY GAMES', 27 );
    this.desciptionTxt.align = 'center';
    this.desciptionTxt.x = this.game.width / 2 - this.desciptionTxt.textWidth / 2;

    this.titleTxt = this.add.bitmapText(x, y + 100, 'minecraftia', 'Naapurinkauhu' );
    this.titleTxt.align = 'center';
    this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

    this.startTxt = this.add.bitmapText(x, this.game.height - this.titleTxt.height - 15, 'minecraftia', 'Press screen to start');
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
