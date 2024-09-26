import Sales from "./Sales";
import MemberControll from "./MemberControll";
import CompanyControll from "./CompanyControll";
import Advertisement from "./Advertisement";
import Question from "./Question";
import AdminControll from "./AdminControll";
import Notice from "./Notice";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "./AdminMain";
import AdminMenu from "./AdminMenu";
import "./admin.css";
const Admin = () => {
  return (
    <div className="admin-wrap">
      <AdminMenu />
      <div className="admin-content">
        <Routes>
          <Route path="sales" element={<Sales />} />
          <Route path="memberControll" element={<MemberControll />} />
          <Route path="companyControll" element={<CompanyControll />} />
          <Route path="advertisement" element={<Advertisement />} />
          <Route path="question" element={<Question />} />
          <Route path="adminControll" element={<AdminControll />} />
          <Route path="notice/*" element={<Notice />} />
          <Route path="adminMain" element={<AdminMain />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
