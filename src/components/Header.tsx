import "@/assets/css/Header.css";
import { useBoardContext, GameLevels } from "@/ulti";

export default function Header() {
	const { noOfCells, updateNoOfCells, updateNoOfMines } = useBoardContext();

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
								updateNoOfCells(level.rows);
								updateNoOfMines(level.mines);
							}}
						>
							{level.name}
						</button>
					))}
				</div>
			</div>
		</header>
	);
}
