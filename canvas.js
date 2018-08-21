var ColorsArray = [
	"#c82124", //RED
	'#ff9900', //ORANGE
	'#33cc00', //GREEN
	'#9900cc', //VIOLET
	'#3300ff', //BLUE
	'#ff00cc', //PINK
	'#ffff00' //YELOW
]

var canvas = document.getElementById('GameCanvas'),
	LeftOffset = canvas.offsetLeft,
	TopOffset = canvas.offsetTop,
	context = canvas.getContext('2d'),
	elements = [];


var v_cells = 9; // MAGIC_CONST
var cell_height = 100;
var empty_space_between_cells = 1;


for (var i = 0; i < v_cells; i++) {
	for (var j = 0; j < v_cells; j++) {
		// Add element.
		elements.push({color: 'white',
			x: i,
			y: j,
			width: cell_height,
			height: cell_height,
			left: (i * cell_height) + (i * empty_space_between_cells),
			top: (j * cell_height) + (j * empty_space_between_cells)
		});
	}
}


function GetSquareCenterPositionByCellIndex(cell_x, cell_y) {
	var x, y;
	var adjusted_cell_x = cell_x + 1;
	var adjusted_cell_y = cell_y + 1;
	x = (adjusted_cell_x * cell_height) + (adjusted_cell_x * empty_space_between_cells) - (cell_height / 2) - empty_space_between_cells;
	y = (adjusted_cell_y * cell_height) + (adjusted_cell_y * empty_space_between_cells) - (cell_height / 2) - empty_space_between_cells;

	return [x, y];
}

function DeRenderBallFromCell(cell_x, cell_y) {
	var position = GetSquareCenterPositionByCellIndex(cell_x, cell_y);
	var sqare_start_pos_x = position[0] - (cell_height / 2)
	var sqare_start_pos_y = position[1] - (cell_height / 2)
	context.fillStyle = "white";
	context.fillRect(
		sqare_start_pos_x,
		sqare_start_pos_y,
		cell_height,
		cell_height);
}

function RenderBallInCell(color, cell_x, cell_y) {
	var position = GetSquareCenterPositionByCellIndex(cell_x, cell_y)
	var x_pos = position[0]
	var y_pos = position[1]

	context.fillStyle = color;
	context.beginPath();
	context.arc(x_pos, y_pos, 40, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
}

canvas.addEventListener('click', function(event) {
	var x = event.pageX - LeftOffset,
		y = event.pageY - TopOffset;

	// Collision detection between clicked offset and element.
	elements.forEach(function(element) {
		if (y > element.top && y < element.top + element.height &&
			x > element.left && x < element.left + element.width) {
			RemoveColorFromCell(element.x, element.y);
			//RenderBallInCell("blue", element.x, element.y);
			AddThreeRandomColoredBallsInRandomPositions();
			//alert("you clicked element X=" + element.x + "Y=" + element.y);
		}
	});

}, false);

// Render elements.
elements.forEach( function (element) {
	context.fillStyle = element.color;
	context.fillRect(element.left, element.top, element.width, element.height);
});


//---------------------------GameLogic--------------------------------------

function PrintArrayToConsole(arr) { // help's in debug
	var arrText='';
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			arrText+=arr[i][j]+' ';
		}
		console.log(arrText);
		arrText='';
	}
}

var board_states_array
function StartGame() {
	 board_states_array = new Array(v_cells - 1);
	for (var i = 0; i < v_cells; i++) {
	  board_states_array[i] = new Array(v_cells - 1);
	}
	for (var i = 0; i < v_cells; i++) {
		for (var j = 0; j < v_cells; j++) {
			board_states_array[i][j] = 0; // initital empty board values are 0
		}
	}

	PrintArrayToConsole(board_states_array)
}

function SetColorBallToCell(color_enum, cell_x, cell_y) {
	console.assert(board_states_array[cell_x][cell_y] == 0, "Can only set color to empty cell"); // Can only set color to empty cell
	board_states_array[cell_x][cell_y] = color_enum;
	RenderBallInCell(color_enum, cell_x, cell_y);
}

function RemoveColorFromCell(cell_x, cell_y) {
	console.assert(board_states_array[cell_x][cell_y] != 0, "Can only remove ocupied cell"); // Can only remove ocupied cell
	board_states_array[cell_x][cell_y] = 0;
	DeRenderBallFromCell(cell_x, cell_y);
}

function AddThreeRandomColoredBallsInRandomPositions(){
	let random_color1 = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];
	let random_color2 = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];
	let random_color3 = ColorsArray[Math.floor(Math.random() * ColorsArray.length)];
	let all_empty_cells_array = [];
	for (var i = 0; i < v_cells; i++) {
		for (var j = 0; j < v_cells; j++) {
			if (board_states_array[i][j] == 0) {
				let arr = [i, j]; // todo use object insted of array
				all_empty_cells_array.push(arr);
			}
		}
	}

	let selected_positions_arr = [];

	function GetRandomEmptyCell(){
		let random_index = Math.floor(Math.random() * all_empty_cells_array.length);
		let random_position = all_empty_cells_array[random_index];
		if (random_position == null){
			return GetRandomEmptyCell();
		}else{
			all_empty_cells_array[random_index] = null;
			console.log("empty");
			console.log(random_position[0], random_position[1]);
			console.log("empty");
			return random_position
		}

	}

	if (all_empty_cells_array.length < 4){
		console.log("Insert losing logic here");
	} else {
		for (var i = 0; i < 3; i++) {
			selected_positions_arr.push(GetRandomEmptyCell());
		}
	}

	console.log(random_color1);
	console.log(random_color2);
	console.log(random_color3);

	SetColorBallToCell(random_color1, selected_positions_arr[0][0], selected_positions_arr[0][1]);
	SetColorBallToCell(random_color2, selected_positions_arr[1][0], selected_positions_arr[1][1]);
	SetColorBallToCell(random_color3, selected_positions_arr[2][0], selected_positions_arr[2][1]);
}

function MakeTurn(){

}

StartGame();

//---------------------------GameLogicEnd--------------------------------------