import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const SearchPw = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [member, setMember] = useState({
		memberEmail: "",
		memberId: "",
	});
	const [emailCheck, setEmailCheck] = useState(0);
	const [emailCode, setEmailCode] = useState("");
	const [inputCode, setInputCode] = useState("");
	const [codeCheck, setCodeCheck] = useState(0);
	const changeInput = (e) => {
		const name = e.target.name;
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
		} else if (inputCode !== emailCheck) {
			setCodeCheck(2);
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
							<div className="searchMember-buttonBox">
								<button>확인</button>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="searchMember-title2">
						<h3>고객님의 웨딩스토리 계정을 찾았습니다.</h3>
						<p>아이디 확인 후 로그인 해 주세요.</p>
					</div>
					<div className="searchMember-content2">
						<h4>
							회원님의 아이디는 <span style={{ color: "var(--main1)" }}>{member.memberId}</span> 입니다.
						</h4>
					</div>
				</>
			)}
		</>
	);
};

export default SearchPw;
