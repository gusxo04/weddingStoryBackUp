import "./convention.css";
import { useEffect, useRef, useState } from 'react';
import Preview from "./Preview";
import WriteForm from "./WriteForm";
import SwitchButton from "./SwitchButton";
import axios from "axios";


const InsertConvention = () => {
  
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [formType, setFormType] = useState(true);
  const [imgStyle, setImgStyle] = useState(0);
  
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
  const [conventionEnd, setConventionEnd] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const limitRef = useRef(null);
  const priceRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formType]);

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
    contentRef.current.classList.remove("invalid");
    contentRef.current.textContent = "";
    
    if(!titleReg.test(conventionTitle) || conventionTitle.trim() === ""){
      //박람회 제목 테스트
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

    const isDate = compareDate();
    if(!isDate){
      dateRef.current.classList.add("invalid");
      isTest = false;
    }

    const isTime = compareTime();
    if(!isTime){
      // 시작날짜랑 종료 날짜가 오늘 이후인지도 체크 해야 됨
      timeRef.current.classList.add("invalid");
      isTest = false;
    }
    // 정원이 하루마다인지 총인지 알아야 할 듯
    // 일단 숫자인지 아닌지 체크부터
    if(isNaN(conventionLimit)){
      // 일단 숫자가 아니면 입력이 안 되긴하는데 혹시 모르니까 체크
      setConventionLimit(100);
      limitRef.current.classList.add("invalid");
      isTest = false;
    }
    
    if(isNaN(conventionPrice)){
      setConventionPrice(100000);
      priceRef.current.classList.add("invalid");
      isTest = false;
    }
    
    if(isTest) write();
  }


  const write = () => {
    compareTime();
    // 여러 검사 후 form 보내야함 (안 그러면 렌더링 되기전에 form 보내서 시간같은거는 공백으로 들어감)
    const form = new FormData();
    form.append("conventionTitle",conventionTitle);
    form.append("conventionContent",conventionContent);
    form.append("conventionTime",conventionTime);
    form.append("conventionStart", conventionStart);
    form.append("conventionEnd", conventionEnd);
    form.append("conventionPrice", conventionPrice);
    form.append("conventionLimit", conventionLimit);
    form.append("imgStyle", imgStyle);
    form.append("image",image);

    axios.post(`${backServer}/convention/write`,form)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err); 
    })
  }

  
  const compareDate = () => {
    // 날짜 비교
    if(conventionStart === "" || conventionEnd === "") return false;
    const startDate = new Date(conventionStart);
    const endDate = new Date(conventionEnd);
    
    if(startDate <= endDate){
      return true
    }
    return false;
  }
  
  const compareTime = () => {
    // 시간 비교
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
          image={image} setImage={setImage}
          conventionPrice={conventionPrice} setConventionPrice={setConventionPrice}
          conventionLimit={conventionLimit} setConventionLimit={setConventionLimit}
          conventionStartTime={conventionStartTime} setConventionStartTime={setConventionStartTime}
          conventionEndTime={conventionEndTime} setConventionEndTime={setConventionEndTime}
          conventionTime={conventionTime} setConventionTime={setConventionTime}
          showImage={showImage} setShowImage={setShowImage}
          titleRef={titleRef} contentRef={contentRef} timeRef={timeRef} dateRef={dateRef}
          limitRef={limitRef} priceRef={priceRef}
          /> 

          <div>
            <button onClick={writeTest} style={{height:"100px", width:"100px"}}>작성끝!</button>
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








export default InsertConvention