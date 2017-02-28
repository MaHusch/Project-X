var game = null;
var lives = 0;
var player = null;
var explosion = null;
var explode = null;

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
		game.load.image("meteorite", "img/meteorite.png");
		game.load.image("Bullets", "img/bullets.png");
		game.load.spritesheet("Explosion", "img/explosion.png", 65, 65, 25);
	},

	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		lives = 5;
		
		console.log("Done with loading!");

		//setup of Spacefield
		this.spacefield = game.add.tileSprite(0,0,800,600,"spacefield");

		//setup for player
		player = game.add.sprite(300,400, "Player");	
		game.physics.enable(player, Phaser.Physics.ARCADE);

		//setup for explosion
		explosion = game.add.sprite(-100, -100, "Explosion");
		explosion.scale.setTo(1.5,1.5);
		explode = explosion.animations.add("explode");


		

		//Weapon/Bullets with Phaser-Engine	
		this.weapon = game.add.weapon(30, "Bullets");
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.bulletSpeed = 400;
		this.weapon.fireRate = 100;
		this.weapon.bulletAngleOffset = 90;
		this.weapon.trackSprite(player,34,30,false);

		// random meteorites
		this.meteoritesGroup = this.add.group();
		this.meteoritesGroup.enableBody = true;
		this.meteoritesGroup.physicsBodyType = Phaser.Physics.ARCADE;
		//for loop to create 10 meteorites
		for (var i = 0; i < 10; i++) { 
			var rand = game.rnd.realInRange(0.2, 0.5);
			var newmeteorite = game.add.sprite(game.world.randomX, -200 -(i*110), "meteorite");
			newmeteorite.scale.setTo(rand,rand);
			this.meteoritesGroup.add(newmeteorite);
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
		if(this.btnUP.isDown && player.y > 10 && player.alive) player.y -= 5;
		if(this.btnDOWN.isDown && player.y < 590 - 92 && player.alive) player.y += 5;
		if(this.btnLEFT.isDown && player.x > 10 && player.alive) player.x -= 5;
		if(this.btnRIGHT.isDown && player.x < 790 - 69 && player.alive) player.x += 5;
		if(this.btnFIRE.isDown && player.alive) this.weapon.fire();

		//repositioning the meteorites which got out of bounds
		for(var i = 0; i < this.meteoritesGroup.children.length; i++){
			if(this.meteoritesGroup.children[i].y < 600){
				this.meteoritesGroup.children[i].y += 5;
			} else {
				this.meteoritesGroup.children[i].y = -200-(i*50);
				this.meteoritesGroup.children[i].x = game.world.randomX;
			}
		}

		//checking and adding amout of meteorites
		if(this.meteoritesGroup.children.length < 10){
			var i = 10 - this.meteoritesGroup.children.length;

			for(i; i >= 0; i --){
				var rand = game.rnd.realInRange(0.2, 0.5);
				var newmeteorite = game.add.sprite(game.world.randomX, -200-(rand*100), "meteorite");
				newmeteorite.scale.setTo(rand, rand);
				this.meteoritesGroup.add(newmeteorite);
			}
		}

		
		if(player.alive){
			//checking collision/overlap of player and meteorite
			game.physics.arcade.overlap(player, this.meteoritesGroup, this.collisionHandler);
			//checking collision/overlap of bullets and meteorites
			game.physics.arcade.overlap(this.weapon.bullets, this.meteoritesGroup, this.bulletHandler, null, this);
		}

		//checking if the animation is over and resetting the player
		if(!player.alive){
			if(explode.isFinished){
				player.reset(300,400);
				lives--;
			}
		}
	},

	bulletHandler: function(bullets, meteoritesGroup){
		meteoritesGroup.destroy();
		bullets.kill();

		console.log("Size of the group: " + this.meteoritesGroup.children.length);
		console.log("Number of dead Children: " + this.meteoritesGroup.countDead());
		
	}, 

	collisionHandler: function(playeri, meteoritesGroup){
		
			//setting the x and y position for the explosion animation
			//and killing the player.sprite
			//playing the animation
			explosion.x = playeri.x;
			explosion.y = playeri.y;
			player.kill();
			explosion.animations.play("explode", 30, false);
			
	},

	render: function(){
		game.debug.text(lives, 30, 30);
	}	
		
	
}

