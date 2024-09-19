import { Link } from "react-router-dom";

const CompanyHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">홈</Link>
        <span> | </span>
        <Link to="/company/join">사용자 관리</Link>
        {/*사용자 관리 추가 할 예정 1. 업체등록 2. 업체 정보 보기 3. 업체 정보 수정 4. 광고요청 */}
        <span> | </span>
      </div>
    </header>
  );
};
export default CompanyHeader;
