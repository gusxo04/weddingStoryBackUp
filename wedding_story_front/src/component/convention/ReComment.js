import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { useRef, useState } from "react";
import axios from "axios";

const ReComment = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);
  const [reCommentContent, setReCommentContent] = useState("");
  const [lineType, setLineType] = useState(false);

  const [editCommentContent, setEditCommentContent] = useState("");

  const contentRef = useRef(null);
  const editTextareaRef = useRef(null);
  const reTextareaRef = useRef(null);
  const contentContainerRef = useRef(null);

  const {
    rc,
    c,
    changedComment,
    setChangedComment,
    conventionNo,
  } = props;



  const reCommentWrtieCheck = (editComment) => {
    let testCommentContet;

    if(editComment) testCommentContet = editCommentContent;
    else testCommentContet = reCommentContent;
    
    const commentRegex = /^.{1,1000}$/;
    
    if(testCommentContet.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(testCommentContet.replace(/\n/g, ''))){
      console.log("너무 큼");
      return false;
    }
    return true;
  }

  const [isEditing, setIsEditing] = useState(false);

  const editComment = () => {
    setEditCommentContent(rc.conventionCommentContent);
    contentRef.current.style.display = "none";
    editTextareaRef.current.style.display = "block";
    setIsEditing(true);
  }

  const cancelEdit = () => {
    contentRef.current.style.display = "inline";
    editTextareaRef.current.style.display = "none";
    setIsEditing(false);
  }

  const removeComment = () => {
    axios.delete(`${backServer}/convention/${rc.conventionCommentNo}`,)
    .then((res) => {
      console.log(res);
      if(res.data){
        setChangedComment(!changedComment);
      }
    })
    .catch((err) => {
      console.error(err); 
    })
    
  }

  const edit = () => {

    const checkType = reCommentWrtieCheck(true);
    if(!checkType) return;
    
    const form = new FormData();
    form.append("conventionCommentNo", rc.conventionCommentNo);
    form.append("conventionCommentContent", editCommentContent);
    axios.patch(`${backServer}/convention`,form)
    .then((res) => {
      console.log(res);
      if(res.data){
        setChangedComment(!changedComment);
        contentRef.current.style.display = "inline";
        editTextareaRef.current.style.display = "none";
        setIsEditing(false);
      }
    })
    .catch((err) => {
      console.error(err); 
    })
  }

  const reCommentWrite = () => {
    const checkType = reCommentWrtieCheck();
    if(!checkType) return;
    const form = new FormData();
    form.append("conventionNo",conventionNo);
    form.append("conventionCommentContent", reCommentContent);
    form.append("conventionCommentRef", c.conventionCommentNo);
    form.append("memberNo", memberNoState);
    
    axios.post(`${backServer}/convention/reComment`,form)
    .then(res => {
      // console.log(res);
      if(res.data){
        cancelReCommentBtn();
        setChangedComment(!changedComment);
        setReCommentContent("");
      }
    })
    .catch(err => {
      console.error(err); 
    })
  }

  const reCommentBtn = () => {
    setReCommentBtnType(false);
    setReCommentContent("@"+rc.memberId+" ");
    reCommentRef.current.style.display = "flex";
  }
  
  const cancelReCommentBtn = () => {
    setReCommentBtnType(true);
    reCommentRef.current.style.display = "none";
  }

  const reCommentLineHeight = 20;
  

  return (
    <>
      <div className="convention-reComment">
        <div className="convention-reComment-header-zone-container">
          <div className="convention-reComment-header-zone-child1">
            <div className="convention-reComment-writer">
              <span>{rc.memberId}</span>
            </div>

            <div className="convention-reComment-date">
              <span>{rc.conventionCommentDate.substring(0,16)}</span>
            </div>

            <div className="convention-reComment-is-edit">
            <span>{rc.editType === 1 ? "(수정됨)" : ""}</span>
          </div>
          </div>

          <div className="convention-reComment-header-zone-child2">
            <div className="convention-reComment-edit">
            {rc.memberNo === memberNoState ? 
              <span className="cursor-p" onClick={isEditing ? edit : editComment}>{isEditing ? "완료" : "수정"}</span>
              :
              ""
            }
            </div>

            <div className="convention-reComment-delete">
            {rc.memberNo === memberNoState ? 
              <span className="cursor-p" onClick={isEditing ? cancelEdit : removeComment}>{isEditing ? "취소" : "삭제"}</span>
              :
              ""
            }
            </div>
          </div>
        </div>



        {rc.conventionCommentContent.split("\n").length > 5 ? 
        <>

          <div className="convention-reComment-content-zone-container" ref={contentContainerRef} style={{height : reCommentLineHeight*5 +"px"}}>
            <span ref={contentRef} id="white-space">{rc.conventionCommentContent}</span>
            <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
            style={{display:"none"}} value={editCommentContent} onChange={(e) => {
              setEditCommentContent(e.target.value);
            }} ></textarea>
          </div>

          <div className="long-convention-reComment">
            <span className="cursor-p" onClick={() => {
              if(lineType){
                contentContainerRef.current.style.height = reCommentLineHeight*5 +"px";
              }
              else{
                contentContainerRef.current.style.height = reCommentLineHeight*c.conventionCommentContent.split("\n").length +"px";
              }
              setLineType(!lineType);
            }}>{lineType ? "간략히" : "자세히 보기"}</span>
          </div>
        </>
          : 
          <div className="convention-reComment-content-zone-container" ref={contentContainerRef} style={{height : reCommentLineHeight*rc.conventionCommentContent.split("\n").length +"px"}}>
            <span ref={contentRef} id="white-space">{rc.conventionCommentContent}</span>
            <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
            style={{display:"none"}} value={editCommentContent} onChange={(e) => {
              setEditCommentContent(e.target.value);
            }} ></textarea>
          </div>
          }

        <div className="convention-reComment-reply">
          <span className="cursor-p" onClick={reCommentBtnType ? reCommentBtn : cancelReCommentBtn}>답글</span>
        </div>

        <div className="convention-reComment-write-reply-container" style={{display:"none"}} ref={reCommentRef}>
          <div className="convention-reComment-reply-textarea">
            <textarea ref={reTextareaRef} id="comment-textarea" spellCheck={false} placeholder="답글을 작성해주세요" value={reCommentContent} onChange={(e) => {
              setReCommentContent(e.target.value);
              if(reTextareaRef.current.scrollHeight > reTextareaRef.current.clientHeight){
                reTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
              }
              else if(reTextareaRef.current.scrollHeight == reTextareaRef.current.clientHeight){
                reTextareaRef.current.style.borderRadius = "30px";
              }
            }}></textarea>
          </div>


          
          <div className="convention-reComment-reply-write-btn">
            <button onClick={reCommentWrite}>작성</button>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default ReComment;