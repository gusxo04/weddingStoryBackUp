import axios from "axios";
import React from "react";

const RefundTicket = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    closeAlert,
    payment,
  } = props;
  
  
  class CancelPay extends React.Component {
    cancelPay = () => {
      axios({
        url: `${backServer}/convention/refund`, // 예: http://www.myservice.com/payments/cancel
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          ticketNo : payment.ticketNo,
          merchantUid: payment.merchantUid, // 주문번호
          cancelRequestAmount: payment.payPrice, // 환불금액
          reason: "테스트", // 환불사유
          refundHolder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
          refundBank: "04", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
          refundAccount: "3333-4444-5555-6666", // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
        },
      });
    };
    render() {
      return <button onClick={this.cancelPay}>환불하기</button>;
    }
  }
  
  
  return (
    <div className="convention-member-alert-wrap" id="convention-close-screen" onClick={closeAlert}>
      <CancelPay />
    </div>
  )
}
export default RefundTicket