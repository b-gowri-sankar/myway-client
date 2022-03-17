import axios from "axios";
import React from "react";
import { Image } from "react-bootstrap";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import NavBar from "../components/navBar";

const Post = () => {
	const { id } = useParams();
	const [postId, setPostId] = React.useState(0);
	const [postData, setPostData] = React.useState(undefined);
	React.useEffect(() => {
		setPostId(id);
	}, [id]);
	React.useEffect(() => {
		fetchPost();
	}, [postId]);

	const fetchPost = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_END_POINT}api/blog/post/${postId}`
			);
			setPostData(data);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<NavBar />
			<div style={{ maxWidth: "800px", margin: "auto" }}>
				{postData && (
					<div>
						<h1 className="h1">{postData?.title}</h1>
						<div>
							<Image
								fluid={true}
								src={postData?.imageLink}
								alt={postData?.title}
							/>
						</div>
						<p className="text-muted">
							Created at: <Moment fromNow>{postData?.createdAt}</Moment>
						</p>
						<div className="mb-2">{postData?.content}</div>
						<p>
							Likes: {postData?.likes?.length}
							<br /> Comments: {postData?.comments?.length}
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Post;
