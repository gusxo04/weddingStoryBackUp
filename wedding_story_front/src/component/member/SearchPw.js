import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const SearchPw = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const setIsModal2Open = props.setIsModal2Open;
	const [member, setMember] = useState({
		memberEmail: "",
		memberId: "",
	});
	const [emailCheck, setEmailCheck] = useState(0);
	const [emailCode, setEmailCode] = useState("");
	const [inputCode, setInputCode] = useState("");
	const [codeCheck, setCodeCheck] = useState(0);
	const [modifyMember, setModifyMember] = useState({
		memberId: member.memberId,
		memberPw: "",
	});
	console.log(emailCode);

	const [rePw, setRePw] = useState("");
	{
		/* 새 비밀번호와 상태 체크용state */
	}
	const [checkNewPw, setCheckNewPw] = useState(0);
	{
		/* 새 비밀번호와 비밀번호 확인용state */
	}
	const [checkRePw, setCheckRePw] = useState(0);

	const changeInput = (e) => {
		const name = e.target.name;
		if (name === "inputCode") {
			setInputCode(e.target.value);
		} else {
			setMember({ ...member, [name]: e.target.value });
			if (name === "memberEmail") {
				const checkEmail = e.target.value;
				const idRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				{
					/*emailCheck 0은 미기재,1은 정규표현식 부적합,2은 적합 */
				}
				if (checkEmail === "") {
					setEmailCheck(0);
				} else if (!idRegex.test(checkEmail)) {
					setEmailCheck(1);
				} else {
					setEmailCheck(2);
				}
			}
		}
	};
	const checkEmail = () => {
		console.log(member);

		if (member.memberId !== "" && member.memberEmail !== "" && emailCheck === 2) {
			axios
				.post(`${backServer}/member/searchMember`, member)
				.then((res) => {
					if (res.data === "") {
						Swal.fire({
							text: "가입 시 입력한 정보가 맞는지 확인해주세요.",
							icon: "info",
						});
					} else {
						setEmailCode(res.data);
						Swal.fire({
							text: "인증 코드가 전송되었습니다.",
							icon: "info",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (member.memberId === "" || emailCheck !== 2) {
			Swal.fire({
				text: "정보를 기입 또는 확인해주세요.",
				icon: "info",
				confirmButtonText: "확인",
			});
		}
	};
	const checkEmailCode = () => {
		{
			/*codeCheck 0은 미기재,1은 일치,2은 불일치 */
		}
		if (inputCode === emailCode) {
			setCodeCheck(1);
			setModifyMember({ ...modifyMember, memberId: member.memberId });
		} else if (inputCode !== emailCheck) {
			setCodeCheck(2);
		}
	};
	const newPwCheck = (e) => {
		const newPw = e.target.value;
		const idRegex =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/]{8,20}$/;
		{
			/*checkNewPw 0은 미기재,1은 정규표현식 부적합,2은 사용가능 */
		}
		if (newPw === "") {
			setCheckNewPw(0);
		} else if (!idRegex.test(newPw)) {
			setCheckNewPw(1);
		} else if (idRegex.test(newPw)) {
			setCheckNewPw(2);
		}
		rePwCheck(rePw);
	};
	const rePwCheck = (rePw) => {
		const rePwCheck = rePw;
		{
			/*checkRePw 0은 미기재,1은 불일치,2은 일치 */
		}
		if (rePw !== "") {
			setCheckRePw(0);
		}
		if (modifyMember.memberPw !== rePwCheck) {
			setCheckRePw(1);
		} else if (modifyMember.memberPw === rePwCheck) {
			setCheckRePw(2);
		}
	};
	const modifyPw = () => {
		console.log(modifyMember);

		if (checkNewPw === 2 && checkRePw === 2) {
			axios
				.patch(`${backServer}/member/modifyPw`, modifyMember)
				.then((res) => {
					if (res.data === 1) {
						Swal.fire({
							text: "비밀번호가 변경되었습니다.",
							icon: "success",
						}).then(() => {
							setIsModal2Open(false);
						});
					} else {
						Swal.fire({
							text: "오류가 발생하였습니다. 관리자에게 문의해주세요.",
							icon: "error",
						});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (checkNewPw !== 2 || checkRePw !== 2) {
			Swal.fire({
				text: "입력한 값을 확인해주세요.",
				icon: "warning",
			});
		}
	};
	return (
		<>
			{codeCheck !== 1 ? (
				<>
					<div className="searchMember-title">
						<h2>비밀번호 찾기</h2>
					</div>
					<div className="searchMember-content">
						<div>
							<div>
								<div className="searchMember-label">
									<label htmlFor="memberId">아이디</label>
								</div>
								<div className="searchMember-input">
									<input
										type="text"
										name="memberId"
										id="memberId"
										placeholder="가입 시 등록한 아이디를 입력해주세요."
										onChange={changeInput}
										value={member.memberId}
									/>
								</div>
							</div>
							<div>
								<div className="searchMember-label">
									<label htmlFor="memberEmail">이메일</label>
								</div>
								<div className="searchMember-input">
									<input
										type="text"
										name="memberEmail"
										id="memberEmail"
										placeholder="가입 시 등록한 이메일을 입력해주세요."
										onChange={changeInput}
									/>
								</div>
								<div>
									<span className={`${emailCheck === 2 ? "joinValid" : "joinInvalid"}`}>
										{`${emailCheck === 0 ? "" : emailCheck === 1 ? "이메일 형식에 맞추어 기입해 주세요." : ""}`}
									</span>
									<div className="searchMember-buttonBox">
										<button onClick={checkEmail}>인증번호 받기</button>
									</div>
								</div>
							</div>
							{emailCode !== "" ? (
								<>
									<div style={{ paddingTop: "20px" }}>
										<div className="searchMember-input">
											<input type="text" name="inputCode" id="inputCode" placeholder="인증코드를 입력해주세요" onChange={changeInput} />
										</div>
										<div className="searchMember-buttonBox">
											<button onClick={checkEmailCode}>확인</button>
										</div>
									</div>
								</>
							) : (
								""
							)}
						</div>
					</div>
				</>
			) : (
				<div>
					<div className="mypage-password-title">
						<h3>비밀번호 변경</h3>
						<p>8~20자의 영문 대/소,숫자,특수문자로 조합으로 생성해 주세요.</p>
					</div>
					<div className="mypage-newPassword-content">
						<div>
							<div>
								<div className="mypage-newPassword-inputBox">
									<div>
										<label htmlFor="nowPw">새 비밀번호 입력</label>
									</div>
									<div className="mypage-password-input">
										<input
											type="password"
											name="newPw"
											onChange={(e) => {
												setModifyMember({
													...modifyMember,
													memberPw: e.target.value,
												});
											}}
											onBlur={newPwCheck}
										/>
									</div>
								</div>
								<span className={`${checkNewPw === 2 ? "joinValid" : "joinInvalid"}`} style={{ marginLeft: "250px" }}>
									{`${
										checkNewPw === 0
											? ""
											: checkNewPw === 1
												? "8~20자의 영문 대/소,숫자,특수문자로 조합으로 생성해 주세요."
												: "사용 가능한 비밀번호입니다."
									}`}
								</span>
							</div>
							<div>
								<div className="mypage-newPassword-inputBox">
									<div>
										<label htmlFor="nowPw">새 비밀번호 확인</label>
									</div>
									<div className="mypage-password-input">
										<input
											type="password"
											name="newRePW"
											onChange={
												((e) => {
													setRePw(e.target.value);
												},
												(e) => {
													rePwCheck(e.target.value);
												})
											}
										/>
									</div>
								</div>
								<span className={`${checkRePw === 2 ? "joinValid" : "joinInvalid"}`} style={{ marginLeft: "250px" }}>
									{`${checkRePw === 0 ? "" : checkRePw === 1 ? "비밀번호가 불일치합니다." : "비밀번호가 일치합니다."}`}
								</span>
							</div>
						</div>
					</div>
					<div className="mypage-password-btnbox">
						<button type="button" onClick={modifyPw}>
							확인
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchPw;
