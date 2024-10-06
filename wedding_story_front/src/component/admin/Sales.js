import React, { useEffect, useState } from "react";
import "./sales.css";
import SalesChart from "./SalesChart"; // Chart 컴포넌트 import
import axios from "axios";

const Sales = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [year, setYear] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [data, setData] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    axios
      .get(`${backServer}/admin/getYear`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setYear(res.data.year);
          setSelectedYear(res.data.year[0]?.merchantUid);
        } else {
          console.error("데이터 없음");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
      });
  }, [backServer]);

  const changeYear = () => {
    axios
      .get(`${backServer}/admin/searchYearPay/${selectedYear}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setData(res.data);
        } else {
          console.error("데이터 없음");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
      });
  };
  useEffect(() => {
    axios
      .get(`${backServer}/admin/getComapnyRank`)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setCompanyList(res.data);
        } else {
          console.error("데이터 없음");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
      });
  }, [backServer]);

  // 차트 데이터 변환
  const getChartData = () => {
    if (!data[selectedYear]) return { labels: [], datasets: [] };

    const salesData = data[selectedYear];
    const months = Object.keys(salesData);
    const salesValues = months.map((month) => salesData[month]?.sales || 0);

    return {
      labels: months.map((m) => `${m}월`),
      datasets: [
        {
          label: `${selectedYear}년 매출`,
          data: salesValues,
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="sales-wrap">
      <h3>연도별 매출</h3>
      <select
        name="year"
        className="year-sel"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {year.map((year) => (
          <option key={year.merchantUid} value={year.merchantUid}>
            {year.merchantUid}
          </option>
        ))}
      </select>
      <button className="year-sel-btn" onClick={changeYear}>
        조회
      </button>

      <SalesChart data={getChartData()} />

      <div className="company_rank">
        <h3>업체 매출 TOP5</h3>
        <table className="tbl1">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>업체코드</th>
              <th style={{ width: "10%" }}>업체명</th>
              <th style={{ width: "20%" }}>카테고리</th>
              <th style={{ width: "20%" }}>총 매출</th>
              <th style={{ width: "20%" }}>수수료</th>
              <th style={{ width: "20%" }}>순이익</th>
            </tr>
          </thead>
          <tbody>
            {companyList.length > 0 ? (
              companyList
                .slice(0, 5)
                .map((company, index) => (
                  <CompanyItem
                    key={"company-" + index}
                    company={company}
                    index={index}
                  />
                ))
            ) : (
              <tr>
                <td colSpan="6">매출이 없습니다.</td>
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
  console.log(company.salesList);

  const sales =
    company.salesList.length > 0 && company.salesList[0]
      ? company.salesList[0].sales
      : "없음";

  return (
    <tr>
      <td>{company.companyNo}</td>
      <td>{company.companyName}</td>
      <td>{company.companyCategory}</td>
      <td>{sales}</td>
      <td>{sales}</td>
      <td>{sales}</td>
    </tr>
  );
};
export default Sales;
