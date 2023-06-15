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
			console.log(response.data);
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
			console.log(response.data);
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
		<div>
			{isLogin ? <h2>Login</h2> : <h2>Register</h2>}
			{!isLogin && (
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			)}
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={isLogin ? handleLogin : handleRegister}>
				{isLogin ? "Login" : "Register"}
			</button>
			<p>
				{isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
				<button onClick={handleSwitch}>{isLogin ? "Register" : "Login"}</button>
			</p>
		</div>
	);
};

export default Auth;
