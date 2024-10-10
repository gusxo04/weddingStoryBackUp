import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DetailInfo = () => {
	const location = useLocation();
	const userInfo = { ...location.state };
	const [consultNo, setConsultNp] = useState(Object.values(userInfo));
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [consult, setConsult] = useState([]);
	useEffect(() => {
		axios
			.get(`${backServer}/company/detailInfo/${consultNo}`)
			.then((res) => {
				console.log(res);
				setConsult(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [consultNo]);
	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};

	return (
		<section className="section">
			<div className="list-wrap">
				<div className="list-title">예약 상세정보</div>
				<div className="tables-container">
					<div className="table-wrap">
						<table className="detailInfo-tbl" border={1}>
							<thead style={{ width: "500px" }}>
								<tr>
									<th style={{ width: "10%" }}>상담번호</th>
									<td style={{ width: "10%" }}>{consult.consultNo}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>고객번호</th>
									<td style={{ width: "10%" }}>{consult.memberNo}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>고객성함</th>
									<td style={{ width: "10%" }}>{consult.memberName}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>고객 전화번호</th>
									<td style={{ width: "10%" }}>{consult.memberPhone}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>배우자성함</th>
									<td style={{ width: "10%" }}>{consult.partnerName === null ? "정보 없음" : consult.partnerName}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>예식 예정일</th>
									<td style={{ width: "10%" }}>{consult.reservation === null ? "미정" : consult.reservation} </td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>계약상태</th>
									<td style={{ width: "10%" }}>
										{consult.contract === 0 ? "계약전" : consult.contract === 1 ? "가계약" : consult.contract === 2 ? "계약완료" : ""}
									</td>
								</tr>
							</thead>
						</table>
					</div>

					<div className="table-wrap">
						<table className="detailInfo-tbl" border={1}>
							<thead>
								<tr>
									<th style={{ width: "10%" }}>상품 번호</th>
									<td style={{ width: "10%" }}>{consult.productNo}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>상품이름</th>
									<td style={{ width: "10%" }}>{consult.productName}</td>
								</tr>
								<tr>
									<th style={{ width: "10%" }}>상품가격</th>
									<td style={{ width: "10%" }}>
										<NumberFormatter number={consult.productPrice} />원
									</td>
								</tr>
								{consult.coronation === null ? (
									""
								) : (
									<tr>
										<th style={{ width: "10%" }}>대관료</th>
										<td style={{ width: "10%" }}>
											<NumberFormatter number={consult.coronation} />원
										</td>
									</tr>
								)}
								{consult.diningRoom === null ? (
									""
								) : (
									<tr>
										<th style={{ width: "10%" }}>1인 식대</th>
										<td style={{ width: "10%" }}>
											인당 <NumberFormatter number={consult.diningRoom} />원
										</td>
									</tr>
								)}
								{consult.numberPeople === null ? (
									""
								) : (
									<tr>
										<th style={{ width: "10%" }}>보증인원</th>
										<td style={{ width: "10%" }}>
											{" "}
											<NumberFormatter number={consult.numberPeople} /> 명
										</td>
									</tr>
								)}
							</thead>
						</table>
					</div>
				</div>
				<div className="payment-btn">
					<Link to={`/company/weddingHallPayMent/${consult.productNo}`}>결제</Link>
					<button onClick={() => {}}>취소</button>
				</div>
			</div>
		</section>
	);
};

export default DetailInfo;
