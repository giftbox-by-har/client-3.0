import React, { useState } from "react";
import Order from "./Order";
import HistoryOrder from "./HistoryOrder";

const TransactionInfo = () => {
	const [activeComponent, setActiveComponent] = useState("ItemsList");

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
			<div>
				<button
					style={{ width: "calc(50% - 16px)", margin: "0 8px" }}
					onClick={() => handleComponentChange("Order")}
					className="customgift-buttoncard"
				>
					Informasi Pesanan
				</button>
				<button
					style={{ width: "calc(50% - 16px)", margin: "0 8px" }}
					onClick={() => handleComponentChange("HistoryOrder")}
					className="customgift-buttoncard"
				>
					Riwayat Pesanan
				</button>
			</div>
			<div>{renderComponent()}</div>
		</div>
	);
};

export default TransactionInfo;
