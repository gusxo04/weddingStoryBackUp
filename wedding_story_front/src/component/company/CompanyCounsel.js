const CompanyCounsel = () => {
  return (
    <div>
      <section className="section">
        <div className="list-wrap">
          <div className="list-title">상품 목록</div>

          <div className="product-list-wrap">
            <table className="tbl">
              <thead border={1}>
                <tr>
                  <th style={{ width: "10%" }}>상품번호</th>
                  <th style={{ width: "50%" }}>상품명</th>
                  <th style={{ width: "20%" }}>상품 가격</th>
                  <th colSpan={2} style={{ width: "20%" }}>
                    상태
                  </th>
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
