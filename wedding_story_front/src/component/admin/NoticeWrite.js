import { useRecoilState } from "recoil";
import "./noticeWrite.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import ToastEditorN from "../utils/ToastEditorN";
import axios from "axios";
import Swal from "sweetalert2";
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
  const [noticeVisible, setNoticeVisible] = useState(1); //공개여부 1 모든업체 2 특정업체 3 관리자끼리만
  const [companyNo, setCompanyNo] = useState(0); //특정 업체 대상으로 공개 시 회사 코드 입력

  const writeNotice = () => {
    console.log("-------------");
    console.log("noticeWriter" + loginId);
    console.log("noticeTitle" + noticeTitle);
    console.log("noticeContent" + noticeContent);
    console.log("companyNo" + companyNo);
    console.log("thumbnail" + thumbnail);
    console.log("noticeFile" + noticeFile);
    console.log("noticeVisible" + noticeVisible);
    console.log("-------------");

    if (noticeTitle !== "" && noticeContent !== "") {
      const form = new FormData();
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      form.append("noticeWriter", loginId);

      form.append("companyNo", companyNo);
      form.append("noticeVisible", noticeVisible);
      //썸네일이 첨부된 경우에만 추가
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      //첨부파일도 추가한 경우에만 추가(첨부파일은 여러개가 같은 name으로 전송)
      for (let i = 0; i < noticeFile.length; i++) {
        form.append("noticeFile", noticeFile[i]);
      }
      axios
        .post(`${backServer}/notice`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          if (res.data) {
            navigate("/admin/notice/list");
          } else {
            Swal.fire({
              title: "에러가 발생했습니다.",
              text: "원인을 찾으세요",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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
            setNoticeTitle={setNoticeTitle}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            noticeFile={noticeFile}
            setNoticeFile={setNoticeFile}
            noticeVisible={noticeVisible}
            setNoticeVisible={setNoticeVisible}
            companyNo={companyNo}
            setCompanyNo={setCompanyNo}
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
