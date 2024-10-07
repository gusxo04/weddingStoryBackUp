import { Route, Routes } from "react-router-dom";
import ProductPay from "./ProductPay";
import ProductReview from "./ProductReview";
import ProductInfo from "./ProductInfo";
import ProductWeddingHall from "./ProductWeddingHall";
import WeddingHallList from "./WeddingHallList";
import WeddingHallInfo from "./WeddingHallInfo";
import ProductAllList from "./ProductAllList";
import Consult from "../consult/Consult";
const ProductMain = () => {
	return (
		<Routes>
			<Route path="list" element={<ProductAllList />} />
			<Route path="info/:productNo" element={<ProductInfo />} />
			<Route path="review" element={<ProductReview />} />
			<Route path="weddingHall/:productNo" element={<ProductWeddingHall />} />
			<Route path="hallList" element={<WeddingHallList />} />
			<Route path="hallInfo/:productNo" element={<WeddingHallInfo />} />
			<Route path="consult/:productNo" element={<Consult />} />
			<Route path="pay" element={<ProductPay />} />
		</Routes>
	);
};

export default ProductMain;
