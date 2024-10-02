import { Link } from "react-router-dom";
import "./common.css";
import { useRecoilState } from "recoil";
import { memberTypeState } from "../utils/RecoilData";

const AdminHeader = () => {
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  return (
    <header className="header-c">
      <div className="header-c-logo">
        <Link to="/admin/adminMain" className="nav-item">
          <div className="header-a-mainlogo">
            <img src="/image/main_logo.png"></img>
          </div>
        </Link>
      </div>
      <div className="header-c-content">
        <ul>
          <li>
            <Link to="/admin/memberControll" className="nav-item">
              <div>
                <span className="material-icons">account_box</span>
              </div>
              <span>회원관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/companyControll" className="nav-item">
              <div>
                <span className="material-icons">business</span>
              </div>
              <span>업체관리</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/advertisement" className="nav-item">
              <div>
                <span className="material-icons">campaign</span>
              </div>
              <span>광고관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/sales" className="nav-item">
              <div>
                <span className="material-icons">local_atm</span>
              </div>
              <span>매출관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/notice/list" className="nav-item">
              <div>
                <span className="material-icons">notifications_active</span>
              </div>
              <span>공지사항</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/question" className="nav-item">
              <div>
                <span className="material-icons">help_center</span>
              </div>
              <span>Q&A</span>
            </Link>
          </li>
          {memberType === 0 ? (
            <li>
              <Link to="/admin/adminControll" className="nav-item">
                <div>
                  <span className="material-icons">settings</span>
                </div>
                <span>관리자 현황</span>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </header>
  );
};

export default AdminHeader;
