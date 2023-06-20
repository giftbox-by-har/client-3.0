import React, { useState, useEffect } from "react";
import "./CustomGiftPage.css";
import CustomGiftPage1 from "./CustomGiftPage1";
import CustomGiftPage2 from "./CustomGiftPage2";
import CustomGiftPage3 from "./CustomGiftPage3";
import BotNavCustomGiftPage from "./BotNavCustomGiftPage";

const CustomGiftPage = () => {
	const [userData, setUserData] = useState({});
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
			if (selectedBox && selectedBox._id) {
				return (
					<CustomGiftPage2
						selectedBox={selectedBox}
						selectedProducts={selectedProducts}
						setSelectedProducts={setSelectedProducts}
					/>
				);
			} else {
				setCurrentPage(1);
				localStorage.setItem("currentCustomPage", 1);
			}
		} else if (currentPage === 3) {
			if (selectedProducts.length > 0) {
				return (
					<CustomGiftPage3
						userData={userData}
						setSelectedBox={setSelectedBox}
						selectedBox={selectedBox}
						setSelectedProducts={setSelectedProducts}
						selectedProducts={selectedProducts}
						confirmBox={confirmBox}
						setConfirmBox={setConfirmBox}
						setCurrentPage={setCurrentPage}
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
		// console.log(data);

		if (data) {
			const parsedData = JSON.parse(data);
			setUserData(parsedData.userData);
			setSelectedBox(parsedData.selectedBox);
			setSelectedProducts(parsedData.selectedProducts);
		}
	}, []);

	useEffect(() => {
		saveData();
	}, [selectedBox, selectedProducts]);

	const saveData = () => {
		let userData = null;
		const userDataString = localStorage.getItem("userData");

		if (userDataString) {
			userData = JSON.parse(userDataString).user;
		} else {
			// console.log("User data not found in localStorage.");
		}

		const data = {
			userData,
			selectedBox,
			selectedProducts,
		};
		localStorage.setItem("customBox", JSON.stringify(data));
	};

	return (
		<div>
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
