import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { baseUrl } from "./config";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./routes/HomePage/HomePage";
import CatalogPage from "./routes/CatalogPage/CatalogPage";
import CustomGiftPage from "./routes/CustomGiftPage/CustomGiftPage";
import CartPage from "./routes/CartPage/CartPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import AdminPage from "./routes/AdminPage/AdminPage";

function App() {
	const pathname = window.location.pathname;
	const [newToken, setNewToken] = useState(false);
	
	useEffect(() => {
		if (newToken) {
			checkToken();
			setNewToken(false)
		}
	}, [newToken]);

	const checkToken = async () => {
		const accessToken = localStorage.getItem("accessToken");

		if (accessToken) {
			try {
				// Kirim request ke server untuk memverifikasi token
				const response = await axios.post(`${baseUrl}/auth/verify-token`, {
					accessToken,
				});
				// Token valid, pengguna terotentikasi
				// console.log(response.data);
				localStorage.setItem("userData", JSON.stringify(response.data));
			} catch (error) {
				// Token tidak valid, coba refresh token
				try {
					const newAccessToken = await newRefreshToken();

					// Kirim request ke server untuk memverifikasi access token baru
					const response = await axios.post(`${baseUrl}/auth/verify-token`, {
						accessToken: newAccessToken,
					});

					// Token valid, pengguna terotentikasi dengan access token baru
					// console.log(response.data);
					localStorage.setItem("userData", JSON.stringify(response.data));
				} catch (error) {
					// Token tidak valid, pengguna belum terotentikasi
					console.error(error);
					// setIsAuthenticated(false);
					// setIsLoading(false);
				}
			}
		} else {
			// Tidak ada token, pengguna belum terotentikasi
			// setIsAuthenticated(false);
			// setIsLoading(false);
		}
	};

	const newRefreshToken = async () => {
		const refreshToken = localStorage.getItem("refreshToken");

		if (!refreshToken) {
			throw new Error("Invalid refresh token");
		}

		try {
			const response = await axios.post(`${baseUrl}/auth/refresh-token`, {
				refreshToken,
			});
			const { accessToken } = response.data;

			// Simpan access token yang baru ke dalam local storage
			localStorage.setItem("accessToken", accessToken);

			return accessToken;
		} catch (error) {
			throw new Error("Invalid refresh token");
		}
	};

	return (
		<div>
			{pathname !== "/adminxyz" && <Navbar />}
			<div className={pathname === "/adminxyz" ? "" : "app-container"}>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/customgift" element={<CustomGiftPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route
						path="/account"
						element={
							<ProfilePage newToken={newToken} setNewToken={setNewToken} />
						}
					/>
					<Route path="/adminxyz" element={<AdminPage newToken={newToken} setNewToken={setNewToken}  />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
