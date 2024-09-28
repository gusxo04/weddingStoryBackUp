import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginNoState } from "../utils/RecoilData";

const BuyTicket = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const {
    closeAlert,
    noticeEmail,
    changeEmail,
    changeLastEmail,
    dateMsgRef,
    conventionShowDate,
    setSelectDate,
    personalMsgRef,
    personalRef,
    selectDate,
    fullNoticeEmail,
    convention,
    isPayment,
    setIsPayment,
  } = props;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);

  
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
      name: "박람회 티켓",
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
        form.append("memberNo", memberNoState);
        form.append("conventionNo", convention.conventionNo);
        form.append("memberEmail", fullNoticeEmail);

        form.append("merchantUid", rsp.merchant_uid);
        form.append("payPrice", convention.conventionPrice);
        form.append("progressDate", selectDate);
        form.append("progressTime", convention.conventionTime);
        
        axios.post(`${backServer}/convention/buy/ticket`, form)
        .then(res => {
          console.log(res);
          if(res.data){
            // 결제 성공시
            setIsPayment(!isPayment);
            Swal.fire({
              title : "박람회 티켓",
              text : "결제에 성공하셨습니다",
              timer : 2500,
              confirmButtonColor : "var(--main1)",
              confirmButtonText : "확인",
            })
          }
          // 근데 이거 나중에 true false를 리턴해서 체크하는게 아니라 정원수때문인지 뭔지도 이유 알려줘야 해서 바꿔야할 듯
          else{
            Swal.fire({
              title : "박람회 티켓",
              text : "잠시후 다시 시도해주세요",
              timer : 2500,
              confirmButtonColor : "var(--main1)",
              confirmButtonText : "확인",
            })
          }

          closeAlert(0, true);
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
    <div className="convention-member-alert-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-input-alert">

        <div className="convention-email-wrap">
          <div className="convention-email-info-wrap">
            <label htmlFor="email"><span>알림받을 이메일을 입력해주세요</span></label>
          </div>

          <div className="convention-email-input-wrap">
            <div className="email-first-input-wrap">
              <input type="text" className="convention-email-input" id="email" value={noticeEmail} onChange={changeEmail} />
            </div>

            <div className="email-mid-wrap">
              <span> @ </span>
            </div>

            <div className="email-last-input-wrap">
              <select name="" id="convention-email-last" onChange={changeLastEmail}>
                <option value="naver.com" >naver.com</option>
                <option value="google.com" >google.com</option>
              </select>
            </div>
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
            closeAlert(2,true); 
          }}>취소</button>
          <button className="convention-submit-btn" onClick={submit}>결제</button>
        </div>
        
      </div>
    </div>
  )
}
export default BuyTicket