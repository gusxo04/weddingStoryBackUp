import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import MemberControll from "./component/admin/MemberControll";
import CompanyControll from "./component/admin/CompanyControll";
import Advertisement from "./component/admin/Advertisement";
import Question from "./component/admin/Question";
import AdminControll from "./component/admin/AdminControll";
import CompanyHeader from "./component/common/CompanyHeader";
import CompanyMain from "./component/company/CompanyMain";

function App() {
  const [path, setPath] = useState(0); // (예시)(0) -> 홈 화면 헤더 (1) -> 업체 화면 헤더  (2) -> 관리자 화면 헤더 --dy
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/company") {
      setPath(1); //주소가 /company로 변경시 path 를 (1)로 변경 --dy
    } else if (location.pathname === "/") {
      setPath(0); //주소가 /로 변경시 path 를 (0)로 변경 --dy
    }
  }, [location.pathname]); //location.pathname 이 변경되면 렌더링 다시 시작 --dy

  return (
    <div className="wrap">
      {path === 0 ? <Header /> : path === 1 ? <CompanyHeader /> : null}
      {/*path에 따라서 헤더 결정 common에 사용할 헤더 컴포넌트 추가후에 조건 걸어주기!! -dy*/}
      <main className="content-wrap">
        <Routes>
          <Route path="/convention" element={<ConventionMain />} />
          <Route path="/test" element={<ConventionLayout />} />
          <Route path="/newConvention" element={<InsertConvention />} />
          <Route path="/product/*" element={<ProductMain />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/company" element={<CompanyMain />} />
          <Route path="/memberControll" element={<MemberControll />} />
          <Route path="/companyControll" element={<CompanyControll />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/question" element={<Question />} />
          <Route path="/adminControll" element={<AdminControll />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
