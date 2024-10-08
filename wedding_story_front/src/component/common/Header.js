import { Link, NavLink, useNavigate } from "react-router-dom";
import "./common.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { companyNoState, isLoginState, loginIdState, loginNoState, memberCodeState, memberTypeState } from "../utils/RecoilData";
import axios from "axios";
import CompanyHeader from "./CompanyHeader";
import AdminHeader from "./AdminHeader";
import { Title } from "chart.js";
import Swal from "sweetalert2";

const Header = () => {
	const uri = window.location.pathname;
	return <>{uri.startsWith("/company") ? <CompanyHeader /> : uri.startsWith("/admin") ? <AdminHeader /> : <MainHeader />}</>;
};

const MainHeader = () => {
	const loginNo = useRecoilValue(loginNoState);
	return (
		<header className="header">
			<div className="header-content">
				<HeaderLink />
				<div className="header-logo">
					<Link to="/">
						<div className="header-img">
							<img src="/image/main_logo.png" />
						</div>
					</Link>
				</div>
				<div className="header-nav">
					<ul className="nav-main">
						{loginNo !== 0 ? (
							<li className="nav-suv-menu" style={{ width: "125px" }}>
								<NavLink to="/myPage/schedule">
									<span className="material-icons">menu</span> My Wedding
								</NavLink>
								<ul className="nav-suv">
									<li>
										<Link to="mypage/schedule">일정 관리</Link>
									</li>
									<li>
										<Link to="mypage/payment">결제 내역</Link>
									</li>
									<li>
										<Link to="mypage/favorite">관심 상품</Link>
									</li>
									<li>
										<Link to="mypage/info">나의 정보</Link>
									</li>
								</ul>
							</li>
						) : (
							""
						)}

						<li className="nav-menu">
							<Link to="/">HOME</Link>
						</li>
						<li className="nav-menu">
							<Link to="/product/hallList">웨딩홀</Link>
						</li>
						<li className="nav-menu">
							<Link to="/product/list">스드메</Link>
						</li>
						<li className="nav-menu">
							<Link to="/convention/main">박람회</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

const HeaderLink = () => {
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [loginNo, setLoginNo] = useRecoilState(loginNoState);
	const isLogin = useRecoilValue(isLoginState);
	const navigate = useNavigate();
	const logout = () => {
		setLoginNo(0);
		setLoginId("");
		setMemberType(-1);
		setMemberCode("");
		setCompanyNo(null);
		delete axios.defaults.headers.common["Authorization"];
		window.localStorage.removeItem("refreshToken");

		Swal.fire({
			title: "로그아웃 완료",
			icon: "success",
			confirmButtonText: "확인",
		});
	};
	return (
		<>
			{isLogin ? (
				<div className="header-link">
					<Link to="/myPage/info">{`${loginId}`}님</Link>
					<span>|</span>
					<Link to="/" onClick={logout}>
						로그아웃
					</Link>
					<span>|</span>
					<Link to="/question/main">고객센터</Link>
				</div>
			) : (
				<div className="header-link">
					<Link to="/login">로그인</Link>
					<span>|</span>
					<Link to="/join/agree">회원가입</Link>
				</div>
			)}
		</>
	);
};

export default Header;
