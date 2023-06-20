import React, { useState } from "react";
import Order from "./Order";
import HistoryOrder from "./HistoryOrder";

const OrdersList = () => {
	const [activeComponent, setActiveComponent] = useState("Order");

	const handleComponentChange = (componentName) => {
		setActiveComponent(componentName);
	};

	const renderComponent = () => {
		switch (activeComponent) {
			case "Order":
				return <Order />;
			case "HistoryOrder":
				return <HistoryOrder />;
			default:
				return <Order />;
		}
	};
	return (
		<div>
			<div className="itemslist-container-navbar">
				<div>
					<button
						onClick={() => handleComponentChange("Order")}
						className={activeComponent === "Order" ? "active" : ""}
					>
						Informasi Pesanan
					</button>
				</div>
				<div>
					<button
						className={activeComponent === "HistoryOrder" ? "active" : ""}
						onClick={() => handleComponentChange("HistoryOrder")}
					>
						Riwayat Pesanan
					</button>
				</div>
			</div>
			<div className="customgift-container">{renderComponent()}</div>
		</div>
	);
};

export default OrdersList;
