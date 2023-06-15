import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../config";

const InputProductForm = ({
	setIsInputProductVisible,
	setAddProductButtonText,
}) => {
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
	const [alertMessage, setAlertMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Cek jika terdapat field yang masih kosong
		if (
			!productName ||
			!description ||
			!price ||
			!width ||
			!height ||
			!length ||
			!compressionRatio
		) {
			setAlertMessage("Mohon lengkapi semua field");
			// Setelah 3 detik, hapus pesan alert
			setTimeout(() => {
				setAlertMessage("");
			}, 3000);
			return;
		}

		try {
			console.log(productName);
			console.log(description);
			console.log(brand);
			console.log(productName);
			console.log(category);
			console.log(price);
			console.log(width);
			console.log(height);
			console.log(length);
			console.log(images);
			console.log(variants);
			console.log(variantType);
			console.log(customize);
			console.log(customizeType);

			const formData = new FormData();
			formData.append("productName", productName);
			formData.append("description", description);
			formData.append("brand", brand);
			for (let i = 0; i < category.length; i++) {
				formData.append("category[]", category[i]);
			}
			formData.append("price", price);
			formData.append("dimension.width", width);
			formData.append("dimension.height", height);
			formData.append("dimension.length", length);
			formData.append("dimension.compressionRatio", compressionRatio);
			for (let i = 0; i < images.length; i++) {
				formData.append("images", images[i]);
			}
			formData.append("variants", variants);
			variantType.forEach((variant, index) => {
				formData.append(`variantType[${index}]`, variant);
			});
			formData.append("customize", customize);
			customizeType.forEach((type, index) => {
				formData.append(`customizeType[${index}]`, type);
			});

			const response = await axios.post(
				`${baseUrl}/products/`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log(response.data); // Response from the server
			setAlertMessage("Produk berhasil dibuat!");
			// Reset form fields
			setProductName("");
			setDescription("");
			setBrand("");
			setCategory([]);
			setPrice("");
			setWidth("");
			setHeight("");
			setLength("");
			setCompressionRatio("");
			setImages([]);
			setVariants(false);
			setVariantType([]);
			setCustomize(false);
			setCustomizeType([]);
			setIsInputProductVisible(false);
			setAddProductButtonText("+ Tambah Produk");
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
	const handleCancel = () => {
		setIsInputProductVisible(false);
		setAddProductButtonText("+ Tambah Produk");
	};

	return (
		<div style={{ width: "100%" }}>
			{alertMessage && <div>{alertMessage}</div>}
			<h2 style={{ textAlign: "center" }}>Formulir Tambah Produk</h2>
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
					value={productName}
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
						<div key={index} 
						style={{ display:'inline-block', marginRight:'8px' }}
						>
							<div>
								<img
									src={URL.createObjectURL(image)}
									alt={`Image ${index + 1}`}
									style={{ width: "80px", height: "80px" }}
								/>
							</div>
							<div >
								<button style={{ width: "80px" }} onClick={() => handleImageDelete(index)}>Hapus</button>
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
								setVariantType((prevVariantType) => [...prevVariantType, ""])
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
				style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
			>
				<div style={{ width: "20%" }}>
					<button
						type="submit"
						onClick={handleSubmit}
						className="inputproduct-button"
					>
						Simpan
					</button>
				</div>
				<div style={{ width: "20%" }}>
					<button onClick={handleCancel} className="inputproduct-button">
						Batalkan
					</button>
				</div>
			</div>

			<hr />
			<br />
		</div>
	);
};

export default InputProductForm;
