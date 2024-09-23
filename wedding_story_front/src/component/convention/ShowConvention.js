import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";
import BuyTicket from "./BuyTicket";
import ConventionLocate from "../utils/ConventionLocate";
import ConventionLayout from "../utils/ConventionLayout";
import RefundTicket from "./RefundTicket";

const ShowConvention = (props) => {

  // type이 true면 신청가능 false면 시작일 지나서 신청은 불가능
  const {
    convention,
    type,
    conventionShowDate,
    personalRef,
    selectDate,
    setSelectDate,
    dateMsgRef,
    personalMsgRef,
    noticeEmail,
    changeEmail,
    changeLastEmail,
    fullNoticeEmail,
    setNoticeEmail,
    showType,
    setShowType,
    startDate,
    payment,
  } = props;
  
  const closeAlert = (e, pass) => {
    if(pass || e.target.id === "convention-close-screen"){
      if(e === 1 || e.target.className === "convention-member-alert-wrap"){

        Swal.fire({
          title:"박람회 티켓 결제",
          text : "결제를 취소하시겠습니까?",
          showCancelButton : true,
          cancelButtonText : "계속하기",
          cancelButtonColor : "var(--main2)",
          confirmButtonText : "결제취소",
          confirmButtonColor : "var(--main1)",
          // reverseButtons : true
          // willOpen: () => {
          //   document.body.style.overflow = 'visible';
          // },
        }).then((data) => {
          if(data.isConfirmed){
            setSelectDate(null);
            setAlertType(0);
          }
        })
        return false;
      }
      setAlertType(0);
    }
  }

  useEffect(() => {
    // 외부 스크립트 로드 함수
    const loadScript = (src, callback) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = callback;
      document.head.appendChild(script);
    };

    // 스크립트 로드 후 실행
    loadScript('https://code.jquery.com/jquery-1.12.4.min.js', () => {
      loadScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js', () => {
        const IMP = window.IMP;
        // 가맹점 식별코드
        IMP.init("imp67386065");
      });
    });

    // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
    return () => {
      const scripts = document.querySelectorAll('script[src^="https://"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  
  // 나중에 다른걸로 대체 (swal 띄우면 스크롤 사라지는거 때매 alert창이 뜨면 스크롤을 사라지게 만듦)
  const [alertType, setAlertType] = useState(0);

  const navigate = useNavigate();
  
  return (
    <div className="convention-preview-wrap">

      {showType ?
      convention.imgStyle === 1 ? 
      <ConventionPreviewBack {...convention} />
      :
      convention.imgStyle === 2 ? 
      <ConventionPreviewMain {...convention} />
      :
      ""
      :
      <ConventionLayout />
      }

      <div className="convention-preview-info-wrap">
        <div className="convention-inner-preview-info convention-layout-btn">
          <button onClick={() => {
            setShowType(!showType);
          }}>부스 보기</button>
        </div>

        <div className="convention-inner-preview-info convention-way-btn" >
          <button onClick={() => {
            setAlertType(2);
          }}>찾아오시는 길</button>
        </div>
{/*  style={{width:"45%"}}
 style={{width:"45%"}} */}
 {/* 업체면은 부스보기가 없으므로 convention-inner-preview-info div에 저 스타일을 추가 */}
        <div className="convention-inner-preview-info convention-buy-btn" >
          {startDate === 0 ? 
          "" 
          :
          !payment ? 
          <button onClick={() => {
            setNoticeEmail("");
            setAlertType(3);
          }}>박람회 신청</button>
          :
          <button onClick={() => {
            setAlertType(4);
          }}>환불하기</button>
          }

          {/* <button onClick={() => {
            navigate("/convention/update/"+convention.conventionNo);
          }}>박람회 수정</button> */}

          {/* 일반유저면 신청 / 업체면 부스 등록 / 관리자면 수정 */}
        </div>
      </div>

      
      
      {alertType === 2 ? 
      <ConventionLocate closeAlert={closeAlert} />
      :
      alertType === 3 ? 
      <BuyTicket closeAlert={closeAlert}
        noticeEmail={noticeEmail} changeEmail={changeEmail}
        changeLastEmail={changeLastEmail} dateMsgRef={dateMsgRef}
        conventionShowDate={conventionShowDate} setSelectDate={setSelectDate}
        personalMsgRef={personalMsgRef} personalRef={personalRef} selectDate={selectDate}
        convention={convention} fullNoticeEmail={fullNoticeEmail}
      />
      :
      alertType === 4 ? 
      <RefundTicket closeAlert={closeAlert} payment={payment} />
      :
      ""
      }

      
    </div>
  )
}

export default ShowConvention;