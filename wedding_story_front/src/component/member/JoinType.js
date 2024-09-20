const JoinType = (props) => {
  const setNowPath = props.setNowPath;
  setNowPath("type");

  return (
    <div className="join-type-wrap">
      <div>
        <div className="join-type">
          <h3>개인</h3>
          <div className="type-dec">
            <div>
              <div>
                <span className="material-icons">person_outline</span>
              </div>
              <h4>만 19세 이상 가입 가능합니다.</h4>
            </div>
          </div>
          <div className="type-btn">
            <button>가입</button>
          </div>
        </div>
        <div className="join-line"></div>
        <div className="join-type">
          <h3>업체(제휴사)</h3>
          <div className="type-dec">
            <div>
              <span className="material-icons">business</span>
              <h4>최초 가입 시 사업자 등록번호가 필요하며,</h4>
              <h4>직원 가입 시 업체 고유 번호가 필요합니다.</h4>
            </div>
          </div>
          <div className="type-btn">
            <button>가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinType;
