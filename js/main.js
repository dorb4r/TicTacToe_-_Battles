// Definition of global variables

var currentPlayer;	// can be 1 or 2



//this function create Grid for the game, the grid is built from GirdSize Rows and in each Row there is GirdSize columns
//the new created Rows has id row[i], for example the first row has id row0, and class row
//the new created Columns has class column
function CreateGrid(GridSize) {
	for(var i=0;i<GridSize;i++){
		var rowName='<div id="row'+i+'" class="row"></div>';
		$("#app-container").append(rowName);
		for (var j=0;j<GridSize;j++){
			$('#row'+i).append('<div class="column unchecked"></div>');
		}
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
	$('.gamers').show();
	CreateGrid(GridSize);
	currentPlayer = 1;
	setTimer(10);

	$(".unchecked").click(function(){
		if( $(this).hasClass("unchecked")) {
			$(this).removeClass("unchecked");
			$(this).addClass("checked player" + currentPlayer);
			nextPlayer();
		}

	});

};

// This function set the current player

function nextPlayer() {
	if (currentPlayer === 1) {
		currentPlayer = 2;
	}
	else {
		currentPlayer = 1;
	}
};

// This function set the timer

function setTimer(interval){
	var stopTime = interval;
	var x = setInterval(function(){

		if (stopTime <= 0 ) {
			clearInterval(x);
			$('.playerTimer')[0].innerHTML = "Time out";
			playRandom();
		}
		else
		{
			$('.playerTimer')[0].innerHTML = stopTime--;
		}
	},1000);
};

// This function play random move when time out

function playRandom() {

};
