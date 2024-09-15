import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

const ToastEditor = (props) => {



  const {
    boardContent, setBoardContent,
  } = props;

  let type = props.type

  type = type === undefined ? 0 : type;



  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    
  ];
  
  const editorRef = useRef(null);


  const changeValue = () => {
    const editorData = editorRef.current.getInstance().getHTML();
    setBoardContent(editorData);
  }

  return (
    <div className="editor-wrap">
      {type === 1 ? 
      <Editor ref={editorRef} initialValue={boardContent} initialEditType="wysiwyg" 
      language="ko-KR" height="600px" onChange={changeValue} useCommandShortcut={true} toolbarItems={toolbarItems} 
      />

      : 
      ""}
      
    </div>
  )
}
export default ToastEditor