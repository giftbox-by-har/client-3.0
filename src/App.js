import "./App.css";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./routes/HomePage/HomePage";
import CatalogPage from "./routes/CatalogPage/CatalogPage";
import CustomGiftPage from "./routes/CustomGiftPage/CustomGiftPage";
import CartPage from "./routes/CartPage/CartPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import AdminPage from "./routes/AdminPage/AdminPage";

function App() {
	const pathname = window.location.pathname;

	return (
		<div>
			{pathname !== "/admin" && <Navbar />}
			<div className={pathname === "/admin" ? "" : "app-container"}>
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route path="/catalog" element={<CatalogPage />} />
					<Route path="/customgift" element={<CustomGiftPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/account" element={<ProfilePage />} />
					<Route path="/admin" element={<AdminPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
