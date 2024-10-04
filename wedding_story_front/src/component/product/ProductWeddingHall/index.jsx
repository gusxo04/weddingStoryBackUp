import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductWeddingHall.module.css";
import { useRecoilState } from "recoil";
import { loginNoState } from "../../utils/RecoilData";

const ProductWeddingHall = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  const [productNo, setProductNo] = useState();
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [product, setProduct] = useState({
    productName: "",
    coronation: "",
    numberPeople: "",
    diningRoom: "",
  });

  useEffect(() => {
    axios
      .get(`${backServer}/consult/memberNo/${memberNo}`)
      .then((res) => {
        setMember({
          ...member,
          memberName: res.data.memberName,
          memberPhone: res.data.memberPhone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, memberNo]);

  // productNo를 기반으로 상품명 가져오기
  useEffect(() => {
    if (productNo) {
      axios
        .get(`${backServer}/consult/productNo/${productNo}`)
        .then((res) => {
          setProduct({
            productNo: res.data.productNo,
            productName: res.data.productName,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [backServer, productNo]);

  useEffect(() => {
    axios
      .get(`${backServer}/product`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);

  const changeMember = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const changeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const payWedding = () => {
    const perPersonFee = parseFloat(product.diningRoom); // 일인식비

    const rentalFee = parseFloat(product.coronation) || 0; // 대관료
    const numberOfPeople = parseInt(product.numberPeople) || 0; // 인원수

    const total = rentalFee + perPersonFee * numberOfPeople;

    return (
      <div className={styles["total-pay"]}>
        <h3>총 예상비용: {total.toLocaleString()} 원</h3>
      </div>
    );
  };

  return (
    <section className={styles["wedding-wrap"]}>
      <div className={styles["title-name"]}>웨딩홀 예약</div>
      <form>
        <Link to="/hallList">
          <span className={`material-icons ${styles["material-icons"]}`}>
            arrow_back
          </span>
        </Link>
        <div className={styles["wedding-content"]}>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="memberName">이름</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                type="text"
                name="memberName"
                id="memberName"
                value={member.memberName}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="memberPhone">전화번호</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                type="text"
                name="memberPhone"
                id="memberPhone"
                value={member.memberPhone}
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="productName">웨딩홀정보</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                name="productName"
                id="productName"
                value={product.productName}
              ></input>
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="coronation">대관료</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                type="text"
                name="coronation"
                id="coronation"
                value={product.coronation}
                onChange={changeProduct}
              />
            </div>
            <div className={styles["rental-fee"]}></div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="numberPeople">보증인원</label>
            </div>
            <div className={styles["input-item"]}>
              <select
                name="numberPeople"
                id="numberPeople"
                value={product.numberPeople}
                onChange={changeProduct}
              >
                <option value="">선택하세요</option>
                <option value="100">100명</option>
                <option value="200">200명</option>
                <option value="300">300명</option>
                <option value="400">400명</option>
              </select>
            </div>
          </div>
          <div className={styles["pay"]}>
            <h3>
              대관료:{" "}
              {product.coronation
                ? `${parseFloat(product.coronation).toLocaleString()} 원`
                : "0 원"}
            </h3>
            <h3>
              인당 식비:{" "}
              {product.diningRoom
                ? `${parseFloat(product.diningRoom).toLocaleString()} 원`
                : "0 원"}
            </h3>
            {payWedding()}
          </div>
        </div>
        <div className={styles["wedding-button"]}>
          <button type="submit" className={styles["btn"]}>
            웨딩홀 예약하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProductWeddingHall;
