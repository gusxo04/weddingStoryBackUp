import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import axios from "axios";
import PageNavi from "../utils/PagiNavi";

const CompanyCounsel = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [reqPage, setReqPage] = useState(1);
	const [counsel, setCounsel] = useState([]);
	const [pi, setPi] = useState([]);
	useEffect(() => {
		axios
			.get(`${backServer}/company/counsel/${companyNo}/${reqPage}`)
			.then((res) => {
				console.log(res);
				setCounsel(res.data.counsel);
				setPi(res.data.pi);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, counsel.progress]);
	console.log(counsel);
	return (
		<div>
			<section className="section">
				<div className="list-wrap">
					<div className="list-title">진행 일정</div>

					<div className="product-list-wrap">
						<table className="tbl">
							<thead border={1}>
								<tr>
									<th style={{ width: "8%" }}>회원번호</th>
									<th style={{ width: "10%" }}>이름</th>
									<th style={{ width: "15%" }}>전화번호</th>
									<th style={{ width: "8%" }}>상품번호</th>
									<th style={{ width: "30%" }}>상품이름</th>
									<th style={{ width: "15%" }}>구매일</th>
									<th>진행도</th>
								</tr>
							</thead>
							<tbody>
								{counsel.map((counsel, index) => {
									return <CounselItem key={"counsel" + index} counsel={counsel} index={index} />;
								})}
							</tbody>
						</table>
						<div className="product-page-wrap">
							<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

const CounselItem = (props) => {
	const counsel = props.counsel;
	const index = props.index;

	return (
		<tr>
			<td style={{ width: "8%" }}>{counsel.memberNo}</td>
			<td style={{ width: "10%" }}>{counsel.memberName}</td>
			<td style={{ width: "15%" }}>{counsel.memberPhone}</td>
			<td style={{ width: "8%" }}>{counsel.productNo}</td>
			<td style={{ width: "30%" }}>{counsel.productName}</td>
			<td style={{ width: "15%" }}>{counsel.payDate}</td>
			<td>
				{counsel.progress === 0
					? "구매완료"
					: counsel.progress === 1
						? "진행중"
						: counsel.progress === 2
							? "취소"
							: counsel.progress === 3
								? "완료"
								: ""}
			</td>
		</tr>
	);
};
export default CompanyCounsel;
