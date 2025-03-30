import { v4 as uuidv4 } from "uuid";
import { useReducer, useContext } from "react";
import {
	BoardDefaultStateType,
	CellType,
	BoardActionType,
	GameStatusType,
} from "./types";
import { boardActions, BoardContext, initBoard } from "@/ulti";

/**
 * Custom hook to manage the board state using a reducer.
 * Only need to use this one when passing data in Context.Provider on App.tsx
 *
 * @param {BoardDefaultStateType} initialState - The initial state of the board
 * @returns {Object} An object containing:
 *   - boardState: The current state of the board
 *   - dispatch: Function to dispatch actions to update the board state
 */
export const useBoardReducer = (initialState: BoardDefaultStateType) => {
	const [boardState, dispatch] = useReducer<
		React.Reducer<BoardDefaultStateType, BoardActionType>
	>(boardReducer, initialState);

	return { boardState, dispatch };
};

const boardReducer = (
	state: BoardDefaultStateType,
	action: BoardActionType
): BoardDefaultStateType => {
	switch (action.type) {
		case boardActions.UPDATE_CELL_NO:
			return {
				...state,
				gameId: uuidv4(),
				noOfCells: action.payload as number,
			};
		case boardActions.UPDATE_CELL_NO_OF_MINES:
			return {
				...state,
				gameId: uuidv4(),
				noOfMines: action.payload as number,
			};
		case boardActions.UPDATE_CELL_MAP:
			return {
				...state,
				gameId: uuidv4(),
				cellMap: action.payload as CellType[][],
			};
		case boardActions.UPDATE_GAME_STATUS:
			return {
				...state,
				gameStatus: action.payload as GameStatusType,
			};
		case boardActions.RESET_GAME:
			return {
				...state,
				gameId: uuidv4(),
				cellMap: initBoard(state.noOfCells, state.noOfMines),
				gameStatus: "playing",
			};
		default:
			return state;
	}
};

/**
 * Custom hook to access and update the board context.
 * Instead of using useContext(BoardContext) for receiving data from Context.Provider everytime we need it, use this one.
 *
 * @returns {Object} An object containing:
 *   - noOfCells: The current number of cells in the board
 *   - noOfMines: The current number of mines in the board
 *   - updateNoOfCells: Function to update the number of cells
 *   - updateNoOfMines: Function to update the number of mines
 */
export const useBoardContext = () => {
	const { noOfCells, noOfMines, cellMap, gameStatus, dispatch, gameId } =
		useContext(BoardContext);

	/**
	 * Updates the number of cells in the board.
	 * @param {number} noOfCells - The new number of cells
	 */
	const updateNoOfCells = (noOfCells: number) => {
		dispatch({ type: boardActions.UPDATE_CELL_NO, payload: noOfCells });
	};

	/**
	 * Updates the number of mines in the board.
	 * @param {number} noOfMines - The new number of mines
	 */
	const updateNoOfMines = (noOfMines: number) => {
		dispatch({
			type: boardActions.UPDATE_CELL_NO_OF_MINES,
			payload: noOfMines,
		});
	};

	/**
	 * Updates the cell map in the board.
	 * @param {CellType[][]} cellMap - The new cell map
	 */
	const updateCellMap = (cellMap: CellType[][]) => {
		dispatch({
			type: boardActions.UPDATE_CELL_MAP,
			payload: cellMap,
		});
	};

	/**
	 * Updates the game status in the board.
	 * @param {GameStatusType} gameStatus - The new game status
	 */
	const updateGameStatus = (gameStatus: GameStatusType) => {
		dispatch({
			type: boardActions.UPDATE_GAME_STATUS,
			payload: gameStatus,
		});
	};

	const resetGame = () => {
		dispatch({ type: boardActions.RESET_GAME, payload: null });
	};

	return {
		noOfCells,
		noOfMines,
		cellMap,
		gameStatus,
		gameId,
		updateNoOfCells,
		updateNoOfMines,
		updateCellMap,
		updateGameStatus,
		resetGame,
	};
};
