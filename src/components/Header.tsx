import "../assets/css/Header.css";
import { useContext } from "react";
import { BoardContext } from "./ulti/context";

export default function Header() {
	const { noOfRows, setNoOfRows } = useContext(BoardContext);

	return (
		<header className='header'>
			<h1>Minesweeper</h1>
			<div className='no-of-rows'>
				<span>Choose your level</span>
				<div className='level-selector'>
					<button className='btn' onClick={() => setNoOfRows(9)}>
						Easy
					</button>
					<button className='btn' onClick={() => setNoOfRows(16)}>
						Medium
					</button>
					<button className='btn' onClick={() => setNoOfRows(24)}>
						Hard
					</button>
				</div>
			</div>
		</header>
	);
}
