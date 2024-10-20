import { useState } from "react";
import "@/assets/css/Board.css";
import { useBoardContext, formatTimer } from "@/ulti";
import { Cell } from "@/components";

export default function Board() {
	//get the no of cells and mines from the context
	const { noOfCells, noOfMines, cellMap, updateCellMap } = useBoardContext();

	//console.log({ cellMap });

	if (!cellMap.length)
		return (
			<h3>
				Board cannot be loaded, please click one of the levels above to reload.
			</h3>
		);

	const handleClick = (rowIndex: number, colIndex: number) => {
		//copy the cell map to another value
		const newCellMap = cellMap.map((row) => row.map((cell) => ({ ...cell })));

		const cell = newCellMap[rowIndex][colIndex];
		if (cell.isRevealed) return;

		//make the cell revealed
		cell.isRevealed = true;
		newCellMap[rowIndex][colIndex] = { ...cell };
		console.log({ newCellMap });

		updateCellMap(newCellMap);
	};

	return (
		<section className='board'>
			<BoardHeader noOfMines={noOfMines} />
			<section className='board'>
				{Array.from({ length: noOfCells }).map((_, rowIndex) => (
					<div className='row' key={rowIndex}>
						{Array.from({ length: noOfCells }).map((_, colIndex) => (
							<Cell
								key={`${rowIndex}-${colIndex}`}
								rowIndex={rowIndex}
								colIndex={colIndex}
								cell={cellMap[rowIndex]?.[colIndex]}
								handleClick={handleClick}
							/>
						))}
					</div>
				))}
			</section>
		</section>
	);
}

function BoardHeader({
	noOfMines,
	restartGame,
}: {
	noOfMines: number;
	restartGame?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [timer, setTimer] = useState(0);
	return (
		<header className='board-header'>
			<span className='counter'>{noOfMines}</span>
			<button className='reset-button'>😊</button>
			<span className='timer'>{formatTimer(timer)}</span>
		</header>
	);
}
