import { createContext, Dispatch } from "react";
import { BoardActionType, CellType, GameStatusType } from "./types";

export const BoardContext = createContext({
	noOfCells: 0,
	noOfMines: 0,
	cellMap: [] as CellType[][],
	gameStatus: "playing" as GameStatusType,
	gameId: "",
	dispatch: (() => {}) as Dispatch<BoardActionType>,
});
