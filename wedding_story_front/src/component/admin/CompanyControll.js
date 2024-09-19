import { useEffect, useState } from "react";
import "./companyControll.css";
import axios from "axios";
const CompanyControll = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/company`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setCompanyList(Object.values(res.data));
        } else {
          console.error("업체 없음");
          setCompanyList([]);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
        setCompanyList([]);
      });
  }, []);
  return (
    <div>
      <a>업체관리</a>
    </div>
  );
};
export default CompanyControll;
