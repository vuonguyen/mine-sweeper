import { useState } from "react";
import "@/assets/css/Board.css";
import { useBoardContext } from "@/ulti";
import { BoardBody, BoardHeader } from "@/components";

export default function Board() {
	//get the no of cells and mines from the context
	const { noOfCells, noOfMines, cellMap } = useBoardContext();
	const [minesLeft, setMinesLeft] = useState(noOfMines);

	if (!cellMap.length)
		return (
			<h3>
				Board cannot be loaded, please click one of the levels above to reload.
			</h3>
		);

	return (
		<section className='board'>
			<BoardHeader noOfMines={minesLeft} />
			<BoardBody
				//add a key here to force the BoardBody to re-render with a new state
				//if we dont do that the BoardBody will be re-rendered but the state will stay the same and wont update the board
				key={`${cellMap.length}-${noOfCells}-${noOfMines}`}
				cellMap={cellMap}
				setMinesLeft={setMinesLeft}
				minesLeft={minesLeft}
			/>
		</section>
	);
}
