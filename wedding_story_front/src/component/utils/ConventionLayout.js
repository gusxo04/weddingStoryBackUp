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
      // console.log(res);
      setASeat(res.data.line0);
      setBSeat(res.data.line1);
      setCSeat(res.data.line2);
      
    })
    .catch(err => {
      console.error(err); 
    })
  }, []);
  

  return (
    <div className="convention-layout-wrap">
      {/* wrap은 테스트용임 */}
      <div className="convention-layout-container">

        <div className="layout layout-a">
          {aSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            return (
              <div key={"seat-"+index} onClick={seatInfo} className={"seat seatA" +" seatA"+index + " seat"+index} >{seat.seatCode}</div>
            )
          })}
        </div>
        
        <div className="layout layout-b">
          {bSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            return (
              <div key={"seat-"+index} onClick={seatInfo} className={"seat seatB" +" seatB"+index} >{seat.seatCode}</div>
            )
          })}
        </div>
        
        <div className="layout layout-c">
          {cSeat.map((seat,index) => {
            const seatInfo = () => {
              console.log(seat);
            }
            return (
              <div key={"seat-"+index} onClick={seatInfo} className={"seat seatC" +" seatC"+index + " seat"+index} >{seat.seatCode}</div>
            )
          })}
        </div>
        
      </div>
    </div>
    
  )
}

export default ConventionLayout