import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginIdState } from "../utils/RecoilData";

const QuestionResponse = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const { questionNo } = useParams();
    const [question, setQuestion] = useState({});
    const [member, setMember] = useState({});
    const [content, setContent] = useState("");
    const [reContent, setReContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${backServer}/admin/getOneQuestion/${questionNo}`)
            .then((res) => {
                console.log(res.data);
                setQuestion(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [questionNo]);

    const loginId = useRecoilValue(loginIdState);
    const submit = () => {
         axios
         .get(`${backServer}/admin/questionRe/${content}/${loginId}/${questionNo}`)
         .then((res) => {
             console.log(res.data);
             navigate("/admin/question/list");
         })
         .catch((err) => {
             console.log(err);
         });
    };

    useEffect(() => {
        if (question.questionState === 2) {
            axios
                .get(`${backServer}/admin/getQuestionRe/${questionNo}`)
                .then((res) => {
                    console.log(res.data);
                    setReContent(res.data.questionReContent);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [question.questionState, questionNo]); // questionState와 questionNo를 의존성 배열에 추가

    return (
        <section className="qs-view-wrap">
            <div className="qs-content-wrap">
                <div className="title-wrap">
                    <div className="qs-btn">
                        <Link to="/admin/question/list" className="gotolist">
                            <h3>문의 목록 &gt;</h3>
                        </Link>
                    </div>
                    <div className="question-content2">
                        <h1>답변</h1>
                    </div>
                    <table className="tbl1 qs_tbl">
                        <thead>
                            <tr>
                                <th>제목</th>
                                <td>{question.questionTitle}</td>
                            </tr>
                            <tr>
                                <th>회원 번호</th>
                                <td>{question.memberNo}</td>
                            </tr>
                            <tr>
                                <th>처리상태</th>
                                <td>{question.questionState}</td>
                            </tr>
                            <tr>
                                <th>질문 유형</th>
                                <td>{question.questionType}</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>{question.fileList
                                ? question.fileList.map((file, i) => {
                                    return <FileItem key={"file-" + i} file={file} />;
                                })
                                : ""}</td>
                            </tr>
                            {/* <div className="question-file-wrap2">
                            <h3>파일 목록</h3>
                            <div className="line"></div>
                            {question.fileList
                                ? question.fileList.map((file, i) => {
                                    return <FileItem key={"file-" + i} file={file} />;
                                })
                                : ""}
                        </div> */}

                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>{question.questionContent}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            {question.questionState==1?(
                <>
                <div className="write-wrap">
                <textarea
                        className="qs-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={"500"}
                        placeholder="답변 작성"
                    />
                </div>
                <div className="question-submit">
                    <button className="qs-submit-btn" onClick={submit}>답변등록</button>
                </div>
                </>
            ):(
                <div className="write-wrap">
                <textarea
                        className="qs-content"
                        value={reContent}
                        onChange={(e) => setContent(e.target.value)}
                        maxLength={"500"}
                        placeholder="답변 작성"
                        readOnly
                    />
                </div>
            )}
            </div>
            
        </section>

    );
};

const FileItem = (props) => {
    const file = props.file;
    const questionFileNo = props.file.questionFileNo;
    const backServer = process.env.REACT_APP_BACK_SERVER;

    const filedown = () => {
        axios
            .get(`${backServer}/admin/file/${questionFileNo}`, {
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
        <div className="questioin-file">
            <span className="material-icons file-icon" onClick={filedown}>
                file_download
            </span>
            <span className="file-name">{file.filename}</span>
        </div>
    );
};

export default QuestionResponse;
