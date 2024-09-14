import axios from "axios";
import "./convention.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const [convention, setConvention] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      console.log(res);
      setConvention(res.data.convention);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
    })
    .catch(err => {
      console.error(err); 
    })
  }, []);
  
  return (
    <div className="convention-wrap">
      <div className="convention-container">
        {/* {convention ?
        endDate < 0 ? 
        "박람회 없음" 
        :
        startDate > 0 ? 
        "신청 가능" 
        : 
        "박람회 있음"
        :
        ""} */}
        {Object.keys(convention).length > 0 ? 
        endDate > 0 ?
        (startDate > 0 ? "박람회 신청 가능" : "박람회 있지만 신청 불가능") 
        : 
        <div className="empty-convention-wrap">
          <span>현재 진행중이거나 예정인 박람회가 없습니다</span>
          <button onClick={() => {
              navigate(-1);
            }}>돌아가기</button>
        </div>
        :
        "비어있음"}
      </div>
    </div>
  )
}

export default ConventionMain

