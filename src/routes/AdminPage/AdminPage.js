import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import axios from "axios";
import { baseUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import OrdersList from "./Orders/OrdersList";
import ItemsList from "./Items/ItemsList";
import "./AdminPage.css";

const AdminPage = ({ newToken, setNewToken }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [activeComponent, setActiveComponent] = useState("ItemsList");
	const navigate = useNavigate();
	let userData = null;
	const userDataString = localStorage.getItem("userData");

	if (userDataString) {
		userData = JSON.parse(userDataString).user;
		// console.log(userData);
		// console.log(userData.name);
		// console.log(userData.email);
	} else {
		console.log("User data not found in localStorage.");
	}
	useEffect(() => {
		if (userData && userData.userType !== "Admin") {
			userData = null;
		}
	}, [userData, navigate]);

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		const accessToken = localStorage.getItem("accessToken");

		if (accessToken) {
			setIsLoading(true);
			try {
				const response = await axios.post(`${baseUrl}/auth/verify-token`, {
					accessToken,
				});
				setIsAuthenticated(true);
				setIsLoading(false);
				setNewToken(true);
			} catch (error) {
				try {
					const newAccessToken = await newRefreshToken();
					const response = await axios.post(`${baseUrl}/auth/verify-token`, {
						accessToken: newAccessToken,
					});
					setIsAuthenticated(true);
					setIsLoading(false);
					setNewToken(true);
				} catch (error) {
					console.error(error);
					setIsAuthenticated(false);
					setIsLoading(false);
				}
			}
		} else {
			setIsAuthenticated(false);
			setIsLoading(false);
		}
	};
	const handleComponentChange = (componentName) => {
		setActiveComponent(componentName);
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

			localStorage.setItem("accessToken", accessToken);

			return accessToken;
		} catch (error) {
			throw new Error("Invalid refresh token");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("userData");
		setIsAuthenticated(false);
		console.log("Logout");
	};

	const renderComponent = () => {
		switch (activeComponent) {
			case "ItemsList":
				return <ItemsList />;
			case "OrdersList":
				return <OrdersList />;
			default:
				return <ItemsList />;
		}
	};

	return (
		<div>
			{isAuthenticated ? (
				<div>
					<div className="adminpage-container-bar">
						<div>
							<button
								className="adminpage-container-button"
								onClick={() => handleComponentChange("ItemsList")}
							>
								Daftar Barang
							</button>
						</div>
						<div>
							<button
								className="adminpage-container-button"
								onClick={() => handleComponentChange("OrdersList")}
							>
								Daftar Pesanan
							</button>
						</div>
						<div style={{ justifyContent: "flex-end" }}>
							<button
								className="adminpage-container-button adminpage-container-button-out"
								onClick={handleLogout}
							>
								Keluar
							</button>
						</div>
					</div>
					<div className="adminpage-container-content">{renderComponent()}</div>
				</div>
			) : (
				<Auth setIsAuthenticated={setIsAuthenticated} />
			)}
		</div>
	);
};

export default AdminPage;
