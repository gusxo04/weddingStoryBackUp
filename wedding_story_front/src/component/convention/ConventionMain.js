import axios from "axios";
import "./convention.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";
import ConventionLocate from "../utils/ConventionLocate";
import BuyTicket from "./BuyTicket";
import ShowLayout from "./ShowLayout";
import ConventionLayout from "../utils/ConventionLayout";
import Swal from "sweetalert2";


const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

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

    })
    .catch(err => {
      console.error(err); 
    })
  }, []);

  
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
        (startDate > 0 ? 
          <ShowConvention convention={convention} conventionShowDate={conventionShowDate} type={true} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} fullNoticeEmail={fullNoticeEmail} setNoticeEmail={setNoticeEmail} showType={showType} setShowType={setShowType} />  
          : 
          <ShowConvention convention={convention} conventionShowDate={conventionShowDate} type={false} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} fullNoticeEmail={fullNoticeEmail} setNoticeEmail={setNoticeEmail} showType={showType} setShowType={setShowType} />) 
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
      <Link to="/newConvention" className="locate">박람회 등록하기</Link>
      <button className="locate" onClick={() => {
          navigate(-1);
        }}>돌아가기</button>
    </div>
  )
}




const ShowConvention = (props) => {

  // type이 true면 신청가능 false면 시작일 지나서 신청은 불가능
  const {
    convention,
    type,
    conventionShowDate,
    personalRef,
    selectDate,
    setSelectDate,
    dateMsgRef,
    personalMsgRef,
    noticeEmail,
    changeEmail,
    changeLastEmail,
    fullNoticeEmail,
    setNoticeEmail,
    showType,
    setShowType
  } = props;
  
  const closeAlert = (e, pass) => {
    if(pass || e.target.id === "convention-close-screen"){
      if(e === 1 || e.target.className === "convention-member-alert-wrap"){

        Swal.fire({
          title:"박람회 티켓 결제",
          text : "결제를 취소하시겠습니까?",
          showCancelButton : true,
          cancelButtonText : "계속하기",
          cancelButtonColor : "var(--main2)",
          confirmButtonText : "결제취소",
          confirmButtonColor : "var(--main1)",
          // reverseButtons : true
          // willOpen: () => {
          //   document.body.style.overflow = 'visible';
          // },
        }).then((data) => {
          if(data.isConfirmed){
            setAlertType(0);
          }
        })
        return false;
      }
      setAlertType(0);
    }
  }


  useEffect(() => {
    // 외부 스크립트 로드 함수
    const loadScript = (src, callback) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };

    // 스크립트 로드 후 실행
    loadScript('https://code.jquery.com/jquery-1.12.4.min.js', () => {
      loadScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js', () => {
        const IMP = window.IMP;
        // 가맹점 식별코드
        IMP.init("imp67386065");
      });
    });

    // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);


  
  
  // 나중에 다른걸로 대체 (swal 띄우면 스크롤 사라지는거 때매 alert창이 뜨면 스크롤을 사라지게 만듦)
  const [alertType, setAlertType] = useState(0);
  // const body = document.querySelector("body");
  // if(alertType !== 0){
  //   body.style.paddingLeft = '17px';
  //   body.style = "overflow: hidden";
  // }
  // else{
  //   body.style.paddingRight = "0px"
  //   body.style = "overflow: auto";
  // }

  return (
    <div className="convention-preview-wrap">

      {showType ?
      convention.imgStyle === 1 ? 
      <ConventionPreviewBack {...convention} />
      :
      convention.imgStyle === 2 ? 
      <ConventionPreviewMain {...convention} />
      :
      ""
      :
      <ConventionLayout />
      }

      <div className="convention-preview-info-wrap">
        <div className="convention-inner-preview-info convention-layout-btn">
          <button onClick={() => {
            setShowType(!showType);
          }}>부스 보기</button>
        </div>

        <div className="convention-inner-preview-info convention-way-btn">
          <button onClick={() => {
            setAlertType(2);
          }}>찾아오시는 길</button>
        </div>

        <div className="convention-inner-preview-info convention-buy-btn">
          <button onClick={() => {
            setNoticeEmail("");
            setAlertType(3);
          }}>박람회 신청</button>
          {/* 일단은 유저꺼 먼저 제작 */}
          {/* 일반유저면 신청 / 업체면 부스 등록 / 관리자면 수정 */}
        </div>
      </div>

      
      
      {alertType === 2 ? 
      <ConventionLocate closeAlert={closeAlert} />
      :
      alertType === 3 ? 
      <BuyTicket closeAlert={closeAlert}
        noticeEmail={noticeEmail} changeEmail={changeEmail}
        changeLastEmail={changeLastEmail} dateMsgRef={dateMsgRef}
        conventionShowDate={conventionShowDate} setSelectDate={setSelectDate}
        personalMsgRef={personalMsgRef} personalRef={personalRef} selectDate={selectDate}
        convention={convention} fullNoticeEmail={fullNoticeEmail}

      />
      :
      ""
      }

      
    </div>
  )
}







export default ConventionMain

