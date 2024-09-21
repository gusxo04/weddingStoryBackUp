import axios from "axios";
import "./conventionLayout.css";
import { useEffect, useState } from "react";

const ConventionLayout = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [aSeat, setASeat] = useState([]);
  const [bSeat, setBSeat] = useState([]);
  const [cSeat, setCSeat] = useState([]);

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
  }, []);

  const seatProblem = () => {
    console.log("문제가 있는 상품이에요");
  }
  
// 필요한 거 -> 업체가 산 좌석이 어딘지를 알아야 하고 , 문제가 있는 좌석은 문제가 있음을 알 수 있게 해야 함
  return (
    <div className="convention-layout-wrap">
      {/* wrap은 테스트용임 */}
      <div className="convention-layout-container">
{/* 문제가 있는 좌석은 problem이라는 class부여 */}
{/* 그리고 onclick역시 problem */}
        <div className="layout layout-a">
          {aSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            // const seatProblem = () => {
            //   console.log("문제가 있는 상품");
            // }
            return (
              <div key={"seat-"+index} onClick={seat.seatStatus === 0 ? seatInfo : seatProblem} className={"seat seatA" +" seatA"+index + " seat"+index + (seat.seatStatus === 0 ? "" : " problem")} >{seat.seatCode}</div>
            )
          })}
        </div>
        
        <div className="layout layout-b">
          {bSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            // const seatProblem = () => {
            //   console.log("문제가 있는 상품");
            // }
            return (
              <div key={"seat-"+index} onClick={seat.seatStatus === 0 ? seatInfo : seatProblem} className={"seat seatB" +" seatB"+index + (seat.seatStatus === 0 ? "" : " problem")} >{seat.seatCode}</div>
            )
          })}
        </div>
        
        <div className="layout layout-c">
          {cSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            // const seatProblem = () => {
            //   console.log("문제가 있는 상품");
            // }
            return (
              <div key={"seat-"+index} onClick={seat.seatStatus === 0 ? seatInfo : seatProblem} className={"seat seatC" +" seatC"+index + " seat"+index + (seat.seatStatus === 0 ? "" : " problem")} >{seat.seatCode}</div>
            )
          })}
        </div>
        
      </div>
    </div>
    
  )
}

export default ConventionLayout