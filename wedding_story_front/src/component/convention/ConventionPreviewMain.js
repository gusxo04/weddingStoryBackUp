import { Viewer } from "@toast-ui/react-editor";

const ConventionPreviewMain = (props) => {

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
  
  return (
    <>
      <div className="preview-main-wrap">
        <div className="main-image-zone">
          <img id="main-image" src={showImage} />
        </div>

        <div className="main-info-zone">
          <div className="main-info-title">
            <h2>{conventionTitle}</h2>
          </div>

          <div className="main-info-date">
            <div>일정 : {conventionStart} ~ {conventionEnd}</div>
          </div>

          <div className="main-info-time">
            <div>시간 : {conventionTime}</div>
          </div>
          
          <div className="main-info-price">
            <div>가격 : {conventionPrice}원</div>
          </div>

          <div className="main-info-limit">
            <div>정원 : {conventionLimit}명</div>
          </div>

        </div>


      </div>
        
      <div className="preview-main-content">
        {conventionContent ? 
        <Viewer initialValue={conventionContent} />
        : 
        ""}
      </div>
    </>
  )
}
export default ConventionPreviewMain