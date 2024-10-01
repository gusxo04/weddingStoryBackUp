import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  companyNoState,
  loginIdState,
  loginNoState,
  memberCodeState,
  memberTypeState,
} from "../utils/RecoilData";
import Swal from "sweetalert2";

const MyInfo = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const setNowPath = props.setNowPath;
  setNowPath("info");
  const memberNo = useRecoilValue(loginNoState);
  const [member, setMember] = useState({});
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);

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

  const changeInput = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };

  const modifyMember = () => {
    Swal.fire({
      text: "회원님의 정보를 수정하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .patch(`${backServer}/member/updateMember`, member)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                text: "정보가 변경되었습니다.",
                icon: "success",
              }).then(() => {
                navigate("/mypage/info");
              });
            } else {
              Swal.fire({
                text: "오류가 발생하였습니다. 관리자에게 문의해주세요.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              text: "오류가 발생하였습니다. 관리자에게 문의해주세요.",
              icon: "error",
            });
          });
      } else if (res.isDismissed) {
      }
    });
  };
  const deleteMember = () => {
    Swal.fire({
      text: "정말로 탈퇴하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .patch(`${backServer}/member/deleteMember`, member)
          .then((res) => {
            if (res.data > 0) {
              Swal.fire({
                title: "회원 탈퇴 완료",
                text: "그동안 저희 웨딩스토리를 이용해주셔서 감사합니다.",
                icon: "success",
              }).then(() => {
                setLoginNo(0);
                setLoginId("");
                setMemberType(-1);
                setMemberCode("");
                setCompanyNo("");
                delete axios.defaults.headers.common["Authorization"];
                window.localStorage.removeItem("refreshToken");
                navigate("/");
              });
            } else {
              Swal.fire({
                text: "오류가 발생하였습니다. 관리자에게 문의해주세요.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              text: "오류가 발생하였습니다. 관리자에게 문의해주세요.",
              icon: "error",
            });
          });
      } else if (res.isDismissed) {
      }
    });
  };
  return (
    <div className="mypage-info-wrap">
      <table style={{ width: "97%" }}>
        <thead>
          <tr>
            <td>회원정보</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ width: "12%" }}>성함</th>
            <td style={{ width: "33%" }}>
              <input
                name="memberName"
                value={`${member.memberName}`}
                onChange={changeInput}
              ></input>
            </td>
            <th style={{ width: "5%" }}></th>
            <th style={{ width: "14%" }}>전화번호</th>
            <td style={{ width: "33%" }}>
              <input
                name="memberPhone"
                value={`${member.memberPhone}`}
                onChange={changeInput}
              ></input>
            </td>
          </tr>
          <tr>
            <th>아이디</th>
            <td>{`${member.memberId}`}</td>
            <th></th>
            <th>비밀번호</th>
            <th className="mypage-info-password">
              <Link to="password">
                <div>변경하기</div>
              </Link>
            </th>
          </tr>
          <tr>
            <th>회원 성별</th>
            <td>{`${member.memberGender}`}</td>
            <th></th>
            <th>이메일 주소</th>
            <td>{`${member.memberEmail}`}</td>
          </tr>
        </tbody>
        <thead className="mypage-partner-info">
          <tr>
            <td>배우자 정보</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>배우자 성함</th>
            <td>
              <input
                name="partnerName"
                value={`${member.partnerName}`}
                onChange={changeInput}
              ></input>
            </td>
            <th></th>
            <th>배우자 아이디</th>
            <td>
              <input
                name="partnerId"
                value={`${member.partnerId}`}
                onChange={changeInput}
              ></input>
            </td>
          </tr>
        </tbody>
        <tbody className="mypage-info-btnBox">
          <tr>
            <th colSpan={5}>
              <div>
                <button
                  className="mypage-info-modifybtn"
                  onClick={modifyMember}
                >
                  정보수정
                </button>
                <button className="mypage-info-delbtn" onClick={deleteMember}>
                  회원탈퇴
                </button>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default MyInfo;
