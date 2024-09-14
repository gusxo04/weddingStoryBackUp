import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "./component/common/Header";
import ConventionMain from "./component/convention/ConventionMain";
import "./main.css";
import ConventionLayout from "./component/utils/ConventionLayout";
import InsertConvention from './component/convention/InsertConvention';


function App() {
  
  return (
    <div className="wrap">

      
      
      <Header/>

      <Routes>




        
        <Route path="/convention" element={<ConventionMain/>} />
        <Route path="/test" element={<ConventionLayout/>}/>
        <Route path="/newConvention" element={<InsertConvention/>} />
        
        
        
      </Routes>
      
      
      
      
      
    </div>
  );
}

export default App;
