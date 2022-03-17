import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import PostDashboard from "./pages/PostDashboard";
import CreatePost from "./pages/CreatePost";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/post" element={<PostDashboard />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/post/create" element={<CreatePost />} />
				<Route path="/post/update/:id" element={<CreatePost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
