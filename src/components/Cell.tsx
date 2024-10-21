import { CellType } from "@/ulti/types";

export default function Cell({
	rowIndex,
	colIndex,
	cell,
	handleClick,
	handleRightClick,
}: {
	rowIndex: number;
	colIndex: number;
	cell: CellType;
	handleClick: (rowIndex: number, colIndex: number) => void;
	handleRightClick: (rowIndex: number, colIndex: number) => void;
}) {
	if (!cell) return <span className='cell' />;

	const handleContextMenu = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent the default context menu
		handleRightClick(rowIndex, colIndex);
	};

	return (
		<button
			className='cell'
			onContextMenu={handleContextMenu}
			onClick={() => {
				handleClick(rowIndex, colIndex);
			}}
		>
			<CellContent cell={cell} />
		</button>
	);
}

function CellContent({ cell }: { cell: CellType }) {
	if (!cell) return null;
	if (cell.isFlagged) return "🚩";
	return cell.isRevealed ? (cell.isMine ? "💣" : cell.noOfMinesAround) : null;
}
