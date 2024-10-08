import { Link } from "react-router-dom";
import "./common.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import axios from "axios";

const CompanyHeader = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [company, setCompany] = useState({});
	// 드롭다운을 토글하는 함수
	useEffect(() => {
		axios
			.get(`${backServer}/company/header/${companyNo}`)
			.then((res) => {
				console.log(res);
				setCompany(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo]);
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen); // 클릭 시 상태를 반전
	};
	return (
		<header className="header-c">
			<div className="header-c-logo">
				<div className="header-c-mainlogo">
					<img src="/image/main_logo.png"></img>
				</div>
				<div>
					<span className="material-icons">close</span>
				</div>
				<div>
					<span>{company.companyName}</span>
				</div>
			</div>
			<div className="header-c-content">
				{companyNo !== null || companyNo !== "" ? (
					<ul>
						<li>
							<Link to="/company/product/list" className="nav-item">
								<div>
									<span className="material-icons">view_in_ar</span>
								</div>
								<span>상품관리</span>
							</Link>
						</li>
						<li>
							<Link to="/company/customer" className="nav-item">
								<div>
									<span className="material-icons">account_box</span>
								</div>
								<span>고객관리</span>
							</Link>
						</li>
						<li>
							<Link to="/company/schedule" className="nav-item">
								<div>
									<span className="material-icons">event</span>
								</div>
								<span>상담일정</span>
							</Link>
						</li>
						<li>
							<Link to="/company/counsel" className="nav-item">
								<div>
									<span className="material-icons">date_range</span>
								</div>
								<span>진행일정</span>
							</Link>
						</li>
						<li>
							<Link to="/company/sales" className="nav-item">
								<div>
									<span className="material-icons">local_atm</span>
								</div>
								<span>매출관리</span>
							</Link>
						</li>
						<li className="info-menu" onClick={toggleDropdown}>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">settings</span>
								</div>
								<span>사용자관리</span>
							</Link>
							{isDropdownOpen && (
								<ul className="down-menu-bar" style={{}}>
									<li>
										<Link to="/company/Info" className="down-menu">
											내 업체 정보
										</Link>
									</li>
									<li>
										<Link to="/company/info/update" className="down-menu">
											업체 정보 수정
										</Link>
									</li>
									<li>
										<Link to="/company/advertisement" className="down-menu">
											광고 요청
										</Link>
									</li>
									<li>
										<Link to="/company/notice/list" className="down-menu">
											공지사항
										</Link>
									</li>
								</ul>
							)}
						</li>
					</ul>
				) : (
					<ul>
						<li>
							<Link to="/company/product" className="nav-item">
								<div>
									<span className="material-icons">view_in_ar</span>
								</div>
								<span>상품관리</span>
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">account_box</span>
								</div>
								<span>고객관리</span>
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">event</span>
								</div>
								<span>상담일정</span>
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">date_range</span>
								</div>
								<span>진행일정</span>
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">local_atm</span>
								</div>
								<span>매출관리</span>
							</Link>
						</li>
						<li className="info-menu" onClick={toggleDropdown}>
							<Link to="#" className="nav-item">
								<div>
									<span className="material-icons">settings</span>
								</div>
								<span>사용자관리</span>
							</Link>
							{isDropdownOpen && (
								<ul className="down-menu-bar" style={{}}>
									<li>
										<Link to="/company/Join" className="down-menu">
											업체 등록
										</Link>
									</li>
								</ul>
							)}
						</li>
					</ul>
				)}
			</div>
		</header>
	);
};
export default CompanyHeader;
