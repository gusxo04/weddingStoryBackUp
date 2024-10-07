import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConventionPreviewBack from "./ConventionPreviewBack";
import ConventionPreviewMain from "./ConventionPreviewMain";
import BuyTicket from "./BuyTicket";
import ConventionLocate from "../utils/ConventionLocate";
import ConventionLayout from "../utils/ConventionLayout";
import RefundTicket from "./RefundTicket";
import ConventionComment from "./ConventionComment";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginNoState, memberTypeState } from "../utils/RecoilData";
import NoLoginConventionComment from "./NoLoginConventionComment";


const ShowConvention = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
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
    isPayment,
    setIsPayment,
  } = props;

  const [commentContent, setCommentContent] = useState("");
  const [comment, setComment] = useState([]);
  const [changedComment, setChangedComment] = useState(true);
  const [reCommentContent, setReCommentContent] = useState("");
  

  const [loginMemberType, setLoginMemberType] = useRecoilState(memberTypeState);
  const isLogin = useRecoilValue(isLoginState);

  useEffect(() => {
    // 댓글 조회하기 (박람회가 있을 경우에만 댓글 조회가 가능하기 때문에 showConvention 안에서 만들어도 됨)
    axios.get(`${backServer}/convention/comment/${convention.conventionNo}`)
    .then(res => {
      // console.log(res.data);
      setComment(res.data);
    })
    .catch(err => {
      console.error(err); 
    })
  }, [changedComment]);

  
  // setIsPayment로 결제나 환불하면 이 boolean 값을 반전시켜서 state값을 바꾸고
  // 그러면 useeffect가 다시 돌아서 데이터 조회를 알아서 다시 해옴
  const closeAlert = (e, pass) => {
    if(pass || e.target?.id === "convention-close-screen"){
      if(e === 0) {
        setAlertType(0);
      }
      else if(e === 1 || e.target?.className === "convention-member-alert-wrap convention-refund-wrap"){
        Swal.fire({
          title : "박람회 환불",
          text : "티켓 환불을 취소하시겠습니까?",
          showCancelButton : true,
          cancelButtonText : "계속하기",
          cancelButtonColor : "var(--main1)",
          confirmButtonText : "환불취소",
          confirmButtonColor : "var(--main2)"
        }).then((data) => {
          if(data.isConfirmed){
            setAlertType(0);
          }
        })
        return false;
      }
      else if(e === 2 || e.target.className === "convention-member-alert-wrap"){
        Swal.fire({
          title:"박람회 티켓 결제",
          text : "결제를 취소하시겠습니까?",
          showCancelButton : true,
          cancelButtonText : "계속하기",
          cancelButtonColor : "var(--main1)",
          confirmButtonText : "결제취소",
          confirmButtonColor : "var(--main2)",
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
      <ConventionLayout convention={convention} payment={payment} isPayment={isPayment} 
      setIsPayment={setIsPayment} permission={loginMemberType === 2 ? 2 : 1} 
      buyable={type} startDate={startDate}
      />
      }

      <div className="convention-preview-info-wrap">
        {loginMemberType === 2 ? 
        ""
        :
        <div className="convention-inner-preview-info convention-layout-btn">
          <button onClick={() => {
            setShowType(!showType);
          }}>{showType ? "부스 보기" : "박람회 보기"}</button>
        </div>
        }

        <div className="convention-inner-preview-info convention-way-btn" >
          <button onClick={() => {
            setAlertType(2);
          }}>박람회 위치</button>
        </div>
{/*  style={{width:"45%"}}
 style={{width:"45%"}} */}
 {/* 업체면은 부스보기가 없으므로 convention-inner-preview-info div에 저 스타일을 추가 */}
        
        {/* 회원인경우 */}
        {loginMemberType === 1 ?
        type ?
        startDate === 0 ? 
        "" 
        :
        !payment ? 
        // convention.ticketCount <= convention.conventionLimit ?
        <div className="convention-inner-preview-info convention-buy-btn" >
          <button className={convention.ticketCount < convention.conventionLimit ? "" : "full"} onClick={() => {
            if(convention.ticketCount < convention.conventionLimit){
              setNoticeEmail("");
              setAlertType(3);
            }
            else{
              Swal.fire({
                title : "박람회",
                text : "정원이 다 찼습니다.",
                icon : "info",
                iconColor : "var(--main1)",
                confirmButtonText : "확인",
                confirmButtonColor : "var(--main1)"
              })
            }
          }}>박람회 신청</button>
        </div>
        :
        <div className="convention-inner-preview-info convention-buy-btn" >
          <button onClick={() => {
            setAlertType(4);
          }}>환불하기</button>
        </div>
        :
        // "신청/환불"
        ""
        :
        ""
        }
        
        {/* 어드민인 경우 */}
        {loginMemberType === 0 ?
        type ? 
        <div className="convention-inner-preview-info convention-buy-btn" >
          <button onClick={() => {
            navigate("/convention/update/"+convention.conventionNo);
          }}>박람회 수정</button>
        </div>
        :
        // "수정버튼"
        ""
        :
        ""
        }

        {/* 업체인 경우 */}
        {loginMemberType === 2 ?
        type ?
        <div className="convention-inner-preview-info convention-buy-btn" >
          <button onClick={() => {
            setShowType(!showType);
          }}>{showType ? "부스 구매" : "박람회 보기"}</button>
        </div>
        :
        // "부스 구매"
        ""
        :
        ""
        }

          {/* 일반유저면 신청 / 업체면 부스 등록 / 관리자면 수정 */}
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
        convention={convention} fullNoticeEmail={fullNoticeEmail} isPayment={isPayment} setIsPayment={setIsPayment}
      />
      :
      alertType === 4 ? 
      <RefundTicket closeAlert={closeAlert} payment={payment} isPayment={isPayment} setIsPayment={setIsPayment} />
      :
      ""
      }

      {isLogin ? 
      <ConventionComment convention={convention} 
      setCommentContent={setCommentContent} commentContent={commentContent} 
      comment={comment} setComment={setComment} 
      changedComment={changedComment} setChangedComment={setChangedComment}
      reCommentContent={reCommentContent} setReCommentContent={setReCommentContent}
      />
      :
      <NoLoginConventionComment />
      }
    </div>
  )
}

export default ShowConvention;