var Enemy = require('../entities/enemy');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.grassTileSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'dark_grass');
    this.sandTilesprite = this.game.add.tileSprite(0, this.game.height - 70, this.game.width, 50, 'earth');

    this.enemysSoldiers = [];
    this.soldiers = [];
    this.enemySoldiersCount = 30;
    this.soldiersCount = 10;
    this.gameover = false;

    this.soldiersLeftText = this.add.bitmapText(0, 20, 'minecraftia', this.soldiersCount.toString() );
    this.soldiersLeftText.x = this.game.width - this.soldiersLeftText.textWidth - 20;

    // Bullets
    this.fireRate = 50;
    this.nextFire = 10;

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    this.bullets.createMultiple(100, 'bullet');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height - 70, 'turret');
    this.sprite.anchor.set(0.5);

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.body.allowRotation = false;
  },

  update: function () {

    if(this.gameover) return;

    if(this.enemysSoldiers.length < this.enemySoldiersCount){
      this.createEnemy();
    }

    for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
      var enemy = this.enemysSoldiers[i];

      this.game.physics.arcade.overlap(this.bullets, this.enemysSoldiers[i], this.bulletHitEnemy, null, this);
      //this.enemysSoldiers[i].update();
      if(enemy.y >= this.game.height - 70) {
        this.soldiersCount -= 1;
        enemy.destroy();
        this.enemysSoldiers.splice(i,1);
        this.soldiersLeftText.setText(this.soldiersCount.toString());

        if(this.soldiersCount <= 0){
          //console.log("PELI LOPPU!");
          this.game.state.start('GameOver');
        }
      }

    }

    

    this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
    if (this.game.input.activePointer.isDown)
    {
      this.fire();
    }

  },

  fire: function () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.reset(this.sprite.x - 8, this.sprite.y - 8);

            this.game.physics.arcade.moveToPointer(bullet, 2000);
        }
  },

  bulletHitEnemy: function (enemy, bullet) {
    bullet.kill();

    for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
      if(enemy === this.enemysSoldiers[i])
      {
        this.enemysSoldiers.splice(i,1);
      }
    };    
    enemy.kill();

    //var destroyed = enemies[tank.name].damage();

    /*if (destroyed)
    {
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(tank.x, tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }*/
  },

  createEnemy: function () {
    var enemy = new Enemy(this.game, this.game.world.randomX, 0);
    this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
    this.enemysSoldiers.push(enemy);
    
  },

  checkOverlap: function (spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },

  endGame: function () {
    
  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
