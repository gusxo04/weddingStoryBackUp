import axios from "axios";
import "./convention.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
        (startDate > 0 ? <Link to="/test">신청하기</Link> : "박람회 있지만 신청 불가능") 
        : 
        <EmptyConvention navigate={navigate} />
        :
        "비어있음"}
      </div>
    </div>
  )
}

//박람회가 없을 경우
const EmptyConvention = (props) => {
  const navigate = props.navigate;
  return (
    <div className="empty-convention-wrap">
      <span>현재 진행중이거나 예정인 박람회가 없습니다</span>
      <Link to="/newConvention" className="locate">박람회 등록하기</Link>
      <button className="locate" onClick={() => {
          navigate(-1);
        }}>돌아가기</button>
    </div>
  )
}

export default ConventionMain

