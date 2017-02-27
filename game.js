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
		this.player = game.add.sprite(300,400, "Player");
		this.metorites = Array(10);
		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);

		for (var i = 0; i < this.metorites.length; i++) {
			//var rand = game.rnd.realInRange(-10,1);
			this.metorites[i] = game.add.sprite(game.world.randomX, -200 +(i*100), "Metorite");
			this.metorites[i].scale.setTo(0.3,0.3);
		}

	},

	update: function(){
		this.spacefield.tilePosition.y += 2;
		if(this.btnUP.isDown && this.player.y > 10) this.player.y -= 5;
		if(this.btnDOWN.isDown && this.player.y < 590 - 92) this.player.y += 5;
		if(this.btnLEFT.isDown && this.player.x > 10) this.player.x -= 5;
		if(this.btnRIGHT.isDown && this.player.x < 790 - 69) this.player.x += 5;

		for(var i = 0; i < this.metorites.length; i++){
			if(this.metorites[i].y < 600){
				this.metorites[i].y += 5;
			} else {
				this.metorites[i].y = -400;
				this.metorites[i].x = game.world.randomX;
			}
		}
	}
}