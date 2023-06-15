import React, { useState, useEffect } from "react";
import "./CustomGiftPage.css";
import CustomGiftPage1 from "./CustomGiftPage1";
import CustomGiftPage2 from "./CustomGiftPage2";
import CustomGiftPage3 from "./CustomGiftPage3";
import BotNavCustomGiftPage from "./BotNavCustomGiftPage";

const CustomGiftPage = () => {
	const [selectedBox, setSelectedBox] = useState({});
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [confirmBox, setConfirmBox] = useState(false);
	const currentPageFromLocalStorage = localStorage.getItem("currentCustomPage");
	const [currentPage, setCurrentPage] = useState(
		currentPageFromLocalStorage ? parseInt(currentPageFromLocalStorage) : 1
	);

	const renderComponent = () => {
		if (currentPage === 1) {
			return (
				<CustomGiftPage1
					selectedBox={selectedBox}
					setSelectedBox={setSelectedBox}
					setCurrentPage={setCurrentPage}
				/>
			);
		} else if (currentPage === 2) {
			return (
				<CustomGiftPage2
					selectedBox={selectedBox}
					selectedProducts={selectedProducts}
					setSelectedProducts={setSelectedProducts}
				/>
			);
		} else if (currentPage === 3) {
			if (selectedProducts.length > 0) {
				return (
					<CustomGiftPage3
						selectedBox={selectedBox}
						setSelectedProducts={setSelectedProducts}
						selectedProducts={selectedProducts}
						confirmBox={confirmBox}
						setConfirmBox={setConfirmBox}
					/>
				);
			} else {
				setCurrentPage(2);
				localStorage.setItem("currentCustomPage", 2);
			}
		}
	};

	useEffect(() => {
		const data = localStorage.getItem("customBox");
		console.log("localStorage data:", data);

		if (data) {
			const parsedData = JSON.parse(data);
			setSelectedBox(parsedData.selectedBox);
			setSelectedProducts(parsedData.selectedProducts);
			// console.log("Parsed localStorage data:", parsedData);
		}
	}, []);

	useEffect(() => {
		saveData();
	}, [selectedBox, selectedProducts]);

	const saveData = () => {
		const data = {
			selectedBox,
			selectedProducts,
		};
		localStorage.setItem("customBox", JSON.stringify(data));
	};

	return (
		<div>
			<div>
				<p>{confirmBox ? "true" : "false"}</p>
			</div>

			<div className="customgift-container">{renderComponent()}</div>
			<BotNavCustomGiftPage
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setConfirmBox={setConfirmBox}
			/>
		</div>
	);
};

export default CustomGiftPage;
