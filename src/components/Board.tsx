import "../assets/css/Board.css";
import { useContext } from "react";
import { BoardContext } from "./ulti/context";

export default function Board() {
	const { noOfRows } = useContext(BoardContext);

	return (
		<section className='board'>
			{Array.from({ length: noOfRows }).map((_, rowIndex) => (
				<div className='row' key={rowIndex}>
					{Array.from({ length: noOfRows }).map((_, colIndex) => (
						<div className='cell' key={`${rowIndex}-${colIndex}`}></div>
					))}
				</div>
			))}
		</section>
	);
}
