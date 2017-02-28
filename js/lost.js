
var lostState = {

	create: function(){

		var text1 = game.add.text(100,100, "YOU LOST", {font: "50px Arial", fill: "#ffffff"});

		var text2 = game.add.text(100,200, "Continue with SPACEBAR", {font: "50px Arial", fill: "#ffffff"});

		var btnSpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		btnSpace.onDown.addOnce(this.continue, this);
	},

	continue: function(){
		game.state.start("menu");
	}

};