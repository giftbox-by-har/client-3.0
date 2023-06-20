import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="homepage-container">
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "inherit",
					color: "white",
				}}
			>
				<div className="homepage-content">
					<div style={{ width: "640px" }}>
						<h2>BUAT KADO</h2>
						<p>Buat Kado dengan isi produk sesuai keinginanmu</p>
					</div>
					<div
						style={{
							width: "320px",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Link to="/customgift">
							<button
								style={{
									padding: "8px 16px",
									background: "transparent",
									border: "1px solid #FFFFFF",
									borderRadius: "16px",
									color: "#FFFFFF",
									cursor: "pointer",
								}}
							>
								Kunjungi
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
