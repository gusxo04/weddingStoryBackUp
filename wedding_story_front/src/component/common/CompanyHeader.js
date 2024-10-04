import { Link } from "react-router-dom";
import "./common.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";

const CompanyHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  // 드롭다운을 토글하는 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // 클릭 시 상태를 반전
  };
  return (
    <header className="header-c">
      <div className="header-c-logo">
        <div className="header-c-mainlogo">
          <img src="/image/main_logo.png"></img>
        </div>
        <div>
          <span className="material-icons">close</span>
        </div>
        <div>
          <span>회사명</span>
        </div>
      </div>
      <div className="header-c-content">
        {companyNo !== null ? (
          <ul>
            <li>
              <Link to="/company/product/list" className="nav-item">
                <div>
                  <span className="material-icons">view_in_ar</span>
                </div>
                <span>상품관리</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">account_box</span>
                </div>
                <span>고객관리</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">event</span>
                </div>
                <span>상담일정</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">date_range</span>
                </div>
                <span>진행일정</span>
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
            <li className="info-menu" onClick={toggleDropdown}>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">settings</span>
                </div>
                <span>사용자관리</span>
              </Link>
              {isDropdownOpen && (
                <ul className="down-menu-bar" style={{}}>
                  <li>
                    <Link to="/company/Info" className="down-menu">
                      내 업체 정보
                    </Link>
                  </li>
                  <li>
                    <Link to="/company/info/update" className="down-menu">
                      업체 정보 수정
                    </Link>
                  </li>
                  <li>
                    <Link to="/company/Info" className="down-menu">
                      광고 요청
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/company/product" className="nav-item">
                <div>
                  <span className="material-icons">view_in_ar</span>
                </div>
                <span>상품관리</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">account_box</span>
                </div>
                <span>고객관리</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">event</span>
                </div>
                <span>상담일정</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">date_range</span>
                </div>
                <span>진행일정</span>
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
            <li className="info-menu" onClick={toggleDropdown}>
              <Link to="#" className="nav-item">
                <div>
                  <span className="material-icons">settings</span>
                </div>
                <span>사용자관리</span>
              </Link>
              {isDropdownOpen && (
                <ul className="down-menu-bar" style={{}}>
                  <li>
                    <Link to="/company/Join" className="down-menu">
                      업체 등록
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};
export default CompanyHeader;
