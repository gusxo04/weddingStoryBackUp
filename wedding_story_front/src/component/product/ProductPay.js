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
      <div className="pay-button">
        <button type="submit" className="btn">
          결제하기
        </button>
      </div>
    </section>
  );
};

export default ProductPay;
