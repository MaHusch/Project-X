
var bootState = {

	create: function(){

		//starting game physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.state.start("load");
	}
}