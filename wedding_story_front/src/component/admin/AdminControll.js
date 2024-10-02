import { useRecoilState } from "recoil";
import { memberTypeState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminControll = () => {
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const navigate = useNavigate();
  if (memberType !== 0) {
    Swal.fire({
      title: "접근권한 없음",
      text: "접근 불가능한 페이지입니다",
      icon: "warning",
      iconColor: "var(--main1)",
      confirmButtonText: "확인",
      confirmButtonColor: "var(--main1)",
    });
    return null;
  }
  return (
    <div>
      <a>관리자</a>
    </div>
  );
};
export default AdminControll;
