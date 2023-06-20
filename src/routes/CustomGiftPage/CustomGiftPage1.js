import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";
import DetailBoxCustomGiftPage from "./DetailBoxCustomGiftPage";

const CustomGiftPage1 = ({ selectedBox, setSelectedBox, setCurrentPage }) => {
	const [boxTypes, setBoxTypes] = useState([]);
	const [selectedBoxId, setSelectedBoxId] = useState(null);

	useEffect(() => {
		fetchBoxTypes();
	}, []);

	const fetchBoxTypes = async () => {
		try {
			const response = await axios.get(`${baseUrl}/box-types`);
			setBoxTypes(response.data);
			// console.log("Box types retrieved successfully");
		} catch (error) {
			console.error(error);
		}
	};

	const handleSelectBox = (boxType) => {
		setSelectedBox(boxType);
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const handleBoxClick = (boxId) => {
		setSelectedBoxId(boxId);
	};

	return (
		<div>
			{selectedBoxId && (
				<div>
					<DetailBoxCustomGiftPage
						boxId={selectedBoxId}
						setSelectedBoxId={setSelectedBoxId}
						setSelectedBox={setSelectedBox}
						setCurrentPage={setCurrentPage}
						selectedBox={selectedBox}
					/>
				</div>
			)}

			<h2 style={{ textAlign: "center" }}>Kotak Kado</h2>
			<p style={{ padding: "0 8px" }}>
				<span className="customgift-code customgift-code-active">1</span>
				<span className="customgift-code">2</span>
				<span className="customgift-code">3</span>| Pilih kotak kado sesuai
				keinginanmu...
			</p>
			{boxTypes && (
				<div style={{ padding: "0 8px" }}>
					<div>
						<h3>Kategori: Kotak Reguler</h3>
						<div>
							{boxTypes
								.filter((boxType) => boxType.category === "Kotak Reguler")
								.map((boxType) => (
									<div key={boxType._id} className="customgift-card">
										<div
											style={{ display: "flex", justifyContent: "center" }}
											onClick={() => handleBoxClick(boxType._id)}
										>
											<img
												key={boxType.images[0]}
												src={`${baseUrl}/${boxType.images[0]}`}
												alt={boxType.boxName}
												style={{ width: "144px", height: "144px" }}
											/>
										</div>
										<div>
											<h4>{boxType.boxName}</h4>
											<p>
												{boxType.price.toLocaleString("id-ID", {
													style: "currency",
													currency: "IDR",
												})}
											</p>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleSelectBox(boxType);
											}}
											disabled={selectedBox._id === boxType._id}
											className="customgift-buttoncard"
										>
											Pilih Kotak
										</button>
									</div>
								))}
						</div>
					</div>
					<div>
						<h3>Kategori: Kotak Kecil</h3>
						{boxTypes
							.filter((boxType) => boxType.category === "Kotak Kecil")
							.map((boxType) => (
								<div key={boxType._id} className="customgift-card">
									<div
										style={{ display: "flex", justifyContent: "center" }}
										onClick={() => handleBoxClick(boxType._id)}
									>
										<img
											key={boxType.images[0]}
											src={`${baseUrl}/${boxType.images[0]}`}
											alt={boxType.boxName}
											style={{ width: "144px", height: "144px" }}
										/>
									</div>
									<div>
										<h4>{boxType.boxName}</h4>
										<p>
											{boxType.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleSelectBox(boxType);
										}}
										disabled={selectedBox._id === boxType._id}
										className="customgift-buttoncard"
									>
										Pilih Kotak
									</button>
								</div>
							))}
					</div>
					<div>
						<h3>Kategori: Kotak Besar</h3>
						{boxTypes
							.filter((boxType) => boxType.category === "Kotak Besar")
							.map((boxType) => (
								<div key={boxType._id} className="customgift-card">
									<div
										style={{ display: "flex", justifyContent: "center" }}
										onClick={() => handleBoxClick(boxType._id)}
									>
										<img
											key={boxType.images[0]}
											src={`${baseUrl}/${boxType.images[0]}`}
											alt={boxType.boxName}
											style={{ width: "144px", height: "144px" }}
										/>
									</div>
									<div>
										<h4>{boxType.boxName}</h4>
										<p>
											{boxType.price.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
											})}
										</p>
									</div>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleSelectBox(boxType);
										}}
										disabled={selectedBox._id === boxType._id}
										className="customgift-buttoncard"
									>
										Pilih Kotak
									</button>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomGiftPage1;
