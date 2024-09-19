import "./sales.css";
import Sales from "./Sales";
import MemberControll from "./MemberControll";
import CompanyControll from "./CompanyControll";
import Advertisement from "./Advertisement";
import Question from "./Question";
import AdminControll from "./AdminControll";
import Board from "./Board";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "./AdminMain";
const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path="sales" element={<Sales />} />
        <Route path="memberControll" element={<MemberControll />} />
        <Route path="companyControll" element={<CompanyControll />} />
        <Route path="advertisement" element={<Advertisement />} />
        <Route path="question" element={<Question />} />
        <Route path="adminControll" element={<AdminControll />} />
        <Route path="board/*" element={<Board />} />
        <Route path="adminMain" element={<AdminMain />} />
      </Routes>
    </div>
  );
};

export default Admin;
