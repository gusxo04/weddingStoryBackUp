import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./ReportFrom.module.css";
import { companyNoState, loginNoState } from "../../../utils/RecoilData";

const Report = (props) => {
	const companyNo = props.companyNo;
	const [isOpen, setIsOpen] = useState(false);
	//console.log(companyNo);
	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<button className={styles["report-button"]} onClick={handleOpen}>
				신고하기
			</button>
			{isOpen && (
				<div className={styles["popup-overlay"]}>
					<div className={styles["popup-content"]}>
						<ReportForm onClose={handleClose} companyNo={companyNo} />
					</div>
				</div>
			)}
		</div>
	);
};

const ReportForm = (props, { onClose }) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const companyNo = props.companyNo;
	//console.log(companyNo);

	const [memberNo, setMemberNo] = useRecoilState(loginNoState);
	const [report, setReport] = useState({
		reportContent: "",
	});
	const navigator = useNavigate();

	useEffect(() => {
		axios
			.get(`${backServer}/report/companyNo/${companyNo}`)
			.then((res) => {
				console.log(res);
				setReport(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo, backServer]);

	const handleChange = (e) => {
		setReport({ ...report, reportContent: e.target.value }); // 객체 업데이트
	};

	const handleSubmit = (e) => {
		const formData = new FormData();
		formData.append("memberNo", memberNo);
		formData.append("companyNo", companyNo);
		formData.append("reportContent", report.reportContent); // REPORT_CONTENT 필드 추가
		//console.log([...formData]);
		axios
			.post(`${backServer}/report`, formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log("신고 내용:", report);
		setReport(""); // 폼 초기화
		navigator("/"); // 신고후 이동
		//onClose(); // 닫기
		e.preventDefault();
	};

	return (
		<div className={styles["report-popup"]} style={popupStyle}>
			<img src="/image/main_logo.png" style={{ width: "300px" }} />
			<h2>신고하기</h2>
			<form onSubmit={handleSubmit}>
				<textarea value={report.reportContent} onChange={handleChange} placeholder="신고 내용을 입력하세요." rows="5" cols="30" required />
				<br />
				<button type="submit">신고하기</button>
				<button type="button" onClick={onClose}>
					취소
				</button>
			</form>
		</div>
	);
};

const popupStyle = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "white",
	padding: "20px",
	border: "1px solid #ccc",
	zIndex: 1000,
};

export default Report;
