import axios from "axios";
import "./convention.css";
import { useEffect, useState } from "react";


const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [convention, setConvention] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      console.log(res);
      setConvention(res.data.convention);
      setStartDate(res.data.convention);
      setEndDate(res.data.endDate);
    })
    .catch(err => {
      console.error(err); 
    })
  }, []);
  
  return (
    <div className="convention-wrap">
      <div className="convention-container">
        {convention ?
        endDate < 0 ? 
        "박람회 없음" 
        :
        startDate > 0 ? 
        "신청 가능" 
        : 
        "박람회 있음"
        :
        ""}
      </div>
    </div>
  )
}

export default ConventionMain

