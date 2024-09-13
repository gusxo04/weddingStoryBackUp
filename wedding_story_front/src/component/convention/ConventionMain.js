import axios from "axios";
import "./convention.css";
import { useEffect } from "react";


const ConventionMain = () => {

  const backServer = process.env.REACT_APP_BACK_SERVER;

  useEffect(() => {
    axios.get(`${backServer}/convention`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err); 
    })
  }, []);
  
  return (
    <div className="convention-wrap">
      <div className="convention-container">

      </div>
    </div>
  )
}

export default ConventionMain

