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
        <div>
          <button>로그인</button>
        </div>
        <div>
          <button>메인 페이지</button>
        </div>
      </div>
    </div>
  );
};
export default JoinSuccess;
