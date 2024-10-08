import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const JoinAdmin = (props) => {
	const setModalOpen = props.setModalOpen;
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const navigate = useNavigate();
	const [member, setMember] = useState({
		memberType: "",
		memberId: "",
		memberPw: "",
		memberGender: ".",
		memberName: "",
		memberPhone: "",
		memberEmail: "",
		companyNo: "",
		companyBusinessNo: "",
	});
	const [idCheck, setIdCheck] = useState(0);
	const [pwCheck, setPwCheck] = useState(0);
	const [rePwCheck, setReRwCheck] = useState(0);
	const [emailCheck, setEmailCheck] = useState(0);
	const [phoneCheck, setPhoneCheck] = useState(0);
	const changeInput = (e) => {
		const { name, value } = e.target;
		setMember({ ...member, [name]: value });
	};
	console.log(member);
	const checkId = (e) => {
		const checkId = e.target.value;
		const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,20}$/;
		{
			/*idCheck 0은 미기재,1은 정규표현식 부적합,2은 아이디 중복,3은 사용가능 */
		}
		if (checkId === "") {
			setIdCheck(0);
		} else if (!idRegex.test(checkId)) {
			setIdCheck(1);
		} else if (idRegex.test(checkId)) {
			axios
				.get(`${backServer}/member/checkId/` + checkId)
				.then((res) => {
					if (res.data > 0) {
						setIdCheck(2);
					} else {
						setIdCheck(3);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const checkPw = (e) => {
		const checkPw = e.target.value;
		const idRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/]{8,20}$/;
		{
			/*pwCheck 0은 미기재,1은 정규표현식 부적합,2은 사용가능 */
		}
		if (checkPw === "") {
			setPwCheck(0);
		} else if (!idRegex.test(checkPw)) {
			setPwCheck(1);
		} else if (idRegex.test(checkPw)) {
			setPwCheck(2);
		}
	};
	const recheckPw = (e) => {
		const recheckPw = e.target.value;
		{
			/*repwCheck 0은 미기재,1은 불일치,2은 일치 */
		}
		if (member.memberPw !== recheckPw) {
			setReRwCheck(1);
		} else if (member.memberPw === recheckPw) {
			setReRwCheck(2);
		}
	};
	const checkPhone = (e) => {
		const checkPhone = e.target.value;
		const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
		{
			/*phoneCheck 0은 미기재,1은 정규표현식 부적합,2은 사용가능 */
		}
		if (checkPhone === "") {
			setPhoneCheck(0);
		} else if (!phoneRegex.test(checkPhone)) {
			setPhoneCheck(1);
		} else if (phoneRegex.test(checkPhone)) {
			setPhoneCheck(2);
		}
	};
	const checkEmail = () => {
		const checkEmail = member.memberEmail;
		const idRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		{
			/*emailCheck 0은 미기재,1은 정규표현식 부적합,2은 이메일 인증 */
		}
		if (checkEmail === "") {
			setEmailCheck(0);
		} else if (!idRegex.test(checkEmail)) {
			setEmailCheck(1);
		} else if (idRegex.test(checkEmail)) {
			setEmailCheck(2);
			axios
				.get(`${backServer}/member/checkEmail/` + checkEmail)
				.then((res) => {
					if (res.data === "중복") {
						setEmailCheck(3);
					} else {
						setEmailCheck(2);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const nextPage = () => {
		console.log(idCheck);
		console.log(pwCheck);
		console.log(rePwCheck);
		console.log(phoneCheck);
		console.log(emailCheck);
		console.log(member.memberType);

		if (idCheck === 3 && pwCheck === 2 && rePwCheck === 2 && phoneCheck === 2 && emailCheck === 2 && member.memberType !== "") {
			console.log("여기");

			axios
				.post(`${backServer}/member/join`, member)
				.then((res) => {
					Swal.fire({
						text: "회원가입 성공",
						icon: "success",
						confirmButtonText: "확인",
					});
					navigate("/admin");
				})
				.catch((err) => {
					console.log(err);
					Swal.fire({
						text: "입력한 값을 확인해 주세요.",
						icon: "info",
					});
				});
		} else if (idCheck !== 3 || pwCheck !== 2 || rePwCheck !== 2 || phoneCheck !== 2 || emailCheck !== 2 || member.memberType === "") {
			Swal.fire({
				text: "정보를 기입 또는 확인해주세요.",
				icon: "info",
				confirmButtonText: "확인",
			});
		}
	};

	return (
		<div className="adminOverlay" onClick={() => setModalOpen(false)}>
			<div
				className="adminOverlay-content"
				onClick={(e) => {
					e.stopPropagation();
				}}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="admin-join-wrap">
					<div className="join-info1">
						<div className="radio-group">
							<div>
								<input type="radio" value={0} name="memberType" id="admin-sel" onChange={changeInput} />
								<label htmlFor="admin-sel">관리자</label>
							</div>
							<div>
								<input type="radio" value={3} name="memberType" id="sub-admin-sel" onChange={changeInput} />
								<label htmlFor="sub-admin-sel">부관리자</label>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberId">아이디</label>
							<div className="join-inputbox">
								<input type="text" id="memberId" name="memberId" onChange={changeInput} onBlur={checkId}></input>
								<span className={`${idCheck === 3 ? "joinValid" : "joinInvalid"}`}>
									{`${
										idCheck === 0
											? ""
											: idCheck === 1
												? "5~20자의 영문 소문자,숫자 조합하여 생성해 주세요."
												: idCheck === 2
													? "이미 사용중인 아이디입니다."
													: "사용 가능한 아이디입니다."
									}`}
								</span>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberPw">비밀번호</label>
							<div className="join-inputbox">
								<input type="password" id="memberPw" name="memberPw" onChange={changeInput} onBlur={checkPw}></input>
								<span className={`${pwCheck === 2 ? "joinValid" : "joinInvalid"}`}>
									{`${
										pwCheck === 0
											? ""
											: pwCheck === 1
												? "8~20자의 영문 대/소,숫자,특수문자로 조합으로 생성해 주세요."
												: "사용 가능한 비밀번호입니다."
									}`}
								</span>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberRePw">비밀번호 확인</label>
							<div className="join-inputbox">
								<input type="password" id="memberRePw" name="memberRePw" onChange={recheckPw}></input>
								<span className={`${rePwCheck === 2 ? "joinValid" : "joinInvalid"}`}>
									{`${rePwCheck === 0 ? "" : rePwCheck === 1 ? "비밀번호가 불일치합니다." : "비밀번호가 일치합니다."}`}
								</span>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberName">이름</label>
							<div className="join-inputbox">
								<input type="text" id="memberName" name="memberName" onChange={changeInput}></input>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberPhone">전화번호</label>
							<div className="join-inputbox">
								<input
									type="text"
									id="memberPhone"
									name="memberPhone"
									placeholder="010-1234-5678"
									onChange={changeInput}
									onBlur={checkPhone}
								></input>
							</div>
							<div>
								<span className={`${phoneCheck === 2 ? "joinValid" : "joinInvalid"}`}>
									{`${phoneCheck === 0 ? "" : phoneCheck === 1 ? "전화번호 형식에 맞추어 기입해 주세요." : ""}`}
								</span>
							</div>
						</div>
						<div className="join-infobox">
							<label htmlFor="memberEmail">이메일</label>
							<div className="join-inputbox">
								<input
									type="text"
									id="memberEmail"
									name="memberEmail"
									placeholder="wedding@gmail.com"
									onChange={changeInput}
									onBlur={checkEmail}
								></input>
							</div>
							<div>
								<span className={`${emailCheck === 2 ? "joinValid" : "joinInvalid"}`}>
									{`${
										emailCheck === 0
											? ""
											: emailCheck === 1
												? "이메일 형식에 맞추어 기입해 주세요."
												: emailCheck === 2
													? ""
													: "이미 가입되었거나 탈퇴한 이메일입니다."
									}`}
								</span>
							</div>
						</div>
						<div className="admin-join-btn">
							<button type="button" onClick={nextPage}>
								회원가입
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default JoinAdmin;
