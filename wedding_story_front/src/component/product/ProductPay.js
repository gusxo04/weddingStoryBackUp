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
          <div>
            <input type="checkbox"></input>
            <p>약관동의</p>
          </div>
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
          <div className="input"></div>
        </div>
      </div>
      <div className="pay-button">
        <button type="button" className="btn">
          신용카드
        </button>
        <button type="button" className="btn">
          가상이체
        </button>
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
