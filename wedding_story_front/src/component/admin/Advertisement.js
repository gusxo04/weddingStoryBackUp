import React, { useEffect, useState } from "react";
import "./advertisement.css";
import axios from "axios";
const Advertisement = () => {
  const [Advertisement, setAdvertisement] = useState([]);
  const [ading, setAding] = useState([]); //광고중

  const [adend, setAdend] = useState([]); //광고 종료

  const [adyet, setAdyet] = useState([]); //광고 대기

  const [adwait, setAdwait] = useState([]);

  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios
      .get(`${backServer}/admin/advertisement`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAding(Object.values(res.data.list));
        } else {
          console.log("진행중인 관고 없음");
          setAding([]);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("진행중인 광고 조회 에러");
        setAding([]);
      });
  }, [ading, adend, adwait]);
  return (
    <div className="advertisement-wrap">
      <div className="page-title">
        <h2>광고</h2>
      </div>
      <div className="in-progress">
        <h3 style={{ float: "left", marginBottom: "10px" }}>진행중</h3>
        <table className="tbl ad-tbl">
          <thead>
            <tr>
              <td>업체 이름</td>
              <td>상품 이름</td>
              <td>광고 시작</td>
              <td>광고 종료</td>
              <td>수정</td>
            </tr>
          </thead>
          <tbody>
            <InProgress />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InProgress = () => {};
export default Advertisement;
