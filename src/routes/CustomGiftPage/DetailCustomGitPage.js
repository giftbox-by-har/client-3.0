import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import { baseUrl } from "../../config";

const DetailCustomGitPage = ({ productId, setSelectedProductId }) => {
	const [product, setProduct] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState("");
	const [customImage, setCustomImage] = useState("");
	const [customText, setCustomText] = useState("");

	const handleBackClick = () => {
		setSelectedProductId(null);
	};

	const handleSelectVariant = (variant) => {
		setSelectedVariant(variant);
	};

	const handleImageUpload = (event) => {
		setCustomImage(event.target.files[0]);
	};

	const handleImageDelete = () => {
		setCustomImage("");
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	const fetchProduct = async () => {
		try {
			const response = await axios.get(`${baseUrl}/products/${productId}`);
			setProduct(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				handleBackClick();
			}}
			className="customgiftpage-detail-container"
		>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className="customgiftpage-detail-content"
			>
				{product ? (
					<div>
						<div style={{ textAlign: "center" }}>
							<h3>{product.productName}</h3>
							{product.brand && <p>{product.brand}</p>}
							{product.price && (
								<p>
									{product.price.toLocaleString("id-ID", {
										style: "currency",
										currency: "IDR",
									})}
								</p>
							)}
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
												<div
													key={index}
													style={{
														display: "inline-block",
														margin: "0 8px",
														border: "1px solid #000000",
														borderRadius: "16px",
														width: "fit-content",
														padding: "0 8px",
														boxSizing: "border-box",
														cursor: "pointer",
														...(selectedVariant === variant
															? { backgroundColor: "black", color: "white" }
															: {}),
													}}
													onClick={(e) => {
														handleSelectVariant(variant);
													}}
												>
													{variant}
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className="adminpage-detail-container-layout">
								{/* {product.category && (
									<div>
										<p>
											<span style={{ fontWeight: "bold" }}>Kategori:</span>
											&nbsp;
											{product.category.length > 0 && (
												<span style={{ display: "inline" }}>
													{product.category.join(", ")}
												</span>
											)}
										</p>
									</div>
								)} */}
								{product.description && (
									<div>
										<p style={{ fontWeight: "bold" }}>Deskripsi:</p>
										<p>
											{product.description.split("\n").map((line, index) => (
												<React.Fragment key={index}>
													{line}
													{index !==
														product.description.split("\n").length - 1 && (
														<br />
													)}
												</React.Fragment>
											))}
										</p>
									</div>
								)}
								{product.customize && (
									<div>
										{product.customizeType.map((customize, index) => (
											<div key={index}>
												{customize === "TextBox" && (
													<div>
														<textarea
															value={customText}
															placeholder="Tambah Teks"
															className="inputproduct-input"
															style={{ height: "80px", resize: "none" }}
															onChange={(e) => setCustomText(e.target.value)}
														/>
													</div>
												)}
												{customize === "Images" && (
													<div>
														{customImage ? (
															<>
																<div>
																	<img
																		src={URL.createObjectURL(customImage)}
																		alt="Custom Image"
																		style={{ width: "80px", height: "80px" }}
																	/>
																</div>
																<div>
																	<button
																		style={{ width: "80px" }}
																		onClick={handleImageDelete}
																	>
																		Hapus
																	</button>
																</div>
															</>
														) : (
															<input type="file" onChange={handleImageUpload} />
														)}
													</div>
												)}
											</div>
										))}
									</div>
								)}
								<div
									style={{
										display: "flex",
										justifyContent: "flex-end",
										margin: "8px 0",
									}}
								>
									<button
										className="adminpage-detail-button"
										onClick={handleBackClick}
									>
										Tambah Produk
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
		</div>
	);
};

export default DetailCustomGitPage;
