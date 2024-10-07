import { Link } from "react-router-dom";
import "./question.css";
import { useState } from "react";

const QuestionMain = () => {
    const [questionType, setQuestionType] = useState("");
    return (
        <div className="question-wrap">
            <div className="question-main-wrap">
                <h2>고객센터 메인 페이지</h2>
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
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>account_circle</span>
                                        <span>업체</span>
                                    </Link>
                                </li>
                                <li>
                                <Link to={"/question/write/3"}>
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>account_circle</span>
                                        <span>사이트</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/question/write/4">
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>account_circle</span>
                                        <span>결제</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/question/write/5">
                                        <span className="material-icons mi" style={{ fontSize: '48px' }}>account_circle</span>
                                        <span>리뷰 신고</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionMain;
