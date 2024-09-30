import axios from "axios";

class CancelPay {
  cancelPay = (memberNo, companyNo, payment, refundReason, setResult) => {
    // 받아야할 파라미터
    // memberNo : 회원번호 (없으면 0 줘야함)
    // companyNo : 업체 번호 (없으면 null 줘야함)
    // payment : payment 객체 (memberPayDTO나 companyPayDTO 조회해서 필요한 데이터 가져오면 됨)
    // refundReason : 별로 중요하지 않음 -> 입력 안 받았으면 문자열 대충 아무거나 주면 됨
    // setResult : setResult state 넘겨주면 됨 (환불성공시 result state는 1이 들어가고 실패시 0이 들어감 그래서 초기세팅을 -1로 하는게 좋음)
    const backServer = process.env.REACT_APP_BACK_SERVER;
    axios({
      url: `${backServer}/convention/refund`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        memberNo: memberNo,
        companyNo: companyNo,
        //티켓환불은 memberNo랑 ticketNo / 업체 부스 환불은 companyNo랑 conventionComanyNo
        ticketNo: payment.ticketNo,
        conventionCompanyNo: payment.conventionCompanyNo,
        merchantUid: payment.merchantUid, // 주문번호
        cancelRequestAmount: payment.payPrice, // 환불금액
        reason: refundReason, // 환불사유
      },
    })
    .then((res) => {
      if(res.data){
        setResult(1);
      }
      else{
        setResult(0);
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export const cancelPay = new CancelPay().cancelPay;