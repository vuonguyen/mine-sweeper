import { useState, useContext } from "react";
import "../assets/css/App.css";
import { Header, Board } from ".";
import { BoardContext } from "./ulti/context";

function App() {
	const [noOfRows, setNoOfRows] = useState(9);

	return (
		<BoardContext.Provider value={{ noOfRows, setNoOfRows }}>
			<Header />
			<Board />
		</BoardContext.Provider>
	);
}

export default App;
