import "./convention.css";
import { useState } from 'react';
import Preview from "./Preview";
import WriteForm from "./WriteForm";
import SwitchButton from "./SwitchButton";


const InsertConvention = () => {
  
  const [formType, setFormType] = useState(true);
  const [imgStyle, setImgStyle] = useState(0);
  
  const [conventionTitle, setConventionTitle] = useState("");
  const [conventionContent, setConventionContent] = useState("");
  const [image, setImage] = useState(null); //박람회 이미지임
  const [showImage, setShowImage] = useState(null); //미리보기 이미지임
  const [conventionLimit, setConventionLimit] = useState(100);
  const [conventionPrice, setConventionPrice] = useState("");
  const [conventionTime, setConventionTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  return (
    <div className="convention-wrap">
      <div className="convention-container insert-convention-container">

        <SwitchButton formType={formType} setFormType={setFormType} />
        {formType ? 
          <WriteForm imgStyle={imgStyle} setImgStyle={setImgStyle} 
          conventionTitle={conventionTitle} setConventionTitle={setConventionTitle} 
          startDate={startDate} setStartDate={setStartDate} 
          endDate={endDate} setEndDate={setEndDate} 
          conventionContent={conventionContent} setConventionContent={setConventionContent}
          image={image} setImage={setImage}
          conventionPrice={conventionPrice} setConventionPrice={setConventionPrice}
          conventionLimit={conventionLimit} setConventionLimit={setConventionLimit}
          conventionTime={conventionTime} setConventionTime={setConventionTime}
          showImage={showImage} setShowImage={setShowImage}
          /> 
          :
          <Preview />
        }
      </div>
      
    </div>
  )
}








export default InsertConvention