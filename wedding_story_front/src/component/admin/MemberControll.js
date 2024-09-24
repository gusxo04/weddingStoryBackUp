import { useEffect, useState } from "react";
import "./memberControll.css";
import axios from "axios";
import PageNavi from "../utils/PagiNavi";
const MemberControll = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  const [pi, setPi] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [seeInfo, setSeeInfo] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteMember, setDeleteMember] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/admin/member/${reqPage}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setMemberList(Object.values(res.data.list));
          setPi(res.data.pi);
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
  }, [reqPage]);

  useEffect(() => {
    console.log(deleteMember);
  }, [deleteMember]);

  const memberData = (member) => {
    console.log(member);
    setSelectedMember(member);
  };
  return (
    <div className="member-controll-wrap">
      <div className="page-title">
        <h2>회원 관리</h2>
      </div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: "11%" }}>회원번호</th>
              <th style={{ width: "15%" }}>아이디</th>
              <th style={{ width: "10%" }}>이름</th>
              <th style={{ width: "20%" }}>전화번호</th>
              <th style={{ width: "23%" }}>이메일</th>
              <th style={{ width: "5%" }}>성별</th>
              <th style={{ width: "11%" }}>회원코드</th>
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
                  memberData={memberData}
                  seeInfo={seeInfo}
                  setSeeInfo={setSeeInfo}
                  setDeleteMember={setDeleteMember}
                  deleteMember={deleteMember}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8">회원이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="del-btn-wrap">
          <button className="member-delBtn">회원 탈퇴</button>
        </div>
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
      <MemberInfo
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </div>
  );
};

const MemberItem = (props) => {
  const member = props.member;
  const index = props.index;
  const memberData = props.memberData;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const seeInfo = props.seeInfo;
  const setSeeInfo = props.setSeeInfo;
  const setDeleteMember = props.setDeleteMember;
  const deleteMember = props.deleteMember;
  const click = (e) => {
    if (e.target.type !== "checkbox") {
      memberData(member);
    }
  };
  const checkBoxClick = (e) => {
    e.stopPropagation();
    const memberNo = member.memberNo;

    if (deleteMember.includes(memberNo)) {
      setDeleteMember(deleteMember.filter((no) => no !== memberNo));
    } else {
      setDeleteMember([...deleteMember, memberNo]);
    }
  };
  return (
    <tr className="userInfo" onClick={() => memberData(member)}>
      <td>{member.memberNo}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberEmail}</td>
      <td>{member.memberGender}</td>
      <td>{member.memberCode}</td>
      <td>
        <input type="checkbox" onClick={checkBoxClick} />
      </td>
    </tr>
  );
};

const MemberInfo = (props) => {
  const selectedMember = props.selectedMember;
  return (
    <>
      <div className="memberInfo-wrap">
        <div className="my">
          <h3>회원 상세</h3>
          {selectedMember === null ? (
            <a>회원을 선택하세요</a>
          ) : (
            <table className="tbl2">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>회원번호</th>
                  <td>{selectedMember.memberNo}</td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>{selectedMember.memberId}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{selectedMember.memberName}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{selectedMember.memberPhone}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{selectedMember.memberEmail}</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>{selectedMember.memberGender}</td>
                </tr>
                <tr>
                  <th>회원코드</th>
                  <td>{selectedMember.memberCode}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="partner">
          <h3>배우자 상세</h3>
          {selectedMember === null ? (
            <a>회원을 선택하세요</a>
          ) : (
            <table className="tbl2">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>회원번호</th>
                  <td>{selectedMember.memberNo}</td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>{selectedMember.memberId}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{selectedMember.memberName}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{selectedMember.memberPhone}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{selectedMember.memberEmail}</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>{selectedMember.memberGender}</td>
                </tr>
                <tr>
                  <th>회원코드</th>
                  <td>{selectedMember.memberCode}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default MemberControll;
