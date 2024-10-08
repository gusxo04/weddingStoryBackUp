import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PagiNavi";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { companyNoState } from "../utils/RecoilData";

const CompanyNoticeList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [noticeList, setNoticeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const userState = 0;
  useEffect(() => {
    axios
      .get(`${backServer}/notice/listCom/${reqPage}/${userState}/${companyNo}`)
      .then((res) => {
        console.log(res.data);
        setNoticeList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [reqPage]);

  return (
    <>
      <div className="notice-wrap">
        <div className="page-title">
          <h1>공지사항</h1>
        </div>
        <div className="notice-list-wrap">
          <ul className="posting-wrap">
            {noticeList.data === null ? (
              <li>작성된 공지사항이 없습니다.</li>
            ) : (
              noticeList.map((notice, i) => {
                return <NoticeItem key={"notice-" + i} notice={notice} />;
              })
            )}
          </ul>
        </div>
        <div className="notice-paging-wrap">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
    </>
  );
};
const NoticeItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const notice = props.notice;
  const navigate = useNavigate();
  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/company/notice/view/${notice.noticeNo}`);
      }}
    >
      <div className="posting-img">
        <img
          src={
            notice.noticeThumb
              ? `${backServer}/notice/thumb/${notice.noticeThumb}`
              : "/image/default_img.png"
          }
        />
      </div>
      <div className="posting-info">
        <div className="posting-title">{notice.noticeTitle}</div>
        <div className="posting-sub-info">
          <span>{notice.noticeDate}</span>
        </div>
      </div>
    </li>
  );
};
export default CompanyNoticeList;
