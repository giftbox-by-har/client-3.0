import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailCustomGitPage from "./DetailCustomGitPage";
import { baseUrl } from "../../config";

const CustomGiftPage2 = ({
	selectedBox,
	selectedProducts,
	setSelectedProducts,
}) => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [newLengthBox, setNewLengthBox] = useState(null);
	const [newWidthBox, setNewWidthBox] = useState(null);
	const [newHeightBox, setNewHeightBox] = useState(null);

	useEffect(() => {
		fetchProducts();
		// availabilityProduct();
	}, [search]);

	// const availabilityProduct = () => {
	// 	setNewHeightBox(selectedBox.dimension.height);
	// 	setNewWidthBox(selectedBox.dimension.width);
	// 	setNewLengthBox(selectedBox.dimension.length);
	// };

	// useEffect(() => {
	// 	console.log(newLengthBox);
	// 	console.log(newWidthBox);
	// 	console.log(newHeightBox);
	// }, [newLengthBox, newWidthBox, newHeightBox]);


	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(`${baseUrl}/products/`, {
				params: {
					search: search,
					boxType: selectedBox,
					products: selectedProducts,
				},
			});

			setProducts(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchProducts();
	};

	const handleProductClick = (productId) => {
		setSelectedProductId(productId);
	};

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

	return (
		<div>
			{selectedProductId && (
				<div>
					<DetailCustomGitPage
						productId={selectedProductId}
						setSelectedProductId={setSelectedProductId}
					/>
				</div>
			)}

			<h2 style={{ textAlign: "center" }}>Produk</h2>
			<p style={{ padding: "0 8px" }}>
				<span className="customgift-code">1</span>
				<span className="customgift-code customgift-code-active">2</span>
				<span className="customgift-code">3</span>| Pilih produk sesuai
				keinginanmu...
			</p>
			<div>
				<form onSubmit={handleSearchSubmit} style={{ display: "flex" }}>
					<input
						type="text"
						placeholder="Cari produk..."
						value={search}
						onChange={handleSearchChange}
						className="productlist-div-search"
					/>
					<button type="submit" className="productlist-div-submit">
						Cari
					</button>
				</form>
			</div>
			{isLoading ? (
				<p>Sedang memuat...</p>
			) : (
				<div>
					{products.length === 0 && (
						<p>Produk yang Anda cari tidak ditemukan.</p>
					)}
					{products && (
						<div>
							{products.map((product) => (
								<div key={product._id} className="customgift-card">
									<div
										style={{ display: "flex", justifyContent: "center" }}
										onClick={() => handleProductClick(product._id)}
									>
										<img
											key={product.images[0]}
											src={`${baseUrl}/${product.images[0]}`}
											alt={product.productName}
											style={{ width: "144px", height: "144px" }}
										/>
									</div>
									<div>
										<h4>{product.productName}</h4>
										<p>
											{product.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>
									</div>
									{product.variants ? (
										<button className="customgift-buttoncard">
											pilih variasi
										</button>
									) : (
										<div>
											{product.customize ? (
												<button className="customgift-buttoncard">
													Kustom Produk
												</button>
											) : (
												<div>
													{selectedProducts.find(
														(selectedProduct) =>
															selectedProduct._id === product._id
													) ? (
														<div style={{ display: "flex" }}>
															<button
																onClick={(e) => {
																	e.stopPropagation();
																	handleRemoveProduct(product);
																}}
																className="customgift-buttoncard"
															>
																-
															</button>
															<span
																style={{
																	padding: "0 16px",
																	display: "flex",
																	alignItems: "center",
																}}
															>
																{
																	selectedProducts.find(
																		(selectedProduct) =>
																			selectedProduct._id === product._id
																	).quantity
																}
															</span>
															<button
																onClick={(e) => {
																	e.stopPropagation();
																	handleSelectProduct(product);
																}}
																className="customgift-buttoncard"
															>
																+
															</button>
														</div>
													) : (
														<button
															onClick={(e) => {
																e.stopPropagation();
																handleSelectProduct(product);
															}}
															className="customgift-buttoncard"
														>
															Pilih Produk
														</button>
													)}
												</div>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CustomGiftPage2;
