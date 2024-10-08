import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "./noticeView.css";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const NoticeView = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const noticeNo = params.noticeNo;
  // const previousNoticeNo = Number(params.noticeNo) - 1;
  // const nextNoticeNo = Number(params.noticeNo) + 1;

  const [notice, setNotice] = useState({});
  const [nextNotice, setNextNotice] = useState({});
  const [previousNotice, setPreviousNotice] = useState({});
  const [change, setchange] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${backServer}/notice/noticeNo/${noticeNo}`)
      .then((res) => {
        setNotice(res.data);
        setchange((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${backServer}/notice/prenextnoticeNo/${noticeNo}`)
      .then((res) => {
        setPreviousNotice(res.data.previousNotice);
        setNextNotice(res.data.nextNotice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  const handlePreviousClick = () => {
    if (previousNotice && previousNotice.noticeNo) {
      navigate(`/admin/notice/view/${previousNotice.noticeNo}`);
    } else {
      console.error("이전 공지사항이 없습니다.");
    }
  };

  const handleNextClick = () => {
    if (nextNotice && nextNotice.noticeNo) {
      navigate(`/admin/notice/view/${nextNotice.noticeNo}`);
    } else {
      console.error("다음 공지사항이 없습니다.");
    }
  };

  return (
    <section className="notice-view-wrap">
      <div className="notice-content-wrap">
        <div className="title-wrap">
          <div className="notice-btn">
            <Link to="/admin/notice/list" className="gotolist">
              <h3>공지사항 목록 &gt;</h3>
            </Link>
            {notice.noticeWriter===loginId?(
              <Link
              to={`/admin/notice/update/${notice.noticeNo}`}
              className="gotolist"
            >
              <h3>수정</h3>
            </Link>
            ):false}
            
          </div>
          <h1>{notice.noticeTitle}</h1>
          <a className="subTitle">
            <span>{notice.noticeWriter}</span>
            <span>·</span>
            <span>{notice.noticeDate}</span>
          </a>
          <div className="line"></div>

          <div className="file-thumbnail-container">
            <div className="notice-thumbnail">
              <img
                src={
                  notice.noticeThumb
                    ? `${backServer}/notice/thumb/${notice.noticeThumb}`
                    : "/image/default_img.png"
                }
                alt="Notice Thumbnail"
              />
            </div>
            <div className="notice-file-wrap">
              {notice.fileList
                ? notice.fileList.map((file, i) => {
                    return <FileItem key={"file-" + i} file={file} />;
                  })
                : ""}
            </div>
          </div>
        </div>

        <div className="notice-content">
          {notice.noticeContent ? (
            <Viewer key={notice.noticeNo} initialValue={notice.noticeContent} />
          ) : (
            /*key prop이 없으면 리액트는 같은 컴포넌트를 재사용하려고 시도, 그 결과 다음 게시물로 넘어가도 같은 본문만 보이는 문제 발생
            key를 부여하여 리액트로 하여금 해당 컴포넌트를 새로운 컴포넌트로 인식하게 하여 해당 요소를 삭제하고 새로운 요소를 생성하게 함
            */
            ""
          )}
        </div>
        <div className="line"></div>
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
      </div>
    </section>
  );
};

const FileItem = (props) => {
  const file = props.file;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const filedown = () => {
    axios
      .get(`${backServer}/notice/file/${file.noticeFileNo}`, {
        responseType: "blob",
      })
      .then((res) => {
        const blob = new Blob([res.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileObjectUrl;
        link.style.display = "none";
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileObjectUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="notice-file">
      <span className="material-icons file-icon" onClick={filedown}>
        file_download
      </span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};
export default NoticeView;
