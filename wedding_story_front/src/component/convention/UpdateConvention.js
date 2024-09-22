import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import WriteForm from "./WriteForm";
import Preview from "./Preview";
import axios from "axios";

const UpdateConvention = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const conventionNo = params.conventionNo;
  
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
    axios.get(`${backServer}/convention/`+conventionNo)
    .then((res) => {
      console.log(res);
      setImgStyle(res.data.imgStyle);
      setConventionTitle(res.data.conventionTitle);
      setConventionContent(res.data.conventionContent);
      setConventionLimit(res.data.conventionLimit);
      setConventionPrice(res.data.conventionPrice);
      setConventionStart(res.data.conventionStart);
      setConventionEnd(res.data.conventionEnd);
      setConventionImg(res.data.conventionImg);
      // 이거 ConventionTime 에 ~를 기준으로 분리해서 넣어야 함

      const [startTime, endTime]  = res.data.conventionTime.split(" ~ ");
      setConventionStartTime(startTime);
      setConventionEndTime(endTime);


      
    })
    .catch((err) => {
      console.error(err); 
    })
  }, []);
  // 수정에서 체크해야할 거
  // 근데 수정해서 기간이 줄어들면 그 원래 신청한 사람들 환불해줘야하는데 (만약 기간에 걸쳐있었으면)
  // 기간은 변경 불가능 시간만 변경가능하게 (아직 구현 안 했음) (데이터는 안넘어가긴 하는데 readonly 같은거라도 걸어야 함)
  // 삭제도 마찬가지 업체 부스 신청이나 티켓샀는데 글 삭제되면 환불해줘야하는데
  // 헐
  useEffect(() => {
    setConventionTime(conventionStartTime+" ~ "+conventionEndTime);
  }, [conventionStartTime, conventionEndTime]);


  const writeTest = () => {
    let isTest = true;
    const titleReg = /^.{1,100}$/;
    const contentReg = /^.{1,1300}$/;
    const contentReg2 = /<p>|<\/p>|&nbsp;|<br>|<br\/>/g;
    const newContent = conventionContent.replace(contentReg2, "");

    titleRef.current.classList.remove("invalid");
    dateRef.current.classList.remove("invalid");
    timeRef.current.classList.remove("invalid");
    limitRef.current.classList.remove("invalid");
    priceRef.current.classList.remove("invalid");
    imgRef.current.classList.remove("invalid");
    contentRef.current.classList.remove("invalid");
    contentRef.current.textContent = "";

    
    if(!titleReg.test(conventionTitle) || conventionTitle.trim() === ""){
      titleRef.current.classList.add("invalid");
      isTest = false;
    }
    if(!contentReg.test(conventionContent) || conventionContent.trim() === ""  ){
      contentRef.current.classList.add("invalid");
      contentRef.current.textContent = "내용이 너무 깁니다!";
      isTest = false;
    }
    if(newContent.trim() === ""){
      contentRef.current.classList.add("invalid");
      contentRef.current.textContent = "내용을 입력해주세요";
      isTest = false;
    }

    const isDate = compareDate(conventionEnd);
    if(!isDate){
      dateRef.current.classList.add("invalid");
      isTest = false;
    }

    const isTime = compareTime();
    if(!isTime){
      timeRef.current.classList.add("invalid");
      isTest = false;
    }
    
    const getToday = new Date();
    const year = getToday.getFullYear();
    const month = String(getToday.getMonth() + 1).padStart(2, '0');
    const day = String(getToday.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const checkToday = compareDate(today);
    if(checkToday){
      dateRef.current.classList.add("invalid");
      isTest = false;
    }
    if(isNaN(conventionLimit) || conventionLimit > 10000 || conventionLimit === ""){
      limitRef.current.classList.add("invalid");
      isTest = false;
    }
    
    if(isNaN(conventionPrice) || conventionPrice === ""){
      priceRef.current.classList.add("invalid");
      isTest = false;
    }
    
    if(isTest) update();
  }


  const compareDate = (date) => {
    const conventionEnd = date;
    if(conventionStart === "" || conventionEnd === "") return false;
    const startDate = new Date(conventionStart);
    const endDate = new Date(conventionEnd);
    
    if(startDate <= endDate){
      return true
    }
    return false;
  }
  
  const compareTime = () => {
    if(conventionStartTime === "" || conventionEndTime === "") return false;
    const startHour = parseInt(conventionStartTime.split(":")[0]);
    const startMinute = parseInt(conventionStartTime.split(":")[1]);
    const endHour = parseInt(conventionEndTime.split(":")[0]);
    const endMinute = parseInt(conventionEndTime.split(":")[1]);

  
    if (startHour > endHour) {
      return false;
    } else if (startHour === endHour) {
      if (startMinute >= endMinute) {
        return false;
      }
    }
    
    return true;
  }

  const update = () => {
    const form = new FormData();
    form.append("conventionNo", conventionNo);
    form.append("conventionTitle",conventionTitle);
    form.append("conventionContent",conventionContent);
    form.append("conventionImg", conventionImg);
    form.append("conventionTime",conventionTime);
    // form.append("conventionStart", conventionStart);
    // form.append("conventionEnd", conventionEnd);
    // form.append("conventionPrice", conventionPrice);
    // form.append("conventionLimit", conventionLimit);
    form.append("imgStyle", imgStyle);

    if(image !== null){
      form.append("image",image);
    }

    axios.patch(`${backServer}/convention/update`,form)
    .then(res => {
      // console.log(res);
      navigate("/convention/main");
    })
    .catch(err => {
      console.error(err); 
    })
  }
  
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
          showImage={showImage} setShowImage={setShowImage}
          titleRef={titleRef} contentRef={contentRef} timeRef={timeRef} dateRef={dateRef}
          limitRef={limitRef} priceRef={priceRef} imgRef={imgRef} writeType={2}
          /> 

          <div className="write-btn-zone">
            <button onClick={writeTest}>박람회 수정</button>
          </div>
        </>
          :
          <Preview imgStyle={imgStyle} conventionTitle={conventionTitle} conventionContent={conventionContent} 
          conventionStart={conventionStart} conventionEnd={conventionEnd}
          conventionPrice={conventionPrice} conventionLimit={conventionLimit}
          conventionTime={conventionTime} showImage={showImage}
          conventionImg={conventionImg}
          />
        }
      </div>

      
      
    </div>
  )
}
export default UpdateConvention