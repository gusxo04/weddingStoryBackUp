import { Link } from "react-router-dom";

const JoinSuccess = (props) => {
  const setNowPath = props.setNowPath;
  setNowPath("success");
  return (
    <div className="join-success-wrap">
      <div>
        <div className="join-successLogo">
          <img src="/image/main_logo.png" />
        </div>
      </div>
      <div className="join-successWord1">
        <div>
          <h2>회원가입이 완료되었습니다.</h2>
          <p>
            저희 웨딩스토리를 통하여 더욱 완벽한 결혼 준비가 될 수 있도록 최선을
            다하겠습니다.
          </p>
        </div>
      </div>
      <div className="join-movePage">
        <Link to="/login">
          <div className="join-movePage-btn">
            <span>로그인</span>
          </div>
        </Link>
        <Link to="/">
          <div className="join-movePage-btn">
            <span>메인페이지</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default JoinSuccess;
