import React, { useEffect, useRef, useState } from "react";
import "./advertisement.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";
const Advertisement = () => {
	const [Advertisement, setAdvertisement] = useState([]);
	const [activeAd, setActiveAd] = useState([]); //광고중

	const [adend, setAdend] = useState([]); //광고 종료

	const [adyet, setAdyet] = useState([]); //결제요청
	const [adwait, setAdwait] = useState([]); //승인대기
	const [payAd, setPayAd] = useState([]); //(관리자가 승인 누른 상태)결제 요청, 결제 전

	const [modalOpen, setModalOpen] = useState(false);
	const [change, setchange] = useState("0");
	const [refuse, setRefuse] = useState("");
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const backServer = process.env.REACT_APP_BACK_SERVER;

	useEffect(() => {
		axios
			.get(`${backServer}/advertisement/advertisement`)
			.then((res) => {
				console.log(res.data);
				if (res.data) {
					setActiveAd(Object.values(res.data.activeAd));
					setAdend(Object.values(res.data.endAd));
					setAdyet(Object.values(res.data.yetAd));
					setAdwait(Object.values(res.data.waitAd));
					setPayAd(Object.values(res.data.payAd));
				} else {
					console.log("진행중인 광고 없음");
					setActiveAd([activeAd, adend, adyet, adwait]);
				}
			})
			.catch((err) => {
				console.log(err);
				console.log("진행중인 광고 조회 에러");
				setActiveAd([]);
			});
	}, [change]);

	const convertEnd = (props) => {
		const changeDate = new Date(format(props.date, "yyyy-MM-dd"));
		const adEnd = new Date(format(props.adEnd, "yyyy-MM-dd"));
		const adStart = new Date(format(props.adStart, "yyyy-MM-dd"));

		const changeAdvertisementNo = props.changeAdvertisementNo;
		console.log("원래 : " + adEnd);
		console.log("바꾸려고 하는 날짜 : " + changeDate);

		if (changeDate >= adStart) {
			let date = props.date;
			setEndDate(date, changeAdvertisementNo);
		} else {
			Swal.fire({
				title: "잘못된 날짜",
				text: "시작날짜보다 빠르게 설정할 수 없습니다.",
				icon: "warning",
				iconColor: "var(--main1)",
				confirmButtonText: "확인",
				confirmButtonColor: "var(--main1)",
			});
		}
	};

	const convertStart = (props) => {
		const changeDate = new Date(format(props.date, "yyyy-MM-dd"));
		const adStart = new Date(format(props.adStart, "yyyy-MM-dd"));
		const adEnd = new Date(format(props.adEnd, "yyyy-MM-dd"));

		const changeAdvertisementNo = props.changeAdvertisementNo;
		console.log("원래 : " + adStart);
		console.log("바꾸려고 하는 날짜 : " + changeDate);

		if (changeDate < adEnd) {
			let date = props.date;
			setStartDate(date, changeAdvertisementNo);
		} else {
			Swal.fire({
				title: "잘못된 날짜",
				text: "종료날짜보다 늦을 수 없습니다.",
				icon: "warning",
				iconColor: "var(--main1)",
				confirmButtonText: "확인",
				confirmButtonColor: "var(--main1)",
			});
		}
	};

	const setStartDate = (date, changeAdvertisementNo) => {
		const changeStartDate = format(date, "yyyy-MM-dd");
		const advertisementNo = changeAdvertisementNo;
		console.log("바뀐날짜" + changeStartDate);
		console.log("광고번호" + advertisementNo);

		axios
			.get(`${backServer}/advertisement/changeStartDate/${changeStartDate}/${advertisementNo}`)
			.then((res) => {
				console.log(res.data);
				setchange((prev) => prev + 1);
				if (res.data) {
				} else {
					console.log("시작날짜 변경 안함");
				}
			})
			.catch((err) => {
				console.log(err);
				console.log("시작날짜변경 에러");
			});
	};

	const setEndDate = (date, changeAdvertisementNo) => {
		const changeEndDate = format(date, "yyyy-MM-dd");
		const advertisementNo = changeAdvertisementNo;
		console.log("바뀐날짜" + changeEndDate);
		console.log("광고번호" + advertisementNo);

		axios
			.get(`${backServer}/advertisement/changeEndDate/${changeEndDate}/${advertisementNo}`)
			.then((res) => {
				console.log(res.data);
				setchange((prev) => prev + 1);
				if (res.data) {
					console.log(res.data);
				} else {
					console.log("종료날짜 변경 안함");
				}
			})
			.catch((err) => {
				console.log(err);
				console.log("종료날짜변경 에러");
			});
	};

	const acceptAdvertisement = (props) => {
		const advertisementNo = props.advertisementNo;
		console.log("수락할 광고 넘버" + advertisementNo);

		axios
			.get(`${backServer}/advertisement/acceptAdvertisement/${advertisementNo}`)
			.then((res) => {
				console.log(res.data);
				setchange((prev) => prev + 1);
				if (res.data) {
					console.log(res.data);
					if (res.data >= 5) {
						Swal.fire({
							title: "경고",
							text: "진행 중이거나 진행예정(미결제 포함)인 광고가 5개 이상입니다. 현재 :" + res.data + "개",
							icon: "warning",
							iconColor: "var(--main1)",
							showCancelButton: true,
							confirmButtonText: "광고 수락",
							cancelButtonText: "닫기",
							confirmButtonColor: "var(--main1)",
							cancelButtonColor: "grey",
						}).then((result) => {
							if (result.isConfirmed) {
								axios
									.get(`${backServer}/advertisement/acceptAdvertisementDo/${advertisementNo}`)
									.then((res) => {
										console.log(res.data);
										setchange((prev) => prev + 1);
									})
									.catch((err) => {
										console.log(err);
										console.log("광고 거절 에러");
									});
							} else {
							}
						});
					}
				} else {
					console.log("수락 완료");
				}
			})
			.catch((err) => {
				console.log(err);
				console.log("수락 실패");
			});
	};

	const refuseChange = (value) => {
		setRefuse(value);
	};
	return (
		<div className="advertisement-wrap">
			<div className="page-title">
				<h2>광고</h2>
			</div>
			<div className="in-progress">
				<h3 style={{ float: "left", marginBottom: "10px" }}>진행중</h3>
				<table className="tbl1 ad-tbl">
					<thead>
						<tr>
							<td>업체 이름</td>
							<td>상품 이름</td>
							<td>광고 시작</td>
							<td>광고 종료</td>
						</tr>
					</thead>
					<tbody>
						<InProgress activeAd={activeAd} setActiveAd={setActiveAd} setStartDate={setStartDate} convertEnd={convertEnd} />
					</tbody>
				</table>
			</div>

			<div className="upComing">
				<h3 style={{ float: "left", marginBottom: "10px" }}>광고예정</h3>
				<table className="tbl1 ad-tbl">
					<thead>
						<tr>
							<td>업체 이름</td>
							<td>상품 이름</td>
							<td>광고 시작</td>
							<td>광고 종료</td>
						</tr>
					</thead>
					<tbody>
						<Upcomming adyet={adyet} setAdyet={setAdyet} convertStart={convertStart} convertEnd={convertEnd} />
					</tbody>
				</table>
			</div>

			<div className="payAd">
				<h3 style={{ float: "left", marginBottom: "10px" }}>결제대기</h3>
				<table className="tbl1 ad-tbl">
					<thead>
						<tr>
							<td>업체 이름</td>
							<td>상품 이름</td>
							<td>광고 시작</td>
							<td>광고 종료</td>
						</tr>
					</thead>
					<tbody>
						<PayAd payAd={payAd} setPayAd={setPayAd} />
					</tbody>
				</table>
			</div>

			<div className="waitAd">
				<h3 style={{ float: "left", marginBottom: "10px" }}>승인대기</h3>
				<table className="tbl1 ad-tbl">
					<thead>
						<tr>
							<td>업체 이름</td>
							<td>상품 이름</td>
							<td>광고 시작</td>
							<td>광고 종료</td>
							<td>선택</td>
						</tr>
					</thead>
					<tbody>
						<PendingApproval
							adwait={adwait}
							setAdwait={setAdwait}
							acceptAdvertisement={acceptAdvertisement}
							modalOpen={modalOpen}
							setModalOpen={setModalOpen}
							refuse={refuse}
							setRefuse={setRefuse}
							refuseChange={refuseChange}
							loginId={loginId}
							setchange={setchange}
						/>
					</tbody>
				</table>
			</div>

			<div className="ended">
				<h3 style={{ float: "left", marginBottom: "10px" }}>종료</h3>
				<table className="tbl1 ad-tbl">
					<thead>
						<tr>
							<td>업체 이름</td>
							<td>상품 이름</td>
							<td>광고 시작</td>
							<td>광고 종료</td>
						</tr>
					</thead>
					<tbody>
						<End adend={adend} setAdend={setAdend} />
					</tbody>
				</table>
			</div>
		</div>
	);
};

const InProgress = (props) => {
	const activeAd = props.activeAd;
	const setStartDate = props.setStartDate;
	const convertEnd = props.convertEnd;

	return (
		<>
			{activeAd.length > 0 ? (
				activeAd.map((ad) => (
					<tr key={ad.advertisementNo}>
						<td>{ad.company.companyName}</td>
						<td>{ad.adRank}</td>
						<td>{ad.adStart}</td>
						<td>
							<DatePicker
								selected={ad.adEnd}
								onChange={(date) =>
									convertEnd({
										date,
										adStart: ad.adStart,
										adEnd: ad.adEnd,
										changeAdvertisementNo: ad.advertisementNo,
									})
								}
								dateFormat="yyyy/MM/dd"
							/>
						</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan="5">업체가 없습니다.</td>
				</tr>
			)}
		</>
	);
};

const Upcomming = (props) => {
	const setAdyet = props.setAdyet;
	const adyet = props.adyet;
	const convertEnd = props.convertEnd;
	const convertStart = props.convertStart;
	const today = new Date();
	const tomorrow = new Date(today.setDate(today.getDate() + 1));

	return (
		<>
			{adyet.length > 0 ? (
				adyet.map((ad) => {
					// ad.adStart의 하루 뒤를 minDate로 설정
					const minDateForStart = new Date(ad.adStart);
					minDateForStart.setDate(minDateForStart.getDate() + 1);

					return (
						<tr key={ad.advertisementNo}>
							<td>{ad.company.companyName}</td>
							<td>{ad.adRank}</td>
							<td>
								<DatePicker
									selected={ad.adStart}
									minDate={tomorrow} // 하루 뒤로 설정
									onChange={(date) =>
										convertStart({
											date,
											adStart: ad.adStart,
											adEnd: ad.adEnd,
											changeAdvertisementNo: ad.advertisementNo,
										})
									}
									dateFormat="yyyy/MM/dd"
								/>
							</td>
							<td>
								<DatePicker
									selected={ad.adEnd}
									minDate={minDateForStart} // 하루 뒤로 설정
									onChange={(date) =>
										convertEnd({
											date,
											adStart: ad.adStart,
											adEnd: ad.adEnd,
											changeAdvertisementNo: ad.advertisementNo,
										})
									}
									dateFormat="yyyy/MM/dd"
								/>
							</td>
						</tr>
					);
				})
			) : (
				<tr>
					<td colSpan="4">업체가 없습니다.</td>
				</tr>
			)}
		</>
	);
};

const PendingApproval = (props) => {
	const adwait = props.adwait;
	const setAdwait = props.adWait;
	const acceptAdvertisement = props.acceptAdvertisement;
	const modalOpen = props.modalOpen;
	const setModalOpen = props.setModalOpen;
	const modalBackground = useRef();
	const refuseChange = props.refuseChange;
	const loginId = props.loginId;
	const refuse = props.refuse;
	const setchange = props.setchange;
	return (
		<>
			{adwait.length > 0 ? (
				adwait.map((ad) => (
					<tr key={ad.advertisementNo}>
						<td>{ad.company.companyName}</td>
						<td>{ad.adRank}</td>
						<td>{ad.adStart}</td>
						<td>{ad.adEnd}</td>
						<td>
							<button
								onClick={() =>
									acceptAdvertisement({
										advertisementNo: ad.advertisementNo,
									})
								}
							>
								수락
							</button>
							<button className={"modal-open-btn"} onClick={() => setModalOpen(true)}>
								거절
							</button>
						</td>
						{modalOpen === true ? (
							<Overlay
								setModalOpen={setModalOpen}
								ad={ad}
								refuseChange={refuseChange}
								loginId={loginId}
								refuse={refuse}
								setchange={setchange}
							/>
						) : (
							<></>
						)}
					</tr>
				))
			) : (
				<tr>
					<td colSpan="5">업체가 없습니다.</td>
				</tr>
			)}
		</>
	);
};

const End = (props) => {
	const setAdend = props.setAdend;
	const adend = props.adend;

	return (
		<>
			{adend.length > 0 ? (
				adend.map((ad) => (
					<tr key={ad.advertisementNo}>
						<td>{ad.company.companyName}</td>
						<td>{ad.adRank}</td>
						<td>{ad.adStart}</td>
						<td>{ad.adEnd}</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan="5">업체가 없습니다.</td>
				</tr>
			)}
		</>
	);
};

const PayAd = (props) => {
	const setPayAd = props.setPayAd;
	const payAd = props.payAd;

	return (
		<>
			{payAd.length > 0 ? (
				payAd.map((ad) => (
					<tr key={ad.advertisementNo}>
						<td>{ad.company.companyName}</td>
						<td>{ad.adRank}</td>
						<td>{ad.adStart}</td>
						<td>{ad.adEnd}</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan="5">업체가 없습니다.</td>
				</tr>
			)}
		</>
	);
};

const Overlay = (props) => {
	const setModalOpen = props.setModalOpen;
	const ad = props.ad;
	const refuseChange = props.refuseChange;
	const loginId = props.loginId;
	const companyNo = props.ad.companyNo;
	const refuse = props.refuse;
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const setchange = props.setchange;
	const adNo = props.ad.advertisementNo;

	const postRefuse = () => {
		axios
			.get(`${backServer}/admin/refuse/${loginId}/${companyNo}/${refuse}/${adNo}`)
			.then((res) => {
				console.log(res.data);
				setModalOpen(false);
				setchange((prev) => prev + 1);
			})
			.catch((err) => {
				console.log(err);
				console.log("광고 거절 에러");
			});
	};
	return (
		<div className="overlay" onClick={() => setModalOpen(false)}>
			<div
				className="overlay-content"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="overlay-content-top">
					<h3>
						<span>업체명 : </span>
						{ad.company.companyName}
					</h3>
				</div>
				<div className="overlay-content-middle">
					<div className="refuse-wrap">
						<textarea
							className="ad-refuse"
							placeholder="거절 사유 입력"
							onChange={(e) => {
								const value = e.target.value;
								refuseChange(value);
							}}
						></textarea>
					</div>
				</div>
				<div className="overlay-content-bottom">
					<button onClick={() => postRefuse()}>작성</button>
				</div>
			</div>
		</div>
	);
};
export default Advertisement;
