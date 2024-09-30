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
import AdminHeader from "./component/common/AdminHeader";
import Join from "./component/member/Join";
import ConventionLobby from "./component/convention/ConventionLobby";
import Login from "./component/member/Login";
import {
  companyNoState,
  loginIdState,
  loginNoState,
  memberCodeState,
  memberTypeState,
} from "./component/utils/RecoilData";
import AdminMenu from "./component/admin/AdminMenu";
import MyPage from "./component/member/MyPage";
import { Report } from "./component/product/components";
import Consult from "./component/consult/Consult";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);

  const refreshLogin = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken !== null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          setLoginNo(res.data.memberNo);
          setLoginId(res.data.memberId);
          setMemberType(res.data.memberType);
          setMemberCode(res.data.memberCode);
          setCompanyNo(res.data.companyNo);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginNo(0);
          setLoginId("");
          setMemberType(-1);
          setMemberCode("");
          setCompanyNo("");
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  const location = useLocation();
  useEffect(() => {
    refreshLogin();
  });
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="wrap">
      <Header />
      {/*path에 따라서 헤더 결정 common에 사용할 헤더 컴포넌트 추가후에 조건 걸어주기!! -dy*/}

      <main className="content-wrap">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join/*" element={<Join />} />
          <Route path="/myPage/*" element={<MyPage />} />
          <Route path="/convention/*" element={<ConventionLobby />} />
          {/* <Route path="/test" element={<ConventionLayout />} /> */}
          <Route path="/product/*" element={<ProductMain />} />
          <Route path="/consult/*" element={<Consult />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/company/*" element={<CompanyMain />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
