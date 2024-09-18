import axios from "axios";
import "./convention.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";


const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();

  const [convention, setConvention] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [te, setTe] = useState(false);

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      console.log(res);
      setConvention(res.data.convention);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      setTe(true);
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
        (startDate > 0 ? <ShowConvention convention={convention} type={true} /> : <ShowConvention convention={convention} type={false} />) 
        : 
        <EmptyConvention navigate={navigate} />
        :
        "비어있어요"}
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

const ShowConvention = (props) => {

  
  const {
    convention,
    type
  } = props;

  
  return (
    <div className="convention-preview-wrap">
      {convention.imgStyle === 1 ? 
      <ConventionPreviewBack {...convention} />
      : 
      <ConventionPreviewMain {...convention} />
      }

      <div className="convention-preview-info-wrap">
        <div className="convention-inner-preview-info convention-layout-btn">
          <button>부스 보기</button>
        </div>

        <div className="convention-inner-preview-info convention-way-btn">
          <button>찾아오시는 길</button>
        </div>

        <div className="convention-inner-preview-info convention-buy-btn">
          <button>박람회 신청</button>
          {/* 일단은 유저꺼 먼저 제작 */}
          {/* 일반유저면 신청 / 업체면 부스 등록 / 관리자면 수정 */}
        </div>
      </div>

      <div className="convention-member-alert-wrap">
        <div className="convention-input-alert">
          안녕
        </div>
      </div>
      
    </div>
  )
}









export default ConventionMain

