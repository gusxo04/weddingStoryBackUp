import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import axios from "axios";

const CompanySchedule = () => {
	// 뷰가 바뀔 때마다 호출되는 함수
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [companyNo, setCompanyNo] = useRecoilState(companyNoState);

	const [headerFormat, setHeaderFormat] = useState({ weekday: "short" }); // 기본적으로 요일 표시
	const handleDatesSet = (info) => {
		if (info.view.type === "dayGridMonth") {
			setHeaderFormat({ weekday: "short" }); // 요일 형식 ('일', '월', '화')
		} else if (info.view.type === "dayGridWeek") {
			setHeaderFormat({ day: "numeric" }); // 일자 형식 ('1', '2', '3')
		}
	};
	useEffect(() => {
		axios
			.get(`${backServer}/company/schedule/${companyNo}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [companyNo]);
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
							events={[
								{ title: "event 1", date: "2024-10-01" },
								{ title: "event 2", date: "2024-10-02" },
							]}
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
