import { Route, Routes } from "react-router-dom";
import ProductAllView from "./ProductAllView";
import "./product.css";
const ProductMain=()=>{
    return(
        <Routes>
        <Route path="list" element={<ProductAllView/>}/>
        </Routes>
    )
    
}

export default ProductMain;