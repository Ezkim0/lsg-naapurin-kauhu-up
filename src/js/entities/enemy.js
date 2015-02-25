var Enemy = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'enemySprite');
		game.add.existing(this);
		this.animations.add('run');
		this.animations.play('run', 25, true);

		this.hitPoints = 1;
		this.width = 55;
		this.height = 55;

		this.healthBar = new Phaser.Rectangle(this.x, this.y, 30, 5);
		//game.debug.geom(this.healthBar,'#ff6600');
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function() {
	this.move();

	if(this.hitPoints < 5) {
		this.healthBar.x = this.x + this.width / 2 - 15;
		this.healthBar.y = this.y;
		this.healthBar.width = this.hitPoints * (30 / 5);
		this.game.debug.geom(this.healthBar,'#D71E1E');
	}
	
};

Enemy.prototype.move = function() {
	this.y += 1.7;
};

Enemy.prototype.hit = function() {
	this.hitPoints -= 1;
	this.bloodSpread();
};

Enemy.prototype.bloodSpread = function() {
	//console.log('SPLÄTS');

};

module.exports = Enemy;
