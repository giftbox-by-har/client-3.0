import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { MdCardGiftcard, MdAccountCircle } from "react-icons/md";
import { FaShoppingBag, FaGift, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
	return (
		<div>
			<div className="navbar-container-top">
				<div className="navbar-top">
					<div className="navbar-top-logo">
						<NavLink to="/" className="w-color-text">
							GIFTBOX
						</NavLink>
					</div>
					<div className="navbar-top-style-1">
						<div>
							<NavLink to="/catalog" className="w-color-text">
								Katalog
							</NavLink>
						</div>
						<div>
							<NavLink to="/customgift" className="w-color-text">
								Buat Kado
							</NavLink>
						</div>
						<div>
							<NavLink to="/#" className="w-color-text">
								Rekomendasi
							</NavLink>
						</div>
					</div>
					<div className="navbar-top-style-2">
						<div>
							<NavLink to="/cart" className="w-color-text">
								Keranjang
							</NavLink>
						</div>
						<div>
							<NavLink to="/account" className="w-color-text">
								Akun Saya
							</NavLink>
						</div>
					</div>
				</div>
			</div>

			<div className="navbar-container-bottom">
				<div className="navbar-bottom">
					<div className="navbar-bottom-style">
						<NavLink to="/catalog">
							<div>
								<FaShoppingBag size={24} color="#ffffff" />
							</div>
							<div className="w-color-text">Katalog</div>
						</NavLink>
					</div>
					<div className="navbar-bottom-style">
						<NavLink to="/customgift">
							<div>
								<MdCardGiftcard size={24} color="#ffffff" />
							</div>
							<div className="w-color-text">Buat Kado</div>
						</NavLink>
					</div>
					<div className="navbar-bottom-style">
						<NavLink to="/#">
							<div>
								<FaGift size={24} color="#ffffff" />
							</div>
							<div className="w-color-text">Rekomendasi</div>
						</NavLink>
					</div>
					<div className="navbar-bottom-style">
						<NavLink to="/cart">
							<div>
								<FaShoppingCart size={24} color="#ffffff" />
							</div>
							<div className="w-color-text">Keranjang</div>
						</NavLink>
					</div>
					<div className="navbar-bottom-style">
						<NavLink to="/account">
							<div>
								<MdAccountCircle size={24} color="#ffffff" />
							</div>
							<div className="w-color-text">Akun Saya</div>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
