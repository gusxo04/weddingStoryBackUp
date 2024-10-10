import { Link, Route, Routes } from "react-router-dom";
import CompanyJoin from "./CompanyJoin";
import "./company.css";
import CompanyInfo from "./CompanyInfo";
import CompanyProduct from "./CompanyProductInsert";
import CompanyHeader from "../common/CompanyHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { companyNoState, isLoginState, loginIdState, loginNoState, memberCodeState, memberTypeState } from "../utils/RecoilData";
import CompanyNoNull from "./CompanyNoNull";
import CompanyInfoUpdate from "./CompanyInfoUpdate";
import axios from "axios";
import { useEffect } from "react";
import CompanyProductList from "./CompanyProductList";
import CompanyProductInsert from "./CompanyProductInsert";
import CompanyProductUpdate from "./CompanyProductUpdate";
import CompanyCustomer from "./CompanyCustomer";
import CompanyCounsel from "./CompanyCounsel";
import CompanyAdvertisement from "./CompanyAdvertisement";
import AdvertisementRequest from "./AdvertisementRequest";
import CompanySchedule from "./CompanySchedule";
import Notice from "../admin/Notice";
import CompanyNotice from "./CompanyNotice";
import CompanySalesChart from "./CompanySalesChart";
import DayScheduleInfo from "./DayScheduleInfo";
import DetailInfo from "./DetailInfo";
import WeddingPayment from "./WeddingPayment";

const CompanyMain = () => {
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [loginNo, setLoginNo] = useRecoilState(loginNoState);
	const backServer = process.env.REACT_APP_BACK_SERVER;
	console.log(companyNo);
	useEffect(() => {
		// 외부 스크립트 로드 함수
		const loadScript = (src, callback) => {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = src;
			script.onload = callback;
			document.head.appendChild(script);
		};
		// 스크립트 로드 후 실행
		loadScript("https://code.jquery.com/jquery-1.12.4.min.js", () => {
			loadScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js", () => {
				const IMP = window.IMP;
				// 가맹점 식별코드
				IMP.init("imp67386065");
			});
		});
		// 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
		return () => {
			const scripts = document.querySelectorAll('script[src^="https://"]');
			scripts.forEach((script) => script.remove());
		};
	}, []);

	useEffect(() => {
		axios
			.get(`${backServer}/company/main/${companyNo}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<div className="company-wrap">
				<div className="side-info">
					<section className="section">
						<div className="side-info-content">
							<img src="/image/main_logo.png" />
							<table className="side-tbl" border={1} style={{ borderColor: "#000" }}>
								<thead>
									<tr>
										<th style={{ width: "50%" }}>직급 : </th>
										<td style={{ width: "50%" }}>ㅇ </td>
									</tr>
									<tr>
										<th style={{ width: "50%" }}>이름 : </th>
										<td style={{ width: "50%" }}>4</td>
									</tr>
								</thead>
							</table>
							<HeaderLink />
						</div>
						<div className="convention">
							<button>
								<Link to={"/convention/main"}>박람회로 이동</Link>
							</button>
						</div>
					</section>
				</div>

				<section className="content-wrap">
					<div>{companyNo === null || companyNo === 0 ? <CompanyNoNull /> : ""}</div>
					{companyNo === null && companyNo === 0 ? (
						<Routes>
							<Route path="join" element={<CompanyJoin />} />
							<Route path="null" element={<CompanyNoNull />} />
						</Routes>
					) : (
						<Routes>
							<Route path="null" element={<CompanyNoNull />} />
							<Route path="join" element={<CompanyJoin />} />
							<Route path="info" element={<CompanyInfo />} />
							<Route path="info/update/" element={<CompanyInfoUpdate />} />
							<Route path="product/list" element={<CompanyProductList />} />
							<Route path="product/insert" element={<CompanyProductInsert />} />
							<Route path="customer" element={<CompanyCustomer />} />
							<Route path="counsel" element={<CompanyCounsel />} />
							<Route path="product/update/:productNo" element={<CompanyProductUpdate />} />
							<Route path="advertisement" element={<CompanyAdvertisement />} />
							<Route path="advertisementRequest" element={<AdvertisementRequest />} />
							<Route path="sales" element={<CompanySalesChart />} />
							<Route path="schedule" element={<CompanySchedule />} />
							<Route path="notice/*" element={<CompanyNotice />} />
							<Route path="schedule/dayInfo" element={<DayScheduleInfo />} />
							<Route path="schedule/dayInfo/detailInfo" element={<DetailInfo />} />
							<Route path="WeddingHallPayMent/:productNo" element={<WeddingPayment />} />
						</Routes>
					)}
				</section>
			</div>
		</>
	);
};
export default CompanyMain;

const HeaderLink = () => {
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [loginNo, setLoginNo] = useRecoilState(loginNoState);
	const isLogin = useRecoilValue(isLoginState);
	const logout = () => {
		setLoginNo(0);
		setLoginId("");
		setMemberType(-1);
		setMemberCode("");
		setCompanyNo(null);
		delete axios.defaults.headers.common["Authorization"];
		window.localStorage.removeItem("refreshToken");
	};
	return (
		<>
			{isLogin ? (
				<div className="logout">
					<Link to="/logout" onClick={logout}>
						<div>로그아웃</div>
					</Link>
					<span>|</span>
					<Link to="#">
						<div>고객센터</div>
					</Link>
				</div>
			) : (
				<div className="login">
					<Link to="/join/agree">회원가입</Link>
					<span>|</span>
					<Link to="#">고객센터</Link>
				</div>
			)}
		</>
	);
};
