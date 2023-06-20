import React, { useEffect, useState } from "react";
import axios from "axios";
import InputProductForm from "./InputProductForm";
import DetailProductPage from "./DetailProductPage";
import EditProductForm from "./EditProductForm";

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [editingProductId, setEditingProductId] = useState(null);
	const [isInputProductVisible, setInputProductVisible] = useState(false);
	const [addProductButtonText, setAddProductButtonText] =
		useState("+ Tambah Produk");
	const [selectedProductId, setSelectedProductId] = useState(null);
	useEffect(() => {
		if (!isInputProductVisible) {
			fetchProducts();
		}
	}, [isInputProductVisible]);

	const fetchProducts = async () => {
		try {
			const response = await axios.get("http://localhost:5000/products/", {
				params: { search },
			});
			setProducts(response.data.products);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteProduct = async (productId) => {
		try {
			await axios.delete(`http://localhost:5000/products/${productId}`);
			fetchProducts();
			console.log("Produk berhasil dihapus");
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditProduct = (productId) => {
		setEditingProductId(productId);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchProducts();
	};

	const handleAddProductClick = () => {
		setInputProductVisible(true);
		setAddProductButtonText("Batalkah");
	};

	const handleProductClick = (productId) => {
		setSelectedProductId(productId);
	};

	return (
		<div className="productlist-container">
			{isInputProductVisible && (
				<InputProductForm
					setIsInputProductVisible={setInputProductVisible}
					setAddProductButtonText={setAddProductButtonText}
				/>
			)}
			{selectedProductId && (
				<div>
					<DetailProductPage
						productId={selectedProductId}
						setSelectedProductId={setSelectedProductId}
					/>
				</div>
			)}

			{editingProductId && (
				<div>
					<EditProductForm
						productId={editingProductId}
						setEditingProductId={setEditingProductId}
					/>
				</div>
			)}

			{!isInputProductVisible && (
				<div>
					<h2 style={{ textAlign: "center" }}>Daftar Produk</h2>
					<div
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
						}}
					>
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
						<div>
							<button
								className="productlist-div-add"
								onClick={handleAddProductClick}
							>
								{addProductButtonText}
							</button>
						</div>
					</div>
					<div style={{ width: "100%" }}>
						{products.map((product) => (
							<div key={product._id} className="productlist-container-box">
								<div
									className="productlist-content-box"
									onClick={() => handleProductClick(product._id)}
								>
									<div>
										<img
											key={product.images[0]}
											src={`http://localhost:5000/${product.images[0]}`}
											alt={product.productName}
											style={{ width: "144px", height: "144px" }}
										/>
									</div>
									<div style={{ width: "100%" }}>
										<h3 style={{ paddingLeft: "16px" }}>
											{product.productName}
										</h3>
										<p style={{ paddingLeft: "16px" }}>
											{product.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>

										<div
											style={{
												display: "flex",
												justifyContent: "flex-end",
												alignItems: "flex-end",
											}}
										>
											<button
												className="productlist-content-button"
												onClick={(e) => {
													e.stopPropagation();
													handleEditProduct(product._id);
												}}
											>
												Ubah data
											</button>
											<button
												className="productlist-content-button"
												onClick={(e) => {
													e.stopPropagation();
													if (
														window.confirm(
															"Apakah Anda yakin ingin menghapus produk ini?"
														)
													) {
														handleDeleteProduct(product._id);
													}
												}}
											>
												Hapus
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductList;
