import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { cancelPay } from "../convention/conventionRefund";
import ConventionLoading from "../convention/ConventionLoading";
import { ReviewForm } from "../product/components";
import Review from "../product/components/ReviewFrom";

const MyPayment = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const setNowPath = props.setNowPath;
	setNowPath("payment");
	const [activeButton, setActiveButton] = useState("all");
	const memberNo = useRecoilValue(loginNoState);
	const [paymentList, setPaymentList] = useState([]);
	const [result, setResult] = useState(-1);
	const [refundStatus, setRefundStatus] = useState(false);
	const [visibleCount, setVisibleCount] = useState(5); // 처음에 5개 보여줌

	const stateChange = (e) => {
		setActiveButton(e.target.name);
	};

	useEffect(() => {
		axios
			.get(`${backServer}/member/paymentList/${memberNo}/${activeButton}`)
			.then((res) => {
				setPaymentList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [memberNo, activeButton, result]);

	useEffect(() => {
		setRefundStatus(false);
		if (result === 1) {
			// 결제 취소 성공 알림
			Swal.fire({
				text: "환불이 완료되었습니다.",
				icon: "success",
				confirmButtonText: "확인",
			});
		} else if (result === 0) {
			// 결제 취소 실패 알림
			Swal.fire({
				text: "환불 처리 실패. 관리자에게 문의해주세요.",
				icon: "error",
				confirmButtonText: "확인",
			});
		}
	}, [result]);

	// 더보기 버튼 클릭 시 5개 더 보여줌
	const handleLoadMore = () => {
		setVisibleCount((prevCount) => prevCount + 5);
	};

	return (
		<div className="mypage-payment-wrap">
			<div>
				<div className="mypage-payment-state">
					<div className={`${activeButton === "all" ? "stateHere" : ""}`}>
						<button name="all" onClick={stateChange}>
							전체
						</button>
					</div>
					<div className={`${activeButton === "payment" ? "stateHere" : ""}`}>
						<button name="payment" onClick={stateChange}>
							결제 완료
						</button>
					</div>
					<div className={`${activeButton === "complet" ? "stateHere" : ""}`}>
						<button name="complet" onClick={stateChange}>
							이용 완료
						</button>
					</div>
					<div className={`${activeButton === "cancel" ? "stateHere" : ""}`}>
						<button name="cancel" onClick={stateChange}>
							결제 취소
						</button>
					</div>
				</div>
				<div className="mypage-payment-list">
					{paymentList.slice(0, visibleCount).map((pay, index) => {
						return (
							<table className="paymentList-tbl">
								<tbody>
									<tr key={pay} className="payment-title">
										<td colSpan="4">
											<div>
												<h3>{pay.payDate}</h3>
											</div>
										</td>
									</tr>
									<tr className="payment-info">
										<td style={{ width: "15%" }}>
											<Link
												className="mypage-favorite-product"
												to={
													pay.product.companyCategory === "박람회"
														? `/convention/main`
														: pay.product.companyCategory === "웨딩홀"
															? `/product/hallInfo/${pay.productNo}`
															: `/product/info/${pay.productNo}`
												}
											>
												<div className="payment-productImg">
													<img src={`${backServer}/product/image/${pay.product.productImg}`} />
												</div>
											</Link>
										</td>
										<td className="payment-info-text" style={{ width: "50%" }}>
											<span>{`${pay.progress === 3 ? "이용 완료" : pay.progress === 2 ? "결제 취소" : "결제 완료"}`}</span>
											<Link
												className="mypage-favorite-product"
												to={
													pay.product.companyCategory === "박람회"
														? `/convention/main`
														: pay.product.companyCategory === "웨딩홀"
															? `/product/hallInfo/${pay.productNo}`
															: `/product/info/${pay.productNo}`
												}
											>
												<h4>
													{" "}
													{pay.companyName !== null ? "[ " + `${pay.companyName}` + " ]" : "[ 웨딩스토리 ]"} {pay.product.productName}
												</h4>
											</Link>
											<p>이용일 : {pay.progressDate}</p>
										</td>
										<td className="payment-info-price" style={{ width: "15%" }}>
											{pay.payPrice.toLocaleString()}원
										</td>
										<td className="payment-info-btnBox" style={{ width: "20%" }}>
											<div>
												{pay.progress === 3 ? (
													<button>후기작성</button>
												) : pay.progress === 2 ? (
													"취소완료"
												) : (
													<button
														onClick={() =>
															Swal.fire({
																text: "환불 요청하시겠습니까?",
																icon: "question",
																showCancelButton: true,
																cancelButtonText: "취소",
																confirmButtonText: "확인",
															}).then((res) => {
																if (res.isConfirmed) {
																	cancelPay(pay, "convention/refund", setResult, "");
																	setRefundStatus(true);
																}
															})
														}
													>
														환불요청
													</button>
												)}
												<Review payNo={pay.payNo} productNo={pay.productNo} index={index} />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						);
					})}
					{visibleCount < paymentList.length && ( // 모든 결제 내역을 다 보여주지 않았을 때만 버튼 표시
						<div className="mypage-payment-moreBtn">
							<button onClick={handleLoadMore}>
								더보기 <span> &#9660;</span>
							</button>
						</div>
					)}
					{refundStatus ? (
						<div id="convention-loading">
							<ConventionLoading loadingTime={0} />
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};
export default MyPayment;
