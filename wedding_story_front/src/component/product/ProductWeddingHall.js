import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductWeddingHall = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
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

  const [halls, setHalls] = useState([]);

  useEffect(() => {
    // 웨딩홀 map api
    axios
      .get(`${backServer}/halls`) // 필요에 따라 이 끝점을 조정하세요.
      .then((res) => {
        setHalls(res.data); // Assuming the response data is an array of halls
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer]);

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
      <div className="total-pay">
        <h3>총 예상비용: {total.toLocaleString()} 원</h3>
      </div>
    );
  };

  return (
    <section className="wedding-wrap">
      <div className="title-name">웨딩홀 예약</div>
      <form>
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="wedding-content">
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="memberName">이름</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="memberName"
                id="memberName"
                value={member.memberName}
                onChange={changeMember}
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="memberPhone">전화번호</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="memberPhone"
                id="memberPhone"
                value={member.memberPhone}
                onChange={changeMember}
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="productName">웨딩홀정보</label>
            </div>
            <div className="input-item">
              <select
                name="productName"
                id="productName"
                value={product.productName}
                onChange={changeProduct}
              >
                <option value="">웨딩홀 선택</option>
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.name}>
                    {hall.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="coronation">대관료</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="coronation"
                id="coronation"
                value={product.coronation}
                onChange={changeProduct}
              />
            </div>
            <div className="rental-fee"></div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="numberPeople">보증인원</label>
            </div>
            <div className="input-item">
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
          <div className="pay">
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
        <div className="wedding-button">
          <button type="submit">웨딩홀 예약하기</button>
        </div>
      </form>
    </section>
  );
};

export default ProductWeddingHall;
