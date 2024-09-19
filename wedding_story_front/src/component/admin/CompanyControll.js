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
    <div className="company-controll-wrap">
      <div className="page-title">
        <h2>업체 관리</h2>
      </div>
      <div>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>업체코드</th>
              <th style={{ width: "15%" }}>업체명</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "20%" }}>업체 전화번호</th>
              <th style={{ width: "20%" }}>사업자 이메일</th>
              <th style={{ width: "5%" }}>누적신고</th>
              <th style={{ width: "5%" }}>선택</th>
            </tr>
          </thead>
          <tbody>
            {companyList.length > 0 ? (
              companyList.map((company, index) => (
                <CompanyItem
                  key={"company-" + index}
                  company={company}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7">업체가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const CompanyItem = (props) => {
  const company = props.company;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <tr className="userInfo">
      <td>{company.companyCode}</td>
      <td>{company.companyName}</td>
      <td>{company.Category}</td>
      <td>{company.companyPhone}</td>
      <td>{company.companyMail}</td>
      <td>{company.companyReport}</td>
      <td>
        <input
          type="checkbox"
          id={`deleteCompany-${props.index}`}
          name="deleteCompany"
          checked
        />
        <label htmlFor={`deleteCompany-${props.index}`}></label>
      </td>
    </tr>
  );
};
export default CompanyControll;
