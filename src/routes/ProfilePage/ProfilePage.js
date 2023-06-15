import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import axios from "axios";
import { baseUrl } from "../../config";

const ProfilePage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isAuthenticated) {
			checkToken();
		}
	}, [isAuthenticated]);
	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");

		if (accessToken) {
			setIsLoading(true);
			try {
				// Kirim request ke server untuk memverifikasi token
				const response = await axios.post(
					`${baseUrl}/verify-token`,
					{ accessToken }
				);
				// Token valid, pengguna terotentikasi
				console.log(response.data);
				setUser(response.data.user);
				setIsAuthenticated(true);
				setIsLoading(false);
			} catch (error) {
				// Token tidak valid, coba refresh token
				try {
					const newAccessToken = await refreshToken();

					// Kirim request ke server untuk memverifikasi access token baru
					const response = await axios.post(
						`${baseUrl}/auth/verify-token`,
						{ accessToken: newAccessToken }
					);

					// Token valid, pengguna terotentikasi dengan access token baru
					console.log(response.data);
					setUser(response.data.user);
					setIsAuthenticated(true);
					setIsLoading(false);
				} catch (error) {
					// Token tidak valid, pengguna belum terotentikasi
					console.error(error);
					setIsAuthenticated(false);
					setIsLoading(false);
				}
			}
		} else {
			// Tidak ada token, pengguna belum terotentikasi
			setIsAuthenticated(false);
			setIsLoading(false);
		}
	};

	const refreshToken = async () => {
		const refreshToken = localStorage.getItem("refreshToken");

		if (!refreshToken) {
			throw new Error("Invalid refresh token");
		}

		try {
			const response = await axios.post(
				`${baseUrl}/auth/refresh-token`,
				{ refreshToken }
			);
			const { accessToken } = response.data;

			// Simpan access token yang baru ke dalam local storage
			localStorage.setItem("accessToken", accessToken);

			return accessToken;
		} catch (error) {
			throw new Error("Invalid refresh token");
		}
	};

	const handleLogout = () => {
		// Hapus token dari local storage
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setIsAuthenticated(false);
		setUser(null);
		console.log("Logout");
	};

	if (isLoading) {
		return <div>Loading...</div>; // Tampilkan halaman loading saat isLoading true
	}

	return (
		<div>
			{isAuthenticated ? (
				<div className="customgift-container">
					<h2>Selamat datang, {user && user.name}</h2>
					<p>
						<span style={{ fontWeight: "bold" }}>Email:</span>{" "}
						{user && user.email}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Nomor Hp:</span>{" "}
						{user && user.phonenumber ? user.phonenumber : "Belum ada data"}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Umur:</span>{" "}
						{user && user.age ? user.age : "Belum ada data"}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Jenis Kelamin:</span>{" "}
						{user && user.gender ? user.gender : "Belum ada data"}
					</p>
					<p>
						<span style={{ fontWeight: "bold" }}>Alamat:</span>{" "}
						{user && user.address ? user.address : "Belum ada data"}
					</p>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<button onClick={handleLogout} className="adminpage-detail-button">
							Ubah Data
						</button>
						<button onClick={handleLogout} className="adminpage-detail-button">
							Keluar akun
						</button>
					</div>
					<hr />
					<div>daftar transaksi</div>
				</div>
			) : (
				<Auth setIsAuthenticated={setIsAuthenticated} />
			)}
		</div>
	);
};

export default ProfilePage;
