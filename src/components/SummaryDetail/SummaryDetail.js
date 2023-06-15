import React from "react";
import "./SummaryDetail.css";
import SummaryDetailBox from "./SummaryDetailBox";

const SummaryDetail = () => {
	return (
		<div className="summary-container">
			<div className="summary-box">
				<div className="summary-whitebox">
					<div>Produk | Rp. 450.000</div>
                    <div>
                        <SummaryDetailBox/>
                    </div>
				</div>
			</div>
			<div className="summary-box">
				<div className="summary-whitebox">SummaryDetail</div>
			</div>
		</div>
	);
};

export default SummaryDetail;
