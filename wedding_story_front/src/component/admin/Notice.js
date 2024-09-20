import { Route, Routes } from "react-router-dom";
import NoticeList from "./NoticeList";
import NoticeWrite from "./NoticeWrite";
import NoticeView from "./NoticeView";
import NoticeUpdate from "./NoticeUpdate";
import "./notice.css";
const Notice = () => {
  return (
    <Routes>
      <Route path="list" element={<NoticeList />} />
      <Route path="write" element={<NoticeWrite />} />
      <Route path="view/:noticeNo" element={<NoticeView />} />
      <Route path="update/:noticeNo" element={<NoticeUpdate />} />
    </Routes>
  );
};

export default Notice;
