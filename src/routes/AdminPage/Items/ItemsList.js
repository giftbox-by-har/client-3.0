import React, { useState } from "react";
import ProductList from "./Product/ProductList";
import BoxList from "./Box/BoxList";

const ItemsList = () => {
	const [activeComponent, setActiveComponent] = useState("productList");

	const handleComponentChange = (componentName) => {
		setActiveComponent(componentName);
	};

	const renderComponent = () => {
		switch (activeComponent) {
			case "productList":
				return <ProductList />;
			case "boxTypesList":
				return <BoxList />;
			default:
				return null;
		}
	};

	return (
		<div>
			<div className="itemslist-container-navbar">
				<div>
					<button
						className={activeComponent === "productList" ? "active" : ""}
						onClick={() => handleComponentChange("productList")}
					>
						Produk
					</button>
				</div>
				<div>
					<button
						className={activeComponent === "boxTypesList" ? "active" : ""}
						onClick={() => handleComponentChange("boxTypesList")}
					>
						Kotak
					</button>
				</div>
			</div>
			<div className="itemslist-container-content">{renderComponent()}</div>
		</div>
	);
};

export default ItemsList;
