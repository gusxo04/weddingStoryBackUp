import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginIdState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const WriteQuestion = () => {
    const [showQuestionFile, setShowQuestionFile] = useState([]);
    const [questionFile, setQuestionFile] = useState([]);
    const { questionType } = useParams();
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const navigate = useNavigate();

    const [loginId] = useRecoilState(loginIdState);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const addQuestionFile = (e) => {
        const files = e.currentTarget.files;
        const fileArr = [];
        const filenameArr = [];

        for (let i = 0; i < files.length; i++) {
            fileArr.push(files[i]);
            filenameArr.push(files[i].name);
        }

        setQuestionFile([...questionFile, ...fileArr]);
        setShowQuestionFile([...showQuestionFile, ...filenameArr]);
    };

    const submit = () => {
        const formData = new FormData();
        questionFile.forEach(file => {
            formData.append('questionFile', file);
        });
        formData.append('questionTitle', title);
        formData.append('questionContent', content);
        formData.append('questionType', questionType);
        formData.append('loginId', loginId);

        axios
            .post(`${backServer}/admin/inputRequest`, formData)
            .then((res) => {
                console.log(res.data);
                navigate("/question/main");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="question-write-wrap">
            <h1>문의하기</h1>
            <div className="question-title-wrap">
                <p>제목 입력</p>
                <textarea
                    className="question-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={"50"}
                    placeholder="제목을 입력해주세요"
                />
            </div>

            <div className="question-content-wrap">
                <p>내용 입력</p>
                <textarea
                    className="question-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={"500"}
                    placeholder="문의사항을 작성해주세요"
                />
            </div>

            <div className="input-item">
                <input
                    type="file"
                    id="questionFile"
                    className="input-file"
                    onChange={addQuestionFile}
                    multiple
                    style={{ display: 'none' }}
                />
                <label htmlFor="questionFile" className="file-upload">
                    첨부 파일 선택<span className="material-icons del-file-icon">add</span>
                </label>
            </div>
            <p className="file-list">파일 목록</p>
            <div className="question-file-wrap">
                {showQuestionFile.map((filename, i) => {
                    const deleteFile = () => {
                        const newQuestionFile = [...questionFile];
                        const newShowQuestionFile = [...showQuestionFile];
                        newQuestionFile.splice(i, 1);
                        newShowQuestionFile.splice(i, 1);
                        setQuestionFile(newQuestionFile);
                        setShowQuestionFile(newShowQuestionFile);
                    };
                    return (
                        <div className="file-wrap" key={"newFile-" + i}>
                            <p>
                                <span className="filename">{filename}</span>
                                <span className="material-icons del-file-icon" onClick={deleteFile}>
                                    close
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="question-submit">
                <button className="question-submit-btn" onClick={submit}>접수하기</button>
            </div>
        </div>
    );
};

export default WriteQuestion;
