// Global Variables Definition
var currentPlayer; // can be 1 or 2
var audio = {};
var timerInterval;
var playerOneScore = new Array(9);
var playerTwoScore = new Array(9);



// Sound JSON.
audio["tic"] = new Audio();
audio["tic"].src = "assets/sounds/Tick-DeepFrozenApps-397275646.mp3"

//	Creates a Grid for the game, the grid is built from
// an array of divs represents the grid blocks.
// 
// the new created Columns has class column
function CreateGrid(GridSize) {
    for (var i = 0; i < GridSize * GridSize; i++) {
        $('#app-container').append('<div class="column' + i + ' unchecked"></div>');
    }
}

// This function play random move when time out
function playRandom(playerNum, GridSize) {
    let randomColSelected = false;
    while (randomColSelected === false) {
        let randomColNum = Math.floor(Math.random() * GridSize); //return value between 0 to GridSize
        let randomCol = $('.column' + randomColNum);
        if (randomCol.hasClass("unchecked")) {
            randomCol.removeClass("unchecked");
            randomCol.addClass("checked player" + currentPlayer);
            if (currentPlayer == 1) {
                playerOneScore[parseInt(randomCol.attr("class").charAt(6))] = 1;
            }
            else {
                playerTwoScore[parseInt(randomCol.attr("class").charAt(6))] = 1;
            }
            randomColSelected = true;
            
        }
    }
};

function clearTimer(playerNum,actionToDo) {
    clearInterval(timerInterval);
    if(actionToDo===1)
    	$('.timer')[playerNum].innerHTML = "Time out";
    else
    	$('.timer')[playerNum].innerHTML = "Nice";
}



$(document).ready(function() {
	//event methods
	$("#start").click(function() {
        StartGame(3);
         document.getElementById("PlayerOneName").innerHTML = $("#PlayerOneInput").val();
         document.getElementById("PlayerTwoName").innerHTML = $("#PlayerTwoInput").val();
    });

    $("#app-container").on("click", ".unchecked", function() {
        if ($(this).hasClass("unchecked")) {
            $(this).removeClass("unchecked");
            $(this).addClass("checked player" + currentPlayer);
            if (currentPlayer == 1) {
            	clearTimer(1,0);
                playerOneScore[parseInt($(this).attr("class").charAt(6))] = 1;
            } else {
            	clearTimer(0,0);
                playerTwoScore[parseInt($(this).attr("class").charAt(6))] = 1;
            }
            nextPlayer();
            audio["tic"].play();
        }
    });

    //this function start the game.
    //first it remove the menu and then it create the grid
    //this function take 3 parameters
    //Game mode - will call the "gameModeChanger()" function.
    //LengthOfTurn - will pass to the "timer()" function.
    //GridSize - will pass to the "gridCreator()" function.
    function StartGame(GridSize, GameMode, LengthOfTurn) {
        $("#gameMenu").css("display", "none");
        $('#console-container').show();
        CreateGrid(GridSize);
        currentPlayer = 1;
        setTimer(5, 2);
    };

    function setTimer(interval, player) {
        
        stopTime = interval;
        var playerNum = player - 1;
        timerInterval = setInterval(function() {
            if (stopTime <= 0) {
                clearTimer(playerNum,1);
                playRandom(playerNum, 9); //TODO: Create gridSize global variable
                nextPlayer();
            } else {
                $('.timer')[playerNum].innerHTML = stopTime--;
            }
        }, 1000);
    };


    // This function set the current player
    function nextPlayer() {
    	var check = checkGame();
        if (check === 1) {
            
            $('#game_mode').css("display","none");
            $('#rematch').css("display","block");
            $("#gameMenu").css("display", "block");
            document.getElementById("winnerName").innerHTML = $("#PlayerOneInput").val()+" is the Winner";
            return;
        } else if (check === 2) {
            $('.timer')[0].innerHTML = "winner";
            $('#game_mode').css("display","none");
            $('#rematch').css("display","block");
            $("#gameMenu").css("display", "block");
            document.getElementById("winnerName").innerHTML = $("#PlayerTwoInput").val()+" is the Winner";
            return;
        }

        if (currentPlayer === 1) {

            currentPlayer = 2;
            setTimer(5, 1);
        } else {
            currentPlayer = 1;
            setTimer(5, 2);
        }
    };

    //function to check if there is a winner in the game
    // this function checks all the possibilities for a win
    function checkGame() {
        if ((playerOneScore[0] === 1 && playerOneScore[1] === 1 && playerOneScore[2] === 1) ||
            (playerOneScore[3] === 1 && playerOneScore[4] === 1 && playerOneScore[5] === 1) ||
            (playerOneScore[6] === 1 && playerOneScore[7] === 1 && playerOneScore[8] === 1) ||
            (playerOneScore[0] === 1 && playerOneScore[3] === 1 && playerOneScore[6] === 1) ||
            (playerOneScore[1] === 1 && playerOneScore[4] === 1 && playerOneScore[7] === 1) ||
            (playerOneScore[2] === 1 && playerOneScore[5] === 1 && playerOneScore[8] === 1) ||
            (playerOneScore[0] === 1 && playerOneScore[4] === 1 && playerOneScore[8] === 1) ||
            (playerOneScore[6] === 1 && playerOneScore[4] === 1 && playerOneScore[2] === 1))
            return 1;

        else if ((playerTwoScore[0] === 1 && playerTwoScore[1] === 1 && playerTwoScore[2] === 1) ||
            (playerTwoScore[3] === 1 && playerTwoScore[4] === 1 && playerTwoScore[5] === 1) ||
            (playerTwoScore[6] === 1 && playerTwoScore[7] === 1 && playerTwoScore[8] === 1) ||
            (playerTwoScore[0] === 1 && playerTwoScore[3] === 1 && playerTwoScore[6] === 1) ||
            (playerTwoScore[1] === 1 && playerTwoScore[4] === 1 && playerTwoScore[7] === 1) ||
            (playerTwoScore[2] === 1 && playerTwoScore[5] === 1 && playerTwoScore[8] === 1) ||
            (playerTwoScore[0] === 1 && playerTwoScore[4] === 1 && playerTwoScore[8] === 1) ||
            (playerTwoScore[6] === 1 && playerTwoScore[4] === 1 && playerTwoScore[2] === 1))
            return 2;
    };


});