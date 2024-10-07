import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductWeddingHall.module.css";
import { useRecoilState } from "recoil";
import { loginNoState } from "../../utils/RecoilData";

const ProductWeddingHall = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate(); // navigate 사용
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  const [productNo, setProductNo] = useState();
  const [weddingDate, setWeddingDate] = useState(""); // 예식 날짜 상태 추가
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    coronation: "",
    numberPeople: "",
    diningRoom: "",
  });

  // 회원 정보 가져오기
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

  // productNo를 기반으로 상품 정보 가져오기
  useEffect(() => {
    if (productNo) {
      axios
        .get(`${backServer}/product/productNo/${productNo}`)
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

  // 모든 제품 정보 가져오기 (테스트용)
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

  // 입력 데이터 변경 처리
  const changeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const changeDate = (e) => {
    setWeddingDate(e.target.value); // 날짜 상태 업데이트
  };

  // 결제 금액 계산
  const payWedding = () => {
    const perPersonFee = parseFloat(product.diningRoom); // 인당 식비
    const rentalFee = parseFloat(product.coronation) || 0; // 대관료
    const numberOfPeople = parseInt(product.numberPeople) || 0; // 인원수

    const total = rentalFee + perPersonFee * numberOfPeople;

    return (
      <div className={styles["total-pay"]}>
        <h3>총 예상비용: {total.toLocaleString()} 원</h3>
      </div>
    );
  };

  // 예약 폼 데이터 전송
  const submitForm = (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기
    // FormData 생성
    const formData = new FormData();
    formData.append("memberName", member.memberName);
    formData.append("memberPhone", member.memberPhone);
    formData.append("productName", product.productName);
    formData.append("weddingDate", weddingDate); // 예식 날짜 추가
    formData.append("numberPeople", product.numberPeople);
    formData.append("coronation", product.coronation);
    formData.append("diningRoom", product.diningRoom);

    // 서버에 데이터 전송
    axios
      .post(`${backServer}/product`, formData) // POST 요청으로 예약 정보 전송
      .then((res) => {
        console.log(res.data);
        alert("예약이 완료되었습니다!");
        navigate("/"); // 성공 시 메인 페이지로 이동
      })
      .catch((err) => {
        console.error(err);
        alert("예약에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <section className={styles["wedding-wrap"]}>
      <div className={styles["title-name"]}>웨딩홀 예약</div>
      <form onSubmit={submitForm}>
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
                readOnly
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
                readOnly
              />
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="productName">웨딩홀 정보</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                name="productName"
                id="productName"
                value={product.productName}
                readOnly
              />
            </div>
          </div>
          {/*예식날짜 추가 */}
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>
              <label htmlFor="weddingDate">예식 날짜</label>
            </div>
            <div className={styles["input-item"]}>
              <input
                type="date"
                name="weddingDate"
                id="weddingDate"
                value={weddingDate}
                onChange={changeDate}
              />
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
                readOnly
              />
            </div>
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

