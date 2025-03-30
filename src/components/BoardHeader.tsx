import { useState } from "react";
import { formatTimer } from "@/ulti";
import { useBoardContext } from "@/ulti/hooks";

interface BoardHeaderProps {
	noOfMines: number;
}

export default function BoardHeader({ noOfMines }: BoardHeaderProps) {
	const [timer, setTimer] = useState(0);
	const { gameStatus, resetGame } = useBoardContext();
	return (
		<header className='board-header'>
			<span className='counter'>{formatTimer(noOfMines)}</span>
			<button className='reset-button' onClick={resetGame}>
				{gameStatus === "lost" ? "💀" : "😊"}
			</button>
			<span className='timer'>{formatTimer(timer)}</span>
		</header>
	);
}
