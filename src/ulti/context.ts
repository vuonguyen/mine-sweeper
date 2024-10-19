import { createContext, Dispatch } from "react";
import { BoardActionType, CellType } from "./types";

export const BoardContext = createContext({
	noOfCells: 0,
	noOfMines: 0,
	cellMap: [] as CellType[][],
	dispatch: (() => {}) as Dispatch<BoardActionType>,
});
