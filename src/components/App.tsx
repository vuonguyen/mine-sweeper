import { v4 as uuidv4 } from "uuid";
import "../assets/css/App.css";
import { Header, Board } from ".";
import {
	BoardContext,
	useBoardReducer,
	initBoard,
	useBoardContext,
} from "@/ulti";
import { BoardDefaultStateType, CellType, GameStatusType } from "@/ulti/types";

const initialBoardStateValue: BoardDefaultStateType = {
	noOfCells: 9 as number,
	noOfMines: 10 as number,
	cellMap: initBoard(9, 10) as CellType[][],
	gameStatus: "playing" as GameStatusType,
	gameId: uuidv4(),
};

function App() {
	const { boardState, dispatch } = useBoardReducer(initialBoardStateValue);

	return (
		<BoardContext.Provider value={{ ...boardState, dispatch }}>
			<AppWrapper />
		</BoardContext.Provider>
	);
}

function AppWrapper() {
	const { gameId } = useBoardContext();
	//add a key here to force the Board to re-render with a new state
	//if we dont do that the Board will be re-rendered but the state will stay the same and wont update the board
	return (
		<>
			<Header key={`header-${gameId}`} />
			<Board key={`board-${gameId}`} />
		</>
	);
}
export default App;
