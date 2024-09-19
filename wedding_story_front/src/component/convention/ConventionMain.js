import axios from "axios";
import "./convention.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";


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
  const buyRef = useRef(null);
  const personalRef = useRef(null);
  const dateMsgRef = useRef(null);
  const personalMsgRef = useRef(null);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      // console.log(res);
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
          <ShowConvention convention={convention} conventionShowDate={conventionShowDate} setConventionShowDate={setConventionShowDate} type={true} buyRef={buyRef} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} lastEmail={lastEmail} fullNoticeEmail={fullNoticeEmail} />  
          : 
          <ShowConvention convention={convention} conventionShowDate={conventionShowDate} setConventionShowDate={setConventionShowDate} type={false} buyRef={buyRef} personalRef={personalRef} setSelectDate={setSelectDate} selectDate={selectDate} dateMsgRef={dateMsgRef} personalMsgRef={personalMsgRef} noticeEmail={noticeEmail} changeEmail={changeEmail} changeLastEmail={changeLastEmail} lastEmail={lastEmail} fullNoticeEmail={fullNoticeEmail} />) 
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
    buyRef,
    conventionShowDate,
    setConventionShowDate,
    personalRef,
    selectDate,
    setSelectDate,
    dateMsgRef,
    personalMsgRef,
    noticeEmail,
    changeEmail,
    lastEmail,
    changeLastEmail,
    fullNoticeEmail,
  } = props;
  const backServer = process.env.REACT_APP_BACK_SERVER;


  // 
  const conventionOpenBuy = () => {
    personalRef.current.checked = false;
    dateMsgRef.current.style.display = "none";
    personalMsgRef.current.style.color = "black";
    buyRef.current.style.display = "flex";
  }
  
  const conventionCloseBuy = (e, pass) => {
    if(pass === 1 || e.target.className === "convention-member-alert-wrap"){
      buyRef.current.style.display = "none";
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



  const submit = () => {
    dateMsgRef.current.style.display = "none";
    personalMsgRef.current.style.color = "black";
    if(!personalRef.current.checked || !selectDate){
      if(!selectDate) dateMsgRef.current.style.display = "flex";
      if(!personalRef.current.checked) personalMsgRef.current.style.color = "red";
      return false;
    }

    //알림 받을 이메일 합치기
    
    
    // 결제 API!
    const date = new Date();
		const dateString = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();
    
    
    window.IMP.request_pay({
      pg: "html5_inicis.INIpayTest",
      pay_method: "card",
      merchant_uid: dateString,
      name: "박람회 티켓 구매",
      amount: convention.conventionPrice,
      // 나중에 회원 DB 조회해서 다 넣기
      buyer_email: "test@portone.io",
      buyer_name: "구매자 이름",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "123-456"
    }, rsp => {
      if (rsp.success) {
        // 결제 성공 시 로직
        console.log(rsp);
        //줘야할 데이터
        // 회원번호 / 회원 알림이메일 / 구매 금액 / 박람회 번호 / merchant_uid
        const form = new FormData();
        // form.append("memberNo")
        form.append("conventionNo", convention.conventionNo);
        form.append("memberEmail", fullNoticeEmail);

        form.append("merchantUid", rsp.merchant_uid);
        form.append("payPrice", convention.conventionPrice);
        form.append("progressDate", selectDate);
        form.append("progressTime", convention.conventionTime);
        
        axios.post(`${backServer}/convention/buy`, form)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
      } else {
        // 결제 실패 시 로직
        console.log('Payment failed', rsp.error_msg);
        // 추가로 실행할 로직을 여기에 작성
      }
    });
    
    
    
    
  }

  
  return (
    <div className="convention-preview-wrap">
      {convention.imgStyle === 1 ? 
      <ConventionPreviewBack {...convention} />
      : 
      <ConventionPreviewMain {...convention} />
      }

      <div className="convention-preview-info-wrap">
        <div className="convention-inner-preview-info convention-layout-btn">
          <button>부스 보기</button>
        </div>

        <div className="convention-inner-preview-info convention-way-btn">
          <button>찾아오시는 길</button>
        </div>

        <div className="convention-inner-preview-info convention-buy-btn">
          <button onClick={conventionOpenBuy}>박람회 신청</button>
          {/* 일단은 유저꺼 먼저 제작 */}
          {/* 일반유저면 신청 / 업체면 부스 등록 / 관리자면 수정 */}
        </div>
      </div>

      <div className="convention-member-alert-wrap" ref={buyRef} style={{display:"none"}} onClick={conventionCloseBuy}>
        <div className="convention-input-alert">

          <div className="convention-email-wrap">
            <div className="convention-email-info-wrap">
              <label htmlFor="email"><span>알림받을 이메일을 입력해주세요</span></label>
            </div>

            <div className="convention-email-input-wrap">
              <input type="text" className="convention-email-input" id="email" value={noticeEmail} onChange={changeEmail} />
              <span> @ </span>
              <select name="" id="convention-email-last" onChange={changeLastEmail}>
                <option value="naver.com" >naver.com</option>
                <option value="google.com" >google.com</option>
              </select>
            </div>

            <div className="convention-date-msg" style={{display:"none"}} ref={dateMsgRef} >
              <span style={{color:"red"}}>날짜를 선택해주세요</span>
            </div>
            
          </div>
          
          <div className="convention-date-wrap">
            {conventionShowDate.map((date,index) => {
              const selectDate = (e) => {
                setSelectDate(e.target.value);
              }
              return (
                <div key={"date-"+index} className="convention-inner-date">
                  <label htmlFor={"date-label-"+index+1}>
                    <span>{date.toLocaleDateString().slice(0,-1).trim().split(" ").join("").split('.').join('-')}</span>
                    <span id="small">({date.toLocaleDateString('ko-kr', {weekday: 'short'})})</span>
                  </label>
                  <input type="radio" id={"date-label-"+index+1} name="date-radio" 
                  value={date.toLocaleDateString().slice(0,-1).trim().split(" ").join("").split('.').join('-')} 
                  onClick={selectDate}

                  />
                </div>
              )
            })}
          </div>

          <div className="convention-personal-info-wrap">
            <span>!</span>
            {/* ! 누르면 약관 보여주기 언젠간하겠지 */}
            <label htmlFor="personal" ref={personalMsgRef} >이용약관및 개인정보 수집/이용 동의</label>
            <input type="checkbox" id="personal" ref={personalRef} />
          </div>

          <div className="convention-btn-wrap">
            <button className="convention-cancel-btn" onClick={() => {
              conventionCloseBuy(null,1); 
            }}>취소</button>
            <button className="convention-submit-btn" onClick={submit}>결제</button>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}









export default ConventionMain

