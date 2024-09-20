import { Route, Routes } from "react-router-dom";
import CompanyJoin from "./CompanyJoinFrm";
import "./company.css";

const CompanyMain = () => {
  return (
    <div className="company-wrap">
      <div className="side-info">
        <section className="section">
          <div className="side-info-content">사이드 정보 테스트</div>
        </section>
      </div>
      <section className="content-wrap">
        <Routes>
          <Route path="join" element={<CompanyJoin />} />
        </Routes>
      </section>
    </div>
  );
};
export default CompanyMain;
