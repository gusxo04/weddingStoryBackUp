import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import WriteForm from "./WriteForm";
import Preview from "./Preview";
import axios from "axios";

const UpdateConvention = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  console.log(params.conventionNo);
  
  const navigate = useNavigate();
  const [formType, setFormType] = useState(true);
  const [imgStyle, setImgStyle] = useState(2);
  
  const [conventionTitle, setConventionTitle] = useState("");
  const [conventionContent, setConventionContent] = useState("");
  const [image, setImage] = useState(null); 
  const [showImage, setShowImage] = useState(null);
  const [conventionLimit, setConventionLimit] = useState(100);
  const [conventionPrice, setConventionPrice] = useState("");
  const [conventionStartTime, setConventionStartTime] = useState("");
  const [conventionEndTime, setConventionEndTime] = useState("");
  const [conventionTime, setConventionTime] = useState("");
  const [conventionStart, setConventionStart] = useState("");
  const [conventionEnd, setConventionEnd] = useState("");
  const [conventionImg, setConventionImg] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const limitRef = useRef(null);
  const priceRef = useRef(null);
  const imgRef = useRef(null);

  // 먼저 데이터 조회해서 원래꺼 그대로 넣어주기
  useEffect(() => {
    axios.get(`${backServer}/convention/`+params.conventionNo)
    .then((res) => {
      console.log(res);
      setConventionTitle(res.data.conventionTitle);
      setConventionContent(res.data.conventionContent);
      setConventionLimit(res.data.conventionLimit);
      setConventionPrice(res.data.conventionPrice);
      setConventionStart(res.data.conventionStart);
      setConventionEnd(res.data.conventionEnd);
      setConventionImg(res.data.conventionImg);

      // 이거 ConventionTime 에 ~를 기준으로 분리해서 넣어야 함
      setConventionStartTime("17:30");
      setConventionEndTime("18:30");


      
    })
    .catch((err) => {
      console.error(err); 
    })
  }, []);
  // 수정에서 체크해야할 거
  // 근데 수정해서 기간이 줄어들면 그 원래 신청한 사람들 환불해줘야하는데 (만약 기간에 걸쳐있었으면)
  // 기간은 변경 불가능 시간만 변경가능하게 
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
          conventionEnd={conventionEnd} setConventionEnd={setConventionEnd} 
          conventionContent={conventionContent} setConventionContent={setConventionContent}
          setImage={setImage}
          conventionPrice={conventionPrice} setConventionPrice={setConventionPrice}
          conventionLimit={conventionLimit} setConventionLimit={setConventionLimit}
          conventionStartTime={conventionStartTime} setConventionStartTime={setConventionStartTime}
          conventionEndTime={conventionEndTime} setConventionEndTime={setConventionEndTime}
          conventionImg={conventionImg}
          // conventionTime={conventionTime} setConventionTime={setConventionTime}
          showImage={showImage} setShowImage={setShowImage}
          titleRef={titleRef} contentRef={contentRef} timeRef={timeRef} dateRef={dateRef}
          limitRef={limitRef} priceRef={priceRef} imgRef={imgRef} writeType={2}
          /> 

          <div className="write-btn-zone">
            {/* <button onClick={writeTest}>박람회 등록</button> */}
          </div>
        </>
          :
          <Preview imgStyle={imgStyle} conventionTitle={conventionTitle} conventionContent={conventionContent} 
          conventionStart={conventionStart} conventionEnd={conventionEnd}
          conventionPrice={conventionPrice} conventionLimit={conventionLimit}
          conventionTime={conventionTime} showImage={showImage}
          />
        }
      </div>

      
      
    </div>
  )
}
export default UpdateConvention