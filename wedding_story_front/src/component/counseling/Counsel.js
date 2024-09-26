import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./counsel.css";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const Counsel = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [memberNo, setMemberNo] = useRecoilState(loginIdState);
  const [member, setMember] = useState({
    memberName: "",
    memberPhone: "",
  });
  //console.log(memberNo);

  const [consult, setConsult] = useState({
    consultDate: "",
    consultTime: "",
    reservation: "",
    consultTitle: "",
    consultWrite: "",
  });
  const [isDateUndefined, setIsDateUndefined] = useState(false);
  const changeConsult = (e) => {
    const { name, value } = e.target;
    setConsult({ ...consult, [name]: value });
  };
  useEffect(() => {
    console.log(memberNo);
    axios
      .get(`${backServer}/consult/memberNo/${memberNo}`)
      .then((res) => {
        setMember({
          ...member,
          memberName: res.data.memberName,
          memberPhone: res.data.memberPhone,
        });
        console.log(res);
        //console.log(member);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      .post(`${backServer}/consult`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
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
    <section className="counselt-wrap">
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
                defaultValue={member.memberName}
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
