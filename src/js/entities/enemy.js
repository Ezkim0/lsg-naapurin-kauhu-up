var Enemy = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'enemy');
		game.add.existing(this);
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
	this.y += 1;
};

module.exports = Enemy;
