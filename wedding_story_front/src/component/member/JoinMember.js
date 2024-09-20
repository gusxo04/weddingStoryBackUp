import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinMember = (props) => {
  const navigate = useNavigate();
  const setNowPath = props.setNowPath;
  setNowPath("info");
  const [memberGender, setMemberGender] = useState("");
  const [isPartner, setIsPartner] = useState("");
  const checkGender1 = () => {
    setMemberGender("남");
  };
  const checkGender2 = () => {
    setMemberGender("여");
  };
  const checkPartner1 = () => {
    setIsPartner("네");
  };
  const checkPartner2 = () => {
    setIsPartner("아니오");
  };
  const nextPage = () => {
    navigate("/join/success");
  };
  return (
    <div className="join-info-wrap">
      <form>
        <div>
          <div className="join-info1">
            <div className="join-infobox">
              <label htmlFor="memberId">회원 아이디</label>
              <div className="join-inputbox">
                <input type="text" id="memberId"></input>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberPw">회원 비밀번호</label>
              <div className="join-inputbox">
                <input type="password" id="memberPw"></input>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberRePw">회원 비밀번호 확인</label>
              <div className="join-inputbox">
                <input type="password" id="memberRePw"></input>
              </div>
            </div>

            <div className="join-infobox">
              <label htmlFor="memberGender">회원 성별</label>
              <div className="join-labelbox">
                <div>
                  <label
                    className={`${memberGender === "남" ? "backGray" : ""}`}
                    onClick={checkGender1}
                  >
                    <input type="radio" name="gender" value="m" /> 신랑
                  </label>
                </div>
                <div>
                  <label
                    className={`${memberGender === "여" ? "backGray" : ""}`}
                    onClick={checkGender2}
                  >
                    <input type="radio" name="gender" value="f" /> 신부
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="join-info2">
            <div className="join-infobox">
              <label htmlFor="memberName">회원 이름</label>
              <div className="join-inputbox">
                <input type="text" id="memberName"></input>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberPhone">회원 전화번호</label>
              <div className="join-inputbox1">
                <input type="text" id="memberPhone"></input>
                <span>-</span>
                <input type="text" id="memberPhone"></input>
                <span>-</span>
                <input type="text" id="memberPhone"></input>
              </div>
            </div>
            <div className="join-infobox">
              <label htmlFor="memberEmail">회원 이메일</label>
              <div className="join-inputbox2">
                <input type="text" id="memberEmail"></input>
                <span>@</span>
                <select id="email-domain" name="email-domain" required>
                  <option value="custom">직접 입력</option>
                  <option value="@gmail.com">gmail.com</option>
                  <option value="@naver.com">naver.com</option>
                  <option value="@daum.net">daum.net</option>
                  <option value="@yahoo.com">yahoo.com</option>
                  <option value="@outlook.com">outlook.com</option>
                </select>
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
                    <input type="radio" name="gender" value="m" /> 네
                  </label>
                </div>
                <div>
                  <label
                    className={`${isPartner === "아니오" ? "backGray" : ""}`}
                    onClick={checkPartner2}
                  >
                    <input type="radio" name="gender" value="f" /> 아니오
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isPartner === "네" ? <IsPartner memberGender={memberGender} /> : ""}
        </div>
        <div className="join-btn2">
          <div>
            <button onClick={nextPage}>회원가입</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default JoinMember;

const IsPartner = (props) => {
  const memberGender = props.memberGender;
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
              {memberGender === "남"
                ? "신부 아이디"
                : memberGender === "여"
                ? "신랑 아이디"
                : "회원님은 성별을 먼저 선택해주세요."}
            </label>
            <div className="join-inputbox">
              <input type="text" id="partnerId"></input>
            </div>
          </div>
        </div>
        <div className="join-info">
          <div className="join-infobox">
            <label htmlFor="partnerName">
              {memberGender === "남"
                ? "신부 이름"
                : memberGender === "여"
                ? "신랑 이름"
                : "회원님은 성별을 먼저 선택해주세요."}
            </label>
            <div className="join-inputbox">
              <input type="text" id="partnerName"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
