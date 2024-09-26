import axios from "axios";
import "./convention.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowConvention from "./ShowConvention";
import { loginNoState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";



const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  console.log(memberNoState);
  const [convention, setConvention] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [conventionShowDate, setConventionShowDate] = useState([]);
  const [selectDate, setSelectDate] = useState(null);
  const [noticeEmail, setNoticeEmail] = useState("");
  const changeEmail = (e) => {
    setNoticeEmail(e.target.value);
    setFullNoticeEmail(e.target.value +"@"+lastEmail);
  }

  const [lastEmail, setLastEmail] = useState("naver.com");
  const changeLastEmail = (e) => {
    setLastEmail(e.target.value);
  }
  const [fullNoticeEmail, setFullNoticeEmail] = useState("");

  const [showType, setShowType] = useState(true);
  const [isPayment, setIsPayment] = useState(true);


  // const [payment, setPayment] = useState({
  //   // merchantUid : "",
  //   // payNo : 0,
  //   // payPrice : 0,
  //   // ticketNo : 0
  // });
  const [payment, setPayment] = useState(null);
  
  
  const personalRef = useRef(null);
  const dateMsgRef = useRef(null);
  const personalMsgRef = useRef(null);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      // console.log(res);
      if(!res.data) return;
      setConvention(res.data.convention);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      // 지금 로그인한 유저가 박람회 티켓을 샀는지 안 샀는지도 조회해야 함
      // 업체도 부스를 샀는지 안 샀는지 조회해야 해서 uef 따로 빼는게 나을듯
      // 나중에 if로 업체인지 회원인지 조회후 axios 요청하기
      // 지금은 회원꺼 먼저
      if(memberNoState !== 0){
        axios.get(`${backServer}/convention/payment/${memberNoState}/${res.data.convention.conventionNo}`)
        .then(res => {
          // console.log(res);
          if(res.data){
            setPayment({
              merchantUid: res.data.merchantUid,
              payNo: res.data.payNo,
              payPrice: res.data.payPrice,
              ticketNo: res.data.ticketNo
            })
          }
          else{
            setPayment(null);
          }
        })
        .catch(err => {
          console.error(err); 
        })
      }

    })
    .catch(err => {
      console.error(err); 
    })

  }, [isPayment, memberNoState]);


  let testStartDate = new Date(convention.conventionStart);
  let testEndDate = new Date(convention.conventionEnd);

  const diffTime = Math.abs(testEndDate - testStartDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dateArr = new Array();


  for(let i = 0; i < diffDays + 1; i++){
    const arrDate = new Date(testStartDate);
    if(i !== 0){
      arrDate.setDate(testStartDate.getDate() + 1);
    }
    dateArr.push(arrDate);
    testStartDate = arrDate;
    if(conventionShowDate.length === 0 && i === diffDays){
      // for문 끝나고 state에 set (그리고 이걸 props로 넘겨줌)
      setConventionShowDate([...dateArr]);
    }
  }

  
  return (
    <div className="convention-wrap">
      <div className="convention-container">
        {/* {convention ?
        endDate < 0 ? 
        "박람회 없음" 
        :
        startDate > 0 ? 
        "신청 가능" 
        : 
        "박람회 있음"
        :
        ""} */}
        {Object.keys(convention).length > 0 ? 
        endDate > 0 ?
        // (startDate > 0 ? 
        //   <ShowConvention convention={convention} conventionShowDate={conventionShowDate} type={true} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} fullNoticeEmail={fullNoticeEmail} setNoticeEmail={setNoticeEmail} showType={showType} setShowType={setShowType} startDate={startDate} />  
        //   : 
        //   <ShowConvention convention={convention} conventionShowDate={conventionShowDate} type={false} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} fullNoticeEmail={fullNoticeEmail} setNoticeEmail={setNoticeEmail} showType={showType} setShowType={setShowType} startDate={startDate} />) 
        <ShowConvention convention={convention} conventionShowDate={conventionShowDate} type={startDate > 0 ? true : false} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} fullNoticeEmail={fullNoticeEmail} setNoticeEmail={setNoticeEmail} showType={showType} setShowType={setShowType} startDate={startDate} payment={payment} isPayment={isPayment} setIsPayment={setIsPayment} />
        : 
        <EmptyConvention navigate={navigate} />
        :
        "비어있어요"}
      </div>
    </div>
  )
}


//박람회가 없을 경우
const EmptyConvention = (props) => {
  const navigate = props.navigate;
  return (
    <div className="empty-convention-wrap">
      <span>현재 진행중이거나 예정인 박람회가 없습니다</span>
      <Link to="/convention/write" className="locate">박람회 등록하기</Link>
      <button className="locate" onClick={() => {
          navigate(-1);
        }}>돌아가기</button>
    </div>
  )
}

export default ConventionMain
