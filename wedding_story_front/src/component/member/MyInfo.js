import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";

const MyInfo = (props) => {
  const navigate = useNavigate();
  const setNowPath = props.setNowPath;
  setNowPath("info");
  const memberNo = useRecoilValue(loginNoState);
  const [member, setMember] = useState({});
  console.log(member);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  useEffect(() => {
    axios
      .get(`${backServer}/member/selectLoginMember/` + memberNo)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberNo]);

  return (
    <div className="mypage-info-wrap">
      <table style={{ width: "97%" }}>
        <thead>
          <td>회원정보</td>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "12%" }}>성함</th>
            <td style={{ width: "33%" }}>{`${member.memberName}`}</td>
            <th style={{ width: "5%" }}></th>
            <th style={{ width: "14%" }}>전화번호</th>
            <td style={{ width: "33%" }}>{`${member.memberPhone}`}</td>
          </tr>
          <tr>
            <th>아이디</th>
            <td>{`${member.memberId}`}</td>
            <th></th>
            <th>비밀번호</th>
            <th className="mypage-info-password">
              <Link to="#">
                <div>변경하기</div>
              </Link>
            </th>
          </tr>
          <tr>
            <th>회원 성별</th>
            <th>
              <div className="mypage-labelbox">
                <div
                  className={`${
                    member.memberGender === "남" ? "backGray" : ""
                  }`}
                >
                  <label>
                    <input type="radio" name="memberGender" value="남" /> 신랑
                  </label>
                </div>
                <div
                  className={`${
                    member.memberGender === "여" ? "backGray" : ""
                  }`}
                >
                  <label>
                    <input type="radio" name="memberGender" value="여" /> 신부
                  </label>
                </div>
              </div>
            </th>
            <th></th>
            <th>이메일 주소</th>
            <td>{`${member.memberEmail}`}</td>
          </tr>
        </tbody>
        <thead className="mypage-partner-info">
          <td>배우자 정보</td>
        </thead>
        <tbody>
          <tr>
            <th>배우자 성함</th>
            <td>{`${member.partnerName}`}</td>
            <th></th>
            <th>배우자 아이디</th>
            <td>{`${member.partnerId}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default MyInfo;
