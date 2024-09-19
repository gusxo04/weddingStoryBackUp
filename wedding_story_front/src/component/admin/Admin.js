import axios from "axios";
import "./sales.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <h3>관리자 페이지</h3>
      <a>|</a>
      <Link to="/memberControll">회원</Link>
      <a>|</a>
      <Link to="/companyControll">업체</Link>
      <a>|</a>
      <Link to="/advertisement">광고</Link>
      <a>|</a>
      <Link to="/sales">매출</Link>
      <a>|</a>
      <a>|</a>
      <Link to="/sales">공지사항</Link>
      <a>|</a>
      <a>|</a>
      <Link to="/question">Q&A</Link>
      <a>|</a>
      <a>|</a>
      <Link to="/adminControll">관리자</Link>
      <a>|</a>
    </div>
  );
};

export default Admin;
