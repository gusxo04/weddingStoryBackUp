import { Link } from "react-router-dom";
import "./common.css";
import { useState } from "react";
import PersonalPolicy from "../utils/PersonalPolicy";
import UseCondition from "../utils/UseCondition";

const Footer = () => {
	const uri = window.location.pathname;
	const [isModal1Open, setIsModal1Open] = useState(false);
	const [isModal2Open, setIsModal2Open] = useState(false);
	const closeModal = () => {
		setIsModal1Open(false);
		setIsModal2Open(false);
	};
	return (
		<>
			{uri.startsWith("/company") ? (
				<></>
			) : uri.startsWith("/admin") ? (
				<></>
			) : (
				<footer className="footer">
					<div className="footer-content">
						<div>
							<div className="footer-logo">
								<img src="/image/main_logo.png" />
							</div>
							<div className="footer-link">
								<ul>
									<li>
										<Link to="#">회사 소개</Link>
									</li>
									<li>
										<span>|</span>
									</li>
									<li>
										<span
											onClick={() => {
												setIsModal1Open(true);
											}}
											style={{ cursor: "pointer" }}
										>
											개인정보 처리 방침
										</span>
									</li>
									<li>
										<span>|</span>
									</li>
									<li>
										<span
											onClick={() => {
												setIsModal1Open(true);
											}}
											style={{ cursor: "pointer" }}
										>
											사이트 이용 약관
										</span>
									</li>
									<li>
										<span>|</span>
									</li>
									<li>
										<Link to="#">오시는 길</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="footer-info">
							<p>(주) 웨딩 스토리 | 대표 : 김정성 | 사업자 등록번호 : 618-1234-56789 | 주소 : 서울 영등포구 선유동2로 57 이레빌딩</p>
						</div>
						<div className="footer-cs">
							<p>고객센터 02-4153-3449 | 월요일 ~ 일요일 09시 ~ 18시 </p>
							<div className="cs-link">
								<Link to="#">
									<img src="/image/kakao.png"></img>
								</Link>
								<Link to="#">
									<img src="/image/insta.png"></img>
								</Link>
								<Link to="#">
									<img src="/image/blog.png"></img>
								</Link>
								<Link to="#">
									<img src="/image/youtube.png"></img>
								</Link>
							</div>
						</div>
					</div>
					{/* 모달 */}
					{isModal1Open ? (
						<div className="login-searchMember-wrap">
							<div style={{ width: "50%", height: "80%", overflow: "scroll" }}>
								<span className="login-searchMember-close" onClick={closeModal} style={{ position: "fixed", top: "90px", right: "500px" }}>
									&times;
								</span>
								<div className="login-searchMember-content">
									<PersonalPolicy />
								</div>
							</div>
						</div>
					) : isModal2Open ? (
						<div className="login-searchMember-wrap">
							<div style={{ width: "50%", height: "80%", overflow: "scroll" }}>
								<span className="login-searchMember-close" onClick={closeModal} style={{ position: "fixed", top: "90px", right: "500px" }}>
									&times;
								</span>
								<div className="login-searchMember-content">
									<UseCondition />
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</footer>
			)}
		</>
	);
};
export default Footer;
