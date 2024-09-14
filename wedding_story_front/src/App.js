import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Header from "./component/common/Header";
import ConventionMain from "./component/convention/ConventionMain";
import "./main.css";


function App() {
  
  return (
    <div className="wrap">

      
      
      <Header/>

      <Routes>





        
        <Route path="/convention" element={<ConventionMain/>} />
        
        
        
        
      </Routes>
      
      
      
      
      
    </div>
  );
}

export default App;
