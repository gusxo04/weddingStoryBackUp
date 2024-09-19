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
  const [isDateUndefined, setIsDateUndefined] = useState(false);
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
  const tomorrow = () => {
    //date객체 생성
    const date = new Date();
    //date 객체에서 현재년도를 구한다.
    const year = date.getFullYear();
    //date 객체에서 현재 월을 구한다.(getMonth는 0부터 시작하기 때문에 +1를 해준다.)
    let month = date.getMonth() + 1;
    //date 객체에서 오늘 날짜를 구한다.
    const today = date.getDate();
    //오늘 날짜에 +1을 하여 내일 날짜를 구한다.
    let tomorrow = today + 1;
    //해당월의 마지막 날이면?
    //date객체에서 마지막 날을 구해 오늘 날짜와 같은지 비교한다.
    if (new Date(year, month, 0) === today) {
      //다음달로 넘기기 위해 +2를 한다.(month는 0부터 시작하기 때문에 이번달을 구할 때 +1,다음달은+2)
      month = date.getMonth() + 2;
      //오늘날짜 - (오늘날짜-1)을 한 날짜로 변경(31일이면 30을 빼 1이 남도록 한다, 월의 1일)
      tomorrow = date.getDate() - (date.getDate() - 1);
    }
    return (
      `${year}-` +
      (month > 9 ? `${month}-` : `0${month}-`) +
      (tomorrow > 9 ? tomorrow : `0${tomorrow}`)
    );
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
                min={tomorrow() || ""}
                name="reservation"
                id="reservation"
                value={consult.reservation}
                onChange={chageConsult}
              ></input>
              <div className="check">
                <p>미정</p>
                <input
                  type="checkbox"
                  checked={isDateUndefined}
                  onChange={() => setIsDateUndefined(!isDateUndefined)}
                ></input>
              </div>
            </div>
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
              onChange={chageConsult}
            ></input>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="consultWriter">상담내용</label>
          </div>
          <div className="input-item">
            <textarea className="consultWriter" id="consultWriter"></textarea>
          </div>
        </div>
      </div>
      <div className="consol-button">
        <button type="submit" className="btn">
          상담신청하기
        </button>
      </div>
    </section>
  );
};

export default Counsel;
