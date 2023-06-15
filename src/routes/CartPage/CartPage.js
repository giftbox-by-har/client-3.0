import React from "react";
import "./CartPage.css";
// import MiniButton from "../../components/Button/MiniButton";

const CartPage = () => {
	return (
		<div>
			<div className="cart-container">
				<div className="cart-title">Keranjang Produk</div>
				<div className="cart-grid">
					<div className="cart-container-grid">
						<div className="cart-box-1">
							<div className="cart-box-title">Pilih Produk | 0 Produk</div>
							<div className="cart-box-items-container">
								<div className="cart-box-items">
									<div
										style={{
											backgroundImage: "linear-gradient(to bottom, gold, grey)",
											height: "64px",
											width: "64px",
											display: "inline-block",
										}}
									></div>
									<div style={{ width: "calc(100% - 64px)" }}>
										<div className="cart-box-1-sequence-3 cart-box-title">
											Nama Produk
										</div>
										<div className="cart-box-1-sequence-3">Rp. 000</div>
										<div
											className="cart-box-1-sequence-3"
											style={{ float: "right" }}
										>
											{/* <MiniButton button="edit" /> */}
										</div>
									</div>
								</div>
							</div>
							<div className="cart-box-items-container">
								<div className="cart-box-items">
									<div
										style={{
											backgroundImage: "linear-gradient(to bottom, gold, grey)",
											height: "64px",
											width: "64px",
											display: "inline-block",
										}}
									></div>
									<div style={{ width: "calc(100% - 64px)" }}>
										<div className="cart-box-1-sequence-3 cart-box-title">
											Nama Produk
										</div>
										<div className="cart-box-1-sequence-3">Rp. 000</div>
										<div
											className="cart-box-1-sequence-3"
											style={{ float: "right" }}
										>
											{/* <MiniButton button="edit" /> */}
										</div>
									</div>
								</div>
							</div>
							<div className="cart-box-items-container">
								<div className="cart-box-items">
									<div
										style={{
											backgroundImage: "linear-gradient(to bottom, gold, grey)",
											height: "64px",
											width: "64px",
											display: "inline-block",
										}}
									></div>
									<div style={{ width: "calc(100% - 64px)" }}>
										<div className="cart-box-1-sequence-3 cart-box-title">
											Nama Produk
										</div>
										<div className="cart-box-1-sequence-3">Rp. 000</div>
										<div
											className="cart-box-1-sequence-3"
											style={{ float: "right" }}
										>
											{/* <MiniButton button="edit" /> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="cart-container-grida">
						{" "}
						<div className="cart-box-2">
							<div className="cart-box-title">Summary</div>
						</div>
						<div className="cart-box-3"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
