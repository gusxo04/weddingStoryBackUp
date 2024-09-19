import { Route, Routes } from "react-router-dom";
import "./member.css";
import JoinAgree from "./JoinAgree";

const Join = () => {
  return (
    <main className="join-wrap">
      <div className="join-wrap-content">
        <div className="join-step">
          <ul>
            <li className="join-agree step">
              <span>약관동의</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className="join-type">
              <span>회원 유형 선택</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className="join-info">
              <span>정보 입력</span>
            </li>
            <li>
              <span className="material-icons">chevron_right</span>
            </li>
            <li className="join-success">
              <span>가입완료</span>
            </li>
          </ul>
        </div>
        <div>
          <Routes>
            <Route path="agree" element={<JoinAgree />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};
export default Join;
