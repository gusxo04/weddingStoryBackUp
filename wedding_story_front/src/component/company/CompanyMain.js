import { Route, Routes } from "react-router-dom";
import CompanyJoin from "./CompanyJoin";
import "./company.css";
import CompanyInfo from "./CompanyInfo";
import CompanyProduct from "./CompanyProduct";
import CompanyHeader from "../common/CompanyHeader";
import { useRecoilState } from "recoil";
import { companyNoState, loginNoState } from "../utils/RecoilData";
import CompanyNoNull from "./CompanyNoNull";
import CompanyInfoUpdate from "./CompanyInfoUpdate";
import axios from "axios";
import { useEffect } from "react";

const CompanyMain = () => {
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  console.log(companyNo);

  return (
    <>
      <div className="company-wrap">
        <div className="side-info">
          <section className="section">
            <div className="side-info-content">사이드 정보 테스트</div>
          </section>
        </div>

        <section className="content-wrap">
          <Routes>
            <Route path="null" element={<CompanyNoNull />} />
            <Route path="join" element={<CompanyJoin />} />
            <Route path="info" element={<CompanyInfo />} />
            <Route path="product" element={<CompanyProduct />} />
            <Route path="info/update" element={<CompanyInfoUpdate />} />
          </Routes>
        </section>
      </div>
    </>
  );
};
export default CompanyMain;
