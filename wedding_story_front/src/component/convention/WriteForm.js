import { useRef } from "react";


const WriteForm = (props) => {
  const imgStyle = props.imgStyle;
  const setImgStyle = props.setImgStyle;

  const imageRef = useRef(null);

  // const conventionTitle = props.conventionTitle;
  // const setConventionTitle = props.setConventionTitle;
  const {
    conventionTitle,
    setConventionTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    conventionContent,
    setConventionContent,
    image,
    setImage,
    conventionPrice,
    setConventionPrice,
    conventionLimit,
    setConventionLimit,
    conventionTime,
    setConventionTime,
    showImage,
    setShowImage
  } = props;

  const changeImage = (e) => {
    console.log(e);
    const files = e.currentTarget.files;
    if(files.length !== 0 && files[0] !== 0){
      setImage(files[0]);
      // 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setShowImage(reader.result);
      }

    }
    else{
      setImage(null);
      setShowImage(null);
    }
  }
  
  
  return (
    
    <>
      <div className="convention-img">
        {showImage ? 
        <img src={showImage} onClick={() => {
          imageRef.current.click();
        }}/>
        : 
        <img src="d" onClick={() => {
          imageRef.current.click();
        }}/>}
        
        <input type="file" ref={imageRef} accept="image/*" style={{display:"none"}} onChange={changeImage} />
      </div>
      <div className="convention-img-type">
        <button className={imgStyle === 0 ? "selected" : ""} onClick={() => {
          setImgStyle(0);
        }}>메인이미지 이미지로 변경</button>
        <button className={imgStyle === 0 ? "" : "selected"} onClick={() => {
          setImgStyle(1);
        }}>백그라운드 이미지로 변경</button>
      </div>

      <div className="convention-info-wrap">

        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 제목</span>
          </div>
          <div className="input-zone">
            <input type="text" value={conventionTitle} onChange={(e) => {
              setConventionTitle(e.target.value); 
            }} />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 일정</span>
          </div>
          <div className="input-zone">

            <input type="date" className="start-date" value={startDate} onChange={(e) => {
              setStartDate(e.target.value);
            }} />
            <span>~</span>
            <input type="date" className="end-date" value={endDate} onChange={(e) => {
              setEndDate(e.target.value);
            }} />

          </div>
        </div>


        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 시간</span>
          </div>
          <div className="input-zone">
            <input type="time" value={conventionTime} onChange={(e) => {
              setConventionTime(e.target.value); 
            }} />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 정원</span>
          </div>
          <div className="input-zone">
            <input type="type" value={conventionLimit} onChange={(e) => {
              if(!isNaN(e.target.value) ){
                setConventionLimit(e.target.value); 
              }
            }} />
          </div>
        </div>

        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 가격</span>
          </div>
          <div className="input-zone">
            <input type="type" value={conventionPrice} onChange={(e) => {
              if(!isNaN(e.target.value) ){
                setConventionPrice(e.target.value); 
              }
            }} />
          </div>
        </div>
        
      </div>
      
      <div style={{width:"100%",height:"1000px"}}></div>
    </>

    
  )
}
export default WriteForm