import { Link } from "react-router-dom";
import "./common.css";

const CompanyHeader = () => {
  return (
    <header className="header-c">
      <div className="header-c-logo">
        <div className="header-c-mainlogo">
          <img src="/image/main_logo.png"></img>
        </div>
        <div>
          <span class="material-icons">close</span>
        </div>
        <div>
          <span>회사명</span>
        </div>
      </div>
      <div className="header-c-content">
        <ul>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">view_in_ar</span>
              </div>
              <span>상품관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">account_box</span>
              </div>
              <span>고객관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">event</span>
              </div>
              <span>상담일정</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">date_range</span>
              </div>
              <span>진행일정</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">local_atm</span>
              </div>
              <span>매출관리</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-item">
              <div>
                <span class="material-icons">settings</span>
              </div>
              <span>사용자관리</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default CompanyHeader;