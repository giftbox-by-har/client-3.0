import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadScreen from "../../../../components/LoadScreen/LoadScreen";
import ImageViewer from "../../../../components/ImageViewer/ImageViewer";
import { baseUrl } from "../../../../config";

const DetailBoxPage = ({boxTypeId, setSelectedBoxTypeId}) => {
  const [box, setBox] = useState(null);

	useEffect(() => {
		console.log(boxTypeId);
		fetchProduct();
	}, []);

	const fetchProduct = async () => {
		try {
			const response = await axios.get(
				`${baseUrl}/box-types/${boxTypeId}`
			);
			setBox(response.data);
		console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

  const handleBackClick = () => {
		setSelectedBoxTypeId(null);
	};
  return (
    <div className="adminpage-detail-container">
      {box ? (
				<div className="adminpage-detail-container-data">
					<div style={{ textAlign: "center" }}>
						<h3>{box.boxName}</h3>
						{box.category && <p>{box.category}</p>}
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
							<div>
								{/* {product.variantType.length > 0 && (
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
								)} */}
							</div>
						</div>
						<div className="adminpage-detail-container-layout">
							{/* {product.category && (
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
							)} */}
							{box.description && (
								<div>
									<p style={{ fontWeight: "bold" }}>Deskripsi:</p>
									<p>
										{box.description.split("\n").map((line, index) => (
											<React.Fragment key={index}>
												{line}
												{index !==
													box.description.split("\n").length - 1 && <br />}
											</React.Fragment>
										))}
									</p>
								</div>
							)}
							{box.price && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Harga:</span>&nbsp;
										{box.price.toLocaleString("id-ID", {
											style: "currency",
											currency: "IDR",
										})}
									</p>
								</div>
							)}
							{box.dimension && (
								<div>
									<p>
										<span style={{ fontWeight: "bold" }}>Dimensi:</span>&nbsp;
										{box.dimension.width}x{box.dimension.height}x
										{box.dimension.length}cm
									</p>
									{/* <p>
										<span style={{ fontWeight: "bold" }}>Rasio Kompresi:</span>
										&nbsp;
										{product.dimension.compressionRatio * 100}%
									</p> */}
								</div>
							)}
							{/* {product.customizeType.length > 0 && (
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
							)} */}
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
  )
}

export default DetailBoxPage