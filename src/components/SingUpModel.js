import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";

const SignUpModel = ({ show, handleClose, handleLogin, handleSubmitData }) => {
	const [entryData, setEntryData] = React.useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
	});
	const [formValidated, setFormValidated] = React.useState(false);
	React.useEffect(() => {
		if (show) {
			setEntryData({
				fullName: "",
				email: "",
				password: "",
				confirmPassword: "",
				phoneNumber: "",
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
			if (entryData?.confirmPassword === entryData?.password) {
				handleSubmitData({
					...entryData,
					phoneNumber: parseInt(entryData?.phoneNumber),
				});
			} else {
				setFormValidated(true);
			}
		}
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Body className="p-5">
				<Row className="mb-4">
					<Col className="col-10">
						<h2 className="text-center">Sign Up</h2>
					</Col>
				</Row>
				<Form noValidate validated={formValidated} onSubmit={handleSubmit}>
					<Form.Group className="mt-3">
						<Form.Control
							type="text"
							placeholder="Full Name"
							onFocus={(e) => e.target.select()}
							name="fullName"
							value={entryData?.fullName}
							onChange={(e) => formInpuValueSetter(e)}
							required
						/>
					</Form.Group>
					<Form.Group className="mt-3">
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
							type="number"
							placeholder="Phone Number"
							onFocus={(e) => e.target.select()}
							name="phoneNumber"
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
					<Form.Group className="mt-3">
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onFocus={(e) => e.target.select()}
							value={entryData?.confirmPassword}
							onChange={formInpuValueSetter}
							required
						/>
					</Form.Group>

					{formValidated && entryData?.confirmPassword !== entryData?.password && (
						<span className="mt-3" style={{ color: "#dc3545" }}>
							passwords should match
						</span>
					)}

					<p className="mt-2">
						By Registering, you agree to the
						<br />
						<span>Terms & Conditions</span> and <span>Privacy Policy</span>
					</p>

					<button
						className="btn-outline btn-secondary-color m-0 mt-2 btn-block w-100"
						type="submit"
					>
						Register as Candidate
					</button>
					<p className="text-muted text-center my-2">Forgot your password?</p>
					<h5 className="text-center">
						Alread have an account?{" "}
						<span
							style={{ color: "rgb(3, 102, 214)", cursor: "pointer" }}
							onClick={handleLogin}
						>
							Login
						</span>
					</h5>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default SignUpModel;
