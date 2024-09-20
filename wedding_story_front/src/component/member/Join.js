import { Route, Routes, useLocation } from "react-router-dom";
import "./member.css";
import JoinAgree from "./JoinAgree";
import JoinType from "./JoinType";
import { useState } from "react";

const Join = () => {
  const [nowPath, setNowPath] = useState("agree");

  return (
    <main className="join-wrap">
      <div className="join-wrap-content">
        <div className="join-step">
          <ul>
            <li className={`${nowPath == "agree" ? "step" : ""}`}>
              <span>약관동의</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className={`${nowPath == "type" ? "step" : ""}`}>
              <span>회원 유형 선택</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className={`${nowPath == "info" ? "step" : ""}`}>
              <span>정보 입력</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className={`${nowPath == "success" ? "step" : ""}`}>
              <span>가입완료</span>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route
              path="agree"
              element={<JoinAgree setNowPath={setNowPath} />}
            />
            <Route path="type" element={<JoinType setNowPath={setNowPath} />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};
export default Join;
