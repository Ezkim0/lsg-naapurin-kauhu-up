var Enemy = require('../entities/enemy');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.grassTileSprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'dark_grass');
    this.sandTilesprite = this.game.add.tileSprite(0, this.game.height - 128, this.game.width, 128, 'earth');

    this.game.time.advancedTiming = true;

    this.enemysSoldiers = [];
    this.soldiers = [];
    this.enemySoldiersCount = 10;
    this.soldiersCount = 10;
    this.gameover = false;
    this.game.enemyKilled = 0;

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

    this.turretHolder = this.game.add.sprite(this.game.width / 2, this.game.height - 75, 'turretholder');
    
    this.sprite = this.game.add.sprite(this.game.width / 2 + 12, this.game.height - 70, 'turret');
    this.sprite.anchor.set(0, 0.5);

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowRotation = false;

    // Enemy animations 
    this.enemyDyingAnimations = this.game.add.group();

    for (var i = 0; i < 5; i++)
    {
        var enemyDyingAnimation = this.enemyDyingAnimations.create(0, 0, 'enemydying', [0], false);
        enemyDyingAnimation.anchor.setTo(0, -0.25);
        enemyDyingAnimation.animations.add('enemydying');
    }

    // concentratedFire
    /*this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    for (var j = 0; j < 10; j++)
    {
        var explosionAnimation = this.explosions.create(0, 0, 'smallExplosion', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('smallExplosion');
    }*/

    this.concentratedFireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.emitter = this.game.add.emitter(0, 0, 100);
    this.emitter.particleFriction = 0.1;

  },

  update: function () {

    this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');

    if(this.gameover) {
      return;
    }

    if(this.enemysSoldiers.length < this.enemySoldiersCount){
      this.createEnemy();
    }

    for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
      var enemy = this.enemysSoldiers[i];

      this.game.physics.arcade.overlap(this.bullets, this.enemysSoldiers[i], this.bulletHitEnemy, null, this);
      
      if(enemy.y >= this.game.height - 80) {
        this.soldiersCount -= 1;
        
        enemy.destroy();
        this.enemysSoldiers.splice(i,1);
        this.soldiersLeftText.setText(this.soldiersCount.toString());

        //var enemyDyingAnimation = this.enemyDyingAnimations.getFirstExists(false);
        //enemyDyingAnimation.reset(enemy.x, enemy.y);

        if(this.soldiersCount <= 0){
          this.game.state.start('GameOver');
        }
      }

    }

    this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
    if (this.game.input.activePointer.isDown)
    {
      this.fire();
    }

    /*if (this.concentratedFireButton.isDown) {
       this.concentratedFire(this.game.input.activePointer.x - 100,this.game.input.activePointer.y - 100);
    }*/

  },

  fire: function () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();

            bullet.reset(this.sprite.x - 2, this.sprite.y);

            this.game.physics.arcade.moveToPointer(bullet, 1500);
            bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 2500, this.game.input.activePointer, 400);
        }
  },

  concentratedFire: function (x,y) {
        for (var i = this.explosions.length - 1; i >= 0; i--) {
          var explosionsAnimation = this.explosions.getAt(i);
          explosionsAnimation.reset(x + Math.random()*200, y + Math.random()*200);
          explosionsAnimation.play('smallExplosion', 30, false, true);
        }

        for (var j = this.enemysSoldiers.length - 1; j >= 0; j--) {
          var enemy = this.enemysSoldiers[j];
           this.game.physics.arcade.overlap(this.explosions, enemy, this.hitEnemy, null, this);
          
        }
  },

  bulletHitEnemy: function (enemy, bullet) {

      /*this.emitter.makeParticles('blood');
      var blood = new Phaser.Rectangle(0, 0, 30, 5);
      this.emitter.makeParticles(blood);

      this.emitter.rotation = bullet.rotation;

      this.emitter.gravity = 0;
      this.emitter.maxRotation = 0;
      this.emitter.minRotation = 0;

      this.emitter.setAlpha(1, 0, 600);

      var p1 = new Phaser.Point (1,0);
      p1.rotate(0,0,bullet.rotation + 0.5);
      p1.setMagnitude(200);
      
      var p2 = new Phaser.Point (1,0);
      p2.rotate(0,0,bullet.rotation - 0.5);
      p2.setMagnitude(200);

      this.emitter.maxParticleSpeed = p1;
      this.emitter.minParticleSpeed = p2;
      //this.emitter.rotation = 0;
      this.emitter.x = enemy.x + 30;
      this.emitter.y = enemy.y + 35;

      this.emitter.start(true, 600, null, 10);*/

      bullet.kill();

      for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
        if(enemy === this.enemysSoldiers[i])
        {
          enemy.hit();

          if(enemy.hitPoints === 0) {
            this.enemysSoldiers.splice(i,1);

            var enemyDyingAnimation = this.enemyDyingAnimations.getFirstExists(false);
            enemyDyingAnimation.reset(enemy.x, enemy.y);
            enemyDyingAnimation.play('enemydying', 30, false, false);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.fadeAnimation, this, enemyDyingAnimation);
          }
        }
      }
      
      if(enemy.hitPoints === 0) {
        enemy.kill();
        this.game.enemyKilled++;
      }

      //var destroyed = enemies[tank.name].damage();

      /*if (destroyed)
      {
          var explosionAnimation = explosions.getFirstExists(false);
          explosionAnimation.reset(tank.x, tank.y);
          explosionAnimation.play('kaboom', 30, false, true);
      }*/
  },

  fadeAnimation: function (animation) {
    //console.log("-----");
    //console.log(animation);
    animation.kill();
    /*var fadeAnim = this.game.add.tween(animation).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    fadeAnim.onComplete.add(this.removeTween, {fadeAnim:fadeAnim , animation:animation});*/
  },

  hitEnemy: function (enemy) {
    for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
      if(enemy === this.enemysSoldiers[i])
      {
        this.enemysSoldiers.splice(i,1);

        var enemyDyingAnimation = this.enemyDyingAnimations.getFirstExists(false);
        enemyDyingAnimation.reset(enemy.x, enemy.y);
        enemyDyingAnimation.play('enemydying', 30, false, false);
      }
    }
    enemy.kill();
  },

  removeTween: function (tween,animation) {
    tween.destroy();
    //animation.destroy();
    //console.log(animation);
  },

  killAnimation: function (animation) {
    //console.log("this.enemyDyingAnimations");
    //console.log(this.enemyDyingAnimations);
  },

  checkOverlapEnemyX: function () {
    
    

  },

  createEnemy: function () {

    var enemyX = Math.floor(Math.random() * (this.game.width - 65));

    var pass = true;
    for (var i = this.enemysSoldiers.length - 1; i >= 0; i--) {
      var soldier = this.enemysSoldiers[i];

      if(enemyX < soldier.x + 65 && enemyX > soldier.x - 65 ) {
        pass = false;
      }

    }

    if(!pass){
      this.createEnemy();
      return;
    }

    var enemy = new Enemy(this.game, enemyX, 0);
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
