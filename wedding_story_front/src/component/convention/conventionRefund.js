import axios from "axios";
import Swal from "sweetalert2";

class CancelPay {
	cancelPay = (payment, backUrl, setResult, refundReason) => {
		// 받아야할 파라미터
		// 1. payment 객체 : 밑에 data : {} 에 있는 데이터들 주면 되는데 상품 (productNo는 필요하면 추가하면 됨)
		// 필요없는 얘들은 안 만들어도 됨 (null이여도 된다는 소리)
		// 2. backUrl : 주소가 /convention/refund 로 가야한다면
		// const backUrl = "convention/refund"; 이런식으로 하면 됨 (앞에 /는 빼고 파라미터로 줘야함)
		// 3. setResult : const [result, setResult] = useState(-1); 이거 하나 만들고 set함수만 주면 됨
		// 이유는 환불 성공 실패여부를 저거를 통해서 알 수 있음 1이면 성공 0이면 실패임
		// 그러면 원래 컴포넌트에서는 if(result === 1 or 0) 으로 여부를 로직작성 가능
		// 4. 그닥 중요하지는 않음 그냥 "환불이유" 적으면 됨 or 사용자에게 받거나 db에 따로 넣지는 않았음

		// memberNo : 회원번호 (없으면 0 줘야함)
		// companyNo : 업체 번호 (없으면 null 줘야함)
		// payment : payment 객체 (memberPayDTO나 companyPayDTO 조회해서 필요한 데이터 가져오면 됨)
		// refundReason : 별로 중요하지 않음 -> 입력 안 받았으면 문자열 대충 아무거나 주면 됨
		// setResult : setResult state 넘겨주면 됨 (환불성공시 result state는 1이 들어가고 실패시 0이 들어감 그래서 초기세팅을 -1로 하는게 좋음)
		const backServer = process.env.REACT_APP_BACK_SERVER;
		axios({
			url: `${backServer}/${backUrl}`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				memberNo: payment.memberNo,
				companyNo: payment.companyNo,
				//티켓환불은 memberNo랑 ticketNo / 업체 부스 환불은 companyNo랑 conventionComanyNo
				ticketNo: payment.ticketNo,
				conventionCompanyNo: payment.conventionCompanyNo,
				merchantUid: payment.merchantUid, // 주문번호
				cancelRequestAmount: payment.payPrice, // 환불금액
				reason: refundReason, // 환불사유
			},
		})
			.then((res) => {
				if (res.data) {
					setResult(1);
				} else {
					setResult(0);
				}
			})
			.catch((err) => {
				Swal.fire({
					title : "박람회",
					text : "잠시후 다시 시도해주세요",
					icon : "error",
					iconColor : "var(--main1)",
					confirmButtonText : "확인",
					confirmButtonColor : "var(--main1)"
				})
			});
	};
}

export const cancelPay = new CancelPay().cancelPay;
