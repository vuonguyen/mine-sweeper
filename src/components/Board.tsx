import "@/assets/css/Board.css";
import { useBoardContext, useSetupCellMap, formatTimer } from "@/ulti";
import { useState } from "react";

export default function Board() {
	//get the no of cells and mines from the context
	const { noOfCells, noOfMines } = useBoardContext();

	//setup the cells
	const { board, setIsGameStarted } = useSetupCellMap(noOfCells, noOfMines);

	if (!board.length) return null;

	console.log(board);
	return (
		<section className='board'>
			<BoardHeader restartGame={setIsGameStarted} />
			{Array.from({ length: noOfCells }).map((_, rowIndex) => (
				<div className='row' key={rowIndex}>
					{Array.from({ length: noOfCells }).map((_, colIndex) => (
						<div className='cell' key={`${rowIndex}-${colIndex}`}>
							{board?.[rowIndex]?.[colIndex]?.isMine
								? "💣"
								: board?.[rowIndex]?.[colIndex]?.noOfMinesAround}
						</div>
					))}
				</div>
			))}
		</section>
	);
}

function BoardHeader({
	restartGame,
}: {
	restartGame: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [timer, setTimer] = useState(0);
	const { noOfMines } = useBoardContext();
	return (
		<header className='board-header'>
			<span className='counter'>{noOfMines}</span>
			<button className='reset-button' onClick={() => restartGame(true)}>
				😊
			</button>
			<span className='timer'>{formatTimer(timer)}</span>
		</header>
	);
}
