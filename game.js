var game = null;

function init(){
	game = new Phaser.Game(260,300,Phaser.CANVAS, '', null, false, false);

	game.state.add("MainGame", MainGame);
	game.state.start("MainGame");
}

var MainGame = function(){

}

MainGame.prototype = {

	init: function(){},

	preload: function(){
		game.load.image("Player", "img/player.png");

	},

	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		console.log("Fertig mit Laden");
		this.player = game.add.sprite(0,0, "Player");
		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.D);
	},

	update: function(){
		if(this.btnUP.isDown) this.player.y--;
		if(this.btnDOWN.isDown) this.player.y++;
		if(this.btnLEFT.isDown) this.player.x--;
		if(this.btnRIGHT.isDown) this.player.x++;
	}
}