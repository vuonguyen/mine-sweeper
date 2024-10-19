import { boardActions } from "@/ulti";
export type CellType = {
	isMine: boolean;
	isRevealed: boolean;
	noOfMinesAround: number;
	isFlagged: boolean;
};

export type BoardDefaultStateType = {
	noOfCells: number;
	noOfMines: number;
	cellMap: CellType[][];
};

export type BoardActionType =
	| {
			type: typeof boardActions.UPDATE_CELL_NO;
			payload: number;
	  }
	| {
			type: typeof boardActions.UPDATE_CELL_NO_OF_MINES;
			payload: number;
	  }
	| {
			type: typeof boardActions.UPDATE_CELL_MAP;
			payload: CellType[][];
	  };
