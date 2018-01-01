

function CreateGrid(GridSize) {
	//for visual porposes to command line where add to demonstrate the grid is build up well
	//$("#app-container").css({"width":"600px","height":"600px","background-color":"red", "display": "table","border-collapse":"collapse"});
	//var columnWidth=100/GridSize;
	for(var i=0;i<GridSize;i++){
		var rowName='<div id="row'+i+'" class="row"></div>';
		$("#app-container").append(rowName);
		for (var j=0;j<GridSize;j++){
			$('#row'+i).append('<div class="column""></div>');
		}
	}
	
};