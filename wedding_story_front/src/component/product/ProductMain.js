import { Route, Routes } from "react-router-dom";
import "./product.css";
import Counsel from "../counseling/Counsel";
import ProductPay from "./ProductPay";
import ProductReview from "./ProductReview";
import ProductAllList from "./ProductAllList";
import ProductInfo from "./ProductInfo";
import ProductWeddingHall from "./ProductWeddingHall";
import WeddingHallList from "./WeddingHallList";
import ProductReviewUpdate from "./ProductReviewUpdate";
import WeddingHallInfo from "./WeddingHallInfo";
const ProductMain = () => {
  return (
    <Routes>
      <Route path="list" element={<ProductAllList />} />
      <Route path="info" element={<ProductInfo />} />
      <Route path="review" element={<ProductReview />} />
      <Route path="reviewUpdate" element={<ProductReviewUpdate />} />
      <Route path="weddingHall" element={<ProductWeddingHall />} />
      <Route path="hallList" element={<WeddingHallList />} />
      <Route path="hallInfo" element={<WeddingHallInfo />} />
      <Route path="counsel" element={<Counsel />} />
      <Route path="pay" element={<ProductPay />} />
    </Routes>
  );
};

export default ProductMain;
