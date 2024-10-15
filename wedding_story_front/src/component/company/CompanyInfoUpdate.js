import { useEffect, useState } from "react";
import CompanyJoinFrm from "./CompanyJoinFrm";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import CompanyInfo from "./CompanyInfo";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CompanyInfoUpdate = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [companyName, setCompanyName] = useState("");
	const [companyTel, setCompanyTel] = useState("");
	const [companyAddr, setCompanyAddr] = useState("");
	const [companyInfo, setCompanyInfo] = useState("");
	const [companyCategory, setCompanyCategory] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [dayOff, setDayOff] = useState([]);
	const [keyWord, setKeyWord] = useState([]);
	const [thumbnail, setThumbnail] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${backServer}/company/${companyNo}`)
			.then((res) => {
				setCompanyName(res.data.companyName);
				setCompanyTel(res.data.companyTel);
				setCompanyAddr(res.data.companyAddr);
				setCompanyInfo(res.data.companyInfo);
				setCompanyCategory(res.data.companyCategory);
				setStartTime(res.data.startTime);
				setEndTime(res.data.endTime);
				setDayOff(res.data.dayOff.split(","));
				setKeyWord(res.data.keyWord.split(","));
				setThumbnail(res.data.companyThumb);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo]);

	const updateCompanyInfo = () => {
		if (
			companyName !== "" &&
			companyTel !== "--" &&
			companyInfo !== "" &&
			companyCategory !== "" &&
			startTime !== "" &&
			endTime !== "" &&
			keyWord !== null &&
			thumbnail !== null
		) {
			const form = new FormData();

			form.append("companyTel", companyTel);
			form.append("companyAddr", companyAddr);
			form.append("companyInfo", companyInfo);

			form.append("startTime", startTime);
			form.append("endTime", endTime);
			form.append("companyNo", companyNo);
			if (thumbnail !== null) {
				form.append("thumbFile", thumbnail);
			}
			if (dayOff !== null) {
				for (let i = 0; i < dayOff.length; i++) {
					form.append("dayOff", dayOff[i]);
				}
			}
			for (let i = 0; i < keyWord.length; i++) {
				form.append("keyWord", keyWord[i]);
			}
			axios
				.patch(`${backServer}/company`, form, {
					headers: {
						contentType: "multipart/form-data",
					},
				})
				.then((res) => {
					Swal.fire({
						title: "수정완료",
						text: "정보 수정 완료",
						icon: "success",
					}).then(() => {
						navigate("/company");
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Swal.fire({
				title: "입력 오류",
				text: "입력란을 확인해주세요",
				icon: "error",
			});
		}
	};
	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					updateCompanyInfo();
				}}
			>
				<CompanyJoinFrm
					companyName={companyName}
					setCompanyName={setCompanyName}
					companyTel={companyTel}
					setCompanyTel={setCompanyTel}
					companyAddr={companyAddr}
					setCompanyAddr={setCompanyAddr}
					companyInfo={companyInfo}
					setCompanyInfo={setCompanyInfo}
					companyCategory={companyCategory}
					setCompanyCategory={setCompanyCategory}
					startTime={startTime}
					setStartTime={setStartTime}
					endTime={endTime}
					setEndTime={setEndTime}
					dayOff={dayOff}
					setDayOff={setDayOff}
					keyWord={keyWord}
					setKeyWord={setKeyWord}
					thumbnail={thumbnail}
					setThumbnail={setThumbnail}
				/>
				<div className="btn-zone">
					<button type="submit">수정 하기</button>
				</div>
			</form>
		</div>
	);
};

export default CompanyInfoUpdate;
