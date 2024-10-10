import { useRecoilState } from "recoil";
import { memberTypeState } from "../utils/RecoilData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageNavi from "../utils/PagiNavi";

const AdminControll = () => {
	const [memberType, setMemberType] = useRecoilState(memberTypeState);
	const navigate = useNavigate();
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [memberList, setMemberList] = useState([]);
	const [pi, setPi] = useState({});
	const [reqPage, setReqPage] = useState(1);
	const [seeInfo, setSeeInfo] = useState(0);
	const [selectedMember, setSelectedMember] = useState(null);
	const [deleteMember, setDeleteMember] = useState([]);

	useEffect(() => {
		console.log(deleteMember);
	}, [deleteMember]);

	const memberData = (member) => {
		console.log(member);
		setSelectedMember(member);
	};
	const delMem = () => {
		if (deleteMember.length > 0) {
			axios
				.post(`${backServer}/admin/delete/${deleteMember}`)
				.then((res) => {
					console.log(res);
					setDeleteMember([]);
					setMemberList((prevList) => prevList.filter((member) => !deleteMember.includes(member.memberNo)));
				})
				.catch((err) => {
					console.log("회원탈퇴 실패");
				});
		}
	};

	useEffect(() => {
		axios
			.get(`${backServer}/admin/adminMember/${reqPage}`)
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
		<div className="member-controll-wrap">
			<div className="page-title">
				<h2>관리자 현황</h2>
			</div>
			<div className="tbl-wrap">
				<table className="tbl1">
					<thead>
						<tr>
							<th style={{ width: "5%" }}>번호</th>
							<th style={{ width: "10%" }}>종류</th>
							<th style={{ width: "20%" }}>아이디</th>
							<th style={{ width: "9%" }}>이름</th>
							<th style={{ width: "15%" }}>전화번호</th>
							<th style={{ width: "18%" }}>이메일</th>
							<th style={{ width: "15%" }}>가입일</th>
							<th style={{ width: "5%" }}>선택</th>
						</tr>
					</thead>
					<tbody>
						{memberList.length > 0 ? (
							memberList.map((member, index) => (
								<AdminItem
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
								<td colSpan="8">관리자가 없습니다.</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="del-btn-wrap">
					<button className="member-delBtn" onClick={delMem}>
						관리자 삭제
					</button>
				</div>
				<div style={{ marginTop: "30px", marginBottom: "30px" }}>
					<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
				</div>
			</div>
		</div>
	);
};

const AdminItem = (props) => {
	const member = props.member;
	const index = props.index;
	const memberData = props.memberData;
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const seeInfo = props.seeInfo;
	const setSeeInfo = props.setSeeInfo;
	const setDeleteMember = props.setDeleteMember;
	const deleteMember = props.deleteMember;
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
			<td>{member.memberType === 0 ? "총관리자" : "관리자"}</td>
			<td>{member.memberId}</td>
			<td>{member.memberName}</td>
			<td>{member.memberPhone}</td>
			<td>{member.memberEmail}</td>
			<td>{member.enrollDate}</td>
			<td>
				<input type="checkbox" onClick={checkBoxClick} />
			</td>
		</tr>
	);
};
export default AdminControll;
