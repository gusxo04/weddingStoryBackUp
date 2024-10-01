import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";

const MySchedule = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const setNowPath = props.setNowPath;
  const memberNo = useRecoilValue(loginNoState);
  const [consultList, setConsultList] = useState([]);
  const [plan, setPlan] = useState([]);
  const handleEvents = () => {
    setPlan();
  };

  useEffect(() => {
    axios
      .get(`${backServer}/member/consultList/` + memberNo)
      .then((res) => {
        setConsultList([res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberNo]);

  setNowPath("schedule");

  const [headerFormat, setHeaderFormat] = useState({ weekday: "short" }); // 기본적으로 요일 표시

  // 뷰가 바뀔 때마다 호출되는 함수
  const handleDatesSet = (info) => {
    if (info.view.type === "dayGridMonth") {
      setHeaderFormat({ weekday: "short" }); // 요일 형식 ('일', '월', '화')
    } else if (info.view.type === "dayGridWeek") {
      setHeaderFormat({ day: "numeric" }); // 일자 형식 ('1', '2', '3')
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        events={handleEvents}
        headerToolbar={{
          left: "", // will normally be on the left. if RTL, will be on the right
          center: "prev,title,next",
          right: "dayGridMonth,dayGridWeek", // will normally be on the right. if RTL, will be on the left
        }}
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
  );
};
export default MySchedule;
