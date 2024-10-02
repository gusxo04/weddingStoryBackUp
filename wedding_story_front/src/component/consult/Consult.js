import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./consult.css";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const Consult = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNo, setMemberNo] = useRecoilState(loginNoState);
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [productNo, setProductNo] = useState({
    productNo: null,
    productName: "",
  });

  const [consult, setConsult] = useState({
    consultDate: "", //상담날짜
    consultTime: "", //상담시간
    reservation: "", //결혼식예정일(미정체크일시 null)
    consultTitle: "", //상담제목
    consultWrite: "", //상담내용
  });
  const [isDateUndefined, setIsDateUndefined] = useState(false);

  const changeConsult = (e) => {
    const { name, value } = e.target;
    setConsult({ ...consult, [name]: value });
  };

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
          setProductNo({
            productNo: productNo,
            productName: res.data.productName,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [backServer, productNo]);

  const requestData = {
    ...consult,
    ...member,
    reservation: isDateUndefined ? "미정" : consult.reservation,
  };

  const consultForm = () => {
    const form = new FormData();
    form.append("memberName", member.memberName);
    form.append("memberPhone", member.memberPhone);
    form.append("consultDate", consult.consultDate);
    form.append("consultTime", consult.consultTime);
    form.append("reservation", consult.reservation);
    form.append("consultTitle", consult.consultTitle);
    form.append("consultWrite", consult.consultWrite);

    axios
      .post(`${backServer}/consult`, form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const tomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 포맷
  };

  return (
    <section className="consult-wrap">
      <div className="title-name">상담신청</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          consultForm();
          navigate("/");
        }}
      >
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="consult-content">
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="productName">상품명</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="productName"
                id="productName"
                value={productNo.productName} // 상품명 표시
                readOnly // 읽기 전용으로 설정
              />
            </div>
          </div>
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
                readOnly // 읽기 전용으로 설정
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
                readOnly // 읽기 전용으로 설정
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="consult-date">상담날짜</label>
            </div>
            <div className="input-item">
              <input
                type="date"
                min={tomorrow()}
                name="consultDate"
                id="consultDate"
                value={consult.consultDate}
                onChange={changeConsult}
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="consult-time">상담시간</label>
            </div>
            <div className="input-item">
              <input
                type="time"
                name="consultTime"
                id="consultTime"
                value={consult.consultTime}
                onChange={changeConsult}
              />
            </div>
          </div>
          <div className="input-date">
            <div className="input-title">
              <label htmlFor="reservation">예식예정일</label>
            </div>
            <div className="input-item">
              <input
                type="date"
                min={tomorrow()}
                name="reservation"
                id="reservation"
                value={consult.reservation}
                onChange={changeConsult}
                disabled={isDateUndefined}
              />
            </div>
            <div className="input-title">
              <label htmlFor="checkbox">미정</label>
            </div>
            <div className="input-item">
              <input
                type="checkbox"
                checked={isDateUndefined}
                onChange={() => setIsDateUndefined(!isDateUndefined)}
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="consultTitle">상담제목</label>
            </div>
            <div className="input-item">
              <input
                type="text"
                name="consultTitle"
                id="consultTitle"
                value={consult.consultTitle}
                onChange={changeConsult}
                required
              />
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="consultWrite">상담내용</label>
            </div>
            <div className="input-item">
              <textarea
                className="consultWrite"
                id="consultWrite"
                name="consultWrite"
                value={consult.consultWrite}
                onChange={changeConsult}
                required
              />
            </div>
          </div>
        </div>
        <div className="consult-button">
          <button type="submit" className="btn">
            상담신청하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default Consult;
