var Player = require('../entities/player');

var Game = function () {
  this.testentity = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    //this.enemys = this.game.add.group();

    this.game.input.addPointer();

    this.enemys = [];

    this.skyprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
    this.groundsprite = this.game.add.tileSprite(0, this.game.height / 2 + 50, this.game.width, this.game.height / 2, 'ground');
    this.crosshair = this.game.add.sprite(this.game.width / 2 - 202, this.game.height - 213, 'konekivaari');

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.time.events.loop(Phaser.Timer.HALF, this.createEnemy, this);
    this.crosshair = this.game.add.sprite(100, this.game.height/2 + 50, 'crosshair');
    this.crosshair.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.crosshair, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.fireRate = 50;
    this.enemyCreated = 0;
    this.enemyKilled = 0;
    this.score = 0;

    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fx = this.game.add.audio('sfx');

    this.fx.addMarker('alien death', 1, 1.0);
    this.fx.addMarker('boss hit', 3, 0.5);
    this.fx.addMarker('escape', 4, 3.2);
    this.fx.addMarker('meow', 8, 0.5);
    this.fx.addMarker('numkey', 9, 0.1);
    this.fx.addMarker('ping', 10, 1.0);
    this.fx.addMarker('death', 12, 4.2);
    this.fx.addMarker('shot', 17, 1.0);
    this.fx.addMarker('squit', 19, 0.3);

    // Bullets
    this.bullets = 500;
    this.bulletsLeftText = this.add.bitmapText(0, 20, 'minecraftia', this.bullets.toString() );
    //this.bulletsLeftText.align = 'center';
    this.bulletsLeftText.x = this.game.width - this.bulletsLeftText.textWidth - 20;
  },

  update: function () {

    if (this.fireButton.isDown || this.game.input.activePointer.isDown )
      {
        //console.log('FIRE!');

        // Moving?
	      this.crosshair.x = this.game.input.mousePointer.x;
	      this.crosshair.y = this.game.input.mousePointer.y;

	      


        //console.log('this.game.time.now ' + this.game.time.now);
        //console.log('this.nextFire ' + this.nextFire);

        if (this.game.time.now > this.nextFire )
        {
          this.nextFire = this.game.time.now + this.fireRate;
          this.fx.play('shot');
          this.bullets -= 1;

          if(this.bullets <= 0) {
            this.bulletsLeftText.setText(0);
            this.endGame();
          } else {
            this.bulletsLeftText.setText(this.bullets.toString());
          }

          for (var i = this.enemys.length - 1; i >= 0; i--) 
          {
            //var enemy = this.enemys.getAt(i);
            var enemy = this.enemys[i];
            if (this.checkOverlap(this.crosshair, enemy))
            {
              enemy.kill();
              this.score++;
            }
          }
        }
      }

      

      // Scale enemy
      for (var j = this.enemys.length - 1; j >= 0; j--) 
      {
        var tenemy = this.enemys[j];
        tenemy.y += 0.05;
        tenemy.x -= 0.01;
        tenemy.scale.x += 0.001;
        tenemy.scale.y += 0.001;
      }

      //
      //this.crosshair.scale.x += 0.1;
      //this.crosshair.scale.y += 0.1;
  },

  collisionHandler: function (obj1, obj2) {
    //this.game.stage.backgroundColor = '#FF6600';
    //console.log('collision!' + obj2 + obj1);

  },

  endGame: function () {
    this.bulletsLeftText.setText('0');
    this.game.state.start('GameOver');
  },

  checkOverlap: function (spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    //console.log(boundsA);
    //console.log(boundsB);
    //boundsA.width = 20;
    //boundsA.height = 20;

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },

  createEnemy: function () {
    var x = this.game.width - 100
      , y = this.game.height / 2;

    this.enemyCreated += 1;

    var random = this.game.rnd.realInRange(0,x);
    for (var j = this.enemys.length - 1; j >= 0; j--) 
    {
      var tenemy = this.enemys[j];
      if(random > tenemy.x && random < (tenemy.x + 100)) {
        random = this.game.rnd.realInRange(0,x);
      }
    }

    var enemy = this.game.add.sprite(random, y, 'enemy');
    
    //enemy.scale.setTo(5,5);
    //console.log("enemy width: " + enemy.width);
    //console.log("window width: " + this.game.width);

    /*if(enemy.x >= this.game.x - enemy.width) {

    }*/

    enemy.enableBody = true;
    enemy.physicsBodyType = Phaser.Physics.ARCADE;
    
    //this.enemys.create(enemy);
    this.enemys.push(enemy);

    this.game.world.bringToTop(this.crosshair);
  },

  playerInputDown: function (event) {
    //console.log(event);
    event.kill();

  },

  onInputDown: function () {
    this.game.state.start('Menu');
  }
};
