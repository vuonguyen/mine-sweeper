import { boardActions } from "@/ulti";
export type CellType = {
	isMine: boolean;
	isRevealed: boolean;
	noOfMinesAround: number;
	isFlagged: boolean;
};

export type GameStatusType = "playing" | "won" | "lost";

export type BoardDefaultStateType = {
	noOfCells: number;
	noOfMines: number;
	cellMap: CellType[][];
	gameStatus: GameStatusType;
	gameId: string;
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
	  }
	| {
			type: typeof boardActions.UPDATE_GAME_STATUS;
			payload: GameStatusType;
	  }
	| {
			type: typeof boardActions.RESET_GAME;
			payload: null;
	  };
