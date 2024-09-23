import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinMember = (props) => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setNowPath = props.setNowPath;
  setNowPath("info");
  const [member, setMember] = useState({
    memberType: "1",
    memberId: "",
    memberPw: "",
    memberGender: "",
    memberName: "",
    memberPhone: "",
    memberEmail: "",
    partnerId: "",
    partnerName: "",
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
  const checkId = (e) => {
    const checkId = e.target.value;
    const idRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,20}$/;
    {
      /*checkId 0은 미기재,1은 정규표현식 부적합,2은 아이디 중복,3은 사용가능 */
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
      /*checkPw 0은 미기재,1은 정규표현식 부적합,2은 사용가능 */
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
    if (member.memberPw !== recheckPw) {
      setReRwCheck(1);
    } else if (member.memberPw === recheckPw) {
      setReRwCheck(2);
    }
  };
  const checkPhone = (e) => {
    const checkPhone = e.target.value;
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
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
    console.log(checkEmail);

    const idRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    {
      /*checkEmail 0은 미기재,1은 정규표현식 부적합,2은 이메일 인증,3은 이메일 인증 부적합 */
    }
    if (checkEmail === "") {
      setEmailCheck(0);
    } else if (!idRegex.test(checkEmail)) {
      setEmailCheck(1);
    } else if (idRegex.test(checkEmail)) {
      setEmailCheck(2);
    }
  };
  console.log(emailCheck);

  const [gender, setGender] = useState("");
  const [isPartner, setIsPartner] = useState("");
  const checkGender1 = () => {
    setGender("남");
    setMember({ ...member, memberGender: "남" });
  };
  const checkGender2 = () => {
    setGender("여");
    setMember({ ...member, memberGender: "여" });
  };
  const checkPartner1 = () => {
    setIsPartner("네");
  };
  const checkPartner2 = () => {
    setIsPartner("아니오");
  };
  const nextPage = () => {
    console.log(member);
    axios
      .post(`${backServer}/member/join`, member)
      .then((res) => {
        console.log(res.data);
        navigate("/join/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="join-info-wrap">
      <form>
        <div>
          <div className="join-info1">
            <div className="join-infobox">
              <label htmlFor="memberId">회원 아이디</label>
              <div className="join-inputbox">
                <input
                  type="text"
                  id="memberId"
                  name="memberId"
                  onChange={changeInput}
                  onBlur={checkId}
                ></input>
                <span
                  className={`${idCheck === 3 ? "joinValid" : "joinInvalid"}`}
                >
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
              <label htmlFor="memberPw">회원 비밀번호</label>
              <div className="join-inputbox">
                <input
                  type="password"
                  id="memberPw"
                  name="memberPw"
                  onChange={changeInput}
                  onBlur={checkPw}
                ></input>
                <span
                  className={`${pwCheck === 2 ? "joinValid" : "joinInvalid"}`}
                >
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
              <label htmlFor="memberRePw">회원 비밀번호 확인</label>
              <div className="join-inputbox">
                <input
                  type="password"
                  id="memberRePw"
                  name="memberRePw"
                  onChange={recheckPw}
                ></input>
                <span
                  className={`${rePwCheck === 2 ? "joinValid" : "joinInvalid"}`}
                >
                  {`${
                    rePwCheck === 0
                      ? ""
                      : rePwCheck === 1
                      ? "비밀번호가 불일치합니다."
                      : "비밀번호가 일치합니다."
                  }`}
                </span>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberGender">회원 성별</label>
              <div className="join-labelbox">
                <div>
                  <label
                    className={`${gender === "남" ? "backGray" : ""}`}
                    onClick={checkGender1}
                  >
                    <input type="radio" name="memberGender" value="남" /> 신랑
                  </label>
                </div>
                <div>
                  <label
                    className={`${gender === "여" ? "backGray" : ""}`}
                    onClick={checkGender2}
                  >
                    <input type="radio" name="memberGender" value="여" /> 신부
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="join-info2">
            <div className="join-infobox">
              <label htmlFor="memberName">회원 이름</label>
              <div className="join-inputbox">
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  onChange={changeInput}
                ></input>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberPhone">회원 전화번호</label>
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
                <span
                  className={`${
                    phoneCheck === 2 ? "joinValid" : "joinInvalid"
                  }`}
                >
                  {`${
                    phoneCheck === 0
                      ? ""
                      : phoneCheck === 1
                      ? "전화번호 형식에 맞추어 기입해 주세요."
                      : ""
                  }`}
                </span>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberEmail">회원 이메일</label>
              <div className="join-inputbox1">
                <input
                  type="text"
                  id="memberEmail"
                  name="memberEmail"
                  placeholder="wedding@gmail.com"
                  onChange={changeInput}
                ></input>
                <button type="button" onClick={checkEmail}>
                  인증하기
                </button>
              </div>
              <div>
                <span
                  className={`${
                    emailCheck === 3 ? "joinValid" : "joinInvalid"
                  }`}
                >
                  {`${
                    emailCheck === 0
                      ? ""
                      : emailCheck === 1
                      ? "이메일 형식에 맞추어 기입해 주세요."
                      : emailCheck === 2
                      ? "인증번호를 이메일로 전송했습니다."
                      : "사용 가능한 아이디입니다."
                  }`}
                </span>
              </div>
              <div
                className={`join-inputbox1 ${
                  emailCheck === 2 ? "" : " hiddenInput"
                }`}
              >
                <input type="text"></input>
                <button type="button">확인</button>
              </div>
            </div>
            <div className="join-partnerInfobox">
              <h4>배우자가 저희 웨딩 스토리에 가입되어 있으신가요?</h4>
              <p>
                배우자가 가입되어 있는 경우 일정 및 구매 내역 등 자동으로 공유가
                됩니다.
              </p>
              <div className="join-labelbox">
                <div>
                  <label
                    className={`${isPartner === "네" ? "backGray" : ""}`}
                    onClick={checkPartner1}
                  >
                    <input type="radio" /> 네
                  </label>
                </div>
                <div>
                  <label
                    className={`${isPartner === "아니오" ? "backGray" : ""}`}
                    onClick={checkPartner2}
                  >
                    <input type="radio" /> 아니오
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isPartner === "네" ? (
            <IsPartner gender={gender} member={member} setMember={setMember} />
          ) : (
            ""
          )}
        </div>
        <div className="join-btn2">
          <div>
            <button type="button" onClick={nextPage}>
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default JoinMember;

const IsPartner = (props) => {
  const gender = props.gender;
  const member = props.member;
  const setMember = props.setMember;
  const changeInput = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };
  console.log(member);
  return (
    <div className="join-partner-wrap">
      <div>
        <div>
          <div className="joinLine2"></div>
        </div>
      </div>
      <div>
        <h3>배우자 정보</h3>
      </div>
      <div className="join-partnerInfo">
        <div className="join-info">
          <div className="join-infobox">
            <label htmlFor="partnerId">
              {gender === "남"
                ? "신부 아이디"
                : gender === "여"
                ? "신랑 아이디"
                : "회원님은 성별을 먼저 선택해주세요."}
            </label>
            <div className="join-inputbox">
              <input
                type="text"
                id="partnerId"
                name="partnerId"
                onChange={changeInput}
              ></input>
            </div>
          </div>
        </div>
        <div className="join-info">
          <div className="join-infobox">
            <label htmlFor="partnerName">
              {gender === "남"
                ? "신부 이름"
                : gender === "여"
                ? "신랑 이름"
                : "회원님은 성별을 먼저 선택해주세요."}
            </label>
            <div className="join-inputbox">
              <input
                type="text"
                id="partnerName"
                name="partnerName"
                onChange={changeInput}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
