import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

const ToastEditor = (props) => {


  // 키 값만 boardContent, setBoardcontent로 맞춰주면 됨
  // type은 적을 필요 없음 (1인 경우는 박람회에서 쓰는 경우임)
  const {
    boardContent, setBoardContent,
  } = props;

  let type = props.type
  
  type = type === undefined ? 0 : type;
  const editorRef = useRef(null);
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike']
  ];




  const changeValue = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    setBoardContent(editorData);
  }

  return (
    <div className="editor-wrap">
      {type === 1 ? 
      <Editor ref={editorRef} initialValue={boardContent} initialEditType="wysiwyg" 
      language="ko-KR" height="600px" onChange={changeValue} 
      toolbarItems={toolbarItems}
      />

      : 
      ""}
      {/* ""를 지우고 저기에 Editor 컴포넌트 넣으면 됨 (원하는 형식대로) */}
      
    </div>
  )
}
export default ToastEditor