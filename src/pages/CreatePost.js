import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isEdit, setIsEdit] = React.useState(false);
	const [entryData, setEntryData] = React.useState({
		title: "",
		imageLink: "",
		content: "",
	});
	const [formValidated, setFormValidated] = React.useState(false);
	const [token, setToken] = React.useState(null);

	const formInpuValueSetter = (e) => {
		setEntryData({ ...entryData, [e.target.name]: e.target.value });
	};

	React.useEffect(() => {
		let localToken = localStorage.getItem("token");
		setToken(localToken);
	}, []);

	React.useEffect(() => {
		if (id) {
			setIsEdit(true);
		} else {
			setIsEdit(false);
		}
	}, [id]);

	React.useEffect(() => {
		if (isEdit && id) {
			fetchPost();
		}
	}, [isEdit, id]);

	const fetchPost = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_END_POINT}api/blog/post/${id}`
			);
			setEntryData(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			setFormValidated(true);
		} else {
			setFormValidated(false);
			try {
				axios.defaults.headers.common["x-auth-token"] = token;
				if (isEdit) {
					const { data } = await axios.put(
						`${process.env.REACT_APP_END_POINT}api/blog/post/update`,
						{
							...entryData,
						}
					);
					if (data?._id) {
						navigate("/");
					}
				} else {
					const { data } = await axios.post(
						`${process.env.REACT_APP_END_POINT}api/blog/post/create`,
						{
							...entryData,
						}
					);
					if (data?._id) {
						navigate("/");
					}
				}
			} catch (error) {
				console.error(error);
			} finally {
			}
		}
	};

	console.log(isEdit);

	return (
		<div className="container">
			<Form noValidate validated={formValidated} onSubmit={handleSubmit}>
				<div
					className="d-flex justify-content-between"
					style={{ marginTop: "10px" }}
				>
					<h1 className="h3">Blog {isEdit ? "Editor" : "Creator"}</h1>
					<button className="btn-secondary-color btn-outline m-0 border-radius-none">
						PUBLISH
					</button>
				</div>
				<div style={{ maxWidth: "80%", margin: "auto" }}>
					<Form.Group className="mt-3">
						<Form.Control
							type="text"
							placeholder="Your Title Here"
							onFocus={(e) => e.target.select()}
							name="title"
							onChange={formInpuValueSetter}
							value={entryData?.title}
							required
						/>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							type="text"
							placeholder="Image Link"
							onFocus={(e) => e.target.select()}
							name="imageLink"
							value={entryData?.imageLink}
							onChange={formInpuValueSetter}
							required
						/>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							as="textarea"
							placeholder="Add Content Here"
							onFocus={(e) => e.target.select()}
							name="content"
							value={entryData?.content}
							onChange={formInpuValueSetter}
							rows={20}
							required
						/>
					</Form.Group>
				</div>
			</Form>
		</div>
	);
};

export default CreatePost;
