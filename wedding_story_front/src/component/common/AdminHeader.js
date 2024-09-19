import { Link } from "react-router-dom";
import "./common.css";

const AdminHeader = () => {
  return (
    <header className="header-c">
      <div className="header-c-logo">
        <div className="header-a-mainlogo">
          <img src="/image/main_logo.png"></img>
        </div>
      </div>
      <div className="header-c-content">
        <ul>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">account_box</span>
              </div>
              <span>회원관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">business</span>
              </div>
              <span>업체관리</span>
            </Link>
          </li>

          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">campaign</span>
              </div>
              <span>광고관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">local_atm</span>
              </div>
              <span>매출관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">notifications_active</span>
              </div>
              <span>공지사항</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">help_center</span>
              </div>
              <span>Q&A</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span className="material-icons">settings</span>
              </div>
              <span>사용자관리</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default AdminHeader;
