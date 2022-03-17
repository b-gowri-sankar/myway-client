import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import { Card, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

const Dashboard = () => {
	const navigate = useNavigate();
	const [postData, setPostData] = React.useState([]);
	const [token, setToken] = React.useState(0);
	const [userData, setUserData] = React.useState({});
	const [reload, setReload] = React.useState(false);
	const handleRelaod = () => {
		console.log("it si executing");
		setReload(!reload);
		setPostData([...postData]);
	};
	React.useEffect(() => {
		fetchAllPosts();
	}, []);

	React.useEffect(() => {
		let localToken = localStorage.getItem("token");
		setToken(localToken);
	}, []);

	React.useEffect(() => {
		if (token) {
			let decode = jwtDecode(token);
			setUserData({ ...decode });
		}
	}, [token]);

	const fetchAllPosts = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_END_POINT}api/blog/posts`
			);
			setPostData(data?.data);
		} catch (error) {
			console.error(error);
		}
	};

	const removePost = async (id) => {
		try {
			axios.defaults.headers.common["x-auth-token"] = token;
			const { data } = await axios.delete(
				`${process.env.REACT_APP_END_POINT}api/blog/post/delete/${id}`
			);
		} catch (error) {
			console.error(error);
		} finally {
			fetchAllPosts();
		}
	};

	return (
		<div>
			<NavBar handleRelaod={handleRelaod} />
			<div style={{ maxWidth: "80%", margin: "auto" }}>
				<h3>MyWays Blogs</h3>
				<Row>
					{postData?.map((post) => (
						<div className="col-lg-3 col-md-6 col-sm-12" key={post._id}>
							<Card style={{ margin: "10px" }}>
								<Card.Img variant="top" src={post?.imageLink} />
								<Card.Body>
									<Card.Title>{post?.title}</Card.Title>
									<Card.Text>{post?.content}</Card.Text>
								</Card.Body>
								<Card.Footer style={{ backgroundColor: "white" }}>
									<div className="d-flex justify-content-between">
										{userData?.user?.accountUser === "Admin" && (
											<>
												<p
													className="text-right m-0"
													style={{ color: "tomato", cursor: "pointer" }}
													onClick={() => {
														removePost(post?._id);
													}}
												>
													Delete
												</p>
												<Link
													to={{
														pathname: `/post/update/${post?._id}`,
														state: post,
													}}
												>
													Edit
												</Link>
											</>
										)}
										<p
											className="text-right m-0"
											style={{ color: "rgb(3, 102, 214)", cursor: "pointer" }}
											onClick={() => {
												navigate(`/post/${post._id}`);
											}}
										>
											Read more
										</p>
									</div>
								</Card.Footer>
							</Card>
						</div>
					))}
				</Row>
			</div>
		</div>
	);
};

export default Dashboard;
