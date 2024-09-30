import { useEffect, useState } from "react";
import "./conventionLoading.css";

const ConventionLoading = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500)
    return () => clearTimeout(timer);
  }, []);
  
  if(loading){
    return "";
  }
  else{
    return <div className="convention-loading-wrap df-basic">
      <span className="loader"></span>
    </div>
  }
  
  // return (
  //   <div>ConventionLoading</div>
  // )
}
export default ConventionLoading