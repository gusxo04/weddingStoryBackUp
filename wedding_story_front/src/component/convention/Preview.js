

const Preview = (props) => {

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

  // 백그라운드가 1 / 메인이 2
  return (
    <div className="convention-preview-wrap">
      {imgStyle === 1 ? 
      <div className="back-main-wrap">
        <div className="back-image-zone">
          {/* <img id="back-image" src={showImage} /> */}
          <div style={{backgroundImage: `url(${showImage})`,backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '1000px',
        width: '100vw',}} id="back-image" ></div>
        </div>
      </div>

      :

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
      }
    </div>
  )
}
export default Preview