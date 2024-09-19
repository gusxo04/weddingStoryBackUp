import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "./component/common/Header";
import ConventionMain from "./component/convention/ConventionMain";
import "./main.css";
import ConventionLayout from "./component/utils/ConventionLayout";
import InsertConvention from "./component/convention/InsertConvention";
import Footer from "./component/common/Footer";
import ProductMain from "./component/product/ProductMain";
import Admin from "./component/admin/Admin";
import Sales from "./component/admin/Sales";
import Counsel from "./component/marriageCounseling/Counsel";

function App() {
  return (
    <div className="wrap">
      <Header />

      <main className="content-wrap">
        <Routes>
          <Route path="/convention" element={<ConventionMain />} />
          <Route path="/test" element={<ConventionLayout />} />
          <Route path="/newConvention" element={<InsertConvention />} />
          <Route path="/product/*" element={<ProductMain />} />
          <Route path="/marriageCounseling/*" element={<Counsel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
