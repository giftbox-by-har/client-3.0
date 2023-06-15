import React, { useState } from "react";
import OrdersList from "./Orders/OrdersList";
import ItemsList from "./Items/ItemsList";
import "./AdminPage.css";

const AdminPage = () => {
	const [activeComponent, setActiveComponent] = useState("ItemsList");

	const handleComponentChange = (componentName) => {
		setActiveComponent(componentName);
	};

	const renderComponent = () => {
		switch (activeComponent) {
			case "ItemsList":
				return <ItemsList />;
			case "OrdersList":
				return <OrdersList />;
			default:
				return <ItemsList />;
		}
	};

	return (
		<div>
			<div className="adminpage-container-bar">
				<div>
					<button
						className="adminpage-container-button"
						onClick={() => handleComponentChange("ItemsList")}
					>
						Daftar Barang
					</button>
				</div>
				<div>
					<button
						className="adminpage-container-button"
						onClick={() => handleComponentChange("OrdersList")}
					>
						Daftar Pesanan
					</button>
				</div>
				<div style={{justifyContent:'flex-end'}}>
					<button className="adminpage-container-button adminpage-container-button-out">Keluar</button>
				</div>
			</div>
			<div className="adminpage-container-content">{renderComponent()}</div>
		</div>
	);
};

export default AdminPage;
