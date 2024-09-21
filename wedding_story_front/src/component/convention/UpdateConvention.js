import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import WriteForm from "./WriteForm";
import Preview from "./Preview";
import axios from "axios";

const UpdateConvention = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [formType, setFormType] = useState(true);
  const [imgStyle, setImgStyle] = useState(2);
  
  const [conventionTitle, setConventionTitle] = useState("");
  const [conventionContent, setConventionContent] = useState("");
  const [image, setImage] = useState(null); //박람회 이미지임 (넘겨줄 데이터)
  const [showImage, setShowImage] = useState(null); //미리보기 이미지임
  const [conventionLimit, setConventionLimit] = useState(100);
  const [conventionPrice, setConventionPrice] = useState("");
  const [conventionStartTime, setConventionStartTime] = useState("");
  const [conventionEndTime, setConventionEndTime] = useState("");
  const [conventionTime, setConventionTime] = useState("");
  const [conventionStart, setConventionStart] = useState("");
  const [checkDate, setConventionEnd] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const limitRef = useRef(null);
  const priceRef = useRef(null);
  const imgRef = useRef(null);

  // 먼저 데이터 조회해서 원래꺼 그대로 넣어주기
  useEffect(() => {
    axios.get(`${backServer}`,)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err); 
    })
  }, []);
  // 수정에서 체크해야할 거
  // 근데 수정해서 기간이 줄어들면 그 원래 신청한 사람들 환불해줘야하는데 (만약 기간에 걸쳐있었으면)
  // 삭제도 마찬가지 업체 부스 신청이나 티켓샀는데 글 삭제되면 환불해줘야하는데
  // 헐
  
  
  
  return (
    <div className="convention-wrap">
      <div className="convention-container insert-convention-container">

        <SwitchButton formType={formType} setFormType={setFormType} />
        {formType ? 
        <>
          <WriteForm imgStyle={imgStyle} setImgStyle={setImgStyle} 
          conventionTitle={conventionTitle} setConventionTitle={setConventionTitle} 
          conventionStart={conventionStart} setConventionStart={setConventionStart} 
          conventionEnd={checkDate} setConventionEnd={setConventionEnd} 
          conventionContent={conventionContent} setConventionContent={setConventionContent}
          setImage={setImage}
          conventionPrice={conventionPrice} setConventionPrice={setConventionPrice}
          conventionLimit={conventionLimit} setConventionLimit={setConventionLimit}
          conventionStartTime={conventionStartTime} setConventionStartTime={setConventionStartTime}
          conventionEndTime={conventionEndTime} setConventionEndTime={setConventionEndTime}
          // conventionTime={conventionTime} setConventionTime={setConventionTime}
          showImage={showImage} setShowImage={setShowImage}
          titleRef={titleRef} contentRef={contentRef} timeRef={timeRef} dateRef={dateRef}
          limitRef={limitRef} priceRef={priceRef} imgRef={imgRef}
          /> 

          <div className="write-btn-zone">
            {/* <button onClick={writeTest}>박람회 등록</button> */}
          </div>
        </>
          :
          <Preview imgStyle={imgStyle} conventionTitle={conventionTitle} conventionContent={conventionContent} 
          conventionStart={conventionStart} conventionEnd={checkDate}
          conventionPrice={conventionPrice} conventionLimit={conventionLimit}
          conventionTime={conventionTime} showImage={showImage}
          />
        }
      </div>

      
      
    </div>
  )
}
export default UpdateConvention