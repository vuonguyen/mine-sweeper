import { memo, useCallback } from "react";
import "@/assets/css/Header.css";
import { useBoardContext, GameLevels, initBoard } from "@/ulti";

const Header = memo(function Header() {
	const {
		noOfCells,
		updateNoOfCells,
		updateNoOfMines,
		updateCellMap,
		updateGameStatus,
	} = useBoardContext();
	/**
	 * Handles the change of game level.
	 * Updates the number of cells, mines, and initializes a new board based on the selected level.
	 *
	 * @param {Object} level - The selected game level
	 * @param {number} level.rows - The number of rows (and columns) for the new board
	 * @param {number} level.mines - The number of mines for the new board
	 */

	const handleLevelChange = useCallback(
		(level: { rows: number; mines: number }) => {
			updateNoOfCells(level.rows);
			updateNoOfMines(level.mines);
			updateCellMap(initBoard(level.rows, level.mines));
			updateGameStatus("playing");
		},
		[updateNoOfCells, updateNoOfMines, updateCellMap, updateGameStatus]
	);

	return (
		<header className='header'>
			<h1>Minesweeper</h1>
			<div className='no-of-rows'>
				<span>Choose your level</span>
				<div className='level-selector'>
					{GameLevels.map((level) => (
						<button
							key={level.name}
							className={`btn ${noOfCells === level.rows ? "active" : ""}`}
							onClick={() => {
								handleLevelChange(level);
							}}
						>
							{level.name}
						</button>
					))}
				</div>
			</div>
		</header>
	);
});

export default Header;
