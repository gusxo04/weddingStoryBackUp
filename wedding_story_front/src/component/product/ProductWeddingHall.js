import axios from "axios";
import { useState } from "react";
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
  });
  const changeMember = () => {};
  const changeProduct = () => {};
  const payWedding = () => {}; //결제가격 if문써서 완성시키기

  axios
    .get(`${backServer}/product`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <section className="wedding-wrap">
      <div className="title-name">웨딩홀예약</div>
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
              <input
                type="text"
                name="productName"
                id="productName"
                value={product.productName}
                onChange={changeProduct}
              />
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
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="numberPeople">보증인원</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="numberPeople"
                id="numberPeople"
                value={product.numberPeople}
                onChange={changeProduct}
              />
            </div>
          </div>
          <div className="pay">{payWedding()}</div>
        </div>
        <div className="wedding-button">
          <button type="submit">웨딩홀 예약하기</button>
        </div>
      </form>
    </section>
  );
};

export default ProductWeddingHall;
