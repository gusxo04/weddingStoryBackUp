import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./company.css";
import Example from "../utils/ReactTagInput";
import DaumPost from "../utils/DaumPost";
import { useLocation } from "react-router-dom";

// 시간 option 만들기 - 시(hour)
let openHour = [];
for (let i = 8; i < 13; i++) {
	let op = {};

	// 시간을 00시로 나타내기 위해
	op.value = ("0" + i).slice(-2) + ":00 ";
	op.label = ("0" + i).slice(-2) + ":00 시";

	openHour.push(op);
}
let closeHour = [];
for (let i = 16; i < 25; i++) {
	let op = {};

	// 시간을 00시로 나타내기 위해
	op.value = ("0" + i).slice(-2) + ":00 ";
	op.label = ("0" + i).slice(-2) + ":00 시";

	closeHour.push(op);
} //출처: https://anerim.tistory.com/213 [디발자 뚝딱:티스토리]

const CompanyJoinFrm = (props) => {
	const companyName = props.companyName;
	const setCompanyName = props.setCompanyName;
	const companyTel = props.companyTel;
	const setCompanyTel = props.setCompanyTel;
	const companyAddr = props.companyAddr;
	const setCompanyAddr = props.setCompanyAddr;
	const companyInfo = props.companyInfo;
	const setCompanyInfo = props.setCompanyInfo;
	const companyCategory = props.companyCategory;
	const setCompanyCategory = props.setCompanyCategory;
	const startTime = props.startTime;
	const setStartTime = props.setStartTime;
	const endTime = props.endTime;
	const setEndTime = props.setEndTime;
	const dayOff = props.dayOff;
	const setDayOff = props.setDayOff;
	const keyWord = props.keyWord;
	const setKeyWord = props.setKeyWord;
	const thumbnail = props.thumbnail;
	const setThumbnail = props.setThumbnail;

	const backServer = process.env.REACT_APP_BACK_SERVER;
	const location = useLocation();
	const url = location.pathname;

	const selectOptions = [
		{ value: "웨딩홀", label: "웨딩홀" },
		{ value: "스튜디오", label: "스튜디오" },
		{ value: "드레스", label: "드레스" },
		{ value: "메이크업", label: "메이크업" },
		{ value: "예복", label: "예복" },
		{ value: "본식", label: "본식" },
	];

	//전화번호 input 번호만 입력하게 하기
	const handleTelInput = (e) => {
		let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기

		// 백스페이스로 삭제할 때 하이픈도 함께 지워지도록 처리
		if (e.nativeEvent.inputType === "deleteContentBackward" && companyTel.endsWith("-")) {
			value = value.slice(0, -1); // 마지막 하이픈 제거
		}

		// 전화번호 형식 설정
		if (value.startsWith("02")) {
			// 02로 시작하는 경우
			if (value.length <= 2) {
				value = value; // 02만 입력했을 경우
			} else if (value.length < 6) {
				value = value.slice(0, 2) + "-" + value.slice(2); // 02-xxxx
			} else {
				value = value.slice(0, 2) + "-" + value.slice(2, 6) + "-" + value.slice(6, 10); // 02-xxxx-xxxx
			}
		} else {
			// 02가 아닌 경우
			if (value.length < 4) {
				value = value; // 3자리 이하
			} else if (value.length < 7) {
				value = value.slice(0, 3) + "-" + value.slice(3); // 000-xxxx
			} else {
				value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11); // 000-xxxx-xxxx
			}
		}

		// 상태 업데이트
		setCompanyTel(value); // 부모 컴포넌트로 전달
	};

	//주소를 담기위한 state
	const [address, setAddress] = useState({
		address: "",
		detailAddress: "",
	});

	useEffect(() => {
		if (companyAddr) {
			const [addr1, addr2] = companyAddr.split("-");
			setAddress({ address: addr1, detailAddress: addr2 });
		}
	}, [companyAddr]);

	//썸네일 관리
	const thumbnailRef = useRef(null);
	const [CompanyImg, setCompanyImg] = useState(null);

	//미리보기용 이미지 전송 x

	//썸네일 변경
	const changeThumbnail = (e) => {
		//요소들이 겹쳐있는 상태에서 해당 요소를 선택할 때는 currentTarget(target을 사용하면 여러요소가 한번에 선택)
		const files = e.currentTarget.files;
		if (files.length !== 0 && files[0] !== 0) {
			//썸네일 파일 객체를 글작성 시 전송하기 위한 값 저장
			setThumbnail(files[0]);
			//화면에 썸네일 미리보기
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onloadend = () => {
				setCompanyImg(reader.result);
			};
		} else {
			setThumbnail(null);
			setCompanyImg(null);
		}
	};

	//휴무일 체크
	const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"]; // 요일 순서
	const [checkbox, setCheckbox] = useState([]);
	const checkboxChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			// 체크된 경우
			setDayOff((PrevDayOff) => {
				const newDayOff = [...PrevDayOff, value];
				return newDayOff.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));
			});
		} else {
			// 체크 해제된 경우
			setDayOff(dayOff.filter((item) => item !== value));
		}
	};
	//주소값 input 값 변경시 합치기
	useEffect(() => {
		const addrAll = `${address.address}-${address.detailAddress}`.trim();
		setCompanyAddr(addrAll);
	}, [address.address, address.detailAddress]);
	return (
		<div className="company-join-wrap">
			<div className="company-title">{url === "/company/info/update" ? "업체 정보 수정" : "업체 등록"}</div>
			<section className="company-section">
				<div className="thumbnail-zone">
					<div className="company-thumbnail">
						{CompanyImg ? (
							<img
								onClick={() => {
									thumbnailRef.current.click();
								}}
								src={CompanyImg}
							/>
						) : thumbnail ? (
							<img
								src={`${backServer}/company/thumb/${thumbnail}`}
								onClick={() => {
									thumbnailRef.current.click();
								}}
							/>
						) : (
							<img
								onClick={() => {
									thumbnailRef.current.click();
								}}
								src="/image/default_img.png"
							></img>
						)}
						<input type="file" accept="image/*" style={{ display: "none" }} onChange={changeThumbnail} ref={thumbnailRef}></input>
					</div>
					<span>대표 사진</span>
				</div>
				<div className="main-content">
					<div className="company-info-input-zone">
						<div className="company-input-wrap">
							<label htmlFor="companyName">업체명</label>
							{url === "/company/info/update" ? (
								<>
									<input type="text" id="companyName" name="companyName" defaultValue={companyName} readOnly></input>
								</>
							) : (
								<input
									type="text"
									id="companyName"
									name="companyName"
									value={companyName}
									onChange={(e) => {
										setCompanyName(e.target.value);
									}}
								></input>
							)}
						</div>
						<div className="company-input-wrap">
							<label htmlFor="companyTel">업체 전화번호</label>
							<input type="text" id="companyTel" value={companyTel} onChange={(e) => handleTelInput(e)} maxLength={13} />
						</div>
						<div className="company-input-wrap">
							<label htmlFor="companyAddr">업체주소</label>
							<input
								type="text"
								id="companyAddr"
								defaultValue={address.address}
								//value={addr1}
								readOnly
							></input>
							<DaumPost address={address} setAddress={setAddress} />
						</div>
						<div className="company-input-wrap">
							<label htmlFor="companyAddr-detail">상세주소</label>
							<input
								type="text"
								id="companyAddr-detail"
								defaultValue={address.detailAddress}
								onChange={(e) => {
									setAddress({ ...address, detailAddress: e.target.value });
								}}
							></input>
						</div>
						<div className="company-select-wrap">
							<label htmlFor="open-time">영업시간</label>
							<div className="time-select" id="open-time">
								<Select
									onChange={(e) => setStartTime(e.value)}
									placeholder="시간을 선택하세요."
									options={openHour}
									defaultValue={startTime}
								/>
							</div>
							<span>~</span>
							<div className="time-select">
								<Select onChange={(e) => setEndTime(e.value)} placeholder="시간을 선택하세요." options={closeHour} defaultValue={endTime} />
							</div>
						</div>
						{url === "/company/info/update" ? (
							<>
								<span>현재 설정 영업시간 : </span>
								<span style={{ marginLeft: "20px", fontSize: "18px" }}>{startTime}</span>
								<span>~</span>
								<span style={{ fontSize: "18px" }}>{endTime}</span>
							</>
						) : null}

						<div className="company-select-wrap">
							<label htmlFor="category">카테고리</label>
							<div className="category-select" id="category">
								{url === "/company/info/update" ? (
									<>
										<span style={{ marginLeft: "5px", fontSize: "18px" }}>{companyCategory}</span>
									</>
								) : (
									<Select
										defaultValue={companyCategory}
										onChange={(e) => {
											setCompanyCategory(e.value);
										}}
										placeholder="카테고리"
										options={selectOptions}
									/>
								)}
							</div>
						</div>

						<div className="company-input-wrap">
							<label htmlFor="company-closed-days">업체 휴무일</label>
							<div className="checkbox" id="company-closed-day">
								<label htmlFor="monday">월</label>
								<input type="checkbox" id="monday" value="월" checked={dayOff.includes("월")} onChange={checkboxChange}></input>
								<label htmlFor="tuesday">화</label>
								<input type="checkbox" id="tuesday" value="화" checked={dayOff.includes("화")} onChange={checkboxChange}></input>
								<label htmlFor="wednesday">수</label>
								<input type="checkbox" id="wednesday" value="수" checked={dayOff.includes("수")} onChange={checkboxChange}></input>
								<label htmlFor="thursday">목</label>
								<input type="checkbox" id="thursday" value="목" checked={dayOff.includes("목")} onChange={checkboxChange}></input>
								<label htmlFor="friday">금</label>
								<input type="checkbox" id="friday" value="금" checked={dayOff.includes("금")} onChange={checkboxChange}></input>
								<label htmlFor="saturday">토</label>
								<input type="checkbox" id="saturday" value="토" checked={dayOff.includes("토")} onChange={checkboxChange}></input>
								<label htmlFor="sunday">일</label>
								<input type="checkbox" id="sunday" value="일" checked={dayOff.includes("일")} onChange={checkboxChange}></input>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="keyWord-wrap">
				<label htmlFor="keyword">키워드</label>
				<Example keyWord={keyWord} setKeyWord={setKeyWord} />
			</div>
			<div className="introduction-wrap">
				<div>소개글</div>
				<textarea
					value={companyInfo}
					onChange={(e) => {
						setCompanyInfo(e.target.value);
					}}
					maxLength={100}
					placeholder="업체 소개글 100자 이내로 작성 부탁"
				></textarea>
			</div>
		</div>
	);
};

export default CompanyJoinFrm;
