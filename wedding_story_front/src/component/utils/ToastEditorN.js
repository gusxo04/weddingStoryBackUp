import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import { useRef } from "react";

const ToastEditorN = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const noticeContent = props.noticeContent;
  const setNoticeContent = props.setNoticeContent;
  const type = props.type;
  const editorRef = useRef(null);
  console.log(noticeContent);
  const changeValue = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    setNoticeContent(editorData);
  };
  const uploadImage = (file, callbackFunc) => {
    //비동기요청으로 이미지파일을 업로드하고, 업로드된 파일의 경로를 결과로 받아옴dhghfk
    const form = new FormData();
    form.append("image", file);
    axios
      .post(`${backServer}/notice/editorImage`, form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        console.log(res);
        callbackFunc(`${backServer}${res.data}`, "이미지");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {type === 0 || (type === 1 && noticeContent !== "") ? (
        <Editor
          ref={editorRef}
          initialValue={noticeContent} //초기값
          initialEditType="wysiwyg"
          language="ko-KR"
          height="600px"
          onChange={changeValue}
          hooks={{
            addImageBlobHook: uploadImage,
          }}
        ></Editor>
      ) : (
        ""
      )}
    </div>
  );
};

export default ToastEditorN;
