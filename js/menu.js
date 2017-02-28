
var menuState = {

	create: function(){

		var nameLabel = game.add.text(100, 80, "Project-x", {font: "50px Arial", fill: "#ffffff"});

		var description1 = game.add.text(100, 180, "Controls:", {font: "40px Arial", fill: "#ffffff"});

		var description2 = game.add.text(100, 250, "Move with WASD", {font:"30px Arial", fill: "#ffffff"});

		var description3 = game.add.text(100, 300, "Shoot with SPACE", {font: "30px Arial", fill: "#ffffff"});

		var description4 = game.add.text(100, 400, "Start with SPACEBAR", {font: "45px Arial", fill: "#ffffff"});

		var btnStart = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		console.log("Done with loading!");
		
		btnStart.onDown.addOnce(this.start, this);
	},

	start: function(){
		game.state.start("play");
	}

}