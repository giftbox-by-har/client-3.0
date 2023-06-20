import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../config";

const HistoryOrder = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		fetchOrders();
	}, []);
	const fetchOrders = async () => {
		try {
			const response = await axios.get(`${baseUrl}/orders`);
			const filteredOrders = response.data.filter(
				(order) => order.status == "selesai"
			);
			const sortedOrders = filteredOrders.sort((a, b) => {
				return new Date(b.updatedAt) - new Date(a.updatedAt);
			});
			setOrders(sortedOrders);
		} catch (error) {
			console.error("Error fetching orders:", error);
		}
	};
	return (
		<div>
			{orders.length === 0 ? (
				<p>Tidak ada pesanan.</p>
			) : (
				<div style={{ margin: "0 8px" }}>
					{orders.map((order) => (
						<div
							key={order._id}
							className="customgiftpage3-box"
							style={{ background: "white" }}
						>
							<div style={{ width: "100%" }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										width: "100%",
									}}
								>
									<div style={{ fontWeight: "bold" }}>
										Order ID: {order._id}
									</div>
									<div
										style={{
											borderRadius: "16px",
											padding: "4px 8px",
											border: "1px solid #000000",
										}}
									>
										{order.status}
									</div>
								</div>

								<div>
									<div>
										<span style={{ fontWeight: "bold" }}>Pembeli: </span>
										{order.user.name}
									</div>
									<div>
										<span style={{ fontWeight: "bold" }}>Email: </span>
										{order.user.email ? order.user.email : "N/A"}
									</div>
									<div>
										<span style={{ fontWeight: "bold" }}>Nomor Hp: </span>
										{order.user.phonenumber ? order.user.phonenumber : "N/A"}
									</div>
									<div>
										<span style={{ fontWeight: "bold" }}>Alamat: </span>
										{order.user.address ? order.user.address : "N/A"}
									</div>
									<div>
										<span style={{ fontWeight: "bold" }}>
											Tanggal Selesai:{" "}
										</span>
										{order.updatedAt
											? new Date(order.updatedAt).toLocaleString()
											: "N/A"}
									</div>
								</div>
								{order.customPackages.map((customPackage) => (
									<div key={customPackage._id} className="customgiftpage3-box">
										<div style={{ display: "flex", alignItems: "center" }}>
											<img
												key={customPackage.customPackage.boxType.images[0]}
												src={`${baseUrl}/${customPackage.customPackage.boxType.images[0]}`}
												alt={customPackage.customPackage.boxType.boxName}
												style={{
													width: "80px",
													height: "80px",
													borderRadius: "16px",
												}}
											/>
										</div>
										<div>
											<div>
												<span style={{ fontWeight: "bold" }}>
													Jenis Kotak:{" "}
												</span>
												<li>{customPackage.customPackage.boxType.boxName}</li>
											</div>
											<div>
												<div style={{ fontWeight: "bold" }}>Daftar produk:</div>
												<div>
													{customPackage.customPackage.products.map(
														(product) => (
															<li key={product._id}>
																{product.product.productName}{" "}
																<span style={{ fontSize: "12px" }}>
																	(jumlah produk: {product.quantity})
																</span>
															</li>
														)
													)}
												</div>
											</div>
											<div>
												<span style={{ fontWeight: "bold" }}>
													Kuantitas Paket:{" "}
												</span>
												{customPackage.quantity} Paket
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default HistoryOrder;
