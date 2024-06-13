import { Route, Routes } from "react-router-dom";
import CanvasDraw from "./CanvasDraw/CanvasDraw";

export default function App(params) {
	console.log(window.location.pathname);
	return (
		<Routes>
			<Route path="/" element={<CanvasDraw />} />
			<Route path="/:id" element={<CanvasDraw />} />
		</Routes>
	);
}
