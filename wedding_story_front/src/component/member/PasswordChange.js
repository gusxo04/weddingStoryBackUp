import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const navigate = useNavigate();
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const loginId = useRecoilValue(loginIdState);
  const [modifyMember, setModifyMember] = useState({
    memberId: "",
    memberPw: "",
  });
  const [rePw, setRePw] = useState("");
  {
    /* 현재 비밀번호 상태 체크용state */
  }
  const [checkpw, setCheckPw] = useState(0);
  {
    /* 새 비밀번호와 상태 체크용state */
  }
  const [checkNewPw, setCheckNewPw] = useState(0);
  {
    /* 새 비밀번호와 비밀번호 확인용state */
  }
  const [checkRePw, setCheckRePw] = useState(0);

  useEffect(() => {
    setModifyMember(() => ({
      ...modifyMember,
      memberId: loginId,
    }));
  }, [loginId]); // loginId가 변경될 때마다 호출됨

  const checkOldPw = () => {
    const pwRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/]{8,20}$/;
    {
      /* checkPw 0 미기재, 1 미기재 또는 유효성 불일치, 2 비밀번호 불일치, 3 비밀번호 일치*/
    }
    if (modifyMember.memberPw == "") {
      setCheckPw(0);
      Swal.fire({
        text: "비밀번호를 입력해주세요.",
        icon: "info",
      });
    } else if (!pwRegex.test(modifyMember.memberPw)) {
      setCheckPw(1);
      Swal.fire({
        text: "비밀번호가 일치하지않습니다.",
        icon: "warning",
      });
    } else if (
      modifyMember.memberPw !== "" &&
      pwRegex.test(modifyMember.memberPw)
    ) {
      axios
        .post(`${backServer}/member/checkOldPw`, modifyMember)
        .then((res) => {
          if (res.data === 1) {
            setCheckPw(3);
          } else {
            setCheckPw(2);
            Swal.fire({
              text: "비밀번호가 일치하지않습니다.",
              icon: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
    if (checkNewPw === 2 && checkRePw === 2) {
      axios
        .patch(`${backServer}/member/modifyPw`, modifyMember)
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({
              text: "비밀번호가 변경되었습니다.",
              icon: "success",
            }).then(() => {
              navigate("/mypage/info");
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
    <div className="mypage-password-wrap">
      {checkpw !== 3 ? (
        <div>
          <div className="mypage-password-title">
            <h3>비밀번호 재확인</h3>
            <p>
              회원님의 정보를 안전하게 보호하기 위하여 다시 한번 비밀번호를
              확인해주세요.
            </p>
          </div>
          <div className="mypage-password-inputbox">
            <div>
              <div>
                <label htmlFor="nowPw">현재 사용중인 비밀번호</label>
              </div>
              <div className="mypage-password-input">
                <input
                  type="password"
                  name="oldPw"
                  onChange={(e) => {
                    setModifyMember({
                      ...modifyMember,
                      memberPw: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mypage-password-btnbox">
            <button type="button" onClick={checkOldPw}>
              확인
            </button>
          </div>
        </div>
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
                <span
                  className={`${
                    checkNewPw === 2 ? "joinValid" : "joinInvalid"
                  }`}
                >
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
                <span
                  className={`${checkRePw === 2 ? "joinValid" : "joinInvalid"}`}
                >
                  {`${
                    checkRePw === 0
                      ? ""
                      : checkRePw === 1
                      ? "비밀번호가 불일치합니다."
                      : "비밀번호가 일치합니다."
                  }`}
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
    </div>
  );
};
export default PasswordChange;
