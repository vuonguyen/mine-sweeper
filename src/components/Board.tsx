import { useState } from "react";
import "@/assets/css/Board.css";
import { useBoardContext } from "@/ulti";
import { BoardBody, BoardHeader } from "@/components";

export default function Board() {
	//get the no of cells and mines from the context
	const { noOfMines, cellMap, gameStatus, gameId } = useBoardContext();
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
			{gameStatus === "lost" && <h3>Game Over, you lost!</h3>}
			{gameStatus === "won" && <h3>Game Over, you won!</h3>}
			<BoardBody
				key={gameId}
				cellMap={cellMap}
				setMinesLeft={setMinesLeft}
				minesLeft={minesLeft}
			/>
		</section>
	);
}
