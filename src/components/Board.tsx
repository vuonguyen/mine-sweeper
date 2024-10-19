import "@/assets/css/Board.css";
import { useBoardContext, useSetupCellMap, formatTimer } from "@/ulti";
import { useState } from "react";

export default function Board() {
	//get the no of cells and mines from the context
	const { noOfCells, noOfMines, cellMap } = useBoardContext();

	//setup the cells
	//const { setIsGameStarted } = useSetupCellMap(noOfCells, noOfMines);

	if (!cellMap.length) return null;
	console.log(cellMap);

	return (
		<section className='board'>
			<BoardHeader />
			{Array.from({ length: noOfCells }).map((_, rowIndex) => (
				<div className='row' key={rowIndex}>
					{Array.from({ length: noOfCells }).map((_, colIndex) => (
						<div className='cell' key={`${rowIndex}-${colIndex}`}>
							{cellMap?.[rowIndex]?.[colIndex]?.isMine
								? "💣"
								: cellMap?.[rowIndex]?.[colIndex]?.noOfMinesAround}
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
	restartGame?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [timer, setTimer] = useState(0);
	const { noOfMines } = useBoardContext();
	return (
		<header className='board-header'>
			<span className='counter'>{noOfMines}</span>
			<button className='reset-button'>😊</button>
			<span className='timer'>{formatTimer(timer)}</span>
		</header>
	);
}
