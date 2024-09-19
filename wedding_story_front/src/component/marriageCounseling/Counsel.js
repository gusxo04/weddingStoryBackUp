import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastEditor from "../utils/ToastEditor";
import "./counsel.css";
import { useRecoilState } from "recoil";

const Counsel = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  const [consult, setconsult] = useState({
    reservation: "",
    consultTitle: "",
    consultWriter: "",
  });
  const [consultWriter, setConsultWriter] = useState();
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const chageConsult = () => {
    setconsult({});
  };
  const reservation = () => {
    axios
      .post(`${backServer}/consult`, consult)
      .then((res) => {
        console.log(res);
        //navigate("/list");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="counsel-wrap">
      <div className="title-name">상담신청</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          reservation();
        }}
      ></form>
      <span className="material-icons">arrow_back</span>
      <div className="counsel-content">
        <div className="counsel">
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
              ></input>
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
              ></input>
            </div>
          </div>
          <div className="input-wrap">
            <div className="input-title">
              <label htmlFor="reservation">예식예정일</label>
            </div>
            <div className="input-item">
              <input
                type="date"
                name="reservation"
                id="reservation"
                value={consult.reservation}
                onChange={chageConsult}
              ></input>
              <div className="check">
                <p>미정</p>
                <input type="checkbox"></input>
              </div>
            </div>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="consultTitle">신청제목</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="consultTitle"
              id="consultTitle"
              value={consult.consultTitle}
              onChange={chageConsult}
            ></input>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="consultWriter">신청내용</label>
          </div>
          <div className="input-item">
            <textarea className="consultWriter" id="consultWriter"></textarea>
          </div>
        </div>
      </div>
      <div className="consol-button">
        <button type="submit" className="btn">
          신청하기
        </button>
      </div>
    </section>
  );
};

export default Counsel;
