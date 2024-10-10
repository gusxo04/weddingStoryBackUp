import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const WeddingPayment = () => {
	useEffect(() => {
		// 외부 스크립트 로드 함수

		const loadScript = (src, callback) => {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = src;
			script.onload = callback;
			document.head.appendChild(script);
		};
		// 스크립트 로드 후 실행
		loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
			loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
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

	const backServer = process.env.REACT_APP_BACK_SERVER;
	const params = useParams();
	const productNo = params.productNo;
	const location = useLocation();
	const navigate = useNavigate(); // navigate 사용
	// const memberNo= useRecoilValue(loginNoState);
	const [memberNo, setMemberNo] = useRecoilState(loginNoState);
	const [member, setMember] = useState({
		memberName: "",
		memberPhone: "",
	});

	const [totalPrice, setTotalPrice] = useState(0);

	const [product, setProduct] = useState({
		productNo: "",
		productName: "",
		productPrice: "",
		coronation: "",
		numberPeople: "",
		diningRoom: "",
	});

	const [memberPay, setMemberPay] = useState({});

	// 회원 정보 가져오기
	useEffect(() => {
		if (memberNo && productNo) {
			axios
				.get(`${backServer}/product/reservation/${memberNo}/${productNo}`)
				.then((res) => {
					console.log(memberNo);
					setMember(res.data.member);
					setProduct(res.data.product);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [memberNo, productNo]);
	//console.log(member);

	// 입력 데이터 변경 처리
	const changeProduct = (e) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	const changeDate = (e) => {
		const name = e.target.name;
		setMemberPay({ ...memberPay, [name]: e.target.value }); // 날짜 상태 업데이트
	};
	console.log(memberPay);

	// 결제 금액 계산
	useEffect(() => {
		payWedding();
	}, [memberNo, product.numberPeople]);

	const payWedding = () => {
		const perPersonFee = parseFloat(product.diningRoom); // 인당 식비
		const rentalFee = parseFloat(product.coronation) || 0; // 대관료
		const numberOfPeople = parseInt(product.numberPeople) || 0; // 인원수

		// const total = rentalFee + perPersonFee * numberOfPeople;
		setTotalPrice(rentalFee + perPersonFee * numberOfPeople);

		return (
			<div className="total-pay">
				<h3>총 예상비용: {totalPrice.toLocaleString()} 원</h3>
			</div>
		);
	};

	// 결제 처리 로직
	const requestPay = () => {
		// const { IMP } = window; // 아임포트 window 객체
		// IMP.init("your_imp_code"); // 아임포트 코드

		// const data = {
		//   pg: "kakaopay", // 결제 방식
		//   pay_method: "card",
		//   merchant_uid: `merchant_${new Date().getTime()}`, // 고유 주문번호
		//   name: product.productName,
		//   amount: parseFloat(product.diningRoom) + parseFloat(product.coronation), // 결제 금액
		//   buyer_name: member.memberName,
		//   buyer_tel: member.memberPhone,
		// };

		// IMP.request_pay(data, callback);

		const date = new Date();
		const dateString =
			date.getFullYear() +
			"" +
			(date.getMonth() + 1) +
			"" +
			date.getDate() +
			"" +
			date.getHours() +
			"" +
			date.getMinutes() +
			"" +
			date.getSeconds();

		window.IMP.request_pay(
			{
				pg: "html5_inicis.INIpayTest",
				pay_method: "card",
				merchant_uid: dateString,
				name: product.productName,
				amount: totalPrice,
				// 나중에 회원 DB 조회해서 다 넣기
				// buyer_email: memberEmail,
				// buyer_name: memberName,
				// buyer_tel: memberPhone,
				// buyer_addr: "서울특별시 강남구 신사동",
				// buyer_postcode: "123-456"
			},
			(rsp) => {
				if (rsp.success) {
					// 결제 성공 시 로직
					callback(rsp);
					//줘야할 데이터
					// 회원번호 / 회원 알림이메일 / 구매 금액 / 박람회 번호 / merchant_uid
				} else {
					// 결제 실패 시 로직
					console.log("Payment failed", rsp.error_msg);
					// 추가로 실행할 로직을 여기에 작성
					// DB 에서 다시 삭제
				}
			},
		);
	};
	console.log("로직 외부", memberPay.merchantUid);

	// 결제 완료 후 호출되는 콜백 함수
	const callback = (response) => {
		const { success, error_msg, imp_uid, merchant_uid, paid_amount } = response;

		if (success) {
			alert("결제가 완료되었습니다.");
			// 결제 완료 후 서버에 결제 정보 전송
			console.log(response.merchant_uid);
			submitForm(response);
		} else {
			alert(`결제 실패: ${error_msg}`);
		}
	};

	// 예약 폼 데이터 전송
	const submitForm = (response) => {
		// FormData 생성
		const formData = new FormData();
		formData.append("memberNo", memberNo);
		formData.append("memberName", member.memberName);
		formData.append("memberPhone", member.memberPhone);
		formData.append("productName", product.productName);
		formData.append("progressDate", memberPay.progressDate); // 예식 날짜 추가
		formData.append("progressTime", memberPay.progressTime); // 예식 시간 추가
		formData.append("numberPeople", product.numberPeople);
		formData.append("coronation", product.coronation);
		formData.append("diningRoom", product.diningRoom);
		formData.append("productNo", product.productNo);
		formData.append("merchantUid", response.merchant_uid); // 결제 고유 ID 추가
		formData.append("payPrice", totalPrice);
		console.log([...formData]); // FormData 확인용
		//서버 데이터 전송
		axios
			.post(`${backServer}/product`, formData) // POST 요청으로 예약 정보 전송
			.then((res) => {
				console.log(res.data);
				alert("예약이 완료되었습니다!");
				navigate("/"); // 성공 시 메인 페이지로 이동
			})
			.catch((err) => {
				console.error(err);
				alert("예약에 실패했습니다. 다시 시도해주세요.");
			});
	};

	return (
		<section className="wedding-wrap">
			<div className="title-name">웨딩홀 예약</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					//submitForm();
				}}
			>
				<Link to="#" onClick={() => window.history.back()}>
					<span className="material-icons">arrow_back</span>
				</Link>
				<div className="wedding-content">
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="memberName">이름</label>
						</div>
						<div className="input-item">
							<input type="text" name="memberName" id="memberName" defaultValue={member.memberName} readOnly />
						</div>
					</div>
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="memberPhone">전화번호</label>
						</div>
						<div className="input-item">
							<input type="text" name="memberPhone" id="memberPhone" value={member.memberPhone} readOnly />
						</div>
					</div>
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="productName">웨딩홀 정보</label>
						</div>
						<div className="input-item">
							<input name="productName" id="productName" value={product.productName} readOnly />
						</div>
					</div>
					{/*예식날짜 추가 */}
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="progressDate">예식 날짜</label>
						</div>
						<div className="input-item">
							<input type="date" name="progressDate" id="progressDate" value={memberPay.progressDate} onChange={changeDate} />
						</div>
					</div>
					{/*예식시간 추가 */}
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="progressDate">예식 시간</label>
						</div>
						<div className="input-item">
							<input type="time" name="progressTime" id="progressTime" value={memberPay.progressTime} onChange={changeDate} />
						</div>
					</div>
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="coronation">대관료</label>
						</div>
						<div className="input-item">
							<input type="text" name="coronation" id="coronation" value={product.coronation.toLocaleString()} readOnly />
						</div>
					</div>
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="diningRoom">식대</label>
						</div>
						<div className="input-item">
							<input type="text" name="diningRoom" id="diningRoom" value={product.diningRoom.toLocaleString()} readOnly />
						</div>
					</div>
					<div className="input-wrap">
						<div className="input-title">
							<label htmlFor="coronation">보증인원</label>
						</div>
						<div className="input-item">
							<input
								type="text"
								name="numberPeople"
								id="numberPeople"
								value={product.numberPeople}
								onChange={(e) => {
									const value = e.target.value;
									// 숫자 여부 확인과 최대 값 1000 제한
									if (!isNaN(value) && Number(value) <= 1000) {
										changeProduct(e); // 1000 이하일 때만 값 변경 허용
									}
								}}
							/>
						</div>
					</div>
					<div className="pay">총 금액 : {totalPrice.toLocaleString()}원</div>
				</div>
				<div className="wedding-button">
					<button type="submit" className="btn" onClick={requestPay}>
						웨딩홀 예약하기
					</button>
				</div>
			</form>
		</section>
	);
};

export default WeddingPayment;
