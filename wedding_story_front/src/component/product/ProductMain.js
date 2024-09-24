import { Route, Routes } from "react-router-dom";
import "./product.css";
import Counsel from "../counseling/Counsel";
import ProductPay from "./ProductPay";
import ProductReview from "./ProductReview";
import ProductAllList from "./ProductAllList";
import ProductInfo from "./ProductInfo";
import ProductWeddingHall from "./ProductWeddingHall";
import WeddingHallList from "./WeddingHallList";
const ProductMain = () => {
  return (
    <Routes>
      <Route path="list" element={<ProductAllList />} />
      <Route path="counsel" element={<Counsel />} />
      <Route path="pay" element={<ProductPay />} />
      <Route path="review" element={<ProductReview />} />
      <Route path="info" element={<ProductInfo />} />
      <Route path="weddingHall" element={<ProductWeddingHall />} />
      <Route path="hallList" element={<WeddingHallList />} />
    </Routes>
  );
};

export default ProductMain;
