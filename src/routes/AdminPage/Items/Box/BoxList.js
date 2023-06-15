import React, { useEffect, useState } from "react";
import axios from "axios";
import InputBoxForm from "./InputBoxForm";
import DetailBoxPage from "./DetailBoxPage";
import EditBoxForm from "./EditBoxForm";
import { baseUrl } from "../../../../config";

const BoxList = () => {
	const [boxTypes, setBoxTypes] = useState([]);
	const [search, setSearch] = useState("");
	const [editingBoxTypeId, setEditingBoxTypeId] = useState(null);
	const [isInputBoxTypeVisible, setInputBoxTypeVisible] = useState(false);
	const [addBoxTypeButtonText, setAddBoxTypeButtonText] =
		useState("+ Tambah Kotak");
	const [selectedBoxTypeId, setSelectedBoxTypeId] = useState(null);
	useEffect(() => {
		if (!isInputBoxTypeVisible) {
			fetchBoxTypes();
		}
	}, [isInputBoxTypeVisible]);

	const fetchBoxTypes = async () => {
		try {
			const response = await axios.get(`${baseUrl}/box-types/`, {
				params: { search },
			});
			setBoxTypes(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteBoxType = async (boxTypeId) => {
		try {
			await axios.delete(`${baseUrl}/box-types/${boxTypeId}`);
			fetchBoxTypes();
			console.log("Box berhasil dihapus");
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditBoxType = (boxTypeId) => {
		setEditingBoxTypeId(boxTypeId);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		fetchBoxTypes();
	};

	const handleAddBoxTypeClick = () => {
		setInputBoxTypeVisible(true);
		setAddBoxTypeButtonText("Batalkah");
	};

	const handleBoxTypeClick = (boxTypeId) => {
		setSelectedBoxTypeId(boxTypeId);
	};

	return (
		<div className="productlist-container">
			{isInputBoxTypeVisible && (
				<InputBoxForm
					setIsInputBoxTypeVisible={setInputBoxTypeVisible}
					setAddBoxTypeButtonText={setAddBoxTypeButtonText}
				/>
			)}
			{selectedBoxTypeId && (
				<div>
					<DetailBoxPage
						boxTypeId={selectedBoxTypeId}
						setSelectedBoxTypeId={setSelectedBoxTypeId}
					/>
				</div>
			)}

			{editingBoxTypeId && (
				<div>
					<EditBoxForm
						boxTypeId={editingBoxTypeId}
						setEditingBoxTypeId={setEditingBoxTypeId}
					/>
				</div>
			)}

			{!isInputBoxTypeVisible && (
				<div>
					<h2 style={{ textAlign: "center" }}>Daftar Kotak</h2>
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
								placeholder="Cari kotak..."
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
								onClick={handleAddBoxTypeClick}
							>
								{addBoxTypeButtonText}
							</button>
						</div>
					</div>
					<div style={{ width: "100%" }}>
						{boxTypes.map((boxType) => (
							<div key={boxType._id} className="productlist-container-box">
								<div
									className="productlist-content-box"
									onClick={() => handleBoxTypeClick(boxType._id)}
								>
									<div>
										<img
											key={boxType.images[0]}
											src={`${baseUrl}/${boxType.images[0]}`}
											alt={boxType.boxName}
											style={{ width: "144px", height: "144px" }}
										/>
									</div>
									<div style={{ width: "100%" }}>
										<h3 style={{ paddingLeft: "16px" }}>
											{boxType.boxName}
										</h3>
										<p style={{ paddingLeft: "16px" }}>
											{boxType.price.toLocaleString("id-ID", {
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
													handleEditBoxType(boxType._id);
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
														handleDeleteBoxType(boxType._id);
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

export default BoxList;
