// Global Variables Definition

var currentPlayer;	// can be 1 or 2
var audio = {};

// Sound JSON.
audio["tic"] = new Audio();
audio["tic"].src = "assets/sounds/Tick-DeepFrozenApps-397275646.mp3"

//	Creates a Grid for the game, the grid is built from
// an array of divs represents the grid blocks.
// 
// the new created Columns has class column
function CreateGrid(GridSize) {
	for(var i=0;i<GridSize*GridSize;i++){
		$('#app-container').append('<div class="column'+i+' unchecked"></div>');
	}
}
//this function start the game.
//first it remove the menu and then it create the grid
//this function take 3 parameters
//Game mode - will call the "gameModeChanger()" function.
//LengthOfTurn - will pass to the "timer()" function.
//GridSize - will pass to the "gridCreator()" function.
function StartGame(GridSize,GameMode,LengthOfTurn){
	$("#gameMenu").css("display","none");
	$('#console-container').show();
	CreateGrid(GridSize);
	currentPlayer = 1;
	setTimer(5,1);
};

// This function set the current player

function nextPlayer() {
	if (currentPlayer === 1) {
		currentPlayer = 2;
		setTimer(5,2);
	}
	else {
		currentPlayer = 1;
		setTimer(5,1);
	}
};

// This function set the timer

function setTimer(interval,player){
	var stopTime = interval;
	var playerNum = player - 1;
	var x = setInterval(function(){

		if (stopTime <= 0 ) {
			clearInterval(x);
			$('.timer')[playerNum].innerHTML = "Time out";
// 			playRandom();
			nextPlayer();
		}
		else
		{
			$('.timer')[playerNum].innerHTML = stopTime--;
			console.log(stopTime);
		}
	},1000);
};

// This function play random move when time out
function randomMove() {
	
};



$(document).ready(function() {
	console.log("ready!");
	$("#start").click(function() {
		console.log("WOW");
		StartGame(3);
	});
	
	$(".unchecked").click(function(){
		if( $(this).hasClass("unchecked")) {
			$(this).removeClass("unchecked");
			$(this).addClass("checked player" + currentPlayer);
			nextPlayer();
			audio["tic"].play();
		}

	});
});