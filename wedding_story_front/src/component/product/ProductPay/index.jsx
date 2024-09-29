import styles from "./ProductPay.module.css";

const ProductPay = () => {
  return (
    <section className={styles['pay-wrap']}>
      <div className={styles['title-name']}>결제하기</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      ></form>
      <span className={`material-icons ${styles['material-icons']}`}>arrow_back</span>
      <div className={styles['pay-button']}>
        <button type="submit" className={styles['btn']}>
          결제하기
        </button>
      </div>
    </section>
  );
};

export default ProductPay;