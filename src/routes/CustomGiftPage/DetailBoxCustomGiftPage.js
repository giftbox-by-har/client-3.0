import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadScreen from "../../components/LoadScreen/LoadScreen";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import { baseUrl } from "../../config";

const DetailBoxCustomGiftPage = ({
	selectedBox,
	setSelectedBox,
	boxId,
	setSelectedBoxId,
    setCurrentPage
}) => {
	const [box, setBox] = useState(null);
	const handleBackClick = () => {
		setSelectedBoxId(null);
	};
	useEffect(() => {
		fetchBox();
	}, []);

	const fetchBox = async () => {
		try {
			const response = await axios.get(`${baseUrl}/box-types/${boxId}`);
			setBox(response.data);
			// console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSelectBox = () => {
		setSelectedBox(box);
		setSelectedBoxId(null);
		setCurrentPage((prevPage) => prevPage + 1);

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
				{box ? (
					<div>
						<div style={{ textAlign: "center" }}>
							<h3>{box.boxName}</h3>
							{box.category && <p>{box.category}</p>}
							{box.price && (
								<p>
									{box.price.toLocaleString("id-ID", {
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
									<ImageViewer images={box.images} />
								</div>
							</div>
							<div className="adminpage-detail-container-layout">
								{box.description && (
									<div>
										<p style={{ fontWeight: "bold" }}>Deskripsi:</p>
										<p>
											{box.description.split("\n").map((line, index) => (
												<React.Fragment key={index}>
													{line}
													{index !== box.description.split("\n").length - 1 && (
														<br />
													)}
												</React.Fragment>
											))}
										</p>
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
										onClick={handleSelectBox}
										disabled={selectedBox._id === box._id}
									>
										Pilih Kotak
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

export default DetailBoxCustomGiftPage;
