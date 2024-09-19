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
        console.log(res);
        setMemberList(res.data.memberList);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
            {memberList.map((member, index) => {
              return (
                <MemberItem
                  key={"member-" + index}
                  member={member}
                  index={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const MemberItem = (props) => {
  const member = props.member;
};
export default MemberControll;
