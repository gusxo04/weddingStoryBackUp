import { Link } from "react-router-dom";
import "./member.css";

const Login = () => {
  return (
    <main className="login-wrap">
      <div className="login-wrap-content">
        <div>
          <div className="login-title">
            <div>
              <h2>MEMBER</h2>
              <h1>로그인</h1>
            </div>
          </div>
          <div className="login-inputbox">
            <div>
              <div className="login-input">
                <input name="memberId" id="memberId" placeholder="아이디" />
              </div>
              <div className="login-input">
                <input name="memberPw" id="memberPw" placeholder="비밀번호" />
              </div>
            </div>
          </div>
          <div className="login-button">
            <div>
              <button className="login-btn">LOGIN</button>
            </div>
          </div>
          <div className="login-linkBox">
            <Link to="/join/agree">회원가입</Link>
            <span>|</span>
            <Link to="#">아이디/비밀번호 찾기</Link>
          </div>
          <div className="login-simple-line">
            <div>
              <div className="joinLine2"></div>
              <div className="login-simple-info">
                <p>간편 로그인</p>
              </div>
              <div className="joinLine2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
