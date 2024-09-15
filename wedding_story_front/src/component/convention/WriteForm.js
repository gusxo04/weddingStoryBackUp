import { useRef } from "react";
import ToastEditor from "../utils/ToastEditor";


const WriteForm = (props) => {
  const imgStyle = props.imgStyle;
  const setImgStyle = props.setImgStyle;

  const imageRef = useRef(null);

  // const conventionTitle = props.conventionTitle;
  // const setConventionTitle = props.setConventionTitle;
  const {
    conventionTitle,
    setConventionTitle,
    conventionStartDate,
    setConventionStartDate,
    conventionEndDate,
    setConventionEndDate,
    conventionContent,
    setConventionContent,
    image,
    setImage,
    conventionPrice,
    setConventionPrice,
    conventionLimit,
    setConventionLimit,
    conventionStartTime,
    setConventionStartTime,
    conventionEndTime,
    setConventionEndTime,
    conventionTime,
    setConventionTime,
    showImage,
    setShowImage
  } = props;
  const compareDate = () => {
    // 날짜 비교
    if(conventionStartDate === "" || conventionEndDate === "") return false;
    const startDate = new Date(conventionStartDate);
    const endDate = new Date(conventionEndDate);
    
    if(startDate <= endDate){
      console.log("맞음");
      return true
    }
    return false;
  }
  compareDate();
  
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

            <input type="date" className="start-date" value={conventionStartDate} onChange={(e) => {
              setConventionStartDate(e.target.value);
            }} />
            <span>~</span>
            <input type="date" className="end-date" value={conventionEndDate} onChange={(e) => {
              setConventionEndDate(e.target.value);
            }} />

          </div>
        </div>


        <div className="input-wrap">
          <div className="input-info">
            <span>박람회 시간</span>
          </div>
          <div className="input-zone">
            <input type="time" value={conventionStartTime} onChange={(e) => {
              setConventionStartTime(e.target.value); 
              
            }} />
            <span>~</span>
            <input type="time" value={conventionEndTime} onChange={(e) => {
              setConventionEndTime(e.target.value); 
            }} />
          </div>
        </div>

        <button onClick={compareTime}>테스트</button>


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

        <ToastEditor boardContent={conventionContent} setBoardContent={setConventionContent} type={1} />
      </div>
        {/* type 1은 convention에서 작성이라는 뜻 (convention에서 textarea쓸 때는 파일이나 이런건 업로드 안 할거임) */}
      
      <div style={{width:"100%",height:"1000px"}}></div>
    </>

    
  )
}
export default WriteForm