import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadScreen from "../../../../components/LoadScreen/LoadScreen";
import ImageViewer from "../../../../components/ImageViewer/ImageViewer";
import { baseUrl } from "../../../../config";

const DetailProductPage = ({ productId, setSelectedProductId }) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		console.log(productId);
		fetchProduct();
	}, []);

	const fetchProduct = async () => {
		try {
			const response = await axios.get(
				`${baseUrl}/products/${productId}`
			);
			setProduct(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleBackClick = () => {
		setSelectedProductId(null);
	};
	return (
		<div className="adminpage-detail-container">
			{product ? (
				<div className="adminpage-detail-container-data">
					<div style={{ textAlign: "center" }}>
						<h3>{product.productName}</h3>
						{product.brand && <p>{product.brand}</p>}
					</div>
					<div className="adminpage-detail-container-content">
						<div className="adminpage-detail-container-layout">
							<div
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<ImageViewer images={product.images} />
							</div>
							<div>
								{product.variantType.length > 0 && (
									<div>
										<p style={{ fontWeight: "bold" }}>Variasi:</p>
										{product.variantType.map((variant, index) => (
											<p
												key={index}
												style={{
													display: "inline-block",
													margin: "0 8px",
													border: "1px solid #000000",
													borderRadius: "16px",
													padding: "0 8px",
													boxSizing: "border-box",
												}}
											>
												{variant}
											</p>
										))}
									</div>
								)}
							</div>
						</div>
						<div className="adminpage-detail-container-layout">
							{product.category && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Kategori:</span>&nbsp;
										{product.category.length > 0 && (
											<span style={{ display: "inline" }}>
												{product.category.join(", ")}
											</span>
										)}
									</p>
								</div>
							)}
							{product.description && (
								<div>
									<p style={{ fontWeight: "bold" }}>Deskripsi:</p>
									<p>
										{product.description.split("\n").map((line, index) => (
											<React.Fragment key={index}>
												{line}
												{index !==
													product.description.split("\n").length - 1 && <br />}
											</React.Fragment>
										))}
									</p>
								</div>
							)}
							{product.price && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Harga:</span>&nbsp;
										{product.price.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</p>
								</div>
							)}
							{product.dimension && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Dimensi:</span>&nbsp;
										{product.dimension.width}x{product.dimension.height}x
										{product.dimension.length}cm
									</p>
									<p>
										<span style={{ fontWeight: "bold" }}>Rasio Kompresi:</span>
										&nbsp;
										{product.dimension.compressionRatio * 100}%
									</p>
								</div>
							)}
							{product.customizeType.length > 0 && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Kustomisasi:</span>
										&nbsp;
										{product.customizeType.length > 0 && (
											<span style={{ display: "inline" }}>
												{product.customizeType.join(", ")}
											</span>
										)}
									</p>
								</div>
							)}
							<div style={{ display: "flex", justifyContent: "flex-end" }}>
								<button
									className="adminpage-detail-button"
									onClick={handleBackClick}
								>
									Ubah data
								</button>
								<button
									className="adminpage-detail-button"
									onClick={handleBackClick}
								>
									Kembali
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<LoadScreen />
			)}
		</div>
	);
};

export default DetailProductPage;
