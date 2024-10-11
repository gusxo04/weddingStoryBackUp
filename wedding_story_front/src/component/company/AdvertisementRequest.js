import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdvertisementRequest = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const navigate = useNavigate();
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [ad, setAd] = useState({
		adRank: 2, // 라디오 2가 기본값
		adStart: "",
		adEnd: "",
		adRequest: "",
		productNo: "",
	});
	const [option, setOption] = useState([]);

	// 라디오 버튼 값 변경 시 adRank 업데이트
	const handleRankChange = (e) => {
		setAd((prevAd) => ({
			...prevAd,
			adRank: Number(e.target.value), // 라디오 값 숫자로 변환
		}));
	};

	// 날짜 값이 변경될 때 상태를 업데이트하는 함수
	const handleDateChange = (e) => {
		const { name, value } = e.target;
		setAd((prevAd) => ({
			...prevAd,
			[name]: value,
		}));
	};

	const getTodayDate = () => {
		const today = new Date();
		today.setDate(today.getDate() + 1); // 오늘 날짜에 하루를 더해 내일로 설정
		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 2자리 월
		const day = today.getDate().toString().padStart(2, "0"); // 2자리 일
		return `${year}-${month}-${day}`;
	};

	// 라디오 값에 따라 end 날짜 제한 계산 (7일 또는 14일)
	const calculateEndDateLimit = (startDate, rank) => {
		if (!startDate) return null;
		const start = new Date(startDate);
		const endLimit = new Date(start);

		if (rank === 1) {
			endLimit.setDate(start.getDate() + 14); // 2주 후
		} else if (rank === 2) {
			endLimit.setDate(start.getDate() + 7); // 7일 후
		}
		return endLimit.toISOString().split("T")[0]; // YYYY-MM-DD 형식 반환
	};
	const insertAd = () => {
		console.log(ad);
		const form = new FormData();
		if (ad.adStart !== "" && ad.adEnd !== "" && ad.productNo !== "") {
			Swal.fire({
				title: "등록 하기",
				text: "이대로 요청하시겠습니까? 내용은 수정이 불가능합니다. ",
				icon: "info",
				showCancelButton: true,
				confirmButtonText: "등록",
				cancelButtonText: "취소",
			}).then((result) => {
				if (result.value) {
					form.append("companyNo", companyNo);
					form.append("adRank", ad.adRank);
					form.append("adStart", ad.adStart);
					form.append("adEnd", ad.adEnd);
					form.append("adRequest", ad.adRequest);
					form.append("productNo", ad.productNo);
					axios
						.post(`${backServer}/company/advertisement`, form, {
							headers: {
								contentType: "multipart/form-data",
							},
						})
						.then((res) => {
							if (res.data === true) {
								Swal.fire({
									title: "등록 성공",
									text: "요청이 정상처리되었습니다.",
									icon: "success",
								}).then(() => {
									navigate("/company/advertisement");
								});
							}
						})
						.catch((err) => {
							console.log(err);
						});
				}
			});
		} else {
			Swal.fire({
				title: "입력오류",
				text: "정보를 모두 입력해주세요.",
				icon: "warning",
			});
		}
	};
	useEffect(() => {
		console.log(ad);
		axios
			.get(`${backServer}/company/advertInsert/${companyNo}`)
			.then((res) => {
				const options = res.data.map((item) => ({
					value: item.productNo,
					label: item.productName,
				}));
				setOption(options);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, ad]);
	return (
		<section className="section">
			<div className="request-wrap">
				<div className="request-title">광고 요청</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						insertAd();
					}}
				>
					<div className="ad-main-content">
						<div className="ad-rank">
							<label htmlFor="rank1">Premium (2주)</label>
							<input type="radio" value={1} name="rank" id="rank1" onChange={handleRankChange} checked={ad.adRank === 1} />
							<label htmlFor="rank2">basic (7일)</label>
							<input type="radio" value={2} name="rank" id="rank2" onChange={handleRankChange} checked={ad.adRank === 2} />
						</div>
						<div className="ad-date-zone">
							<div className="ad-date-input">
								<label htmlFor="start">시작일: </label>
								<input type="date" id="start" name="adStart" value={ad.adStart} onChange={handleDateChange} min={getTodayDate()} />
							</div>
							<span className="ad-date-span"> ~ </span>
							<div className="ad-date-input">
								<label htmlFor="end">종료일: </label>
								<input
									type="date"
									id="end"
									name="adEnd"
									value={ad.adEnd}
									onChange={handleDateChange}
									min={ad.adStart} // 시작일 이후로만 선택 가능
									max={calculateEndDateLimit(ad.adStart, ad.adRank)} // 라디오 선택에 따라 7일 또는 14일 제한
									disabled={!ad.adStart} // 시작일이 없으면 비활성화
								/>
							</div>
						</div>
						<div className="select">
							<span>상품선택 </span>
							<span>[상품명]: </span>
							<select id="product" onChange={(e) => setAd({ ...ad, productNo: e.target.value })}>
								<option disabled hidden selected>
									선택하세요.
								</option>
								{option.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div className="ad-content-zone">
							<div>요청사항 </div>
							<textarea
								value={ad.adRequest}
								onChange={(e) => setAd({ ...ad, adRequest: e.target.value })}
								placeholder="요청사항을 입력하세요"
							/>
						</div>
					</div>
					<div className="ad-btn-zone">
						<button type="submit">요청하기</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AdvertisementRequest;
