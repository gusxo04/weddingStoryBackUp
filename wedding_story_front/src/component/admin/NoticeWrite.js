import { useRecoilState } from "recoil";
import "./noticeWrite.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import ToastEditor from "../utils/ToastEditor";
import ToastEditorN from "../utils/ToastEditorN";
const NoticeWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  //글작성 시 전송할 데이터 선언
  //const [loginId, setLoginId] = useRecoilState(loginIdState); //로그인한 회원 아이디 값(입력할게아니기때문에 state사용안하고 변수로만 사용)
  const [loginId, setLoginId] = useState(""); //로그인 아직 미구현 >> 아이디 입력(임시)
  const [noticeTitle, setNoticeTitle] = useState(""); //사용자가 입력할 제목
  const [thumbnail, setThumbnail] = useState(null); //썸네일은 첨부파일로 처리
  const [noticeContent, setNoticeContent] = useState(""); //사용자가 입력할 내용
  const [noticeFile, setNoticeFile] = useState([]); //첨부파일(여러개일 수 있으므로 배열로 처리)
  const [userState, setUserState] = useState(""); //공개여부 1 모든업체 2 특정업체 3 관리자끼리만
  const inputTitle = (e) => {
    setNoticeTitle(e.target.value);
  };
  const writeNotice = () => {};
  return (
    <>
      <div className="notice-write-wrap">
        <div className="page-title">
          <h1>공지사항 작성</h1>
        </div>
        <form
          className="notice-write-frm"
          onSubmit={(e) => {
            e.preventDefault();
            writeNotice();
          }}
        >
          <NoticeFrm
            loginId={loginId}
            setLoginId={setLoginId}
            noticeTitle={noticeTitle}
            setNoticeTitle={inputTitle}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            noticeFile={noticeFile}
            setNoticeFile={setNoticeFile}
            userState={userState}
            setUserState={setUserState}
          />
          <div className="notice-content-wrap">
            <ToastEditorN
              noticeContent={noticeContent}
              setNoticeContent={setNoticeContent}
              type={0}
            />
          </div>
          <div className="button-zone">
            <button type="submit" className="submit-btn">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default NoticeWrite;
