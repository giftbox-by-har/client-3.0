import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";

const Auth = ({ setIsAuthenticated }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);

	const handleLogin = async () => {
		try {
			const response = await axios.post(`${baseUrl}/auth/login`, {
				email,
				password,
			});
			// Simpan token ke local storage atau state aplikasi
			localStorage.setItem("accessToken", response.data.accessToken);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			setIsAuthenticated(true);
			// console.log(response.data);
		} catch (error) {
			alert("Mohon pastikan email dan kata sandi anda benar");
		}
	};

	const handleRegister = async () => {
		try {
			const response = await axios.post(`${baseUrl}/auth/register`, {
				name,
				email,
				password,
			});
			// Simpan token ke local storage atau state aplikasi
			localStorage.setItem("refreshToken", response.data.refreshToken);
			localStorage.setItem("accessToken", response.data.accessToken);
			// console.log(response.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSwitch = () => {
		setIsLogin(!isLogin);
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<div
			className="customgift-container"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "calc(100vh - 64px)",
			}}
		>
			<div
				style={{
					background: "white",
					padding: "8px",
					borderRadius: "16px",
					boxSizing: "border-box",
				}}
			>
				{isLogin ? (
					<h2 style={{ textAlign: "center" }}>Masuk</h2>
				) : (
					<h2 style={{ textAlign: "center" }}>Registrasi</h2>
				)}
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						margin: "0 8px",
					}}
				>
					<button
						onClick={handleSwitch}
						style={{
							padding: "4px",
							borderRadius: "16px",
							cursor: "pointer",
							background: "transparent",
						}}
					>
						{isLogin ? "Registrasi" : "Login"}
					</button>
				</div>
				<div>
					{!isLogin && (
						<input
							type="text"
							placeholder="Name"
							className="inputproduct-input"
							style={{ width: "320px" }}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					)}
				</div>
				<div>
					<input
						type="email"
						placeholder="Email"
						className="inputproduct-input"
						style={{ width: "320px" }}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						className="inputproduct-input"
						style={{ width: "320px" }}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<button
						className="inputproduct-button"
						onClick={isLogin ? handleLogin : handleRegister}
					>
						{isLogin ? "Masuk" : "Registrasi"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Auth;
