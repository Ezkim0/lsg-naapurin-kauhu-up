var Enemy = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'enemySprite');
		game.add.existing(this);
		this.animations.add('run');
		this.animations.play('run', 25, true);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Automatically called by World.update
 */
Enemy.prototype.update = function() {
	this.move();

};

Enemy.prototype.move = function() {
	this.y += 1.7;
};

module.exports = Enemy;
