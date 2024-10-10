import Sales from "./Sales";
import MemberControll from "./MemberControll";
import CompanyControll from "./CompanyControll";
import Advertisement from "./Advertisement";
import Question from "./Question";
import AdminControll from "./AdminControll";
import Notice from "./Notice";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminMain from "./AdminMain";
import AdminMenu from "./AdminMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import "./admin.css";
import { isLoginState, loginIdState, memberTypeState } from "../utils/RecoilData";
import Swal from "sweetalert2";

const Admin = () => {
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	const isLogin = useRecoilValue(isLoginState);
	const navigate = useNavigate();

	const notAdmin = () => {
		Swal.fire({
			title: "접근권한 없음",
			text: "접근 불가능한 페이지입니다",
			icon: "warning",
			iconColor: "var(--main1)",
			confirmButtonText: "확인",
			confirmButtonColor: "var(--main1)",
		});
	};

	if (!isLogin) {
		return null;
	}

	if (memberType !== 0) {
		if (memberType !== 3) {
			notAdmin();
			return;
		}
	}

	return (
		<div className="admin-wrap">
			<AdminMenu />

			<div className="admin-content">
				<Routes>
					<Route path="sales" element={<Sales />} />
					<Route path="memberControll" element={<MemberControll />} />
					<Route path="companyControll" element={<CompanyControll />} />
					<Route path="advertisement" element={<Advertisement />} />
					<Route path="question" element={<Question />} />
					<Route path="adminControll" element={<AdminControll />} />
					<Route path="notice/*" element={<Notice />} />
					<Route path="adminMain" element={<AdminMain />} />
					<Route path="question/*" element={<Question />} />
				</Routes>
			</div>
		</div>
	);
};

export default Admin;
