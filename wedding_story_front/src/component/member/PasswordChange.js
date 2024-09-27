import axios from "axios";
import { useState } from "react";

const PasswordChange = (props) => {
  const setMember = props.setMember;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [nowPw, setNowPw] = useState("");
  const [checkpw, setCheckPw] = useState(0);
  const checkNowPw = () => {
    const pwRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?\/]{8,20}$/;
    {
      /* checkPw 0 미기재, 1 미기재 또는 유효성 불일치, 2 비밀번호 불일치, 3 비밀번호 일치*/
    }
    if (nowPw === "" || !pwRegex.test(nowPw)) {
      setCheckPw(1);
    } else if (nowPw !== "" && pwRegex.test(nowPw)) {
      axios
        .get(`${backServer}/member/checkNowPw`)
        .then((res) => {
          console.log(res.date);
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="mypage-password-wrap">
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
                type="text"
                name="nowPw"
                onChange={(e) => {
                  setNowPw(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mypage-password-btnbox">
          <button type="button" onClick={checkNowPw}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default PasswordChange;
