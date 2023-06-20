import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailCustomGitPage from "./DetailCustomGitPage";
import { baseUrl } from "../../config";
import { checkProductFitsInBox } from "./boxUtils";

const CustomGiftPage2 = ({
	selectedBox,
	selectedProducts,
	setSelectedProducts,
}) => {
	const [products, setProducts] = useState([]);
	const [recomendations, setRecomendations] = useState([]);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, [search]);

	const fetchProducts = async () => {
		let userData = null;
		const userDataString = localStorage.getItem("userData");

		if (userDataString) {
			userData = JSON.parse(userDataString).user;
		} else {
		}

		try {
			setIsLoading(true);
			const response = await axios.get(`${baseUrl}/products/`, {
				params: {
					search: search,
					user: userData,
				},
			});

			setProducts(response.data.products);
			setRecomendations(response.data.recommendations);
			// console.log(response.data.recommendations);
			setIsLoading(false);
		} catch (error) {
			// console.error(error);
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

		const fitsInBox = checkProductFitsInBox(
			product,
			selectedBox,
			selectedProducts
		);

		if (!fitsInBox) {
			// console.log("Selected product dimensions exceed box dimensions");
			return;
		}

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
						selectedProducts={selectedProducts}
						setSelectedProducts={setSelectedProducts}
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
					{recomendations && recomendations.length > 0 && (
						<div>
							<p> Rekomendasi untukmu:</p>
							{recomendations.map((product) => (
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

										<div>
											{selectedProducts.find(
												(selectedProduct) => selectedProduct._id === product._id
											)?.selectedVariant ? (
												<div>
													variasi:{" "}
													{
														selectedProducts.find(
															(selectedProduct) =>
																selectedProduct._id === product._id
														).selectedVariant
													}
												</div>
											) : (
												<div></div>
											)}
										</div>
										<p>
											{product.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>
									</div>
									{product.variants ? (
										<div>
											{selectedProducts.find(
												(selectedProduct) => selectedProduct._id === product._id
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
														disabled={
															!checkProductFitsInBox(
																product,
																selectedBox,
																selectedProducts
															)
														}
													>
														+
													</button>
												</div>
											) : (
												<button
													className="customgift-buttoncard"
													onClick={(e) => {
														e.stopPropagation();
														handleProductClick(product._id);
													}}
													disabled={
														!checkProductFitsInBox(
															product,
															selectedBox,
															selectedProducts
														)
													}
												>
													Pilih Variasi
												</button>
											)}
										</div>
									) : (
										<div>
											{product.customize ? (
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
																disabled={
																	!checkProductFitsInBox(
																		product,
																		selectedBox,
																		selectedProducts
																	)
																}
															>
																+
															</button>
														</div>
													) : (
														<button
															className="customgift-buttoncard"
															onClick={(e) => {
																e.stopPropagation();
																handleProductClick(product._id);
															}}
															disabled={
																!checkProductFitsInBox(
																	product,
																	selectedBox,
																	selectedProducts
																)
															}
														>
															Pesan Sekarang
														</button>
													)}
												</div>
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
																disabled={
																	!checkProductFitsInBox(
																		product,
																		selectedBox,
																		selectedProducts
																	)
																}
															>
																+
															</button>
														</div>
													) : (
														<button
															className="customgift-buttoncard"
															onClick={(e) => {
																e.stopPropagation();
																handleSelectProduct(product);
															}}
															disabled={
																!checkProductFitsInBox(
																	product,
																	selectedBox,
																	selectedProducts
																)
															}
														>
															Pilih
														</button>
													)}
												</div>
											)}
										</div>
									)}
								</div>
							))}
							<hr />
						</div>
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

										<div>
											{selectedProducts.find(
												(selectedProduct) => selectedProduct._id === product._id
											)?.selectedVariant ? (
												<div>
													variasi:{" "}
													{
														selectedProducts.find(
															(selectedProduct) =>
																selectedProduct._id === product._id
														).selectedVariant
													}
												</div>
											) : (
												<div></div>
											)}
										</div>
										<p>
											{product.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>
									</div>
									{product.variants ? (
										<div>
											{selectedProducts.find(
												(selectedProduct) => selectedProduct._id === product._id
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
														disabled={
															!checkProductFitsInBox(
																product,
																selectedBox,
																selectedProducts
															)
														}
													>
														+
													</button>
												</div>
											) : (
												<button
													className="customgift-buttoncard"
													onClick={(e) => {
														e.stopPropagation();
														handleProductClick(product._id);
													}}
													disabled={
														!checkProductFitsInBox(
															product,
															selectedBox,
															selectedProducts
														)
													}
												>
													Pilih Variasi
												</button>
											)}
										</div>
									) : (
										<div>
											{product.customize ? (
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
																disabled={
																	!checkProductFitsInBox(
																		product,
																		selectedBox,
																		selectedProducts
																	)
																}
															>
																+
															</button>
														</div>
													) : (
														<button
															className="customgift-buttoncard"
															onClick={(e) => {
																e.stopPropagation();
																handleProductClick(product._id);
															}}
															disabled={
																!checkProductFitsInBox(
																	product,
																	selectedBox,
																	selectedProducts
																)
															}
														>
															Pesan Sekarang
														</button>
													)}
												</div>
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
																disabled={
																	!checkProductFitsInBox(
																		product,
																		selectedBox,
																		selectedProducts
																	)
																}
															>
																+
															</button>
														</div>
													) : (
														<button
															className="customgift-buttoncard"
															onClick={(e) => {
																e.stopPropagation();
																handleSelectProduct(product);
															}}
															disabled={
																!checkProductFitsInBox(
																	product,
																	selectedBox,
																	selectedProducts
																)
															}
														>
															Pilih
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
