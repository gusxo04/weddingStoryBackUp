import { useState } from "react";
import {
  companyNoState,
  isLoginState,
  loginIdState,
  loginNoState,
  memberCodeState,
  memberTypeState,
} from "../utils/RecoilData";
import "./adminMenu.css";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  // console.log("membertype : " + memberType);
  const [modalOpen, setModalOpen] = useState("");
  const [insertId, setInsertId] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberCode, setMemberCode] = useRecoilState(memberCodeState);
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [loginNo, setLoginNo] = useRecoilState(loginNoState);
  const isLogin = useRecoilValue(isLoginState);
  const navigate = useNavigate();
  const insertAdmin = () => {
    if (insertId === null) {
      Swal.fire({
        title: "아이디 누락",
        text: "필수 입력값이 누락되었습니다",
        icon: "warning",
        iconColor: "var(--main1)",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--main1)",
      });
    } else if (selectedType === null) {
      Swal.fire({
        title: "선택값 누락",
        text: "필수 입력값이 누락되었습니다",
        icon: "warning",
        iconColor: "var(--main1)",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--main1)",
      });
    } else {
      axios
        .get(`${backServer}/admin/updateAdmin/${insertId}/${selectedType}`)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            Swal.fire({
              title: "등록 성공",
              text: "아이디 등록에 성공했습니다.",
              icon: "success",
              iconColor: "var(--main1)",
              confirmButtonText: "확인",
              confirmButtonColor: "var(--main1)",
            }).then(setModalOpen(false));
          } else {
            console.log("insert 실패");
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "없는 아이디",
            text: "올바른 아이디를 입력해주세요",
            icon: "warning",
            iconColor: "var(--main1)",
            confirmButtonText: "확인",
            confirmButtonColor: "var(--main1)",
          });
        });
    }
  };
  return (
    <div className="admin-menu-wrap">
      <div className="admin-menu">
        <div className="admin-menu-img">
          <img src="/image/suv_logo.png" />
        </div>
        <table className="admin-menu-tbl">
          <tbody>
            <tr>
              <th>직급</th>
              <td>{memberType === 0 ? "관리자" : "부관리자"}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{loginId}</td>
            </tr>
            {memberType === 0 ? (
              <tr>
                <td>
                  <button
                    className="insertAdminBtn"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    관리자 회원 추가
                  </button>
                </td>
                <td>
                  <button
                    className="logoutBtn"
                    onClick={() => {
                      setLoginNo(0);
                      setLoginId("");
                      setMemberType(-1);
                      setMemberCode("");
                      setCompanyNo(null);
                      delete axios.defaults.headers.common["Authorization"];
                      window.localStorage.removeItem("refreshToken");
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={2}>
                  <button
                    className="logoutBtn"
                    onClick={() => {
                      setLoginNo(0);
                      setLoginId("");
                      setMemberType(-1);
                      setMemberCode("");
                      setCompanyNo(null);
                      delete axios.defaults.headers.common["Authorization"];
                      window.localStorage.removeItem("refreshToken");
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalOpen === true ? (
        <AdminOverlay
          setModalOpen={setModalOpen}
          setInsertId={setInsertId}
          insertId={insertId}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          insertAdmin={insertAdmin}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

const AdminOverlay = (props) => {
  const setModalOpen = props.setModalOpen;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const insertId = props.insertId;
  const setInsertId = props.setInsertId;
  const modalOpen = props.modalOpen;
  const selectedType = props.selectedType;
  const setSelectedType = props.setSelectedType;
  const insertAdmin = props.insertAdmin;

  const postRefuse = () => {
    axios
      .get(`${backServer}/admin/refuse/`)
      .then((res) => {
        console.log(res.data);
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        console.log("광고 거절 에러");
      });
  };
  return (
    <div className="adminOverlay" onClick={() => setModalOpen(false)}>
      <div
        className="adminOverlay-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="adminOverlay-content-top">
          <h3>관리자 회원 등록</h3>
        </div>
        <div className="adminOverlay-content-middle">
          <div className="insert-wrap">
            <label id="id-input">아이디</label>
            <input
              className="id-input"
              id="id-input"
              placeholder="관리자로 등록할 아이디 입력"
              onChange={(e) => {
                const value = e.target.value;
                setInsertId(value);
              }}
            />

            <div className="radio-group">
              <div>
                <input
                  type="radio"
                  value={0}
                  id="admin-sel"
                  checked={selectedType === 0}
                  onChange={() => {
                    setSelectedType(0);
                  }}
                />
                <label htmlFor="admin-sel">관리자</label>
              </div>
              <div>
                <input
                  type="radio"
                  value={3}
                  id="sub-admin-sel"
                  checked={selectedType === 3}
                  onChange={() => setSelectedType(3)}
                />
                <label htmlFor="sub-admin-sel">부관리자</label>
              </div>
            </div>
          </div>
        </div>

        <div className="adminOverlay-content-bottom">
          <button onClick={() => insertAdmin()}>등록</button>
        </div>
      </div>
    </div>
  );
};
export default AdminMenu;
