class Main {
	constructor(canvas) {
		this.canvas = canvas;
		this.v_cells = 9;
		this.ColorsArray = [
			"#c82124", //RED
			'#ff9900', //ORANGE
			'#33cc00', //GREEN
			'#9900cc', //VIOLET
			'#3300ff', //BLUE
			'#ff00cc', //PINK
			'#ffff00' //YELOW
		]
	}

	PrintArrayToConsole(arr) { // helps in debug
		var arrText = '';
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				arrText += arr[i][j] + ' ';
			}
			console.log(arrText);
			arrText = '';
		}
	}

	StartGame() {
		this.board_states_array = new Array(this.v_cells - 1);
		for (var i = 0; i < this.v_cells; i++) {
		  this.board_states_array[i] = new Array(this.v_cells - 1);
		}
		for (var i = 0; i < this.v_cells; i++) {
			for (var j = 0; j < this.v_cells; j++) {
				this.board_states_array[i][j] = 0; // initital empty board values are 0
			}
		}

		this.PrintArrayToConsole(this.board_states_array)
	}

	MoveBallToCell(target_cell_x, target_cell_y) {
		console.assert(selected_ball_pos != null, "Trying to move when no ball selected");
		let color = this.GetColorFromCell(selected_ball_pos[0], selected_ball_pos[1]);
		console.assert(color != 0, "Trying to move empty ball to cell");
		this.SetColorBallToCell(color, target_cell_x, target_cell_y);
		this.RemoveColorBallFromCell(selected_ball_pos[0], selected_ball_pos[1])
		selected_ball_pos = null;
		this.AddThreeRandomColoredBallsInRandomPositions();
	}

	GetColorFromCell(cell_x, cell_y) {
		return this.board_states_array[cell_x][cell_y];
	}

	SetColorBallToCell(color_enum, cell_x, cell_y) {
		console.assert(this.board_states_array[cell_x][cell_y] == 0, "Can only set color to empty cell"); // Can only set color to empty cell
		this.board_states_array[cell_x][cell_y] = color_enum;
		RenderBallInCell(color_enum, cell_x, cell_y);
	}

	RemoveColorBallFromCell(cell_x, cell_y) {
		console.assert(this.board_states_array[cell_x][cell_y] != 0, "Can only remove ocupied cell"); // Can only remove ocupied cell
		this.board_states_array[cell_x][cell_y] = 0;
		DeRenderBallFromCell(cell_x, cell_y);
	}

	AddThreeRandomColoredBallsInRandomPositions() {
		let random_color1 = this.ColorsArray[Math.floor(Math.random() * this.ColorsArray.length)];
		let random_color2 = this.ColorsArray[Math.floor(Math.random() * this.ColorsArray.length)];
		let random_color3 = this.ColorsArray[Math.floor(Math.random() * this.ColorsArray.length)];
		let all_empty_cells_array = [];
		for (var i = 0; i < this.v_cells; i++) {
			for (var j = 0; j < this.v_cells; j++) {
				if (this.board_states_array[i][j] == 0) {
					let arr = [i, j]; // todo use object insted of array
					all_empty_cells_array.push(arr);
				}
			}
		}

		let selected_positions_arr = [];
		function GetRandomEmptyCell() {
			let random_index = Math.floor(Math.random() * all_empty_cells_array.length);
			let random_position = all_empty_cells_array[random_index];
			if (random_position == null) {
				return GetRandomEmptyCell();
			}else{
				all_empty_cells_array[random_index] = null;
				console.log(random_position[0], random_position[1]);
				return random_position
			}

		}

		if (all_empty_cells_array.length < 4) {
			console.log("Insert losing logic here"); // todo
		} else {
			for (var i = 0; i < 3; i++) {
				selected_positions_arr.push(GetRandomEmptyCell());
			}
		}
		console.log(random_color1, random_color2, random_color3);
		this.SetColorBallToCell(random_color1, selected_positions_arr[0][0], selected_positions_arr[0][1]);
		this.SetColorBallToCell(random_color2, selected_positions_arr[1][0], selected_positions_arr[1][1]);
		this.SetColorBallToCell(random_color3, selected_positions_arr[2][0], selected_positions_arr[2][1]);
	}
};