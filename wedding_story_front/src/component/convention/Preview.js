import { Viewer } from "@toast-ui/react-editor";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";


const Preview = (props) => {

  const {
    imgStyle,
    // conventionTitle,
    // conventionContent,
    // conventionStart,
    // conventionEnd,
    // conventionPrice,
    // conventionLimit,
    // conventionTime,
    // showImage,
  } = props;

  // const dataProps = {
  //   imgStyle,
  //   conventionTitle,
  //   conventionContent,
  //   conventionStart,
  //   conventionEnd,
  //   conventionPrice,
  //   conventionLimit,
  //   conventionTime,
  //   showImage
  // };

  // const dataProps = {...props};


  

  // 백그라운드가 1 / 메인이 2
  return (
    <div className="convention-preview-wrap">
      {imgStyle === 1 ? 
        // <ConventionPreviewBack imgStyle={imgStyle} conventionTitle={conventionTitle}
        // conventionContent={conventionContent} conventionStart={conventionStart}
        // conventionEnd={conventionEnd} conventionPrice={conventionPrice}
        // conventionLimit={conventionLimit} conventionTime={conventionTime}
        // showImage={showImage} 
        // />
        <ConventionPreviewBack {...props} />
      :
      // <ConventionPreviewMain imgStyle={imgStyle} conventionTitle={conventionTitle}
      // conventionContent={conventionContent} conventionStart={conventionStart}
      // conventionEnd={conventionEnd} conventionPrice={conventionPrice}
      // conventionLimit={conventionLimit} conventionTime={conventionTime}
      // showImage={showImage} 
      // />
        <ConventionPreviewMain {...props} />
      }
    </div>
  )
}
export default Preview