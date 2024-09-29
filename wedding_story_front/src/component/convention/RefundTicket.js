import axios from "axios";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { loginNoState } from "../utils/RecoilData";

const RefundTicket = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    closeAlert,
    payment,
    isPayment,
    setIsPayment,
  } = props;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [refundReason, setRefundReason] = useState("");

  const reasonRef = useRef(null);
  
  class CancelPay extends React.Component {
    cancelPay = () => {
      axios({
        url: `${backServer}/convention/refund`, // 예: http://www.myservice.com/payments/cancel
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          memberNo : memberNoState,
          ticketNo : payment.ticketNo,
          merchantUid: payment.merchantUid, // 주문번호
          cancelRequestAmount: payment.payPrice, // 환불금액
          reason: refundReason, // 환불사유
          // refundHolder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
          // refundBank: "04", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
          // refundAccount: "3333-4444-5555-6666", // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data){
          setIsPayment(!isPayment);
          Swal.fire({
            title : "박람회 결제",
            text : "환불 완료",
            confirmButtonColor : "var(--main1)",
            confirmButtonText : "확인"
          })
        }
        else{
          Swal.fire({
            title : "박람회 결제",
            text : "잠시후 다시 시도해주세요",
            confirmButtonColor : "var(--main1)",
            confirmButtonText : "확인"
          })
        }

        closeAlert(0, true);
        
      })
      .catch((err) => {
        console.log(err);
      });
    };
    render() {
      return <button id="refund-btn" className="main-btn" onClick={this.cancelPay}>환불하기</button>;
    }
  }
  
  
  return (
    <div className="convention-member-alert-wrap convention-refund-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-refund-alert-wrap">
        <div className="convention-refund-title df-basic">
          <span>박람회 티켓 환불</span>
        </div>

        <div className="convention-refund-content">
          <div className="convention-refund-span df-basic">
            <span>티켓 환불 사유</span>
          </div>

          <div className="convention-refund-reason df-basic">
            <textarea id="refund-text" value={refundReason} ref={reasonRef} onChange={(e) => {
              setRefundReason(e.target.value);
              if(reasonRef.current.scrollHeight > reasonRef.current.clientHeight){
                reasonRef.current.style.borderRadius = "20px 0px 0px 20px";
              }
              else if(reasonRef.current.scrollHeight == reasonRef.current.clientHeight){
                reasonRef.current.style.borderRadius = "20px";
              }
            }}></textarea>
          </div>
          
        </div>

        <div className="convention-refund-btn df-basic">
          <CancelPay />
        </div>

      </div>
    </div>
  )
}
export default RefundTicket