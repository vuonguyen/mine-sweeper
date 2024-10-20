import "../assets/css/App.css";
import { Header, Board } from ".";
import { BoardContext, useBoardReducer, initBoard } from "@/ulti";
import { BoardDefaultStateType, CellType } from "@/ulti/types";

const initialBoardStateValue: BoardDefaultStateType = {
	noOfCells: 9 as number,
	noOfMines: 10 as number,
	cellMap: initBoard(9, 10) as CellType[][],
};

function App() {
	const { boardState, dispatch } = useBoardReducer(initialBoardStateValue);

	return (
		<BoardContext.Provider value={{ ...boardState, dispatch }}>
			<Header />
			<Board />
		</BoardContext.Provider>
	);
}

export default App;
