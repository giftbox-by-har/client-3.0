import React, { useState, useEffect } from "react";
import { baseUrl } from "../../config";

const CustomGiftPage3 = ({
	selectedBox,
	selectedProducts,
	setSelectedProducts,
	confirmBox,
	setConfirmBox,
}) => {
	const [quantity, setQuantity] = useState(1);
	// Menghitung total harga produk yang dipilih
	const productsTotalPrice = selectedProducts.reduce((accumulator, product) => {
		return accumulator + product.price * product.quantity;
	}, 0);

	// Menambahkan harga dari selectedBox
	const totalPrice = (productsTotalPrice + selectedBox.price) * quantity;

	const handleSelectProduct = (product) => {
		const existingProduct = selectedProducts.find(
			(selectedProduct) => selectedProduct._id === product._id
		);

		if (existingProduct) {
			const updatedSelectedProducts = selectedProducts.map(
				(selectedProduct) => {
					if (selectedProduct._id === product._id) {
						return {
							...selectedProduct,
							quantity: selectedProduct.quantity + 1,
						};
					}
					return selectedProduct;
				}
			);

			setSelectedProducts(updatedSelectedProducts);
		} else {
			// Jika produk belum ada, tambahkan produk ke selectedProducts dengan quantity 1
			setSelectedProducts((selectedProducts) => [
				...selectedProducts,
				{
					...product,
					quantity: 1,
				},
			]);
		}
	};

	const handleRemoveProduct = (product) => {
		const updatedSelectedProducts = selectedProducts
			.map((selectedProduct) => {
				if (selectedProduct._id === product._id) {
					if (selectedProduct.quantity > 1) {
						return {
							...selectedProduct,
							quantity: selectedProduct.quantity - 1,
						};
					} else {
						// Kuantitas produk sudah 1, hapus produk dari selectedProducts
						return null;
					}
				}
				return selectedProduct;
			})
			.filter(Boolean);

		setSelectedProducts(updatedSelectedProducts);
	};

	const handleIncrement = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	useEffect(() => {
		if (confirmBox) {
			saveData();
		}
	}, [confirmBox]);

	const saveData = () => {
		const data = {
			selectedBox,
			selectedProducts,
			quantity,
		};
		localStorage.setItem("customBoxData", JSON.stringify(data));
	};

	return (
		<div>
			<h2 style={{ textAlign: "center" }}>Data Pesanan</h2>
			<p style={{ padding: "0 8px" }}>
				<span className="customgift-code">1</span>
				<span className="customgift-code">2</span>
				<span className="customgift-code customgift-code-active">3</span>|
				Periksa kembali...
			</p>
			<div className="customgiftpage3-content">
				<div className="customgiftpage3-content-div">
					<div className="customgiftpage3-container">
						<div style={{ fontWeight: "bold" }}>
							Produk |{" "}
							{productsTotalPrice.toLocaleString("id-ID", {
								style: "currency",
								currency: "IDR",
							})}
						</div>
						<hr />
						{selectedProducts.map((product) => (
							<div key={product._id} className="customgiftpage3-box">
								<img
									key={product.images[0]}
									src={`${baseUrl}/${product.images[0]}`}
									alt={product.productName}
									style={{
										width: "80px",
										height: "80px",
										borderRadius: "16px",
									}}
								/>
								<div style={{ width: "100%", padding: "0 8px" }}>
									<div style={{ fontWeight: "bold" }}>
										{product.productName}
									</div>
									<div>
										{product.price.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
											width: "100%",
										}}
									>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleRemoveProduct(product);
											}}
											className="adminpage-detail-button"
										>
											-
										</button>
										<span
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											{product.quantity}
										</span>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleSelectProduct(product);
											}}
											className="adminpage-detail-button"
										>
											+
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="customgiftpage3-content-div">
					<div className="customgiftpage3-container">
						<div style={{ fontWeight: "bold" }}>Jenis Kotak</div>
						<hr />
						<div className="customgiftpage3-box">
							<img
								src={`${baseUrl}/${selectedBox.images[0]}`}
								alt={selectedBox.boxName}
								style={{ width: "80px", height: "80px", borderRadius: "16px" }}
							/>
							<div style={{ display: "flex", alignItems: "center" }}>
								<div style={{ width: "100%", padding: "0 8px" }}>
									<div style={{ fontWeight: "bold" }}>
										{selectedBox.boxName}
									</div>
									<div>
										{selectedBox.price.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="customgiftpage3-container">
						<div style={{ fontWeight: "bold" }}>Kuantitas Paket</div>
						<hr />
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<button
								onClick={handleDecrement}
								className="adminpage-detail-button"
							>
								-
							</button>
							{quantity}
							<button
								onClick={handleIncrement}
								className="adminpage-detail-button"
							>
								+
							</button>
						</div>
					</div>
					<div className="customgiftpage3-container">
						<div style={{ fontWeight: "bold" }}>Rangkuman Total</div>
						<hr />
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ fontWeight: "bold" }}>Harga Kotak</div>
							<div>
								{selectedBox.price.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
								})}
							</div>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ fontWeight: "bold" }}>Total Harga Kotak: </div>
							<div>
								{productsTotalPrice.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
								})}
							</div>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ fontWeight: "bold" }}>Kuantitas Paket</div>
							<div>{quantity} Paket</div>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<h4>Harga Total</h4>
							<h4>
								{totalPrice.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
								})}
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomGiftPage3;
