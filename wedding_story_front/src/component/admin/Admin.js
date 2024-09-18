import axios from "axios";
import "./sales.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Admin = () => {
  return (
    <div>
      <h3>관리자 페이지</h3>
      <Link to="/sales">매출</Link>
    </div>
  );
};

export default Admin;
