const CompanyCounsel = () => {
  return (
    <div>
      <section className="section">
        <div className="list-wrap">
          <div className="list-title">진행 일정</div>

          <div className="product-list-wrap">
            <table className="tbl">
              <thead border={1}>
                <tr>
                  <th style={{ width: "8%" }}>회원번호</th>
                  <th style={{ width: "10%" }}>이름</th>
                  <th style={{ width: "15%" }}>전화번호</th>
                  <th style={{ width: "8%" }}>상품번호</th>
                  <th style={{ width: "30%" }}>상품이름</th>
                  <th style={{ width: "15%" }}>구매일</th>
                  <th>진행도</th>
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
export default CompanyCounsel;
