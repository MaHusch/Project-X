
var loadState = {

	preload: function(){
		game.load.image("spacefield", "img/space.png");
		game.load.image("Player", "img/spaceshipt.png");
		game.load.image("meteorite", "img/meteorite.png");
		game.load.image("Bullets", "img/bullets.png");
		game.load.spritesheet("Explosion", "img/explosion.png", 65, 65, 25);
	},


	create: function(){
		game.state.start("menu");

	}
}