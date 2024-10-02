import { useEffect, useState } from "react";
import "./conventionLoading.css";
import { memberTypeState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const ConventionLoading = (props) => {

  let loadingTimer = 1500;
  const { 
    loadingTime,
  } = props;

  loadingTimer = loadingTime ?? 1500;


  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadingTimer)
    return () => clearTimeout(timer);
  }, []);
  
  if(loading){
    return "";
  }
  else{
    return (
    <div className="convention-loading-wrap df-basic">
      <span className="loader"></span>
    </div>
    )
  }
  
  // return (
  //   <div>ConventionLoading</div>
  // )
}
export default ConventionLoading