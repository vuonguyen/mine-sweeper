import { CellType } from "@/ulti/types";

export default function Cell({
	rowIndex,
	colIndex,
	cell,
	handleClick,
}: {
	rowIndex: number;
	colIndex: number;
	cell: CellType;
	handleClick: (rowIndex: number, colIndex: number) => void;
}) {
	if (!cell) return <span className='cell' />;

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent the default context menu
		//handleRightClick(rowIndex, colIndex);
	};
	return (
		<button
			className='cell'
			onContextMenu={handleContextMenu}
			onClick={() => {
				handleClick(rowIndex, colIndex);
			}}
		>
			{cell.isRevealed ? (cell.isMine ? "💣" : cell.noOfMinesAround) : null}
		</button>
	);
}
