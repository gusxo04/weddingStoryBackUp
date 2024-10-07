import { Navigate, Route, Routes } from "react-router-dom"
import ConventionMain from "./ConventionMain"
import InsertConvention from "./InsertConvention"
import UpdateConvention from './UpdateConvention';
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, memberTypeState } from "../utils/RecoilData";
import { useEffect, useState } from "react";


const ConventionLobby = () => {

  const [permission, setPermission] = useState(false);
  const isLogin = useRecoilValue(isLoginState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);

  useEffect(() => {
    if(isLogin && (memberType === 0 || memberType === 3)){
      setPermission(true);
    }
    else{
      setPermission(false);
    }
  }, [isLogin]);
  
  return (
    <Routes>

      <Route path="main" element={<ConventionMain />} />
      <Route path="write" element={permission ? <InsertConvention /> : <Navigate to="/convention/main"/>} />
      {/* <Route path="write" element={<InsertConvention />} /> */}
      <Route path="update/:conventionNo" element={permission ? <UpdateConvention /> : <Navigate to="/convention/main"/>} />

    </Routes>
  )
}
export default ConventionLobby