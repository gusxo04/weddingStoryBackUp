import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const QuestionResponse = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const { questionNo } = useParams();
    const [question, setQuestion] = useState({});

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

    return (
        <section className="qs-view-wrap">
            <div className="qs-content-wrap">
                <div className="title-wrap">
                    <div className="question-btn">
                        <Link to="/admin/question/list" className="gotolist">
                            <h3>문의 목록 &gt;</h3>
                        </Link>
                    </div>
                    <div className="question-content2">
                    <h2>제목 : {question.questionTitle}</h2>
                    <h3>
                        <p className="bon">본문</p>
                    <p>{question.questionContent}</p>
                    </h3>
                    </div>
                    <table className="tbl1 qs_tbl">
                        <thead>
                        <tr>
                                <th>제목</th>
                                <td>{question.questionTitle}</td>
                            </tr>
                            <tr>
                                <th>회원 이름</th>
                                <td>{question.memberNo}</td>
                            </tr>
                            <tr>
                                <th>처리상태</th>
                                <td>{question.questionState}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>{question.questionContent}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
{/* <div className="question-file-wrap2">
                            <h3>파일 목록</h3>
                            <div className="line"></div>
                            {question.fileList
                                ? question.fileList.map((file, i) => {
                                    return <FileItem key={"file-" + i} file={file} />;
                                })
                                : ""}
                        </div> */}

const FileItem = (props) => {
    const file = props.file;
    const questioinFileNo = props.file.questionFileNo;
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const filedown = () => {
      axios
        .get(`${backServer}/admin/file/${questioinFileNo}`, {
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
