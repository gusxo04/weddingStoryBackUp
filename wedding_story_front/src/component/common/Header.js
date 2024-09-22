import { Link } from "react-router-dom";
import "./common.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-link">
          <Link to="#">로그인</Link>
          <span>|</span>
          <Link to="/join/agree">회원가입</Link>
          <span>|</span>
          <Link to="#">고객센터</Link>
        </div>
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
              <Link to="/marriageCounseling/counsel">웨딩홀</Link>
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
