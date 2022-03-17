import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

const LoginModle = ({ show, handleClose, handleSignUp, handleSubmitData }) => {
	const [entryData, setEntryData] = React.useState({
		email: "",
		password: "",
	});
	const [formValidated, setFormValidated] = React.useState(false);
	React.useEffect(() => {
		if (show) {
			setEntryData({
				email: "",
				password: "",
			});
		}
	}, [show]);

	const formInpuValueSetter = (e) => {
		setEntryData({ ...entryData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			setFormValidated(true);
		} else {
			setFormValidated(false);
			handleSubmitData && handleSubmitData(entryData);
		}
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body className="p-5">
				<Row className="mb-4">
					<Col className="col-10">
						<h2 className="text-center">Login</h2>
					</Col>
				</Row>
				<Form noValidate validated={formValidated} onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Control
							type="email"
							placeholder="Email"
							onFocus={(e) => e.target.select()}
							name="email"
							value={entryData?.email}
							onChange={formInpuValueSetter}
							required
						/>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Control
							type="password"
							placeholder="Password"
							onFocus={(e) => e.target.select()}
							name="password"
							value={entryData?.password}
							onChange={formInpuValueSetter}
							required
						/>
					</Form.Group>
					<button
						className="btn-outline btn-secondary-color m-0 mt-3 btn-block w-100"
						type="submit"
					>
						Login
					</button>
					<p className="text-muted text-center my-2">Forgot your password?</p>
					<h5 className="text-center">
						Don't have an account?{" "}
						<span
							style={{ color: "rgb(3, 102, 214)", cursor: "pointer" }}
							onClick={handleSignUp}
						>
							Register
						</span>
					</h5>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModle;
