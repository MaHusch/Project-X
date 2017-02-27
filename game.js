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
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
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
		this.metoritesGroup = this.add.group();
		this.metoritesGroup.enableBody = true;
		this.metoritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
		//for loop to create 10 metorites
		for (var i = 0; i < 10; i++) { 
			var rand = game.rnd.realInRange(0.2, 0.5);
			var newMetorite = game.add.sprite(game.world.randomX, -200 -(i*110), "Metorite");
			newMetorite.scale.setTo(rand,rand);
			this.metoritesGroup.add(newMetorite);
		}

		// Key-Binding
		this.btnUP = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		this.btnDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.btnRIGHT = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.btnLEFT = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.btnFIRE = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function(){
		//making the background move 
		this.spacefield.tilePosition.y += 2;

		//player movement
		if(this.btnUP.isDown && this.player.y > 10) this.player.y -= 5;
		if(this.btnDOWN.isDown && this.player.y < 590 - 92) this.player.y += 5;
		if(this.btnLEFT.isDown && this.player.x > 10) this.player.x -= 5;
		if(this.btnRIGHT.isDown && this.player.x < 790 - 69) this.player.x += 5;
		if(this.btnFIRE.isDown) this.weapon.fire();

		//repositioning the metorites which got out of bounds
		for(var i = 0; i < this.metoritesGroup.children.length; i++){
			if(this.metoritesGroup.children[i].y < 600){
				this.metoritesGroup.children[i].y += 5;
			} else {
				this.metoritesGroup.children[i].y = -400;
				this.metoritesGroup.children[i].x = game.world.randomX;
			}
		}

		//checking and adding amout of metorites
		if(this.metoritesGroup.children.length < 10){
			var i = 10 - this.metoritesGroup.children.length;

			for(i; i >= 0; i --){
				var rand = game.rnd.realInRange(0.2, 0.5);
				var newMetorite = game.add.sprite(game.world.randomX, -200-(rand*100), "Metorite");
				newMetorite.scale.setTo(rand, rand);
				this.metoritesGroup.add(newMetorite);
			}
		}
		
		//checking collision/overlap of bullets and metoirtes
		game.physics.arcade.overlap(this.weapon.bullets, this.metoritesGroup, this.bulletHandler, null, this);
		
	},

	bulletHandler: function(bullets, metoritesGroup){
		metoritesGroup.destroy();
		bullets.kill();

		console.log("Size of the group: " + this.metoritesGroup.children.length);
		console.log("Number of dead Children: " + this.metoritesGroup.countDead());
		
	}
}

