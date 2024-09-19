import { Link } from "react-router-dom";

const CompanyHeader = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">홈</Link>
        <span> | </span>
      </div>
    </header>
  );
};
export default CompanyHeader;
