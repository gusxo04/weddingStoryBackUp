import { useState } from "react";
import "./advertisement.css";
const Advertisement = () => {
  const [Advertisement, setAdvertisement] = useState([]);
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
