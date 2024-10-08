import { Link, useNavigate, useParams } from "react-router-dom";
import "./question.css";
import axios from "axios";
import { useEffect, useState } from "react";
const QuestionView =()=>{
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const { questionNo } = useParams();
    const [question, setQuestion] = useState({});
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


    useEffect(() => {
        if (question.questionState === 2) {
            axios
                .get(`${backServer}/admin/getQuestionRe/${questionNo}`)
                .then((res) => {
                    console.log(res.data);
                    setReContent(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [question.questionState, questionNo]); // questionState와 questionNo를 의존성 배열에 추가

    return(
        <>
        
        <div className="question-wrap">
            <div className="question-main-wrap">
            <h2>문의 상세보기</h2>
                <div className="card2 qstitle">
                    <h3>{question.questionTitle}</h3>
                     <div className="content contentcard">
                        <a>{question.questionContent}</a>
                </div>


                        <h3>첨부파일</h3>
                        <div className="content contentcard">
                            <div className="concard">
                                {question.fileList && question.fileList.length > 0 ? (
                                    question.fileList.map((file, i) => {
                                        return <FileItem key={"file-" + i} file={file} />;
                                    })
                                ) : (
                                    <a>첨부파일이 없습니다.</a>
                                )}
                            </div>
                        </div>
                </div>
        
            </div>
        </div>
        <div className="card reContent">
        <h2>답변 내역</h2>
            <div className="contentcard">
                <a>{reContent?(reContent.questionReContent):("답변등록이 되지 않았습니다")}</a>
            </div>
        </div>
        <div className="btn-wrap">
        <Link to="/question/main" className="gotolist2">
              <h3>목록으로 &gt;</h3>
        </Link>
        </div>
        </>
    );
}
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

export default QuestionView;