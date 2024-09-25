import { Link } from "react-router-dom";
import "./common.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  companyNoState,
  isLoginState,
  loginIdState,
  memberCodeState,
  memberTypeState,
} from "../utils/RecoilData";
import axios from "axios";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <HeaderLink />
        <div className="header-logo">
          <Link to="/">
            <div className="header-img">
              <img src="/image/main_logo.png" />
            </div>
          </Link>
        </div>
        <div className="header-nav">
          <ul className="nav-main">
            <li className="nav-suv">
              <span className="material-icons">menu</span>
              <Link to="#">My Wedding</Link>
            </li>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/product/hallList">웨딩홀</Link>
            </li>
            <li>
              <Link to="/product/list">스드메</Link>
            </li>
            <li>
              <Link to="/convention/main">박람회</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;

const HeaderLink = () => {
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const isLogin = useRecoilValue(isLoginState);
  console.log(isLogin);
  const logout = () => {
    setLoginId("");
    setMemberType(-1);
    setMemberCode("");
    setCompanyNo("");
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
  };
  return (
    <>
      {isLogin ? (
        <div className="header-link">
          <Link to="#">{`${loginId}`}님</Link>
          <span>|</span>
          <Link to="/logout" onClick={logout}>
            로그아웃
          </Link>
          <span>|</span>
          <Link to="#">고객센터</Link>
        </div>
      ) : (
        <div className="header-link">
          <Link to="/login">로그인</Link>
          <span>|</span>
          <Link to="/join/agree">회원가입</Link>
          <span>|</span>
          <Link to="#">고객센터</Link>
        </div>
      )}
    </>
  );
};
