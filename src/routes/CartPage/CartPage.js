import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CartPage.css";
import { useNavigate } from 'react-router';
import { baseUrl } from "../../config";

const CartPage = () => {
	const [customPackages, setCustomPackages] = useState([]);
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
		fetchData();
	}, []);

	const fetchData = async () => {
		const userId = userData._id;
		try {
			const response = await axios.get(
				`${baseUrl}/custom-packages/user/${userId}`
			);
			const customPackagesWithQuantity = response.data.map((customPackage) => ({
				...customPackage,
				quantity: 1,
			}));
			console.log(customPackagesWithQuantity);
			localStorage.setItem(
				"orderPackages",
				JSON.stringify(customPackagesWithQuantity)
			);
			setCustomPackages(customPackagesWithQuantity);
		} catch (error) {
			console.error("Error fetching custom packages:", error);
		}
	};

	const postData = async () => {
		let userData = null;
		const userDataString = localStorage.getItem("userData");

		if (userDataString) {
			userData = JSON.parse(userDataString).user;
		} else {
			// console.log("User data not found in localStorage.");
		}
		try {
			const dataForm = {
				user: userData,
				customPackages: customPackages,
			};
			console.log(dataForm);
			const response = await axios.post(`${baseUrl}/orders`, {
				user: userData,
				customPackages: customPackages,
			});
			console.log("Custom package created:", response.data);
			navigate('/account');
			
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const deleteCustomPackage = async (customPackageId) => {
		try {
			const response = await axios.delete(
				`${baseUrl}/custom-packages/${customPackageId}`
			);
			console.log(response.data.message);
			fetchData();
		} catch (error) {
			console.error("Error deleting custom package:", error);
		}
	};

	const incrementQuantity = (customPackageId) => {
		const existingPackages = customPackages.find(
			(customPackage) => customPackage._id === customPackageId
		);

		if (existingPackages) {
			const updatedCustomPackages = customPackages.map((customPackage) => {
				if (customPackage._id === customPackageId) {
					return {
						...customPackage,
						quantity: customPackage.quantity + 1,
					};
				}
				return customPackage;
			});
			setCustomPackages(updatedCustomPackages);
			localStorage.setItem(
				"orderPackages",
				JSON.stringify(updatedCustomPackages)
			);
		}
	};

	const decrementQuantity = (customPackageId) => {
		const existingPackages = customPackages.find(
			(customPackage) => customPackage._id === customPackageId
		);
		if (existingPackages) {
			const updatedCustomPackages = customPackages.map((customPackage) => {
				if (customPackage._id === customPackageId) {
					if (customPackage.quantity > 0) {
						return {
							...customPackage,
							quantity: customPackage.quantity - 1,
						};
					}
				}
				return customPackage;
			});
			setCustomPackages(updatedCustomPackages);
			localStorage.setItem(
				"orderPackages",
				JSON.stringify(updatedCustomPackages)
			);
		}
	};

	return (
		<div>
			<div className="customgift-container">
				<h2 style={{ textAlign: "center" }}>Keranjang</h2>
				<div className="customgiftpage3-content">
					<div className="customgiftpage3-content-div">
						<div className="customgiftpage3-container">
							<div style={{ fontWeight: "bold" }}>Pilih Produk</div>
							<hr />
							{customPackages.map((customPackage) => {
								const boxTypePrice = customPackage.boxType.price;
								const productsTotalPrice = customPackage.products.reduce(
									(accumulator, product) => {
										return (
											accumulator + product.product.price * product.quantity
										);
									},
									0
								);
								const totalPrice =
									(boxTypePrice + productsTotalPrice) * customPackage.quantity;

								return (
									<div key={customPackage._id} className="customgiftpage3-box">
										<div style={{ display: "flex", alignItems: "center" }}>
											<img
												key={customPackage.boxType.images[0]}
												src={`${baseUrl}/${customPackage.boxType.images[0]}`}
												alt={customPackage.boxType.boxName}
												style={{
													width: "80px",
													height: "80px",
													borderRadius: "16px",
												}}
											/>
										</div>
										<div style={{ width: "100%", padding: "0 8px" }}>
											<div className="cart-box-id-and-delete">
												<div style={{ fontWeight: "bold" }}>
													ID: {customPackage._id}
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "flex-end",
													}}
												>
													<button
														onClick={() =>
															deleteCustomPackage(customPackage._id)
														}
														style={{ margin: "0px" }}
														className="adminpage-detail-button"
													>
														Hapus Kado
													</button>
												</div>
											</div>
											<div>
												<div>
													<span style={{ fontWeight: "bold" }}>
														Jenis Kotak:{" "}
													</span>
													<li>{customPackage.boxType.boxName}</li>
												</div>
											</div>
											<div>
												<div style={{ fontWeight: "bold" }}>Daftar produk:</div>
												<div>
													{customPackage.products.map((product) => (
														<li key={product._id}>
															{product.product.productName}{" "}
															<span style={{ fontSize: "12px" }}>
																(jumlah produk: {product.quantity})
															</span>
														</li>
													))}
												</div>
											</div>
											<div className="cart-box-id-and-delete">
												<div>
													{totalPrice.toLocaleString("id-ID", {
														style: "currency",
														currency: "IDR",
													})}
												</div>
												<div style={{ display: "flex" }}>
													<button
														onClick={() => decrementQuantity(customPackage._id)}
														className="adminpage-detail-button"
													>
														-
													</button>
													<div
														style={{ display: "flex", alignItems: "center" }}
													>
														{customPackage.quantity}
													</div>
													<button
														onClick={() => incrementQuantity(customPackage._id)}
														style={{ marginRight: "0px" }}
														className="adminpage-detail-button"
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="customgiftpage3-content-div">
						<div className="customgiftpage3-container">
							<div style={{ fontWeight: "bold" }}>Rangkuman Pesanan</div>
							<hr />
							<div>
								<span style={{ fontWeight: "bold" }}>Total Kuantitas: </span>
								<span style={{ float: "right" }}>
									{customPackages.reduce((accumulator, customPackage) => {
										return accumulator + customPackage.quantity;
									}, 0)}{" "}
									Paket
								</span>
							</div>
							<div>
								<span style={{ fontWeight: "bold" }}>Total Harga: </span>
								<span style={{ float: "right" }}>
									{customPackages
										.reduce((accumulator, customPackage) => {
											const boxTypePrice = customPackage.boxType.price;
											const productsTotalPrice = customPackage.products.reduce(
												(productAccumulator, product) => {
													return (
														productAccumulator +
														product.product.price * product.quantity
													);
												},
												0
											);
											const totalPrice =
												(boxTypePrice + productsTotalPrice) *
												customPackage.quantity;
											return accumulator + totalPrice;
										}, 0)
										.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
								</span>
							</div>
							<div style={{ textAlign: "center", padding: "8px 0" }}>
								<button className="adminpage-detail-button" onClick={postData}>
									Kirim Pesanan
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
