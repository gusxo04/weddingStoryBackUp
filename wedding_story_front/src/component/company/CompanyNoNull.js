import { Link, useNavigate } from "react-router-dom";

const CompanyNoNull = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="CompanyNo-null">
				<div className="no-title">
					<h1>업체 정보 없음</h1>
				</div>
				<h1>좌측상단 메뉴에서 업체등록 부터 진행해주세요</h1>
			</div>
			<div className="no-button">
				<Link to={"/company/join"}>
					<button>이동하기</button>
				</Link>
			</div>
		</>
	);
};
export default CompanyNoNull;
