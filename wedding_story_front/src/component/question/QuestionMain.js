import { Link, useNavigate } from "react-router-dom";
import "./question.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import {
    loginIdState,
} from "../utils/RecoilData";
import PageNavi from "../utils/PagiNavi";

const QuestionMain = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const [questionList, setQuestionList] = useState([]);
    const [reqPage, setReqPage] = useState(1);
    const [pi, setPi] = useState({});
    const loginId = useRecoilValue(loginIdState);
    console.log("loginId : " + loginId);

    useEffect(() => {
        if (loginId) {
            axios
                .get(`${backServer}/admin/myQsList/${reqPage}/${loginId}`)
                .then((res) => {
                    console.log(res);
                    setQuestionList(res.data.list);
                    setPi(res.data.pi);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [reqPage, loginId]);

    return (
        <div className="question-wrap">
            <div className="question-main-wrap">
                <h2>고객센터</h2>
                <div className="card">
                    <h3>질문 카테고리</h3>
                    <div className="service card">
                        <div className="question">
                            <ul>
                                <li>
                                    <Link to={"/question/write/1"}>
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>account_circle</span>
                                        <span>계정</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/question/write/2"}>
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>apartment</span>
                                        <span>업체</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/question/write/3"}>
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>web_asset</span>
                                        <span>사이트</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/question/write/4">
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>payments</span>
                                        <span>결제</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 className="h2-my-card">내 질문</h3>
                    <div className="qs-my card">
                        <table className="qs-tbl">
                            <thead>
                                <tr className="qs-tbl-tr">
                                    <th style={{ width: "10%" }}>번호</th>
                                    <th style={{ width: "55%" }}>제목</th>
                                    <th style={{ width: "15%" }}>상태</th>
                                    <th style={{ width: "20%" }}>분류</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questionList.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">작성한 문의사항이 없습니다.</td>
                                    </tr>
                                ) : (
                                    questionList.map((question, i) => (
                                        <>
                                        <QuestionItem key={"question-" + i} question={question} />
                                        
                                        </>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="qs-paging-wrap">
                        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const QuestionItem = (props) => {
    const question = props.question;
    const navigate = useNavigate();
    return (
        <>
        <tr className="qs-item" onClick={() => {
            navigate(`/question/view/${question.questionNo}`);
        }}>
            <td>{question.questionNo}</td>
            <td>{question.questionTitle}</td>
            <td>{question.questionState===1?("처리중"):("답변완료")}</td>
            <td>{question.questionType===1?("계정"):(question.questionType===2?("업체"):(question.questionType===3?("사이트"):(question.questionType===4?("결제"):("리뷰신고"))))}</td>
        </tr>
        <tr>
            <td colSpan="4">
                <div className="line2"></div>
            </td>
        </tr>
            </>
    );
}

export default QuestionMain;
