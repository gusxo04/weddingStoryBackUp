import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoticeView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const noticeNo = params.noticeNo;
  const [notice, setNotice] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/notice/noticeNo/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="notice-view-wrap">
      <div className="title-wrap">
        <h3>공지사항 목록 &gt;</h3>
        <h1>{notice.noticeTitle}</h1>
        <a>
          <span>{notice.noticeWriter}</span>
          <span>·</span>
          <span>{notice.noticeDate}</span>
        </a>
      </div>
      <div className="notice-content-wrap">
        {notice.noticeContent ? (
          <Viewer initialValue={notice.noticeContent} />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};
export default NoticeView;
