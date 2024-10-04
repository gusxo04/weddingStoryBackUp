import axios from "axios";
import { useEffect } from "react";

const CompanyCustomer = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios.get();
  }, []);
  return (
    <div>
      <section className="section">
        <div className="list-wrap">
          <div className="list-title">고객관리</div>

          <div className="product-list-wrap">
            <table className="tbl">
              <thead border={1}>
                <tr>
                  <th style={{ width: "5%" }}>회원번호</th>
                  <th style={{ width: "10%" }}>이름</th>
                  <th style={{ width: "15%" }}>전화번호</th>
                  <th style={{ width: "10%" }}>배우자이름</th>
                  <th style={{ width: "15%" }}>배우자 전화번호</th>
                  <th style={{ width: "5%" }}>상품번호</th>
                  <th style={{ width: "30%" }}>상품명</th>
                  <th style={{ width: "10%" }}>구매일</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <div className="product-page-wrap">
              {/* <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CompanyCustomer;
