import { Route, Routes } from "react-router-dom";
import Counsel from "../counseling/Counsel";
import ProductPay from "./ProductPay";
import ProductReview from "./ProductReview";
import ProductInfo from "./ProductInfo";
import ProductWeddingHall from "./ProductWeddingHall";
import WeddingHallList from "./WeddingHallList";
import WeddingHallInfo from "./WeddingHallInfo";
import ProductAllList from "./ProductAllList";
const ProductMain = () => {
  return (
    <Routes>
      <Route path="list" element={<ProductAllList />} />
      <Route path="info" element={<ProductInfo />} />
      <Route path="review" element={<ProductReview />} />
      <Route path="weddingHall" element={<ProductWeddingHall />} />
      <Route path="hallList" element={<WeddingHallList />} />
      <Route path="hallInfo" element={<WeddingHallInfo />} />
      <Route path="counsel" element={<Counsel />} />
      <Route path="pay" element={<ProductPay />} />
    </Routes>
  );
};

export default ProductMain;
