import { useState } from "react";
import { Cell } from "@/components";
import { CellType } from "@/ulti/types";

interface BoardBodyProps {
	cellMap: CellType[][];
	setMinesLeft: React.Dispatch<React.SetStateAction<number>>;
	minesLeft: number;
}

export default function BoardBody({
	cellMap,
	setMinesLeft,
	minesLeft,
}: BoardBodyProps) {
	const [localCellMap, setLocalCellMap] = useState(cellMap);

	const handleClick = (rowIndex: number, colIndex: number) => {
		//copy the cell map to another value
		const newCellMap = localCellMap.map((row) =>
			row.map((cell) => ({ ...cell }))
		);

		const cell = newCellMap[rowIndex][colIndex];
		if (cell.isRevealed || cell.isFlagged) return;

		//make the cell revealed
		cell.isRevealed = true;
		newCellMap[rowIndex][colIndex] = { ...cell };
		console.log({ newCellMap });

		setLocalCellMap(newCellMap);
	};

	const handleRightClick = (rowIndex: number, colIndex: number) => {
		const newCellMap = localCellMap.map((row) =>
			row.map((cell) => ({ ...cell }))
		);

		const cell = newCellMap[rowIndex][colIndex];
		if (cell.isRevealed) return; //if the cell is already revealed - ignore

		//if the cell is already flagged, turn it into unflagged and increase the mines
		if (cell.isFlagged) {
			cell.isFlagged = false;
			setMinesLeft(minesLeft + 1);
		} else {
			//if the cell is unflagged but there is no mines left - ignore
			if (minesLeft === 0) return;
			//if the cell is not flagged, turn it into flagged and decrease the mines
			cell.isFlagged = true;
			setMinesLeft(minesLeft - 1);
		}

		newCellMap[rowIndex][colIndex] = { ...cell };
		setLocalCellMap(newCellMap);
	};

	return (
		<section className='board'>
			{localCellMap.map((row, rowIndex) => (
				<div className='row' key={rowIndex}>
					{row.map((cell, colIndex) => (
						<Cell
							key={`${rowIndex}-${colIndex}`}
							rowIndex={rowIndex}
							colIndex={colIndex}
							cell={cell}
							handleClick={handleClick}
							handleRightClick={handleRightClick}
						/>
					))}
				</div>
			))}
		</section>
	);
}
