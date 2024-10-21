import React, { useState } from "react";
import { formatTimer } from "@/ulti";

interface BoardHeaderProps {
	noOfMines: number;
	restartGame?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardHeader({
	noOfMines,
	restartGame,
}: BoardHeaderProps) {
	const [timer, setTimer] = useState(0);

	return (
		<header className='board-header'>
			<span className='counter'>{formatTimer(noOfMines)}</span>
			<button className='reset-button'>😊</button>
			<span className='timer'>{formatTimer(timer)}</span>
		</header>
	);
}
