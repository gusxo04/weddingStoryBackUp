import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const PageNavi = (props) => {
	const pi = props.pi;
	const reqPage = props.reqPage;
	const setReqPage = props.setReqPage;
	//paging jsx가 저장될 배열 선언
	const arr = new Array();
	//제일 앞으로
	arr.push(
		<li key="fist-page">
			<MdFirstPage
				onClick={() => {
					setReqPage(1);
				}}
			/>
		</li>,
	);
	//이전페이지
	arr.push(
		<li key="prev-page">
			<MdNavigateBefore
				onClick={() => {
					if (reqPage !== 1) {
						setReqPage(reqPage - 1);
					}
				}}
			/>
		</li>,
	);
	//v페이징 숫자
	let pageNo = pi.pageNo;
	for (let i = 0; i < pi.pageNaviSize; i++) {
		arr.push(
			<li key={"page-" + i}>
				<span
					onClick={(e) => {
						setReqPage(Number(e.target.innerText));
					}}
					className={"page-item" + (pageNo === reqPage ? " active-page" : "")}
				>
					{pageNo}
				</span>
			</li>,
		);
		pageNo++;
		if (pageNo > pi.totalPage) {
			break;
		}
	}
	//다음 페이지
	arr.push(
		<li key="next-page">
			<MdNavigateNext
				onClick={() => {
					if (reqPage !== pi.totalPage) {
						setReqPage(reqPage + 1);
					}
				}}
			/>
		</li>,
	);
	//제일 끝으로
	arr.push(
		<li key="last-page">
			<MdLastPage
				onClick={() => {
					setReqPage(pi.totalPage);
				}}
			/>
		</li>,
	);

	return <ul className="pagination">{arr}</ul>;
};

export default PageNavi;
