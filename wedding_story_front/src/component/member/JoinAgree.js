import "./member.css";
import UseCondition from "../utils/UseCondition";
import PersonalPolicy from "../utils/PersonalPolicy";
import MarketingConsent from "../utils/MarketingConsent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinAgree = () => {
  const navigate = useNavigate();
  const [isClickedAll, setIsClickedAll] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const checkAgreeAll = () => {
    if (isClicked1 && isClicked2 && isClicked3) {
      setIsClickedAll(!isClickedAll);
    } else {
      setIsClickedAll(!isClickedAll);
      setIsClicked1(!isClickedAll);
      setIsClicked2(!isClickedAll);
      setIsClicked3(!isClickedAll);
    }
  };
  const checkAgree1 = () => {
    setIsClicked1(!isClicked1);
    if (isClickedAll) {
      setIsClickedAll(!isClicked1);
    }
  };
  const checkAgree2 = () => {
    setIsClicked2(!isClicked2);
    if (isClickedAll) {
      setIsClickedAll(!isClicked2);
    }
  };
  const checkAgree3 = () => {
    setIsClicked3(!isClicked3);
    if (isClickedAll) {
      setIsClickedAll(!isClicked3);
    }
  };
  const nextPage = () => {
    if (isClickedAll || isClicked1 & isClicked2) {
      navigate("/join/info");
    } else {
    }
  };
  return (
    <div className="join-agree-wrap">
      <div>
        <div className="join-agree-check">
          <label htmlFor="check">
            <span
              className="material-icons"
              onClick={checkAgreeAll}
              style={{
                color: isClickedAll ? "black" : "#c9c9c9",
              }}
            >
              {isClickedAll ? "check_circle" : "check_circle_outline"}
            </span>
          </label>
          <input type="checkbox" id="check"></input>
          <div>
            <span>전체 동의하기</span>
          </div>
        </div>
        <div className="join-agree-content">
          <p>
            웨딩 스토리 이용약관, 개인 정보 수집 및 이용, 마케팅 활용 동의(선택)
            동의를 포함합니다.
          </p>
        </div>
      </div>
      <div>
        <div className="join-agree-check">
          <label htmlFor="check">
            <span
              className="material-icons"
              onClick={checkAgree1}
              style={{
                color: isClicked1
                  ? "black"
                  : isClickedAll
                  ? "black"
                  : "#c9c9c9",
              }}
            >
              {isClicked1
                ? "check_circle"
                : isClickedAll
                ? "check_circle"
                : "check_circle_outline"}
            </span>
          </label>
          <input type="checkbox" id="check"></input>
          <div>
            <span style={{ color: "red" }}>[ 필수 ]</span>
            <span>웨딩 스토리 이용약관</span>
          </div>
        </div>
        <div className="join-agree-content">
          <div>
            <UseCondition />
          </div>
        </div>
      </div>
      <div>
        <div className="join-agree-check">
          <label htmlFor="check">
            <span
              className="material-icons"
              onClick={checkAgree2}
              style={{
                color: isClicked2
                  ? "black"
                  : isClickedAll
                  ? "black"
                  : "#c9c9c9",
              }}
            >
              {isClicked2
                ? "check_circle"
                : isClickedAll
                ? "check_circle"
                : "check_circle_outline"}
            </span>
          </label>
          <input type="checkbox" id="check"></input>
          <div>
            <span style={{ color: "red" }}>[ 필수 ]</span>
            <span>개인 정보 수집 및 이용</span>
          </div>
        </div>
        <div className="join-agree-content">
          <div>
            <PersonalPolicy />
          </div>
        </div>
      </div>
      <div>
        <div className="join-agree-check">
          <label htmlFor="check">
            <span
              className="material-icons"
              onClick={checkAgree3}
              style={{
                color: isClicked3
                  ? "black"
                  : isClickedAll
                  ? "black"
                  : "#c9c9c9",
              }}
            >
              {isClicked3
                ? "check_circle"
                : isClickedAll
                ? "check_circle"
                : "check_circle_outline"}
            </span>
          </label>
          <input type="checkbox" id="check"></input>
          <div>
            <span style={{ color: "blue" }}>[ 선택 ]</span>
            <span>마케팅 활용 동의</span>
          </div>
        </div>
        <div className="join-agree-content">
          <div>
            <MarketingConsent />
          </div>
        </div>
      </div>
      <div className="join-btn">
        <button onClick={nextPage}>다 음</button>
      </div>
    </div>
  );
};

export default JoinAgree;
