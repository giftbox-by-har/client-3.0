import React from "react";
import MiniButton from "../Button/MiniButton";

const SummaryDetailBox = () => {
	return (
		<div className="summarydetailbox-container">
			<div
				style={{
					background: "grey",
					width: "70px",
					height: "70px",
					borderRadius: "15px",
					marginRight: "10px",
				}}
			></div>
			<div >
				<div>SummaryDetailBox</div>
				<div>Rp. 450.000</div>
				<div>
					<MiniButton button="clear" />
				</div>
			</div>
		</div>
	);
};

export default SummaryDetailBox;
