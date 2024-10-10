import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import axios from "axios";
import { startOfDay } from "@fullcalendar/core/internal";
import { useNavigate } from "react-router-dom";

const CompanySchedule = () => {
	// 뷰가 바뀔 때마다 호출되는 함수
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
	const [reqPage, setReqPage] = useState(1);
	const [headerFormat, setHeaderFormat] = useState({ weekday: "short" }); // 기본적으로 요일 표시
	const [scheduleList, setScheduleList] = useState([{}]);

	const navigate = useNavigate();
	const handleDatesSet = (info) => {
		if (info.view.type === "dayGridMonth") {
			setHeaderFormat({ weekday: "short" }); // 요일 형식 ('일', '월', '화')
		} else if (info.view.type === "dayGridWeek") {
			setHeaderFormat({ day: "numeric" }); // 일자 형식 ('1', '2', '3')
		}
	};
	const handleDayCellClick = (info) => {
		const date = new Date(info.date);

		// 로컬 시간 기준으로 년, 월, 일을 추출
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
		const day = String(date.getDate()).padStart(2, "0");

		const consultDate = `${year}-${month}-${day}`;
		console.log(date);
		console.log(info);
		console.log(consultDate);

		// 선택한 날짜에 해당하는 일정 필터링
		navigate("/company/schedule/dayInfo", { state: { consultDate: consultDate } });
	};
	useEffect(() => {
		axios
			.get(`${backServer}/company/schedule/${companyNo}`)
			.then((res) => {
				console.log(res);
				const updateScheduleList = res.data.map((schedule) => ({
					title: schedule.memberName,
					start: `${schedule.consultDate}T${schedule.consultTime}`,
					consultDate: schedule.consultDate,
					time: schedule.consultTime,
				}));
				setScheduleList(updateScheduleList);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo]);
	console.log(scheduleList);
	return (
		<section className="section">
			<div className="list-wrap">
				<div className="list-title">상담 일정</div>
				<div className="product-list-wrap">
					<div>
						<FullCalendar
							plugins={[dayGridPlugin]}
							initialView="dayGridMonth" //월 기준으로 보여줌
							locale={koLocale}
							events={scheduleList}
							eventClick={(info) => handleDayCellClick(info.event)} // 클릭한 이벤트에만 반응
							headerToolbar={{
								left: "", // will normally be on the left. if RTL, will be on the right
								center: "prev,title,next",
								right: "dayGridMonth,dayGridWeek", // will normally be on the right. if RTL, will be on the left
							}}
							//title 형식
							titleFormat={{
								year: "numeric", // '2024년'
								month: "long", // '10월'
							}}
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
							// datesSet={handleDatesSet} // 뷰 변경 시 호출
							dayCellDidMount={(info) => {
								// 클릭 이벤트 추가
								info.el.addEventListener("click", () => handleDayCellClick(info));

								// 추가적인 스타일 조정이 필요하다면 여기에 작성
								if (info.isToday) {
									info.el.style.backgroundColor = "#f0f8ff"; // 오늘 날짜 배경색 변경
								}
							}}
							datesSet={handleDatesSet} // 뷰 변경 시 호출
							dayHeaderFormat={headerFormat} // 요일 또는 일자 형식 적용
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CompanySchedule;
