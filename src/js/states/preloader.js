var Preloader = function (game) {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('target', 'assets/target.png');
      this.load.image('player', 'assets/player.png');
      this.load.image('bunny', 'assets/bunny.png');
      this.load.image('enemy', 'assets/enemy.png');
      this.load.image('konekivaari', 'assets/tykki.png');
      this.load.image('sky', 'assets/sky.jpg');
      this.load.image('ground', 'assets/ground.jpg');
      this.load.image('crosshair', 'assets/target.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.audio('sfx', 'assets/audio/SoundEffects/fx_mixdown.ogg');
  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
        this.game.state.start('Menu');
      }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
