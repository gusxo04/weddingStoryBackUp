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
  const buyRef = useRef(null);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      console.log(res);
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

  // console.log(`두 날짜간의 차이는 ${diffDays - 1}일입니다.`);
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
        (startDate > 0 ? <ShowConvention convention={convention} conventionShowDate={conventionShowDate} setConventionShowDate={setConventionShowDate} type={true} buyRef={buyRef} /> : <ShowConvention convention={convention} conventionShowDate={conventionShowDate} setConventionShowDate={setConventionShowDate} type={false} buyRef={buyRef} />) 
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
    setConventionShowDate
  } = props;





  // 
  const conventionOpenBuy = () => {
    buyRef.current.style.display = "flex";
  }
  
  const conventionCloseBuy = (e, pass) => {
    if(pass === 1 || e.target.className === "convention-member-alert-wrap"){
      buyRef.current.style.display = "none";
    }
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
              <input type="text" className="convention-email-input" id="email" />
              <span> @ </span>
              <select name="" id="convention-email-last">
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
              </select>
            </div>
            
          </div>
          
          <div className="convention-date-wrap">
            {conventionShowDate.map((date,index) => {
              const selectDate = (e) => {
                console.log(e.target.value);
                return 
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
            <input type="checkbox" />
          </div>

          <div className="convention-btn-wrap">
            <button className="convention-cancel-btn" onClick={() => {
              conventionCloseBuy(null,1); 
            }}>취소</button>
            <button className="convention-submit-btn">결제</button>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}









export default ConventionMain

