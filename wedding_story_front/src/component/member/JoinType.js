import { MdNextPlan } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const JoinType = (props) => {
  const navigate = useNavigate();
  const setNowPath = props.setNowPath;
  setNowPath("type");

  const joinMember = () => {
    navigate("/join/joinMember");
    setNowPath("info");
  };
  const joinCompany = () => {
    navigate("/join/joinCompany");
    setNowPath("info");
  };

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
              <p>일반 회원 전용 회원가입입니다.</p>
            </div>
          </div>
          <div className="type-btn">
            <button onClick={joinMember}>가입하기</button>
          </div>
        </div>
        <div className="join-line"></div>
        <div className="join-type">
          <h3>업체(제휴사)</h3>
          <div className="type-dec">
            <div>
              <div>
                <span className="material-icons">business</span>
              </div>
              <p>최초 가입 시 사업자 등록번호가 필요하며,</p>
              <p>직원 가입 시 업체 고유 번호가 필요합니다.</p>
            </div>
          </div>
          <div className="type-btn">
            <button onClick={joinCompany}>가입하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinType;
