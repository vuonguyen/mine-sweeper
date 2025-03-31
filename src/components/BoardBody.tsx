import { useState } from "react";
import { Cell } from "@/components";
import { CellType } from "@/ulti/types";
import { useBoardContext } from "@/ulti/hooks";
import { revealCellAround0 } from "@/ulti";

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
	const { updateGameStatus, gameStatus } = useBoardContext();
	const [localCellMap, setLocalCellMap] = useState(cellMap);

	const handleClick = (rowIndex: number, colIndex: number) => {
		//if the game is lost - ignore
		if (gameStatus === "lost") return;

		//get the cell from the local cell map
		const cell = localCellMap[rowIndex][colIndex];

		//if the cell is already revealed or flagged - ignore
		if (cell.isRevealed || cell.isFlagged) return;

		//if the cell is a mine - update the game status to lost
		if (cell.isMine) {
			updateGameStatus("lost");
			cell.isRevealed = true;
			return;
		}

		//make the cell revealed
		cell.isRevealed = true;

		//if the cell is a 0, reveal the cells around it
		// if (cell.noOfMinesAround === 0) {
		// 	const updatedCellMap = revealCellAround0(
		// 		localCellMap,
		// 		rowIndex,
		// 		colIndex
		// 	);
		// 	updatedCellMap[rowIndex][colIndex] = { ...cell };
		// 	setLocalCellMap(updatedCellMap);
		// } else {
		//copy the cell map to another value
		const newCellMap = localCellMap.map((row) =>
			row.map((cell) => ({ ...cell }))
		);
		newCellMap[rowIndex][colIndex] = { ...cell };
		setLocalCellMap(newCellMap);
		// }
	};

	const handleRightClick = (rowIndex: number, colIndex: number) => {
		const cell = localCellMap[rowIndex][colIndex];
		if (cell.isRevealed) return; //if the cell is already revealed - ignore

		const newCellMap = localCellMap.map((row) =>
			row.map((cell) => ({ ...cell }))
		);

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
