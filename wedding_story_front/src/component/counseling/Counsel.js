import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./counsel.css";
import { useRecoilState } from "recoil";

const Counsel = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [consult, setConsult] = useState({
    reservation: "",
    consultTitle: "",
    consultWriter: "",
  });
  const [isDateUndefined, setIsDateUndefined] = useState(false);

  const changeMember = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const changeConsult = (e) => {
    const { name, value } = e.target;
    setConsult({ ...consult, [name]: value });
  };

  const handleReservation = (e) => {
    e.preventDefault();
    if (!isDateUndefined && !consult.reservation) {
      alert("예식 예정일을 선택해주세요.");
      return;
    }

    const requestData = {
      ...consult,
      ...member,
      reservation: isDateUndefined ? "미정" : consult.reservation,
    };

    axios
      .post(`${backServer}/consult`, requestData)
      .then((res) => {
        console.log(res);
        navigate("/list"); // 성공적으로 제출 후 이동
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
    <section className="counselt-wrap">
      <div className="title-name">상담신청</div>
      <form onSubmit={handleReservation}>
        <Link to="/">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="counselt-content">
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
                required
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
                required
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
              <label htmlFor="consultWriter">상담내용</label>
            </div>
            <div className="input-item">
              <textarea
                className="consultWriter"
                id="consultWriter"
                name="consultWriter"
                value={consult.consultWriter}
                onChange={changeConsult}
                required
              />
            </div>
          </div>
        </div>
        <div className="consolt-button">
          <button type="submit" className="btn">
            상담신청하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default Counsel;
