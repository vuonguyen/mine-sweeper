import { CellType } from "./types";

export const GameLevels = [
	{ name: "Easy", rows: 9, mines: 10 },
	{ name: "Medium", rows: 16, mines: 40 },
	{ name: "Hard", rows: 24, mines: 99 },
];

export const boardActions = {
	UPDATE_CELL_NO: "UPDATE_CELL_NO",
	UPDATE_CELL_NO_OF_MINES: "UPDATE_CELL_NO_OF_MINES",
	UPDATE_CELL_MAP: "UPDATE_CELL_MAP",
	UPDATE_GAME_STATUS: "UPDATE_GAME_STATUS",
	RESET_GAME: "RESET_GAME",
};

export const setDefaultBoard = (noOfCells: number): CellType[][] => {
	const board: CellType[][] = [];

	for (let i = 0; i < noOfCells; i++) {
		board.push(
			Array.from({ length: noOfCells }, () => ({
				isMine: false,
				isRevealed: false,
				noOfMinesAround: 0,
				isFlagged: false,
			}))
		);
	}

	return board;
};

export const initBoard = (
	noOfCells: number,
	noOfMines: number
): CellType[][] => {
	const newBoard: CellType[][] = setDefaultBoard(noOfCells);

	let minesPlaced = 0;

	while (minesPlaced < noOfMines) {
		const row = getRandomNumber(0, noOfCells - 1);
		const col = getRandomNumber(0, noOfCells - 1);

		if (!newBoard[row][col].isMine) {
			newBoard[row][col].isMine = true;
			minesPlaced++;
		}
	}

	//calculate the no of mines around each cell
	newBoard.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			if (!cell.isMine) {
				cell.noOfMinesAround = calculateNoOfMinesAround(
					newBoard,
					rowIndex,
					colIndex
				);
			}
		});
	});

	//at the end set the board
	return newBoard;
	// setIsGameStarted(false);
};

export const calculateNoOfMinesAround = (
	board: CellType[][],
	rowIndex: number,
	colIndex: number
): number => {
	let noOfMines = 0;
	for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
		if (board[row]) {
			for (let col = colIndex - 1; col <= colIndex + 1; col++) {
				if (board[row][col] && board[row][col].isMine) {
					noOfMines++;
				}
			}
		}
	}

	return noOfMines;
};

export const formatTimer = (timer: number) => {
	return timer.toString().padStart(3, "0");
};

export const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
