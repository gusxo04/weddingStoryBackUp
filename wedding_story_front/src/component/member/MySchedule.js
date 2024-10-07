import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import KakaoMap from "../utils/KakaoMap";
import Swal from "sweetalert2";

const MySchedule = (props) => {
	const navigate = useNavigate();
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const setNowPath = props.setNowPath;
	setNowPath("schedule");
	const memberNo = useRecoilValue(loginNoState);
	const [consultList, setConsultList] = useState([]);
	console.log(consultList);

	const [isModalOpen, setIsModalOpen] = useState(false); //모달 오픈 여부
	const [selectedEvent, setSelectedEvent] = useState(null); //선택한 이벤트의 정보가 담긴 함수

	const openModal = (event) => {
		//날짜를 0000-00-00에서 0000년 00월 00일로 변환
		const date = new Date(event.extendedProps.consultDate); // 문자열을 Date 객체로 변환
		const year = date.getFullYear(); // 년도 추출
		const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1 더함
		const day = date.getDate();

		const [hour, minute] = event.extendedProps.time.split(":"); // 시간을 ':' 기준으로 분리
		const hourNum = parseInt(hour, 10); // 문자열을 숫자로 변환

		// 오전/오후 계산
		const period = hourNum < 12 ? "오전" : "오후";
		const hour12 = hourNum % 12 || 12; // 12시간 형식으로 변환 (0시는 12시로)

		setSelectedEvent({
			title: event.title, // 이벤트 제목
			date: `${year}년 ${month}월 ${day}일`, // 이벤트 날짜
			time: `${period} ${hour12}시 ${minute}분`, // 이벤트 시간
			company: event.extendedProps.company, // company 정보 전달
			companyNo: event.extendedProps.companyNo,
			productNo: event.extendedProps.productNo,
			consultNo: event.extendedProps.consultNo,
			scheduleType: event.extendedProps.scheduleType,
		});
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	useEffect(() => {
		if (!isModalOpen) {
			axios
				.get(`${backServer}/member/consultList/` + memberNo)
				.then((res) => {
					const updatedConsultList = res.data.map((consult) => ({
						title: consult.company.companyName,
						start: `${consult.consultDate}T${consult.consultTime}`,
						company: consult.company,
						consultDate: consult.consultDate,
						time: consult.consultTime,
						companyNo: consult.companyNo,
						productNo: consult.productNo,
						consultNo: consult.consultNo,
						scheduleType: consult.consultType,
					}));
					setConsultList(updatedConsultList);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [memberNo, isModalOpen]);
	console.log(consultList);

	const [headerFormat, setHeaderFormat] = useState({ weekday: "short" }); // 기본적으로 요일 표시

	// 뷰가 바뀔 때마다 호출되는 함수
	const handleDatesSet = (info) => {
		if (info.view.type === "dayGridMonth") {
			setHeaderFormat({ weekday: "short" }); // 요일 형식 ('일', '월', '화')
		} else if (info.view.type === "dayGridWeek") {
			setHeaderFormat({ day: "numeric" }); // 일자 형식 ('1', '2', '3')
		}
	};

	const deleteSchedule = (consultNo, scheduleType) => {
		if (scheduleType === 1) {
			Swal.fire({
				text: "상담을 취소하시겠습니까?",
				icon: "question",
				showCancelButton: true,
				cancelButtonText: "취소",
				confirmButtonText: "확인",
			}).then((res) => {
				if (res.isConfirmed) {
					axios
						.delete(`${backServer}/consult/deleteConsult/` + consultNo)
						.then((res) => {
							Swal.fire({
								text: "상담 취소가 완료되었습니다.",
								icon: "info",
								confirmButtonText: "확인",
							}).then((res) => {
								if (res.isConfirmed) {
									navigate("/myPage/schedule");
									setIsModalOpen(false);
									setSelectedEvent(null);
								}
							});
						})
						.catch((err) => {});
				}
			});
		} else {
			navigate("/myPage/payment");
		}
	};
	return (
		<div>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				locale={koLocale}
				events={consultList}
				eventTimeFormat={{
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}}
				eventClick={(info) => openModal(info.event)}
				headerToolbar={{
					left: "", // will normally be on the left. if RTL, will be on the right
					center: "prev,title,next",
					right: "dayGridMonth,dayGridWeek", // will normally be on the right. if RTL, will be on the left
				}}
				titleFormat={{
					year: "numeric", // '2024년'
					month: "long", // '10월'
				}}
				//한글로 변경된 캘린더 일자 표기를 '1일'에서 '1'로 변경
				dayCellContent={(info) => {
					const number = document.createElement("a");
					number.classList.add("fc-daygrid-day-number");
					number.innerHTML = info.dayNumberText.replace("일", "");
					if (info.view.type === "dayGridMonth") {
						return {
							html: number.outerHTML,
						};
					}
				}}
				datesSet={handleDatesSet} // 뷰 변경 시 호출되는 함수
				dayHeaderFormat={headerFormat} // 요일 또는 일자 형식 적용
			/>

			{/* 모달 */}
			{isModalOpen ? (
				<div className="scheduleDetail-wrap">
					<div className="scheduleDetail-content">
						<span className="scheduleDetail-close" onClick={closeModal}>
							&times;
						</span>
						<div>
							<table className="scheduleDetail-table">
								<tbody>
									<tr className="sd-tr1">
										<th rowSpan={2}>
											<span class="material-icons">calendar_today</span>
										</th>
										<td>{selectedEvent.title}</td>
									</tr>
									<tr className="sd-tr1">
										<td>
											{selectedEvent.date} {selectedEvent.time}
										</td>
									</tr>
									<tr className="sd-tr2">
										<th>
											<span class="material-icons">place</span>
										</th>
										<td>
											<p>{selectedEvent.company.companyAddr}</p>
											<div className="scheduleDetail-map">{<KakaoMap address={selectedEvent.company.companyAddr} />}</div>
										</td>
									</tr>
									<tr className="sd-tr3">
										<th>
											<span class="material-icons">link</span>
										</th>
										<td>
											{selectedEvent.companyNo == 0 ? (
												<Link to="/convention/main">{selectedEvent.title} 페이지로 이동</Link>
											) : selectedEvent.company.companyCategory === "웨딩홀" ? (
												<Link to={`/product/hallInfo/${selectedEvent.productNo}`} style={{ textDecoration: "underLine" }}>
													{selectedEvent.title} 상품 페이지로 이동
												</Link>
											) : (
												<Link to={`/product/info/${selectedEvent.productNo}`} style={{ textDecoration: "underLine" }}>
													{selectedEvent.title} 상품 페이지로 이동
												</Link>
											)}
										</td>
									</tr>
									<tr className="sd-tr1">
										<th>
											<span class="material-icons">call</span>
										</th>
										<td>{selectedEvent.company.companyTel}</td>
									</tr>
									<tr className="sd-tr1">
										<th>
											<span class="material-icons">schedule</span>
										</th>
										<td>
											운영시간{"  "}
											{selectedEvent.company.startTime} ~ {selectedEvent.company.endTime}
										</td>
									</tr>
								</tbody>
							</table>
							<div className="scheduleDetail-delButton">
								{selectedEvent.scheduleType == 1 ? (
									<button onClick={() => deleteSchedule(selectedEvent.consultNo, selectedEvent.scheduleType)}>상담 취소</button>
								) : selectedEvent.scheduleType == 2 ? (
									<button onClick={() => deleteSchedule(selectedEvent.consultNo, selectedEvent.scheduleType)}>예약 취소</button>
								) : (
									<button onClick={() => deleteSchedule(selectedEvent.consultNo, selectedEvent.scheduleType)}>박람회 취소</button>
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};
export default MySchedule;
