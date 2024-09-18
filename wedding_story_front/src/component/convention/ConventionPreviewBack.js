import { Viewer } from "@toast-ui/react-editor";

const ConventionPreviewBack = (props) => {

  const {
    imgStyle,
    conventionTitle,
    conventionContent,
    conventionStart,
    conventionEnd,
    conventionPrice,
    conventionLimit,
    conventionTime,
    showImage,
  } = props;

  console.log(props);
  
  return (
    <div className="back-main-wrap">
      <div className="back-image-zone">
        <img id="back-image" src={showImage} />
      </div>

      <div className="back-inner-img-zone">
        <div className="back-info-title">
          <div className="back-title">{conventionTitle}</div>
        </div>

        <div className="back-info-date">
          <div>일정 : {conventionStart} ~ {conventionEnd} <br /> 시간 : {conventionTime}</div>
        </div>
        
        <div className="back-info-price">
          <div>가격 : {conventionPrice}원</div>
        </div>

        <div className="back-info-limit">
          <div>정원 : {conventionLimit}명</div>
        </div>

        <div className="back-info-content">
          {conventionContent ? 
          <Viewer initialValue={conventionContent} />
          : 
          ""}
        </div>

      </div>
      
    </div>
  )
}
export default ConventionPreviewBack