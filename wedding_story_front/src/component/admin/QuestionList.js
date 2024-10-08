import axios from "axios";
import { useEffect, useState } from "react";
import PageNavi from "../utils/PagiNavi";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

const QuestionList =()=>{
    const backServer = process.env.REACT_APP_BACK_SERVER;
  const [questionList, setQuestionList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});
  useEffect(() => {
    axios
      .get(`${backServer}/admin/questionlist/${reqPage}`)
      .then((res) => {
        setQuestionList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
    return(
        <div className="qs-wrap">
        <div className="question-page-title">
          <h1>Q&A</h1>
        </div>
        
        <div className="qs-table-wrap">
        <table className="tbl1 question_tbl">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>문의번호</th>
              <th style={{ width: "10%" }}>회원번호</th>
              <th style={{ width: "60%" }}>제목</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "10%" }}>처리상태</th>
            </tr>
          </thead>
          <tbody>
          {questionList.data === null ? (
              <li>작성된 공지사항이 없습니다.</li>
            ) : (
              questionList.map((question, i) => {
                return <QuestionItem key={"question-" + i} question={question} />;
              })
            )}
          </tbody>
        </table>
        </div>
        <div className="qs-paging-wrap">
          <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
        </div>
      </div>
    )
}

const QuestionItem=(props)=>{
    const backServer = process.env.REACT_APP_BACK_SERVER;
  const question = props.question;
  const navigate = useNavigate();
  return (
    // <li
    //   className="posting-item"
    //   onClick={() => {
    //     navigate(`/admin/question/view/${question.questionNo}`);
    //   }}
    // >
    //   <div className="posting-info">
    //     <div className="posting-title">{question.questionTitle}</div>
    //     <div className="posting-sub-info">
    //       <span>{question.questionDate}</span>
    //     </div>
    //   </div>
    // </li>

    <tr
       onClick={() => {
        navigate(`/admin/question/write/${question.questionNo}`);
       }}
    >
        <td>{question.questionNo}</td>
        <td>{question.memberNo}</td>
        <td>{question.questionTitle}</td>
        <td>{question.questionType}</td>
        <td>{question.questionState===1?("답변 대기"):("처리완료")}</td>
    </tr>
  );
}
export default QuestionList;