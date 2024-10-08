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
	}, [companyNo, reqPage]);

	return (
		<section className="section">
			<div className="list-wrap">
				<div className="list-title">
					광고 목록
					<span className="span" ref={spanRef} style={{ marginLeft: "20px", display: "none" }}>
						* 광고요청은 최대 5개 까지만 가능합니다.
					</span>
				</div>

				<div className="navi-request">
					<Link to={"/company/advertisementRequest"}>
						<button type="button" ref={insertRef} disabled={disableButton}>
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
								<th style={{ width: "30%" }}>요청내용</th>
								<th style={{ width: "7%" }}>진행도</th>
								<th style={{ width: "6%" }}>결제.</th>
							</tr>
						</thead>
						<tbody>
							{advert.map((advert, index) => {
								return <AdvertItem key={"advert" + index} advert={advert} index={index} />;
							})}
						</tbody>
					</table>
					<div className="product-page-wrap">
						<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
					</div>
				</div>
			</div>
		</section>
	);
};

const AdvertItem = (props) => {
	const advert = props.advert;
	const index = props.index;

	return (
		<tr>
			<td style={{ width: "5%" }}>{advert.productNo}</td>
			<td style={{ width: "15%" }}>{advert.productName}</td>
			<td style={{ width: "7%" }}>{advert.adRank === 1 ? "premium" : "basic"}</td>
			<td style={{ width: "10%" }}>{advert.adStart}</td>
			<td style={{ width: "10%" }}>{advert.adEnd}</td>
			<td style={{ width: "30%" }}>{advert.adRequest}</td>
			<td style={{ width: "10%" }}>
				{advert.advertisementState === 0
					? "승인대기"
					: advert.advertisementState === 1
						? "광고대기"
						: advert.advertisementState === 2
							? "광고중"
							: "광고종료"}
			</td>
			<td style={{ width: "10%" }}>{advert.advertisementState === 4 ? <button type="submit">결제하기</button> : "X"}</td>
		</tr>
	);
};

export default CompanyAdvertisement;
