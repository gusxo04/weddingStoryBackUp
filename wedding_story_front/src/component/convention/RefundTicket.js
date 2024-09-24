import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

const RefundTicket = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    closeAlert,
    payment,
    isPayment,
    setIsPayment,
  } = props;

  // const [memberNoState, setMemberNoState] = useRecoilState();
  const [memberNoState, setMemberNoState] = useState(2);
  
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
          reason: "테스트", // 환불사유
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
      return <button id="refund-btn" onClick={this.cancelPay}>환불하기</button>;
    }
  }
  
  
  return (
    <div className="convention-member-alert-wrap convention-refund-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-refund-alert-wrap">
        <CancelPay />

      </div>
    </div>
  )
}
export default RefundTicket