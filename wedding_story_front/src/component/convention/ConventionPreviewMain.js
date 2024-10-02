import { Viewer } from "@toast-ui/react-editor";

const ConventionPreviewMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    imgStyle,
    conventionTitle,
    conventionContent,
    conventionStart,
    conventionEnd,
    conventionPrice,
    conventionLimit,
    conventionTime,
    conventionImg,
    showImage,
  } = props;

  return (
    <>
      <div className="preview-main-wrap">
        <div className="main-image-zone">
          {showImage ? (
            <img id="main-image" src={showImage} />
          ) : conventionImg ? (
            <img
              id="main-image"
              src={`${backServer}/convention/image/${conventionImg}`}
            />
          ) : (
            <img id="main-image" src="/image/default_img.png" />
          )}
        </div>

        <div className="main-info-zone">
          <div className="main-info-title">
            <h1>{conventionTitle}</h1>
          </div>

          <div className="main-info-date">
            <div>
              <span style={{ fontWeight: "600" }}>일정</span> :{" "}
              <span
                className="main-info-inner-span"
                style={{ fontWeight: "400" }}
              >
                {conventionStart} ~ {conventionEnd}
              </span>
            </div>
          </div>

          <div className="main-info-time">
            <div>
              <span style={{ fontWeight: "600" }}>시간</span> :{" "}
              <span
                className="main-info-inner-span"
                style={{ fontWeight: "400" }}
              >
                {conventionTime}
              </span>
            </div>
          </div>

          <div className="main-info-price">
            <div>
              <span style={{ fontWeight: "600" }}>가격</span> :{" "}
              <span
                className="main-info-inner-span"
                style={{ fontWeight: "400" }}
              >
                {conventionPrice}원
              </span>
            </div>
          </div>

          <div className="main-info-limit">
            <div>
              <span style={{ fontWeight: "600" }}>정원</span> :{" "}
              <span
                className="main-info-inner-span"
                style={{ fontWeight: "400" }}
              >
                {conventionLimit}명
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="preview-main-content">
        {conventionContent ? <Viewer initialValue={conventionContent} /> : ""}
      </div>
    </>
  );
};
export default ConventionPreviewMain;
