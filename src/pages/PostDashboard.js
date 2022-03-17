import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostDashboard = () => {
	const navigate = useNavigate();
	return (
		<div className="container" style={{ height: "100vh", overflow: "hidden" }}>
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ marginTop: "10px", height: "100%" }}
			>
				<Card
					style={{ cursor: "pointer" }}
					onClick={() => {
						navigate("/post/create");
					}}
				>
					<Card.Body style={{ backgroundColor: "tomato", color: "white" }}>
						CREATE POST
					</Card.Body>
				</Card>
				<Card
					style={{ marginLeft: "10px", cursor: "pointer" }}
					onClick={() => {
						navigate("/post/update");
					}}
				>
					<Card.Body>EDIT POST</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default PostDashboard;
