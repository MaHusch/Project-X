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
		game.load.image("Bullets", "img/bullets.png");
	},

	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		console.log("Fertig mit Laden");


		this.spacefield = game.add.tileSprite(0,0,800,600,"spacefield");
		this.player = game.add.sprite(300,400, "Player");	

		//Weapon/Bullets with Phaser-Engine	
		this.weapon = game.add.weapon(30, "Bullets");
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.bulletSpeed = 400;
		this.weapon.fireRate = 100;
		this.weapon.bulletAngleOffset = 90;
		this.weapon.trackSprite(this.player,34,30,false);

		// random Metorites
		this.metorites = Array(10);
		for (var i = 0; i < this.metorites.length; i++) {
			var rand = game.rnd.realInRange(0.3,0.6);
			this.metorites[i] = game.add.sprite(game.world.randomX, -200 +(i*110), "Metorite");
			this.metorites[i].scale.setTo(rand,rand);
		}

		// Key-Binding
		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.btnFIRE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function(){
		this.spacefield.tilePosition.y += 2;
		if(this.btnUP.isDown && this.player.y > 10) this.player.y -= 5;
		if(this.btnDOWN.isDown && this.player.y < 590 - 92) this.player.y += 5;
		if(this.btnLEFT.isDown && this.player.x > 10) this.player.x -= 5;
		if(this.btnRIGHT.isDown && this.player.x < 790 - 69) this.player.x += 5;
		if(this.btnFIRE.isDown) this.weapon.fire();


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