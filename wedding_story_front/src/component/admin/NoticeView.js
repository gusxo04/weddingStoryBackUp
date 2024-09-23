import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const NoticeView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();

  const noticeNo = params.noticeNo;
  const previousNoticeNo = Number(params.noticeNo) - 1;
  const nextNoticeNo = Number(params.noticeNo) + 1;

  const [notice, setNotice] = useState({});
  const [nextNotice, setNextNotice] = useState({});
  const [previousNotice, setPreviousNotice] = useState({});
  const navigate = useNavigate();
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

    axios
      .get(`${backServer}/notice/noticeNo/${previousNoticeNo}`)
      .then((res) => {
        console.log(res);
        setPreviousNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/notice/noticeNo/${nextNoticeNo}`)
      .then((res) => {
        console.log(res);
        setNextNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noticeNo, previousNoticeNo, nextNoticeNo]);
  const handlePreviousClick = () => {
    if (previousNotice.noticeNo) {
      navigate(`/admin/notice/view/${previousNotice.noticeNo}`);
    }
  };

  const handleNextClick = () => {
    if (nextNotice.noticeNo) {
      navigate(`/admin/notice/view/${nextNotice.noticeNo}`);
    }
  };
  return (
    <section className="notice-view-wrap">
      <div className="title-wrap">
        <h3>공지사항 목록 &gt;</h3>
        <div className="notice-thumbnail">
          <img
            src={
              notice.noticeThumb
                ? `${backServer}/notice/thumb/${notice.noticeThumb}`
                : "/image/default_img.png"
            }
          />
          <h1>{notice.noticeTitle}</h1>
        </div>
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
      <div className="next-notice" onClick={handleNextClick}>
        {nextNotice && nextNotice.noticeTitle ? (
          <span>{nextNotice.noticeTitle}</span>
        ) : (
          <span>다음 공지사항이 없습니다.</span>
        )}
      </div>
      <div className="previous-notice" onClick={handlePreviousClick}>
        {previousNotice && previousNotice.noticeTitle ? (
          <span>{previousNotice.noticeTitle}</span>
        ) : (
          <span>이전 공지사항이 없습니다.</span>
        )}
      </div>
    </section>
  );
};
export default NoticeView;
