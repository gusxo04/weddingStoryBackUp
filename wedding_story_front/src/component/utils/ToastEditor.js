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
      toolbarItems={toolbarItems} autofocus={false}
      />

      : 
      <Editor ref={editorRef} initialValue={boardContent} initialEditType="wysiwyg" 
      language="ko-KR" height="600px" onChange={changeValue} 
      />
      }
      {/* 밑에 있는 Editor 컴포넌트 props 수정해서 쓰시면 됩니다 위에꺼는 박람회 용이라서 조금 달라요 */}
      {/* type 이라는 props 안 주면 아래꺼로 사용가능 (1을 주게 되면은 위에꺼 컴포넌트 쓰게 됨) */}
      
    </div>
  )
}
export default ToastEditor