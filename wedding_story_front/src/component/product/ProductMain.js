import { Route, Routes } from "react-router-dom";
import ProductAllView from "./ProductAllView";
import "./product.css";
import Counsel from "../marriageCounseling/Counsel";
import ProductPay from "./ProductPay";
const ProductMain = () => {
  return (
    <Routes>
      <Route path="list" element={<ProductAllView />} />
      <Route path="counsel" element={<Counsel />} />
      <Route path="pay" element={<ProductPay />} />
    </Routes>
  );
};

export default ProductMain;
