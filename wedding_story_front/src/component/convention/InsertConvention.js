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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formType]);

  const write = () => {
    compareTime();
    // 여러 검사 후 form 보내야함 (안 그러면 렌더링 되기전에 form 보내서 시간같은거는 공백으로 들어감)
    const form = new FormData();
    form.append("conventionTitle",conventionTitle);
    form.append("conventionContent",conventionContent);
    form.append("conventionTime",conventionTime);
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
    setConventionTime("");
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
    setConventionTime(conventionStartTime+"~"+conventionEndTime);
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
          /> 
          <button onClick={compareTime}>시간</button>
          <div>
            <button onClick={write} style={{height:"100px", width:"100px"}}>작성끝!</button>
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