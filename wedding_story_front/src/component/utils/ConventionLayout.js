import axios from "axios";
import "./conventionLayout.css";
import { useEffect, useRef, useState } from "react";
import { companyNoState } from "./RecoilData";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { cancelPay } from "../convention/conventionRefund";
import PersonalPolicy from "./PersonalPolicy";
import ConventionLoading from "../convention/ConventionLoading";

const ConventionLayout = (props) => {

  // Permission 은 db member 테이블에 있는 memberType 따라가면 됨
  // 0은 어드민 권한 / 1은 회원 권한 / 2는 업체 권한
  // 어드민은 가격수정 가능 / 회원은 부스 관람가능 / 업체는 부스 구매 가능
  const {
    conventionNo,
    convention,
    permission,
    payment,
    isPayment,
    setIsPayment,
    buyable,
    startDate,
    // buyable이 true면 부스 구매 가능 
    insert, 
    // insert가 1이면 현재 박람회를 개최하기 위한 것이므로 부스에서 업체 관련 정보는 조회하면 안 됨
  } = props;
  
  console.log("convention : ", conventionNo);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [aSeat, setASeat] = useState([]);
  const [bSeat, setBSeat] = useState([]);
  const [cSeat, setCSeat] = useState([]);
  const [changedSeatInfo, setChangedSeatInfo] = useState(true);
  const [seatInfo, setSeatInfo] = useState({});
  // SeatAlert 컴포넌트에게 넘겨줄 seat 정보임

  // seatAlert은 Alert 띄울 여부
  const [seatMemberAlert, setSeatMemberAlert] = useState(false);
  const [seatCompanyAlert, setSeatCompanyAlert] = useState(false);
  const [seatAdminAlert, setSeatAdminAlert] = useState(false);

    //구매시에는 0이고 / 환불시에는 타입이 1임
  const [type, setType] = useState(0);

  const checkedRef = useRef(null);
  const checkSpanRef = useRef(null);

  const [loginCompanyNoState, setLoginCompanyNoState] = useRecoilState(companyNoState);
  // companyNo는 int가 아닌 String임 -> like C0001 

  useEffect(() => {
    let searchType = 1;
    if(insert === undefined){
      searchType = 0;
    }
    // 나중에 업체인지 조건걸기
    axios.get(`${backServer}/convention/layout/${searchType}`)
    .then(res => {
      // console.log(res);
      setASeat(res.data.line0);
      setBSeat(res.data.line1);
      setCSeat(res.data.line2);

      console.log("res : ",res);
      
    })
    .catch(err => {
      console.error(err); 
    })
  }, [changedSeatInfo]);

  const seatProblem = (seat) => {
    if(permission === 0){
      clickedSeat(seat);
      // 어드민은 문제 있는 좌석도 클릭 가능
    }
  }


  // main 에서는 업체 말곤 다 permission이 1임 
  const clickedSeat = (seat) => {
    setType(0);
    setSeatInfo(seat);
    if(permission === 0){
      // 어드민이 좌석 클릭시
      setSeatAdminAlert(true);
    }
    else if(permission === 1){
      // 회원이 좌석 클릭시 (or 메인에서 어드민이 클릭시)
      setSeatMemberAlert(true);
    }
    else if(permission === 2){
      // 업체가 좌석 클릭시
      setSeatCompanyAlert(true);
    }
  }
  
  const purchaseSeat = () => {
    console.log(payment);
    if(payment.merchantUid){
      Swal.fire({
        title : "박람회 부스 구매",
        text : "부스는 한 개만 구입가능합니다",
        icon : "info",
        iconColor : "var(--main1)",
        confirmButtonText : "확인",
        confirmButtonColor : "var(--main1)"
      })
      setSeatCompanyAlert(false);
      return;
    }
    
    if(!checkedRef.current.checked){
      // 동의 안 하면 못 넘어감 ㅎ
      checkSpanRef.current.style.color = "rgb(246, 67, 67)";
      return;
    }
    checkSpanRef.current.style.color = "black";
    const date = new Date();
    const dateString = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();



    const form = new FormData();

    // 박람회 업체 등록할때
    form.append("seatNo", seatInfo.seatNo);
    
    // 공용
    form.append("companyNo", loginCompanyNoState);
    form.append("conventionNo", convention.conventionNo);

    // 업체 구매이력 테이블
    form.append("merchantUid", dateString);
    form.append("payPrice", seatInfo.conventionSeatPrice);

    console.log("sdsdsdsd");
    axios.post(`${backServer}/convention/buy/seat`, form)
    .then((res) => {
      console.log(res);
      if(res.data){
        window.IMP.request_pay({
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
          merchant_uid: dateString,
          name: "박람회 부스",
          amount: seatInfo.conventionSeatPrice,
        }, rsp => {
          if (rsp.success) {
            // 결제 성공 시 로직
            console.log(rsp);
            setSeatCompanyAlert(false);
            setChangedSeatInfo(!changedSeatInfo);
            setIsPayment(!isPayment);
            // 결제 성공시
            Swal.fire({
              title : "박람회 부스",
              text : "결제에 성공하셨습니다",
              timer : 2500,
              confirmButtonColor : "var(--main1)",
              confirmButtonText : "확인",
            })
          } else {
            // 결제 실패 시 로직
            console.log(rsp);
            console.log('Payment failed', rsp.error_msg);
            // 이때 DB에서 다시 삭제하면 될 듯
            axios.delete(`${backServer}/convention/buy/seat/${convention.conventionNo}/${loginCompanyNoState}`,)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err); 
            })
          }
        });
        
      }
      else{
        setSeatCompanyAlert(false);
        setChangedSeatInfo(!changedSeatInfo);
        Swal.fire({
          title : "박람회 부스",
          text : "잠시후 다시 시도해주세요",
          timer : 2500,
          confirmButtonColor : "var(--main1)",
          confirmButtonText : "확인",
        })
      }
    })
    .catch((err) => {
      console.error(err); 
      setSeatCompanyAlert(false);
      setChangedSeatInfo(!changedSeatInfo);
      Swal.fire({
        title : "박람회 부스",
        text : "잠시후 다시 시도해주세요",
        timer : 2500,
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인",
      })
    })
    
    
    
    
  }

  const seatInfoList = (seat) => {
    // console.log(seat);
    if(permission === 0) {
      clickedSeat(seat);
      return;
    }
    if(seat.companyNo && loginCompanyNoState) {
      // 만약 이미 누가 산 부스라면~
      if(loginCompanyNoState === seat.companyNo && buyable){
        // 근데 그게 내가 산거라면
        clickedRefundSeat(seat);
      }
      else{
        // 다른 사람꺼라면
        setSeatInfo(seat);
        setSeatMemberAlert(true);
      }
    }
    else{
      // 아직 구매 안 한 부스라면
      // 구매 안 한 건데 이미 박람회 시작했으면 업체 없다고 띄워야 함 (부스 구매 불가능)
      if(!buyable && seat.seatStatus === 0) {
        setSeatInfo(seat);
        setSeatMemberAlert(true);
        return;
      }
      seat.seatStatus === 0 ? clickedSeat(seat) : seatProblem(seat)
    }
  }

  const clickedRefundSeat = (seat) => {
    setType(1);
    setSeatInfo(seat);
    setSeatCompanyAlert(true);
  }

  return (
    <>
      <div className="convention-explain-wrap">
        <div className="convention-explain-list">
          <div className="convention-explain-white df-explain">
            <span>빈 좌석</span>
            <div className="convention-white-box"></div>
          </div>
          <div className="convention-explain-gray df-explain">
            <span>점검 좌석</span>
            <div className="convention-gray-box"></div>
          </div>
          <div className="convention-explain-main df-explain">
            <span>업체 좌석</span>
            <div className="convention-main-box"></div>
          </div>
        </div>
      </div>

      <div className="convention-exit-wrap df-basic">
        <div className="convention-exit">
          <pre>입구 : A10 ~ B13  |  출구 : B16 ~ C10</pre>
        </div>
      </div>
    
      <div className="convention-layout-wrap">

        <div className="convention-layout-container">
  {/* 문제가 있는 좌석은 problem이라는 class부여 */}
  {/* 그리고 onclick역시 problem */}
          <div className="layout layout-a">
            {aSeat.map((seat,index) => {
              return (
                <div key={"seat-"+index} onClick={() => {
                  seatInfoList(seat);
                }} className={"seat seatA" +" seatA"+index + " seat"+index + (seat.seatStatus === 0 ? "" : " problem") + (seat.companyNo ? " company-exist" : "")} >{seat.seatCode}</div>
              )
            })}
          </div>
          
          <div className="layout layout-b">
            {bSeat.map((seat,index) => {
              return (
                <div key={"seat-"+index} onClick={() => {
                  seatInfoList(seat);
                }} className={"seat seatB" +" seatB"+index + (seat.seatStatus === 0 ? "" : " problem") + (seat.companyNo ? " company-exist" : "")} >{seat.seatCode}</div>
              )
            })}
          </div>
          
          <div className="layout layout-c">
            {cSeat.map((seat,index) => {
              return (
                <div key={"seat-"+index} onClick={() => {
                  seatInfoList(seat);
                }} className={"seat seatC" +" seatC"+index + " seat"+index + (seat.seatStatus === 0 ? "" : " problem") + (seat.companyNo ? " company-exist" : "")} >{seat.seatCode}</div>
              )
            })}
          </div>
          
        </div>

        
          {seatCompanyAlert ?
          <SeatCompanyAlert seatInfo={seatInfo} setSeatCompanyAlert={setSeatCompanyAlert} 
          purchaseSeat={purchaseSeat} checkedRef={checkedRef} 
          checkSpanRef={checkSpanRef} type={type} payment={payment}
          isPayment={isPayment} setIsPayment={setIsPayment}
          setChangedSeatInfo={setChangedSeatInfo} changedSeatInfo={changedSeatInfo}
          convention={convention} startDate={startDate}
          />

          :
          ""}

          {seatAdminAlert ?
          <SeatAdminAlert seatInfo={seatInfo} setSeatAdminAlert={setSeatAdminAlert} 
          changedSeatInfo={changedSeatInfo} setChangedSeatInfo={setChangedSeatInfo}
          conventionNo={conventionNo}
          />
          :
          ""
          }

          {seatMemberAlert ?
          <SeatMemberAlert seatInfo={seatInfo} setSeatMemberAlert={setSeatMemberAlert}
          
          />
          :
          ""
          }
        
        
      </div>
    </>
  )
}


const SeatCompanyAlert = (props) => {
  const{
    seatInfo,
    setSeatCompanyAlert,
    purchaseSeat,
    checkedRef,
    checkSpanRef,
    type,
    payment,
    isPayment,
    setIsPayment,
    changedSeatInfo,
    setChangedSeatInfo,
    convention,
    startDate,
  } = props;


  // console.log(seatInfo);
  const [loginCompanyNoState, setLoginCompanyNoState] = useRecoilState(companyNoState);
  const [result, setResult] = useState(-1);

  const [showType, setShowType] = useState(true);
  const [checkable, setCheckable] = useState(false);
  const personalRef = useRef(null);
  const refundRef = useRef(null);

  const [refundStatus, setRefundStatus] = useState(true);
  

  const closeSeatAlert = (e) => {
    if(!refundStatus) return;
    if(e.target.className === "convention-seat-alert-wrap"){
      setSeatCompanyAlert(false)
    }
  }

  const refundSeat = () => {
    cancelPay(0, loginCompanyNoState, payment, "부스 환불", setResult);
    
  }



  useEffect(() => {
    if(result === -1) return;
    if(result === 0){
      Swal.fire({
        title : "박람회 환불",
        text : "잠시후 다시 시도해주세요",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
    }
    else if(result === 1){
      Swal.fire({
        title : "박람회 부스",
        text : "환불 완료",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
    }
    setIsPayment(!isPayment);
    setSeatCompanyAlert(false);
    setRefundStatus(true);
    setChangedSeatInfo(!changedSeatInfo);
    refundRef.current.textContent = `${refundMonth}월 ${refundDay}일 부터는 환불이 불가능합니다.`
  }, [result]);


  // 2일전 계산
  const conventionStartDate = new Date(convention.conventionStart);
  // console.log("startDate : ",conventionStartDate);
  const refundDate = new Date(conventionStartDate - 2  * 24 * 60 * 60 * 1000);
  // console.log("refundDate : ",refundDate);
  const refundMonth = refundDate.getMonth()+1;
  const refundDay = refundDate.getDate();


  return (
    <div className="convention-seat-alert-wrap" onClick={closeSeatAlert}>
      <div className="convention-seat-alert">
        <div className="convention-seat-info-wrap">
          <div className="convention-seat-info-title">
            <span>{type === 0 ? "박람회 부스 구매" : "박람회 부스 환불"}</span>
          </div>


            <div className="convention-seat-info-content">
              <div className="convention-seat-info-code df-basic">
                <span>좌석코드 : {seatInfo.seatCode}</span>
              </div>
              <div className="convention-seat-info-price df-basic">
                <span>가격 : <span id="red-color">{type === 0 ? seatInfo.conventionSeatPrice : payment.payPrice}</span>원</span>
                {/* 처음에 산 가격으로 바꿔줘야함 -> 처음 산가격도 조회해야 함 */}
              </div>
            </div>

            <div className="convention-seat-info-personal df-basic">
              {type === 0 ? 
              <>
                <span className="material-icons cursor-p" id="convention-personal-info" ref={personalRef} onClick={() => {
                  personalRef.current.style.color = "black"
                  setShowType(!showType);
                  setCheckable(true);
                }}>info</span>
                <label htmlFor="personal-check" className="cursor-p" ref={checkSpanRef} >이용약관및 개인정보 수집/이용 동의</label>
                <input type="checkbox" id="personal-check" ref={checkedRef} onClick={() => {
                  if(checkable) return;
                  checkedRef.current.checked = false;
                  personalRef.current.style.color = "var(--red2)"
                }}/>
              </>
              :
              // <span ref={refundRef}>박람회 개최 3일전부터는 환불이 불가능합니다.</span>
              <span ref={refundRef}>{refundMonth}월 {refundDay}일 부터는 환불이 불가능합니다.</span>
              }
            </div>

            <div className="company-personal-container" id={showType ? "no-active-convention" : ""}>
              <div className="company-personal">
                <PersonalPolicy />
                <button className="main-btn" id="convention-personal-btn" onClick={() => {
                  setShowType(!showType);
                }}>확인하였습니다</button>
              </div>
            </div>

          
          <div className="convention-seat-info-btn df-basic">
            <button onClick={() => {
              setSeatCompanyAlert(false);
            }}>취소</button>
            {type === 0 ? 
            // showType ?
            <button onClick={purchaseSeat} className={payment.merchantUid ? "cant-buy" : ""} >구매하기</button>
            :
            // <button onClick={() => {
            //   setShowType(!showType);
            // }}>결제창으로</button>
            // :
            // <button onClick={refundSeat}>환불하기</button>
            <button id={refundStatus ? "" : "refunding"} className={startDate < 3 ? "refunding" : ""} onClick={() => {
              if(startDate < 3) return
              if(!refundStatus) return;
              setRefundStatus(false);
              refundSeat()
              refundRef.current.textContent = "환불에는 다소 시간이 소요될 수 있습니다."
            }}>환불하기</button>
            }
          </div>

          {refundStatus ? 
          ""
          :
          <div id="convention-loading">
            <ConventionLoading loadingTime={0} />
          </div>
          }

          
        </div>
      </div>
    </div>
  )
}



const SeatAdminAlert = (props) => {
  const {
    seatInfo,
    setSeatAdminAlert,
    changedSeatInfo,
    setChangedSeatInfo,
    conventionNo,
  } = props;


  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [seatPrice, setSeatPrice] = useState(seatInfo.conventionSeatPrice);
  const [selectStatus, setSelectStatus] = useState(seatInfo.seatStatus);
  const [warning, setWarning] = useState(false);
  const [refundStatus, setRefundStatus] = useState(false);

  const wrongPriceRef = useRef(null);
  const wrongContainerRef = useRef(null);
  const showWrongRef = useRef(null);
  
  const [payment, setPayment] = useState(null);
  const [result, setResult] = useState(-1);

  const closeSeatAlert = (e) => {
    if(e.target.className === "convention-seat-alert-wrap"){
      setSeatAdminAlert(false);
    }
  }

  const refundSeat = () => {
    if(isNaN(seatPrice)){
      wrongPriceRef.current.classList.add("wrong-price");
      showWrongRef.current.style.display = "flex";
      wrongContainerRef.current.id = "wrong-price-zone";
      return;
    }
    
    if(seatPrice < 99){
      wrongPriceRef.current.classList.add("wrong-price");
      showWrongRef.current.style.display = "flex";
      wrongContainerRef.current.id = "wrong-price-zone";
      // 최소 100원은 해야함
      return;
    }

    setRefundStatus(true);


    // form.append("companyNo", seatInfo.companyNo);
    axios.get(`${backServer}/convention/payment/company/${seatInfo.companyNo}/${seatInfo.conventionNo}`)
    .then((res) => {
      console.log(res);
      if(res.data.payNo){
        setPayment({
          merchantUid: res.data.merchantUid,
          payNo: res.data.payNo,
          payPrice: res.data.payPrice,
          conventionCompanyNo: res.data.conventionCompanyNo
        })
      }
      else{
        // 조회실패임 (중간에 뭐 탈퇴했거나 그런 이유로 실패함)
        setChangedSeatInfo(!changedSeatInfo);
        setSeatAdminAlert(false);
        Swal.fire({
          title : "조회 실패",
          text : "잠시후 다시 시도해주세요.",
          icon : "error",
          confirmButtonColor:"var(--main1)",
          confirmButtonText:"확인"
        })
      }
    })
    .catch((err) => {
      setChangedSeatInfo(!changedSeatInfo);
      setSeatAdminAlert(false);
      Swal.fire({
        title : "조회 실패",
        text : "잠시후 다시 시도해주세요.",
        icon : "error",
        confirmButtonColor:"var(--main1)",
        confirmButtonText:"확인"
      })
    })
  }

  const updatePrice = () => {
    showWrongRef.current.style.display = "none";

    if(isNaN(seatPrice)){
      wrongPriceRef.current.classList.add("wrong-price");
      showWrongRef.current.style.display = "flex";
      wrongContainerRef.current.id = "wrong-price-zone";
      return;
    }
    
    if(seatPrice < 99){
      wrongPriceRef.current.classList.add("wrong-price");
      showWrongRef.current.style.display = "flex";
      wrongContainerRef.current.id = "wrong-price-zone";
      // 최소 100원은 해야함
      return;
    }



    const form = new FormData();

    form.append("seatNo", seatInfo.seatNo);
    form.append("conventionSeatPrice", seatPrice);
    form.append("seatStatus", selectStatus);

    if(conventionNo){
      form.append("conventionNo", conventionNo);
    }


    axios.patch(`${backServer}/convention/update/seatInfo`, form)
    .then((res) => {
      // console.log(res);
      if(res.data){
        setWarning(false);
        setSeatAdminAlert(false);
        setChangedSeatInfo(!changedSeatInfo);
        if(result === 0 || result === 1) return;
        Swal.fire({
          title : "부스 정보",
          text : "정보 수정 완료",
          timer : 2000,
          confirmButtonText : "확인",
          confirmButtonColor : "var(--main1)"
        })
      }
      else{
        setSeatAdminAlert(false);
        setChangedSeatInfo(!changedSeatInfo);
        Swal.fire({
          title : "부스 정보",
          text : "잠시후 다시 시도해주세요.",
          confirmButtonText : "확인",
          confirmButtonColor : "var(--main1)"
        })
      }
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        title : "부스 정보",
        text : "잠시후 다시 시도해주세요.",
        confirmButtonText : "확인",
        confirmButtonColor : "var(--main1)"
      })
    })
  }

  useEffect(() => {
    // 환불 위한 useEffect
    if(payment){
      cancelPay(0, seatInfo.companyNo, payment, "부스 폐쇄", setResult);
    }
  }, [payment]);

  useEffect(() => {
    if(result === 0){
      Swal.fire({
        title : "박람회 부스",
        text : "잠시후 다시 시도해주세요",
        icon : "error",
        confirmButtonText : "확인",
        confirmButtonColor : "var(--main1)"
      })
      setSeatAdminAlert(false);
    }
    else if(result === 1){
      Swal.fire({
        title : "박람회 부스",
        text : "환불에 성공했습니다 해당업체에 연락해주세요",
        icon : "success",
        confirmButtonText : "확인",
        confirmButtonColor : "var(--main1)"
      })
      setWarning(false);
      updatePrice();
    }
  }, [result]);

  console.log(seatInfo);


  return (
    <div className="convention-seat-alert-wrap" onClick={closeSeatAlert}>
      <div className="convention-seat-alert" id="convention-admin-alert-wrap">
        <div className="convention-seat-info-wrap" ref={wrongContainerRef}>
          <div className="convention-seat-info-title">
            <span>박람회 부스 정보</span>
          </div>

          <div className="convention-seat-info-content">
            <div className="convention-seat-info-code df-basic">
              <span>좌석코드 : {seatInfo.seatCode}</span>
            </div>

            <div className="convention-seat-info-wrong-price df-basic" style={{display:"none"}} ref={showWrongRef}>
              <span>잘못된 가격입니다.</span>
            </div>

            {refundStatus ?
            <div id="convention-loading">
              <ConventionLoading loadingTime={0} />
            </div>
            :
            ""
            }
            
            <div className="convention-seat-info-price df-basic">
              <div className="convention-seat-info-price-child">
                {refundStatus ?
                <span>업체번호 : </span>
                :
                <label className="cursor-p" ref={wrongPriceRef} htmlFor="seat-price">가격 : </label>
                }
              </div>
              <div className="convention-seat-info-price-input">
                {refundStatus ?
                <span>{seatInfo.companyTel}</span>
                :
                <input type="text" id="seat-price" value={seatPrice} onChange={(e) => {
                  if(isFinite(e.target.value)){
                    setSeatPrice(e.target.value)
                  }
                }}/>
                }
              </div>

            </div>
          </div>

          <div className="convention-seat-info-status">
            {warning ?
            <div className="convention-seat-inf-warning" style={{textAlign:"center"}}>
              <span>이미 구입된 부스입니다</span>
              <br />
              <span>정말로 수정하시겠습니까?</span>
              <br />
              {refundStatus ?
              <span>환불에는 다소 시간이 소요될 수 있습니다.</span>
              :
              <span style={{color:"#bbb"}}>결제는 자동으로 환불됩니다</span>
              }
            </div>
            :
            <>
              <div className="convention-seat-info-status-title">
                <span>자리 상태</span>
              </div>
              
              <div className="convention-seat-info-status-content df-basic">
                <div className="convention-seat-info-status-ok status-container">
                  <div className="status-ok-container">
                    <label htmlFor="status-ok">정상</label>
                  </div>
                  <div className="status-ok-input-container">
                    <input type="radio" id="status-ok" name="status" checked={selectStatus === 0 ? true : false} onChange={() => {
                      setSelectStatus(0);
                    }} />
                  </div>
                </div>

                <div className="convention-seat-info-status-bad status-container">
                  <div className="status-bad-container">
                    <label htmlFor="status-bad">비정상</label>
                  </div>
                  <div className="status-bad-input-container">
                    <input type="radio" id="status-bad" name="status" checked={selectStatus === 1 ? true : false} onChange={() => {
                      setSelectStatus(1);
                    }} />
                  </div>
                </div>
              </div>
            </>
            }

          </div>

          <div className="convention-seat-info-btn df-basic">
            <button onClick={() => setSeatAdminAlert(false)}>취소</button>
            <button onClick={() => {
              if(warning) refundSeat();
              else if(seatInfo.companyNo) setWarning(true);
              else if(!seatInfo.companyNo) updatePrice()
            }}>수정하기</button>
          </div>
          
        </div>
      </div>
    </div>
  )
}


const SeatMemberAlert = (props) => {

  const{
    setSeatMemberAlert,
    seatInfo,
  } = props;

  const closeSeatAlert = (e) => {
    if(e.target.className === "convention-seat-alert-wrap"){
      setSeatMemberAlert(false);
    }
  }

  // console.log(seatInfo);

  return (
    <div className="convention-seat-alert-wrap" onClick={closeSeatAlert}>
      <div className="convention-seat-member-alert">
        <div className="convention-seat-member-info-title df-basic">
          <span>등록된 업체 정보</span>
        </div>

        {seatInfo.companyName && seatInfo.companyCategory ? 
        <>
          <div className="convention-seat-member-info-content">
            {/* 부스가 비어있다면 등록된 업체가 없다고 띄워야 함 */}
            {/* 밑에 name이랑 category 없애고 그냥 content에 등록된 업체 없음 띄우기 */}
            {/* 나중에 데이터 생기면 업체까지 한 번에 조회해서 seatInfo에 넣기 */}
            <div className="convention-seat-info-company-name">
              <div className="convention-seat-info-company-name-left">
                <span>업체명 : </span>
              </div>
              <div className="convention-seat-info-company-name-right">
                <pre> {seatInfo.companyName}</pre>
              </div>
            </div>

            <div className="convention-seat-info-company-category">
              <div className="convention-seat-info-company-category-left">
                <span>카테고리 : </span>
              </div>
              <div className="convention-seat-info-company-category-right">
                <pre> {seatInfo.companyCategory}</pre>
              </div>

            </div>
          </div>

          <div className="convention-seat-member-info-link df-basic">
            <Link className="cursor-p">업체 보러가기</Link>
          </div>
        </>

        
        :
        <div className="empty-company df-basic">
          <span>아직 업체가 없습니다</span>
        </div>
        }


        

        <div className="convention-seat-member-info-btn df-basic">
          <button onClick={() => {
            setSeatMemberAlert(false);
          }}>확인</button>
        </div>
        
      </div>
    </div>
  )
}

export default ConventionLayout