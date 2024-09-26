import { loginIdState, memberTypeState } from "../utils/RecoilData";
import "./adminMenu.css";
import { useRecoilState, useRecoilValue } from "recoil";

const AdminMenu = () => {
  const loginId = useRecoilState(loginIdState);
  const memberType = useRecoilState(memberTypeState);
  // console.log("membertype : " + memberType);
  const insertAdmin = () => {};
  const logout = () => {};
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
            <tr>
              <td>
                <button className="insertAdminBtn" onClick={insertAdmin}>
                  관리자 회원 추가
                </button>
              </td>
              <td>
                <button className="logoutBtn" onClick={logout}>
                  로그아웃
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};
export default AdminMenu;
