
//this function create Grid for the game, the grid is built from GirdSize Rows and in each Row there is GirdSize columns
//the new created Rows has id row[i], for example the first row has id row0, and class row
//the new created Columns has class column
function CreateGrid(GridSize) {
	for(var i=0;i<GridSize;i++){
		var rowName='<div id="row'+i+'" class="row"></div>';
		$("#app-container").append(rowName);
		for (var j=0;j<GridSize;j++){
			$('#row'+i).append('<div class="column""></div>');
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
	$("#GameMenu").css("display","none");
	CreateGrid(GridSize);
};