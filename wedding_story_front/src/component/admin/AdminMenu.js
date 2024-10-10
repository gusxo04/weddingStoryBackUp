import { useState } from "react";
import { companyNoState, isLoginState, loginIdState, loginNoState, memberCodeState, memberTypeState } from "../utils/RecoilData";
import "./adminMenu.css";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import JoinAdmin from "../member/JoinAdmin";

const AdminMenu = () => {
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	// console.log("membertype : " + memberType);
	const [modalOpen, setModalOpen] = useState("");
	const [insertId, setInsertId] = useState("");
	const [selectedType, setSelectedType] = useState(null);
	const backServer = process.env.REACT_APP_BACK_SERVER;

	const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [loginNo, setLoginNo] = useRecoilState(loginNoState);
	const isLogin = useRecoilValue(isLoginState);
	const navigate = useNavigate();

	return (
		<div className="admin-menu-wrap">
			<div className="admin-menu">
				<div className="admin-menu-img">
					<img src="/image/suv_logo.png" />
				</div>
				<table className="admin-menu-tbl">
					<tbody>
						<tr>
							<th>직급</th>
							<td>{memberType === 0 ? "관리자" : "부관리자"}</td>
						</tr>
						<tr>
							<th>이름</th>
							<td>{loginId}</td>
						</tr>
						{memberType === 0 ? (
							<tr>
								<td>
									<button
										className="insertAdminBtn"
										onClick={() => {
											setModalOpen(true);
										}}
									>
										관리자 회원 추가
									</button>
								</td>
								<td>
									<button
										className="logoutBtn"
										onClick={() => {
											setLoginNo(0);
											setLoginId("");
											setMemberType(-1);
											setMemberCode("");
											setCompanyNo(null);
											delete axios.defaults.headers.common["Authorization"];
											window.localStorage.removeItem("refreshToken");
											navigate("/");
										}}
									>
										로그아웃
									</button>
								</td>
							</tr>
						) : (
							<tr>
								<td colSpan={2}>
									<button
										className="logoutBtn"
										onClick={() => {
											setLoginNo(0);
											setLoginId("");
											setMemberType(-1);
											setMemberCode("");
											setCompanyNo(null);
											delete axios.defaults.headers.common["Authorization"];
											window.localStorage.removeItem("refreshToken");
											navigate("/");
										}}
									>
										로그아웃
									</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<button
				className="convention-btn"
				onClick={() => {
					navigate("/convention/main");
				}}
			>
				박람회 페이지로
			</button>
			{modalOpen === true ? <JoinAdmin setModalOpen={setModalOpen} /> : <></>}
		</div>
	);
};

export default AdminMenu;
