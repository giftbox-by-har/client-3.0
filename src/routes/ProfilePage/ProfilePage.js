import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import axios from "axios";
import { baseUrl } from "../../config";
import TransactionInfo from "./TransactionInfo";

const ProfilePage = ({ newToken, setNewToken }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [editedUser, setEditedUser] = useState(null);
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

		if (accessToken) {
			setIsLoading(true);
			try {
				const response = await axios.post(`${baseUrl}/auth/verify-token`, {
					accessToken,
				});
				setUser(response.data.user);
				setIsAuthenticated(true);
				setIsLoading(false);
				setNewToken(true);
			} catch (error) {
				try {
					const newAccessToken = await newRefreshToken();
					const response = await axios.post(`${baseUrl}/auth/verify-token`, {
						accessToken: newAccessToken,
					});
					setUser(response.data.user);
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
		setUser(null);
		console.log("Logout");
	};

	const handleEditUser = () => {
		setEditedUser(user);
	};

	const handleCancelEdit = () => {
		setEditedUser(null);
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		if (!editedUser.gender) {
			console.log("Please select the gender");
			return;
		  }
		try {
			const response = await axios.put(
				`${baseUrl}/users/${user._id}`,
				editedUser
			);
			const updatedUser = response.data;
			setUser(updatedUser);
			setEditedUser(null);
			console.log("User updated successfully");
		} catch (error) {
			console.error("Failed to update user:", error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{isAuthenticated ? (
				<div className="customgift-container">
					{editedUser ? (
						<div>
							<h2>Ubah Data Pengguna</h2>
							<form onSubmit={handleUpdateUser}>
								<div>
									<label>
										Nama:
										<input
											type="text"
											value={editedUser.name}
											onChange={(e) =>
												setEditedUser({ ...editedUser, name: e.target.value })
											}
										/>
									</label>
								</div>
								{/* <div>
									<label>
										Email:
										<input
											type="email"
											value={editedUser.email}
											onChange={(e) =>
												setEditedUser({ ...editedUser, email: e.target.value })
											}
										/>
									</label>
								</div> */}
								<div>
									<label>
										Nomor HP:
										<input
											type="text"
											value={editedUser.phonenumber || ""}
											onChange={(e) =>
												setEditedUser({
													...editedUser,
													phonenumber: e.target.value,
												})
											}
										/>
									</label>
								</div>
								<div>
									<label>
										Umur:
										<input
											type="text"
											value={editedUser.age || ""}
											onChange={(e) =>
												setEditedUser({ ...editedUser, age: e.target.value })
											}
										/>
									</label>
								</div>
								<div>
									<label>
										Jenis Kelamin:
										<select
											value={editedUser.gender || ""}
											onChange={(e) =>
												setEditedUser({ ...editedUser, gender: e.target.value })
											}
										>
											<option value="">Pilih Jenis Kelamin</option>
											<option value="Laki-Laki">Laki-Laki</option>
											<option value="Perempuan">Perempuan</option>
										</select>
									</label>
								</div>
								<div>
									<label>
										Alamat:
										<input
											type="text"
											value={editedUser.address || ""}
											onChange={(e) =>
												setEditedUser({
													...editedUser,
													address: e.target.value,
												})
											}
										/>
									</label>
								</div>
								<button type="submit">Simpan</button>
								<button onClick={handleCancelEdit}>Batal</button>
							</form>
						</div>
					) : (
						<div>
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
								<button
									onClick={handleEditUser}
									className="adminpage-detail-button"
								>
									Ubah Data
								</button>
								<button
									onClick={handleLogout}
									className="adminpage-detail-button"
								>
									Keluar akun
								</button>
							</div>
						</div>
					)}
					<hr />
					<div>
						<TransactionInfo />
					</div>
				</div>
			) : (
				<Auth setIsAuthenticated={setIsAuthenticated} />
			)}
		</div>
	);
};

export default ProfilePage;
