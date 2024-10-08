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

const CompanyMain = () => {
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [loginNo, setLoginNo] = useRecoilState(loginNoState);
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
	return (
		<>
			<div className="company-wrap">
				<div className="side-info">
					<section className="section">
						<div className="side-info-content">
							<HeaderLink />
						</div>
					</section>
				</div>

				<section className="content-wrap">
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
					</Routes>
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
				<div className="">
					<Link to="/logout" onClick={logout}>
						로그아웃
					</Link>
					<span>|</span>
					<Link to="#">고객센터</Link>
				</div>
			) : (
				<div className="">
					<Link to="/join/agree">회원가입</Link>
					<span>|</span>
					<Link to="#">고객센터</Link>
				</div>
			)}
		</>
	);
};
