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

canvas.addEventListener('click', function(event) {
    var x = event.pageX - LeftOffset,
        y = event.pageY - TopOffset;

    // Collision detection between clicked offset and element.
    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height &&
        	x > element.left && x < element.left + element.width) {
            alert("you clicked element X=" + element.x + "Y=" + element.y);
        }
    });

}, false);

// Render elements.
elements.forEach( function (element) {
	console.log("element", element.x, element.y, element.width, element.height, element.top, element.left,)
    context.fillStyle = element.color;
    context.fillRect(element.left, element.top, element.width, element.height);
});