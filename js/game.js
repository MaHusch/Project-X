var game = null;
var lives = 0;
var player = null;
var explosion = null;

function init(){
	game = new Phaser.Game(800, 600, Phaser.CANVAS, "", null, false, false);
	game.state.add("boot", bootState);
	game.state.add("load", loadState);
	game.state.add("menu", menuState);
	game.state.add("lost", lostState);
	game.state.add("play", playState);
	
	game.state.start("boot");


}