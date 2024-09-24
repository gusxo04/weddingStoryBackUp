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
import AdminControll from "./component/admin/AdminControll";
import CompanyHeader from "./component/common/CompanyHeader";
import CompanyMain from "./component/company/CompanyMain";
import Counsel from "./component/counseling/Counsel";
import AdminHeader from "./component/common/AdminHeader";
import Join from "./component/member/Join";
import ConventionLobby from "./component/convention/ConventionLobby";
import Login from "./component/member/Login";

function App() {
  const location = useLocation();
  const [path, setPath] = useState(() => {
    // 로컬 스토리지에서 초기값을 가져옴
    const savedPath = localStorage.getItem("path");
    return savedPath ? Number(savedPath) : null; // 저장된 값이 있으면 숫자로 변환
  });

  useEffect(() => {
    // 경로에 따라 path 값을 업데이트하고 로컬 스토리지에 저장
    if (location.pathname === "/company") {
      setPath(1); //주소가 /company로 변경시 path 를 (1)로 변경 --dy
      localStorage.setItem("path", 1); //로컬 스토리지에 저장
    } else if (location.pathname === "/") {
      setPath(0); //주소가 /로 변경시 path 를 (0)로 변경 --dy
      localStorage.setItem("path", 0); //로컬 스토리지에 저장
    } else if (location.pathname === "/admin/main") {
      setPath(2);
      localStorage.setItem("path", 2); //로컬 스토리지에 저장
    }
  }, [location.pathname]); //location.pathname 이 변경되면 렌더링 다시 시작 --dy

  return (
    <div className="wrap">
      {path === 0 ? (
        <Header />
      ) : path === 1 ? (
        <CompanyHeader />
      ) : (
        <AdminHeader />
      )}
      {/*path에 따라서 헤더 결정 common에 사용할 헤더 컴포넌트 추가후에 조건 걸어주기!! -dy*/}
      <main className="content-wrap">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join/*" element={<Join />} />
          <Route path="/convention/*" element={<ConventionLobby />} />
          {/* <Route path="/test" element={<ConventionLayout />} /> */}
          <Route path="/product/*" element={<ProductMain />} />
          <Route path="/counseling/*" element={<Counsel />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company" element={<CompanyMain />} />
          <Route path="/company/*" element={<CompanyMain />} />
        </Routes>
      </main>
      {path === 0 ? <Footer /> : null}
    </div>
  );
}

export default App;
