import { useEffect, useState } from "react";
import "./memberControll.css";
import axios from "axios";
const MemberControll = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMemberList(Object.values(res.data));
        } else {
          console.error("멤버 없음");
          setMemberList([]);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("조회 에러");
        setMemberList([]);
      });
  }, []);
  return (
    <div className="member-controll-wrap">
      <div className="page-title">
        <h2>회원 관리</h2>
      </div>
      <div>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>회원번호</th>
              <th style={{ width: "15%" }}>아이디</th>
              <th style={{ width: "10%" }}>이름</th>
              <th style={{ width: "20%" }}>전화번호</th>
              <th style={{ width: "20%" }}>이메일</th>
              <th style={{ width: "5%" }}>성별</th>
              <th style={{ width: "5%" }}>회원코드</th>
              <th style={{ width: "5%" }}>선택</th>
            </tr>
          </thead>
          <tbody>
            {memberList.length > 0 ? (
              memberList.map((member, index) => (
                <MemberItem
                  key={"member-" + index}
                  member={member}
                  index={index}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8">회원이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const MemberItem = (props) => {
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <tr className="userInfo">
      <td>{member.memberNo}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberMail}</td>
      <td>{member.memberGender}</td>
      <td>{member.memberCode}</td>
      <td>
        <input
          type="checkbox"
          id={`deleteMember-${props.index}`}
          name="deleteMember"
          checked
        />
        <label htmlFor={`deleteMember-${props.index}`}></label>
      </td>
    </tr>
  );
};
export default MemberControll;
