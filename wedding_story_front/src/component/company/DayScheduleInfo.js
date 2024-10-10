import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

const DayScheduleInfo = () => {
	const location = useLocation();
	const userInfo = { ...location.state };
	const [consultDate, setConsultDate] = useState(Object.values(userInfo));
	const [reqPage, setReqPage] = useState(1);
	const [pi, setPi] = useState([]);
	const [consult, setConsult] = useState([]);
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const navigate = useNavigate();
	console.log(consultDate);
	useEffect(() => {
		axios
			.get(`${backServer}/company/dayInfo/${consultDate}/${reqPage}`)
			.then((res) => {
				console.log(res);
				setPi(res.data.pi);
				setConsult(res.data.list);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const detailInfo = (index, consult) => {
		navigate("/company/schedule/dayInfo/detailInfo", { state: { consultNo: consult.consultNo } });
	};

	return (
		<section className="section">
			<div className="list-wrap">
				<div className="list-title">{consultDate} 예약 목록</div>
				<div className="product-list-wrap">
					<table className="tbl">
						<thead border={1}>
							<tr>
								<th style={{ width: "10%" }}>상담번호</th>
								<th style={{ width: "10%" }}>고객이름</th>
								<th style={{ width: "15%" }}>예약날짜</th>
								<th style={{ width: "15%" }}>예약시간</th>
								<th style={{ width: "20%" }}>계약상태</th>
								<th style={{ width: "30%" }}>예식예정일</th>
							</tr>
						</thead>
						<tbody>
							{consult.map((consult, index) => {
								return <ConsultItem key={"consult" + index} index={index} consult={consult} detailInfo={detailInfo} />;
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

const ConsultItem = (props) => {
	const consult = props.consult;
	const index = props.index;
	const detailInfo = props.detailInfo;
	console.log(consult);
	return (
		<tr
			onClick={() => {
				detailInfo(index, consult);
			}}
		>
			<th style={{ width: "10%" }}>{consult.consultNo}</th>
			<th style={{ width: "10%" }}>{consult.memberName}</th>
			<th style={{ width: "15%" }}>{consult.consultDate}</th>
			<th style={{ width: "15%" }}>{consult.consultTime}</th>
			<th style={{ width: "20%" }}>
				{consult.contract === 0 ? "계약전" : consult.contract === 1 ? "가계약" : consult.contract === 2 ? "계약완료" : ""}
			</th>
			<th style={{ width: "30%" }}>{consult.reservation === null ? "미정" : consult.reservation}</th>
		</tr>
	);
};
export default DayScheduleInfo;
