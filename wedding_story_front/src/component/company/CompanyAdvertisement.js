import { Link } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CompanyAdvertisement = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [advert, setAdvert] = useState([]);
	const [reqPage, setReqPage] = useState(1);
	const [pi, setPi] = useState([]);
	const insertRef = useRef();
	const spanRef = useRef();
	const [disableButton, setDisableButton] = useState(false);
	useEffect(() => {
		axios
			.get(`${backServer}/company/advertisement/${companyNo}/${reqPage}`)
			.then((res) => {
				console.log(res);
				setAdvert(res.data.advert);
				setPi(res.data.pi);

				const totalAds = res.data.advert.filter((ad) => ad.advertisementState === 2).length;

				// 비활성화 조건: advertisementState가 2인 광고가 5개이면 버튼 비활성화
				if (totalAds >= 5) {
					setDisableButton(true);
					spanRef.current.style.display = "inline";
				} else {
					setDisableButton(false); // 조건을 만족하지 않으면 버튼 활성화
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, reqPage, advert]);

	const totalPrice = (advert) => {
		if (advert.advertisementState === 4) {
			if (advert.adRank === 1) {
				return "200"; // Premium ad
			} else if (advert.adRank === 2) {
				return "100"; // Basic ad
			}
		}
		return "0"; // Default price when conditions don't match
	};
	console.log(totalPrice);

	const requestPay = (advert) => {
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
				name: advert.productName,
				amount: totalPrice(advert),
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
					callback(rsp, advert);
					//줘야할 데이터
					// 회원번호 / 회원 알림이메일 / 구매 금액 / 박람회 번호 / merchant_uid
				} else {
					// 결제 실패 시 로직
					console.log("Payment failed", rsp.error_msg);
					alert("결제에 실패했습니다. 다시 시도해주세요.");
					// 추가로 실행할 로직을 여기에 작성
					// DB 에서 다시 삭제
				}
			},
		);
	};
	const callback = (response, advert) => {
		const form = new FormData();
		form.append("companyNo", companyNo);
		form.append("advertisementNo", advert.advertisementNo);
		form.append("payDate", advert.adRequestDate);
		form.append("merchantUid", response.merchant_uid);
		form.append("payPrice", totalPrice(advert));
		axios
			.post(`${backServer}/company/companyPay`, form)
			.then((res) => {
				console.log(res);
				alert("결제가 완료되었습니다!");
			})
			.catch((err) => {
				console.log(err);
				alert("결제에 실패했습니다. 다시 시도해주세요.");
			});
	};
	console.log(totalPrice);
	return (
		<section className="section">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="list-wrap">
					<div className="list-title">
						광고 목록
						<span className="span" ref={spanRef} style={{ marginLeft: "20px", display: "none" }}>
							* 광고요청은 최대 5개 까지만 가능합니다.
						</span>
					</div>

					<div className="navi-request">
						<Link to={"/company/advertisementRequest"}>
							<button className="advert" type="button" ref={insertRef} disabled={disableButton}>
								광고 신청
							</button>
						</Link>
					</div>
					<div className="advertisement-list-wrap">
						<table className="tbl">
							<thead border={1}>
								<tr>
									<th style={{ width: "5%" }}>상품 번호</th>
									<th style={{ width: "15%" }}>상품명 </th>
									<th style={{ width: "7%" }}>광고등급</th>
									<th style={{ width: "7%" }}>광고 시작일자</th>
									<th style={{ width: "7%" }}>광고 종료일자</th>
									<th style={{ width: "10%" }}>요청날짜</th>
									<th style={{ width: "20%" }}>요청내용</th>
									<th style={{ width: "7%" }}>진행도</th>
									<th style={{ width: "6%" }}>결제</th>
								</tr>
							</thead>
							<tbody>
								{advert.map((advert, index) => {
									return <AdvertItem key={"advert" + index} advert={advert} index={index} requestPay={requestPay} />;
								})}
							</tbody>
						</table>
						<div className="product-page-wrap">
							<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

const AdvertItem = (props) => {
	const advert = props.advert;
	const index = props.index;
	const requestPay = props.requestPay;

	return (
		<tr>
			<td style={{ width: "5%" }}>{advert.productNo}</td>
			<td style={{ width: "15%" }}>{advert.productName}</td>
			<td style={{ width: "7%" }}>{advert.adRank === 1 ? "premium" : "basic"}</td>
			<td style={{ width: "10%" }}>{advert.adStart}</td>
			<td style={{ width: "10%" }}>{advert.adEnd}</td>
			<th style={{ width: "10%" }}>{advert.adRequestDate}</th>
			<td style={{ width: "20%" }}>{advert.adRequest}</td>
			<td style={{ width: "10%" }}>
				{advert.advertisementState === 0
					? "승인대기"
					: advert.advertisementState === 1
						? "결제완료"
						: advert.advertisementState === 2
							? "광고중"
							: advert.advertisementState === 3
								? "광고종료"
								: advert.advertisementState === 4
									? "결제요청"
									: advert.advertisementState === 5
										? "승인 거절"
										: ""}
			</td>
			<td style={{ width: "10%" }}>
				{advert.advertisementState === 4 ? (
					<button type="submit" onClick={() => requestPay(advert)}>
						결제하기
					</button>
				) : advert.advertisementState === 1 ? (
					"완료"
				) : (
					"-"
				)}
			</td>
		</tr>
	);
};

export default CompanyAdvertisement;
