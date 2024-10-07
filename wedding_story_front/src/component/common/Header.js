import { Link, NavLink } from "react-router-dom";
import "./common.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  companyNoState,
  isLoginState,
  loginIdState,
  loginNoState,
  memberCodeState,
  memberTypeState,
} from "../utils/RecoilData";
import axios from "axios";
import CompanyHeader from "./CompanyHeader";
import AdminHeader from "./AdminHeader";

const Header = () => {
  const uri = window.location.pathname;
  return (
    <>
      {uri.startsWith("/company") ? (
        <CompanyHeader />
      ) : uri.startsWith("/admin") ? (
        <AdminHeader />
      ) : (
        <MainHeader />
      )}
    </>
  );
};

const MainHeader = () => {
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
              <NavLink to="/myPage/schedule">My Wedding</NavLink>
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

const HeaderLink = () => {
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const isLogin = useRecoilValue(isLoginState);
  const logout = () => {
    setLoginNo(0);
    setLoginId("");
    setMemberType(-1);
    setMemberCode("");
    setCompanyNo(null);
    delete axios.defaults.headers.common["Authorization"];
    window.localStorage.removeItem("refreshToken");
  };
  return (
    <>
      {isLogin ? (
        <div className="header-link">
          <Link to="/myPage/info">{`${loginId}`}님</Link>
          <span>|</span>
          <Link to="/logout" onClick={logout}>
            로그아웃
          </Link>
          <span>|</span>
          <Link to="/question/main">고객센터</Link>
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

export default Header;
