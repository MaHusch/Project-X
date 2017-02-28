
var playState = {

	create: function(){

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		lives = 5;

		//setup of Spacefield
		this.spacefield = game.add.tileSprite(0,0,800,600,"spacefield");

		//setup for player
		player = game.add.sprite(300,400, "Player");	
		game.physics.enable(player, Phaser.Physics.ARCADE);

		//setup for playerExplosion
		playerExplosion = game.add.sprite(-100, -100, "Explosion");
		playerExplosion.scale.setTo(1.5,1.5);
		explode = playerExplosion.animations.add("explode");
		

		//Weapon/Bullets with Phaser-Engine	
		this.weapon = game.add.weapon(30, "Bullets");
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		this.weapon.bulletSpeed = 400;
		this.weapon.fireRate =500; //the higher the slower	
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

		//text for remaining lives;
		this.livesLabel = game.add.text(20,20, "Remaining Lives: " + lives, {font: "15px Arial", fill: "#ffffff"});

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

		this.livesLabel.setText("Remaining Lives: " + lives);

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

				//checking if there are meteorites on the spawnpoint
				for(var i = 0; i < this.meteoritesGroup.children.length; i++){
					if(this.meteoritesGroup.children[i].x == 300 || this.meteoritesGroup.children[i].y  == 400){
						this.meteoritesGroup.children[i].y = -200-(i*110);
						this.meteoritesGroup.children[i].x = game.world.randomX;
					}
				}
				player.reset(300,400);
				lives--;
				if(lives < 1){
					game.state.start("lost");
				}
			}
		}
	},

	bulletHandler: function(bullets, meteoritesGroup){
		
		explosionMeteorite = game.add.sprite(meteoritesGroup.x, meteoritesGroup.y, "Explosion");
		explosionMeteorite.scale.setTo(1.5,1.5);
		explode2 = explosionMeteorite.animations.add("explode2");
		meteoritesGroup.destroy();
		bullets.kill();
		explosionMeteorite.animations.play("explode2", 30, false);

		console.log("Size of the group: " + this.meteoritesGroup.children.length);
		console.log("Number of dead Children: " + this.meteoritesGroup.countDead());
		
	}, 

	collisionHandler: function(playeri, meteoritesGroup){
		
			//setting the x and y position for the playerExplosion animation
			//and killing the player.sprite
			//playing the animation
			playerExplosion.x = playeri.x;
			playerExplosion.y = playeri.y;
			player.kill();
			playerExplosion.animations.play("explode", 60, false);
			
	}
}