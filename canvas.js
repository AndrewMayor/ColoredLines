var canvas = document.getElementById('GameCanvas'),
	LeftOffset = canvas.offsetLeft,
	TopOffset = canvas.offsetTop,
	context = canvas.getContext('2d'),
	elements = [];

var v_cells = 9; // MAGIC_CONST
var cell_height = 100; // MAGIC_CONST
var empty_space_between_cells = 1; // MAGIC_CONST
var selected_ball_pos;

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
			if (selected_ball_pos == null) {
				selected_ball_pos = [element.x, element.y];
			} else {
				main.MoveBallToCell(element.x, element.y)
			}
		}
	});

}, false);

// Render elements.
elements.forEach( function (element) {
	context.fillStyle = element.color;
	context.fillRect(element.left, element.top, element.width, element.height);
});

let main = new Main();
main.StartGame();
main.AddThreeRandomColoredBallsInRandomPositions();

let pf = new PathFinding();