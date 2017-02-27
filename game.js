var game = null;

function init(){
	game = new Phaser.Game(800,600,Phaser.CANVAS, '', null, false, false);

	game.state.add("MainGame", MainGame);
	game.state.start("MainGame");
}

var MainGame = function(){

}

MainGame.prototype = {

	init: function(){},

	preload: function(){
		game.load.image("spacefield", "img/space.png");
		game.load.image("Player", "img/spaceshipt.png");
		game.load.image("Metorite", "img/metorite.png");

	},

	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		console.log("Fertig mit Laden");
		this.spacefield = game.add.tileSprite(0,0,800,600,"spacefield");
		this.player = game.add.sprite(0,0, "Player");
		this.player.y = 300;
		this.player.x = 400;
		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	update: function(){
		this.spacefield.tilePosition.y += 2;
		if(this.btnUP.isDown && this.player.y > 10) this.player.y -= 5;
		if(this.btnDOWN.isDown && this.player.y < 590 - 92) this.player.y += 5;
		if(this.btnLEFT.isDown && this.player.x > 10) this.player.x -= 5;
		if(this.btnRIGHT.isDown && this.player.x < 790 - 69) this.player.x += 5;
	}
}