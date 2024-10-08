import { Route, Routes } from "react-router-dom";
import CompanyNoticeList from "./CompanyNoticeList";
import CompanyNoticeView from "./CompanyNoticeView";
const CompanyNotice=()=>{
    return(
        <Routes>
            <Route path="list" element={<CompanyNoticeList />} />
            <Route path="view/:noticeNo" element={<CompanyNoticeView />} />
        </Routes>
    )
}

export default CompanyNotice;