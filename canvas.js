var ColorEnum = {
    RED : "#c82124",
    ORANGE : '#ff9900',
    GREEN : '#33cc00',
    VIOLET : '#9900cc',
    BLUE : '#3300ff',
    PINK : '#ff00cc',
    YELOW : '#ffff00'
}

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
			x: i + 1,
			y: j + 1,
		    width: cell_height,
		    height: cell_height,
		    left: (i * cell_height) + (i * empty_space_between_cells),
		    top: (j * cell_height) + (j * empty_space_between_cells)
		});
	}
}


function GetSquareCenterPositionByCellIndex(cell_x, cell_y) {
	var x, y;
	x = (cell_x * cell_height) + (cell_x * empty_space_between_cells) - (cell_height / 2) - empty_space_between_cells;
	y = (cell_y * cell_height) + (cell_y * empty_space_between_cells) - (cell_height / 2) - empty_space_between_cells;

	return [x, y];
}

function RemoveBall(cell_x, cell_y) {
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

function CreateBallInCell(color, cell_x, cell_y) {
	var position = GetSquareCenterPositionByCellIndex(cell_x, cell_y)
	/*console.log(
		position[0],
		position[1]);*/
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
        	RemoveBall(element.x, element.y);
        	//CreateBallInCell("blue", element.x, element.y);
            //alert("you clicked element X=" + element.x + "Y=" + element.y);
        }
    });

}, false);

// Render elements.
elements.forEach( function (element) {
	/*console.log("element", element.x, element.y, element.width, element.height, element.top, element.left,)*/
    context.fillStyle = element.color;
    context.fillRect(element.left, element.top, element.width, element.height);
});

CreateBallInCell(ColorEnum.GREEN, 3, 3);
CreateBallInCell(ColorEnum.ORANGE, 3, 5);
CreateBallInCell(ColorEnum.VIOLET, 8, 7);
CreateBallInCell(ColorEnum.BLUE, 9, 1);
CreateBallInCell(ColorEnum.VIOLET, 7, 5);
