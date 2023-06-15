import React from "react";

const BotNavCustomGiftPage = ({ currentPage, setCurrentPage, setConfirmBox }) => {
	const handlePrevClick = () => {
		if (currentPage === 1) {
			setCurrentPage(1);
			localStorage.setItem("currentCustomPage", 1);
		} else {
			setConfirmBox(false);
			setCurrentPage((prevPage) => prevPage - 1);
			localStorage.setItem("currentCustomPage", currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage === 3) {
			setConfirmBox(true);
			setCurrentPage(3);
			localStorage.setItem("currentCustomPage", 3);
		} else {
			setCurrentPage((prevPage) => prevPage + 1);
			localStorage.setItem("currentCustomPage", currentPage + 1);
		}
	};
	return (
		<div className="customgift-bottomnav-container">
			<div className="customgift-buttomnav-div">
				<div
					style={{
						display: "flex",
						justifyContent: "end",
						alignItems: "center",
						height: "inherit",
					}}
				>
					{currentPage !== 1 && (
						<div onClick={handlePrevClick}>
							<button className="adminpage-detail-button">Kembali</button>
						</div>
					)}
					<div onClick={handleNextClick}>
						<button className="adminpage-detail-button">
							{currentPage === 3 ? "Selesai" : "Selanjutnya"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BotNavCustomGiftPage;
