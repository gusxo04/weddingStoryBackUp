const ProductPay = () => {
  return (
    <section className="pay-wrap">
      <div className="title-name">결제하기</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>
      <span className="material-icons">arrow_back</span>
      <div className="pay-content">
        <div className="pay">
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="memberName">이용자 정보</label>
            </div>
            <div className="input-item">
              <p>이름</p>
              <input type="text" name="memberName" id="memberName"></input>
              <p>전화번호</p>
              <input type="text" name="memberPhone" id="memberPhone"></input>
            </div>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="payProduct">상품금액</label>
          </div>
          <div className="input-item"></div>
        </div>
      </div>
      <div className="pay-button">
        <button type="submit" className="btn">
          결제하기
        </button>
      </div>
    </section>
  );
};

export default ProductPay;
