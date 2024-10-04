import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState } from "../utils/RecoilData";
import NoticeFrm from "./NoticeFrm";
import ToastEditor from "../utils/ToastEditor";
import ToastEditorN from "../utils/ToastEditorN";

const NoticeUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const noticeNo = params.noticeNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  //썸네일파일을 새로 전송하기위한 state
  const [thumbnail, setThumbnail] = useState(null);
  //첨부파일을 새로 전송하기위한 state
  const [noticeFile, setNoticeFile] = useState([]);
  //조회해온 썸네일을 화면에 보여주기위한 state
  const [noticeThumb, setNoticeThumb] = useState(null);
  //조회해온 파일목록을 화면에 보여주기위한 state
  const [fileList, setFileList] = useState([]);
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  //기존 첨부파일을 삭제하면 삭제한 파일번호를 저장할 배열
  const [delNoticeFileNo, setDelNoticeFileNo] = useState([]);

  const [noticeVisible, setNoticeVisible] = useState(""); //공개여부 1 모든업체 2 특정업체 3 관리자끼리만
  const [companyNo, setCompanyNo] = useState(""); //특정 업체 대상으로 공개 시 회사 코드 입력
  const inputTitle = (e) => {
    setNoticeTitle(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${backServer}/notice/noticeNo/${noticeNo}`)
      .then((res) => {
        console.log(res);
        setNoticeTitle(res.data.noticeTitle);
        setNoticeContent(res.data.noticeContent);
        setNoticeThumb(res.data.noticeThumb);
        setFileList(res.data.fileList);
        setCompanyNo(res.data.companyNo);
        setNoticeVisible(res.data.noticeVisible);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const updateNotice = () => {
    console.log("확인용");
    console.log(noticeTitle);
    console.log(noticeContent);
    console.log(thumbnail);
    console.log(noticeFile);
    console.log(delNoticeFileNo);
    console.log(companyNo);
    if (noticeTitle !== "" && noticeContent !== "") {
      const form = new FormData();
      form.append("noticeTitle", noticeTitle);
      form.append("noticeContent", noticeContent);
      form.append("noticeNo", noticeNo);
      if (noticeThumb !== null) {
        form.append("noticeThumb", noticeThumb);
      }
      if (thumbnail !== null) {
        form.append("thumbnail", thumbnail);
      }
      if (companyNo !== null) {
        form.append("companyNo", companyNo);
      }
      for (let i = 0; i < noticeFile.length; i++) {
        form.append("noticeFile", noticeFile[i]);
      }
      for (let i = 0; i < delNoticeFileNo.length; i++) {
        form.append("delNoticeFileNo", delNoticeFileNo[i]);
      }
      axios
        .patch(`${backServer}/notice`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            navigate(`/admin/notice/view/${noticeNo}`);
          } else {
            //실패 시 로직
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section className="section notice-content-wrap">
      <div className="page-title">게시글 수정</div>
      <form
        className="notice-write-frm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <NoticeFrm
          loginId={loginId}
          noticeTitle={noticeTitle}
          setNoticeTitle={inputTitle}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          noticeFile={noticeFile}
          setNoticeFile={setNoticeFile}
          noticeThumb={noticeThumb}
          setNoticeThumb={setNoticeThumb}
          fileList={fileList}
          setFileList={setFileList}
          delNoticeFileNo={delNoticeFileNo}
          setDelNoticeFileNo={setDelNoticeFileNo}
          setCompanyNo={setCompanyNo}
          companyNo={companyNo}
          setNoticeVisible={setNoticeVisible}
          noticeVisible={noticeVisible}
        />
        <div className="notice-content-wrap">
          <ToastEditorN
            noticeContent={noticeContent}
            setNoticeContent={setNoticeContent}
            type={1}
          />
        </div>
        <div className="button-zone">
          <button className="btn-primary lg" onClick={updateNotice}>
            수정하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoticeUpdate;
