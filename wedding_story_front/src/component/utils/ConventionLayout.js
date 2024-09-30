import axios from "axios";
import "./conventionLayout.css";
import { useEffect, useRef, useState } from "react";
import { companyNoState } from "./RecoilData";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { cancelPay } from "../convention/conventionRefund";

const ConventionLayout = (props) => {

  // Permission 은 db member 테이블에 있는 memberType 따라가면 됨
  // 0은 어드민 권한 / 1은 회원 권한 / 2는 업체 권한
  // 어드민은 가격수정 가능 / 회원은 부스 관람가능 / 업체는 부스 구매 가능
  const {
    convention,
    permission,
    payment,
    isPayment,
    setIsPayment,
  } = props;
  

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
    // 나중에 업체인지 조건걸기
    axios.get(`${backServer}/convention/layout`)
    .then(res => {
      console.log(res);
      setASeat(res.data.line0);
      setBSeat(res.data.line1);
      setCSeat(res.data.line2);
      
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
    if(!checkedRef.current.checked){
      // 동의 안 하면 못 넘어감 ㅎ
      checkSpanRef.current.style.color = "rgb(246, 67, 67)";
      return;
    }
    const date = new Date();
    const dateString = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()+""+date.getSeconds();

    window.IMP.request_pay({
      pg: "html5_inicis.INIpayTest",
      pay_method: "card",
      merchant_uid: dateString,
      name: "박람회 부스",
      amount: seatInfo.conventionSeatPrice,
      // 나중에 회원 DB 조회해서 다 넣기
      buyer_email: "test@portone.io",
      buyer_name: "구매자 이름",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "123-456"
    }, rsp => {
      if (rsp.success) {
        // 결제 성공 시 로직
        console.log(rsp);
        const form = new FormData();

        // 박람회 업체 등록할때
        form.append("seatNo", seatInfo.seatNo);
        
        // 공용
        form.append("companyNo", loginCompanyNoState);
        form.append("conventionNo", convention.conventionNo);

        // 업체 구매이력 테이블
        form.append("merchantUid", rsp.merchant_uid);
        form.append("payPrice", seatInfo.conventionSeatPrice);
        

        axios.post(`${backServer}/convention/buy/seat`, form)
        .then((res) => {
          console.log(res);
          if(res.data){
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
          }
        })
        .catch((err) => {
          console.error(err); 
          Swal.fire({
            title : "박람회 부스",
            text : "잠시후 다시 시도해주세요",
            timer : 2500,
            confirmButtonColor : "var(--main1)",
            confirmButtonText : "확인",
          })
        })
        
      } else {
        // 결제 실패 시 로직
        console.log('Payment failed', rsp.error_msg);
        // 추가로 실행할 로직을 여기에 작성
      }
    });
    
  }

  const clickedRefundSeat = (seat) => {
    setType(1);
    setSeatInfo(seat);
    setSeatCompanyAlert(true);
  }
  
  
// 필요한 거 -> 업체가 산 좌석이 어딘지를 알아야 하고 , 문제가 있는 좌석은 문제가 있음을 알 수 있게 해야 함
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
    
      <div className="convention-layout-wrap">

        <div className="convention-layout-container">
  {/* 문제가 있는 좌석은 problem이라는 class부여 */}
  {/* 그리고 onclick역시 problem */}
          <div className="layout layout-a">
            {aSeat.map((seat,index) => {
              // const seatInfo = () => {
              //   purchaseSeat(seat);
              // }
              // const seatProblem = () => {
              //   console.log("문제가 있는 상품");
              // }
              return (
                <div key={"seat-"+index} onClick={() => {
                  // seat.seatStatus === 0 ? purchaseSeat(seat) : seatProblem()

                  if(seat.companyNo && loginCompanyNoState) {
                    // 만약 이미 누가 산 부스라면~
                    if(loginCompanyNoState === seat.companyNo){
                      // 근데 그게 내가 산거라면
                      clickedRefundSeat(seat);
                    }
                    else{
                      // 다른 사람꺼라면
                      setSeatMemberAlert(true);
                    }
                  }
                  else{
                    // 아직 구매 안 한 부스라면
                    seat.seatStatus === 0 ? clickedSeat(seat) : seatProblem(seat)
                  }
                }} className={"seat seatA" +" seatA"+index + " seat"+index + (seat.seatStatus === 0 ? "" : " problem") + (seat.companyNo ? " company-exist" : "")} >{seat.seatCode}</div>
              )
            })}
          </div>
          
          <div className="layout layout-b">
            {bSeat.map((seat,index) => {
              return (
                <div key={"seat-"+index} onClick={() => {
                  if(seat.companyNo && loginCompanyNoState){
                    if(loginCompanyNoState === seat.companyNo){
                      clickedRefundSeat(seat);
                    }
                    else{
                      setSeatMemberAlert(true);
                    }
                  }
                  else{
                    console.log(seat);
                    seat.seatStatus === 0 ? clickedSeat(seat) : seatProblem(seat)
                  }
                }} className={"seat seatB" +" seatB"+index + (seat.seatStatus === 0 ? "" : " problem") + (seat.companyNo ? " company-exist" : "")} >{seat.seatCode}</div>
              )
            })}
          </div>
          
          <div className="layout layout-c">
            {cSeat.map((seat,index) => {
              return (
                <div key={"seat-"+index} onClick={() => {
                  if(seat.companyNo && loginCompanyNoState){
                    if(loginCompanyNoState === seat.companyNo){
                      clickedRefundSeat(seat);
                    }
                    else{
                      setSeatMemberAlert(true);
                    }
                  }
                  else{
                    seat.seatStatus === 0 ? clickedSeat(seat) : seatProblem(seat)
                  }
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
          />

          :
          ""}

          {seatAdminAlert ?
          <SeatAdminAlert seatInfo={seatInfo} setSeatAdminAlert={setSeatAdminAlert} 
          changedSeatInfo={changedSeatInfo} setChangedSeatInfo={setChangedSeatInfo}
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
  } = props;

  // console.log(seatInfo);
  const [loginCompanyNoState, setLoginCompanyNoState] = useRecoilState(companyNoState);
  const [result, setResult] = useState(-1);

  const closeSeatAlert = (e) => {
    if(e.target.className === "convention-seat-alert-wrap"){
      setSeatCompanyAlert(false)
    }
  }

  const refundSeat = () => {
    cancelPay(0, loginCompanyNoState, payment, "부스 환불", setResult);
    
  }

  useEffect(() => {
    if(result === 0){
      Swal.fire({
        title : "박람회 환불",
        text : "잠시후 다시 시도해주세요",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
      setSeatCompanyAlert(false);
    }
    else if(result === 1){
      setIsPayment(!isPayment);
      setChangedSeatInfo(!changedSeatInfo);
      Swal.fire({
        title : "박람회 부스",
        text : "환불 완료",
        confirmButtonColor : "var(--main1)",
        confirmButtonText : "확인"
      })
      setSeatCompanyAlert(false);
    }
    
  }, [result]);
  


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
              <span>가격 : <span id="red-color">{seatInfo.conventionSeatPrice}</span>원</span>
              {/* 처음에 산 가격으로 바꿔줘야함 -> 처음 산가격도 조회해야 함 */}
            </div>
          </div>

          <div className="convention-seat-info-personal df-basic">
            {type === 0 ? 
            <>
              <label htmlFor="personal-check" className="cursor-p" ref={checkSpanRef} >이용약관및 개인정보 수집/이용 동의</label>
              <input type="checkbox" id="personal-check" ref={checkedRef} />
            </>
            :
            <span>박람회 개최 3일전부터는 환불이 불가능합니다.</span>
            }
          </div>
          
          <div className="convention-seat-info-btn df-basic">
            {type === 0 ? 
            <button onClick={purchaseSeat}>구매하기</button>
            :
            // <button onClick={refundSeat}>환불하기</button>
            <button onClick={refundSeat}>환불하기</button>
            }
          </div>
          
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
  } = props;

  console.log(seatInfo);

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [seatPrice, setSeatPrice] = useState(seatInfo.conventionSeatPrice);
  const [selectStatus, setSelectStatus] = useState(seatInfo.seatStatus);

  const wrongPriceRef = useRef(null);
  const wrongContainerRef = useRef(null);
  const showWrongRef = useRef(null);
  

  const closeSeatAlert = (e) => {
    if(e.target.className === "convention-seat-alert-wrap"){
      setSeatAdminAlert(false);
    }
  }

  const updatePrice = () => {
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

    axios.patch(`${backServer}/convention/update/seatInfo`, form)
    .then((res) => {
      console.log(res);
      if(res.data){
        setSeatAdminAlert(false);
        setChangedSeatInfo(!changedSeatInfo);
        Swal.fire({
          title : "부스 정보",
          text : "정보 수정 완료",
          timer : 2000,
          confirmButtonText : "확인",
          confirmButtonColor : "var(--main1)"
        })
      }
    })
    .catch((err) => {
      console.error(err); 
    })


    
  }



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
              <span>잘못된 가격임</span>
            </div>
            
            <div className="convention-seat-info-price df-basic">
              <div className="convention-seat-info-price-child">
                <label className="cursor-p" ref={wrongPriceRef} htmlFor="seat-price">가격 : </label>
              </div>
              <div className="convention-seat-info-price-input">
                <input type="text" id="seat-price" value={seatPrice} onChange={(e) => {
                  if(isFinite(e.target.value)){
                    setSeatPrice(e.target.value)
                  }
                }}/>
              </div>

            </div>
          </div>

          <div className="convention-seat-info-status">
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

          </div>

          <div className="convention-seat-info-btn df-basic">
            <button onClick={updatePrice}>수정하기</button>
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
                <pre>{seatInfo.companyName}</pre>
              </div>
            </div>

            <div className="convention-seat-info-company-category">
              <div className="convention-seat-info-company-category-left">
                <span>카테고리 : </span>
              </div>
              <div className="convention-seat-info-company-category-right">
                <pre>{seatInfo.companyCategory}</pre>
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