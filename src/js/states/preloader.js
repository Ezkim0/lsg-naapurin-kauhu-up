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
      this.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);
      this.load.spritesheet('bigExplosion', 'assets/big-explosion.png', 256, 128, 12);
      this.load.spritesheet('smallExplosion', 'assets/small-explosion.png', 96, 96, 48);
      this.load.spritesheet('enemydying', 'assets/enemydying.png', 63, 64, 20);
      this.load.spritesheet('enemySprite', 'assets/enemy.png', 64, 64, 15);
      this.load.image('dark_grass', 'assets/dark_grass.png');
      this.load.image('earth', 'assets/earth.png');
      this.load.image('enemy', 'assets/invader.png');
      this.load.image('turret', 'assets/turret.png');
      this.load.image('bullet', 'assets/bullet.png');
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
