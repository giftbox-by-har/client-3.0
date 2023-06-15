import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadScreen from "../../../../components/LoadScreen/LoadScreen";
import { baseUrl } from "../../../../config";

const EditProductForm = ({ productId, setEditingProductId }) => {
	const [product, setProduct] = useState(null);
	const [productName, setProductName] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState([]);
	const [price, setPrice] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [length, setLength] = useState("");
	const [compressionRatio, setCompressionRatio] = useState("");
	const [images, setImages] = useState([]);
	const [variants, setVariants] = useState(false);
	const [variantType, setVariantType] = useState([]);
	const [customize, setCustomize] = useState(false);
	const [customizeType, setCustomizeType] = useState([]);

	const handleCancelEdit = () => {
		setEditingProductId(null);
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	const fetchProduct = async () => {
		try {
			const response = await axios.get(
				`${baseUrl}/${productId}`
			);
			setProduct(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const isValidDecimal = (value) => {
		return /^\d*\.?\d+$/.test(value);
	};
	const handleImageUpload = (event) => {
		const selectedImages = Array.from(event.target.files);
		setImages([...images, ...selectedImages]);
	};

	const handleImageDelete = (index) => {
		const updatedImages = [...images];
		updatedImages.splice(index, 1);
		setImages(updatedImages);
	};

	return (
		<div>
			{product ? (
				<div style={{ width: "100%" }}>
					<h2 style={{ textAlign: "center" }}>Ubah Data Produk</h2>
					<div>
						<label>
							Nama Produk
							<span title="Wajib diisi" style={{ color: "red" }}>
								*
							</span>
						</label>
					</div>
					<div>
						<input
							type="text"
							placeholder="Nama Produk"
							value={product.productName}
							className="inputproduct-input"
							onChange={(e) => setProductName(e.target.value)}
						/>
					</div>

					<div>
						<div>
							<label>
								Deskripsi
								<span title="Wajib diisi" style={{ color: "red" }}>
									*
								</span>
							</label>
						</div>
						<div>
							<textarea
								value={description}
								placeholder="Deskripsi Produk"
								className="inputproduct-input"
								style={{ height: "80px", resize: "none" }}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
					</div>
					<div style={{ display: "flex" }}>
						<div style={{ width: "50%" }}>
							<div>
								<label>
									Brand
									<span title="Wajib diisi" style={{ color: "red" }}>
										*
									</span>
								</label>
							</div>
							<div style={{ width: "100%" }}>
								<input
									type="text"
									placeholder="Brand Produk"
									value={brand}
									className="inputproduct-input"
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>
						</div>
						<div style={{ width: "50%" }}>
							<div>
								<label>
									Kategori
									<span title="Wajib diisi" style={{ color: "red" }}>
										*
									</span>
								</label>
							</div>
							<div style={{ width: "100%" }}>
								<input
									type="text"
									placeholder="Kategori"
									value={category.join(",")}
									className="inputproduct-input"
									onChange={(e) => setCategory(e.target.value.split(","))}
								/>
							</div>
						</div>
					</div>
					<div>
						<div>
							<label>
								Harga (Rp)
								<span title="Wajib diisi" style={{ color: "red" }}>
									*
								</span>
							</label>
						</div>
						<div>
							<input
								type="number"
								placeholder="Harga"
								value={price}
								className="inputproduct-input"
								inputMode="numeric"
								onChange={(e) => {
									const inputValue = e.target.value.trimStart();
									if (
										inputValue === "" ||
										(inputValue >= 0 && isValidDecimal(inputValue))
									) {
										setPrice(inputValue);
									}
								}}
							/>
						</div>
					</div>
					<div>
						<div>
							<label>
								Dimensi
								<span title="Wajib diisi" style={{ color: "red" }}>
									*
								</span>
							</label>
						</div>
						<div style={{ display: "flex" }}>
							<div style={{ width: "25%" }}>
								<input
									type="number"
									value={width}
									placeholder="Lebar (cm)"
									inputMode="numeric"
									className="inputproduct-input"
									onChange={(e) => {
										const inputValue = e.target.value.trimStart();
										if (
											inputValue === "" ||
											(inputValue >= 0 && isValidDecimal(inputValue))
										) {
											setWidth(inputValue);
										}
									}}
								/>
							</div>
							<div style={{ width: "25%" }}>
								<input
									type="number"
									value={height}
									placeholder="Tinggi (cm)"
									className="inputproduct-input"
									inputMode="numeric"
									onChange={(e) => {
										const inputValue = e.target.value.trimStart();
										if (
											inputValue === "" ||
											(inputValue >= 0 && isValidDecimal(inputValue))
										) {
											setHeight(inputValue);
										}
									}}
								/>
							</div>
							<div style={{ width: "25%" }}>
								<input
									type="number"
									value={length}
									inputMode="numeric"
									placeholder="Panjang (cm)"
									className="inputproduct-input"
									onChange={(e) => {
										const inputValue = e.target.value.trimStart();
										if (
											inputValue === "" ||
											(inputValue >= 0 && isValidDecimal(inputValue))
										) {
											setLength(inputValue);
										}
									}}
								/>
							</div>
							<div style={{ width: "25%" }}>
								<input
									type="number"
									value={compressionRatio}
									inputMode="numeric"
									placeholder="Rasio Kompresi (%)"
									className="inputproduct-input"
									min={0}
									max={1}
									step={0.01}
									onChange={(e) => {
										const inputValue = e.target.value.trimStart();
										if (
											inputValue === "" ||
											(inputValue >= 0 &&
												inputValue <= 1 &&
												isValidDecimal(inputValue))
										) {
											setCompressionRatio(inputValue);
										}
									}}
								/>
							</div>
						</div>
					</div>
					<div>
						<div>
							<label>
								Gambar
								<span title="Wajib diisi" style={{ color: "red" }}>
									*
								</span>
							</label>
						</div>
						<input type="file" multiple onChange={handleImageUpload} />
						<div>
							{images.map((image, index) => (
								<div
									key={index}
									style={{ display: "inline-block", marginRight: "8px" }}
								>
									<div>
										<img
											src={URL.createObjectURL(image)}
											alt={`Image ${index + 1}`}
											style={{ width: "80px", height: "80px" }}
										/>
									</div>
									<div>
										<button
											style={{ width: "80px" }}
											onClick={() => handleImageDelete(index)}
										>
											Hapus
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<label>Variasi</label>
						<input
							type="checkbox"
							checked={variants}
							onChange={(e) => {
								setVariants(e.target.checked);
								if (e.target.checked && variantType.length === 0) {
									setVariantType([""]);
								} else if (!e.target.checked) {
									setVariantType([]);
								}
							}}
						/>
					</div>
					{variants && (
						<div>
							{variantType.map((variant, index) => (
								<div key={index}>
									<div style={{ display: "flex" }}>
										<div style={{ width: "50%" }}>
											<input
												type="text"
												value={variant}
												placeholder="Nama Variasi"
												className="inputproduct-input"
												onChange={(e) =>
													setVariantType((prevVariantType) => {
														const updatedVariantType = [...prevVariantType];
														updatedVariantType[index] = e.target.value;
														return updatedVariantType;
													})
												}
											/>
										</div>
										<div style={{ display: "flex", alignItems: "center" }}>
											{index !== 0 && (
												<button
													onClick={() =>
														setVariantType((prevVariantType) =>
															prevVariantType.filter((_, i) => i !== index)
														)
													}
													className="inputproduct-button"
												>
													Hapus
												</button>
											)}
										</div>
									</div>
								</div>
							))}
							<div style={{ width: "20%" }}>
								<button
									onClick={() =>
										setVariantType((prevVariantType) => [
											...prevVariantType,
											"",
										])
									}
									className="inputproduct-button"
								>
									Tambah Variasi Lain
								</button>
							</div>
						</div>
					)}

					<div>
						<label>Customisasi</label>
						<input
							type="checkbox"
							checked={customize}
							onChange={(e) => {
								setCustomize(e.target.checked);
								if (!e.target.checked) {
									setCustomizeType([]);
								}
							}}
						/>
					</div>
					{customize && (
						<div>
							<label>Tipe Customisasi:</label>
							<div>
								<label>
									<input
										type="checkbox"
										value="TextBox"
										checked={customizeType.includes("TextBox")}
										onChange={(e) =>
											setCustomizeType((prevCustomizeType) =>
												e.target.checked
													? [...prevCustomizeType, e.target.value]
													: prevCustomizeType.filter(
															(type) => type !== e.target.value
													  )
											)
										}
									/>
									TextBox
								</label>
							</div>
							<div>
								<label>
									<input
										type="checkbox"
										value="Images"
										checked={customizeType.includes("Images")}
										onChange={(e) =>
											setCustomizeType((prevCustomizeType) =>
												e.target.checked
													? [...prevCustomizeType, e.target.value]
													: prevCustomizeType.filter(
															(type) => type !== e.target.value
													  )
											)
										}
									/>
									Images
								</label>
							</div>
							<div>
								<label>
									<input
										type="checkbox"
										value="Multiple TextBox"
										checked={customizeType.includes("Multiple TextBox")}
										onChange={(e) =>
											setCustomizeType((prevCustomizeType) =>
												e.target.checked
													? [...prevCustomizeType, e.target.value]
													: prevCustomizeType.filter(
															(type) => type !== e.target.value
													  )
											)
										}
									/>
									Multiple TextBox
								</label>
							</div>
							<div>
								<label>
									<input
										type="checkbox"
										value="Multiple Images"
										checked={customizeType.includes("Multiple Images")}
										onChange={(e) =>
											setCustomizeType((prevCustomizeType) =>
												e.target.checked
													? [...prevCustomizeType, e.target.value]
													: prevCustomizeType.filter(
															(type) => type !== e.target.value
													  )
											)
										}
									/>
									Multiple Images
								</label>
							</div>
							<div>
								<label>
									<input
										type="checkbox"
										value="CheckBox"
										checked={customizeType.includes("CheckBox")}
										onChange={(e) =>
											setCustomizeType((prevCustomizeType) =>
												e.target.checked
													? [...prevCustomizeType, e.target.value]
													: prevCustomizeType.filter(
															(type) => type !== e.target.value
													  )
											)
										}
									/>
									CheckBox
								</label>
							</div>
						</div>
					)}
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<div style={{ width: "20%" }}>
							<button
								type="submit"
								// onClick={handleSubmit}
								className="inputproduct-button"
							>
								Simpan
							</button>
						</div>
						<div style={{ width: "20%" }}>
							<button onClick={handleCancelEdit} className="inputproduct-button">
								Batalkan
							</button>
						</div>
					</div>

					<hr />
					<br />
				</div>
			) : (
				<LoadScreen />
			)}
		</div>
	);
};

export default EditProductForm;
