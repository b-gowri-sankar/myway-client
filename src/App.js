import "./App.css";
import NavBar from "./components/navBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
