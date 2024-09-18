import { Link } from "react-router-dom";
import "./common.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/convention">박람회임</Link>
        <span> | </span>
        <Link to="/product/list">게시글</Link>
        <span> | </span>
        <Link to="/admin">관리자</Link>
        <span> | </span>
      </div>
    </header>
  );
};

export default Header;
