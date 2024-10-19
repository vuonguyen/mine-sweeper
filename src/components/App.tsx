import "../assets/css/App.css";
import { Header, Board } from ".";
import { BoardContext, useBoardReducer } from "@/ulti";
import { BoardDefaultStateType, CellType } from "@/ulti/types";

const initialBoardStateValue: BoardDefaultStateType = {
	noOfCells: 9 as number,
	noOfMines: 10 as number,
	cellMap: [] as CellType[][],
};

function App() {
	const { boardState, dispatch } = useBoardReducer(initialBoardStateValue);

	const { noOfCells, noOfMines, cellMap } = boardState;

	return (
		<BoardContext.Provider value={{ noOfCells, noOfMines, cellMap, dispatch }}>
			<Header />
			<Board />
		</BoardContext.Provider>
	);
}

export default App;
