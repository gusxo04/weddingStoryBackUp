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
import {
  companyNoState,
  loginIdState,
  memberCodeState,
  memberTypeState,
} from "./component/utils/RecoilData";
import AdminMenu from "./component/admin/AdminMenu";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);

  const refreshLogin = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    console.log(refreshToken);
    if (refreshToken !== null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          console.log(res);
          setLoginId(res.data.memberId);
          setMemberType(res.data.memberType);
          setMemberCode(res.data.memberCode);
          setCompanyNo(res.data.companyNo);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
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
  /*
  const [path, setPath] = useState(() => {
    // 로컬 스토리지에서 초기값을 가져옴
    const savedPath = localStorage.getItem("path");
    return savedPath ? Number(savedPath) : null; // 저장된 값이 있으면 숫자로 변환
  });
  */

  useEffect(() => {
    refreshLogin();
  });

  return (
    <div className="wrap">
      <Header />
      {/*path에 따라서 헤더 결정 common에 사용할 헤더 컴포넌트 추가후에 조건 걸어주기!! -dy*/}
      {memberType === 0 ? <AdminMenu /> : <></>}
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
      <Footer />
    </div>
  );
}

export default App;
