import { createContext } from "react";

export const BoardContext = createContext({
	noOfRows: 9,
	setNoOfRows: (noOfRows: number) => {},
});
