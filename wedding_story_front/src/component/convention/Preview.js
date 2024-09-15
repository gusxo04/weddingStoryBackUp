

const Preview = (props) => {

  const {
    imgStyle,
    conventionTitle,
    conventionContent,
    conventionStartDate,
    conventionEndDate,
    conventionPrice,
    conventionLimit,
    conventionTime,
    showImage,
  } = props;

  // 백그라운드가 1 / 메인이 2
  return (
    <div className="convention-preview-wrap">
      {imgStyle === 1 ? 
      "백그라운드"
      :
      <div className="preview-main-wrap">
        <div className="main-image-zone">
          <img id="main-image" src={showImage} />
        </div>

        <div className="main-info-zone">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>

        
      </div>
      }
    </div>
  )
}
export default Preview