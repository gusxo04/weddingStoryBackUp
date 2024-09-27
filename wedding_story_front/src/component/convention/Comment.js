import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import axios from "axios";
import ReComment from './ReComment';
import Swal from "sweetalert2";

const Comment = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);
  const [reCommentContent, setReCommentContent] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");
  const [lineType, setLineType] = useState(false);

  const contentRef = useRef(null);
  const contentContainerRef = useRef(null);
  const editTextareaRef = useRef(null);
  const editTextContainerRef = useRef(null);
  const reTextareaRef = useRef(null);
  const lineTypeRef = useRef(null);
  const longContentRef = useRef(null);
  
  const{
    c,
    comment,
    index,
    getReComment,
    isOpenReComment,
    cancelAllReComment,
    conventionNo,
    changedComment,
    setChangedComment,
  } = props;


  const reCommentBtn = () => {
    setReCommentBtnType(false);
    // contentContainerRef.current.style.height = "150px";
    if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
      editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
    }
    reCommentRef.current.style.display = "flex";
  }
  
  const cancelReCommentBtn = () => {
    setReCommentBtnType(true);
    reCommentRef.current.style.display = "none";
  }
  
  const reCommentWrtieCheck = (editComment) => {
    let testCommentContent;
    if(editComment) testCommentContent = editCommentContent;
    else testCommentContent = reCommentContent;

    const commentRegex = /^[\s\S]{0,1000}$/;
    
    if(testCommentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    // else if(!commentRegex.test(testCommentContent.replace(/\n/g, ''))){
    else if(!commentRegex.test(testCommentContent)){
      console.log("너무 큼");
      Swal.fire({
        title : "박람회 댓글",
        text : "너무 많은 내용을 입력하셨습니다",
        icon : "warning",
        iconColor : "var(--main1)",
        confirmButtonText : "확인",
        confirmButtonColor : "var(--main1)"
      })
      return false;
    }
    return true;
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

  const [isEditing, setIsEditing] = useState(false);

  const editComment = () => {
    setEditCommentContent(c.conventionCommentContent);
    contentRef.current.style.display = "none";
    contentContainerRef.current.style.display = "none";
    editTextContainerRef.current.style.display = "block";
    editTextareaRef.current.style.display = "block";
    setIsEditing(true);
  }

  
  
  const cancelEdit = () => {
    contentRef.current.style.display = "inline";
    contentContainerRef.current.style.display = "block";
    editTextContainerRef.current.style.display = "none";
    editTextareaRef.current.style.display = "none";
    setIsEditing(false);
  }

  const removeComment = () => {
    axios.delete(`${backServer}/convention/${c.conventionCommentNo}`,)
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
    form.append("conventionCommentNo", c.conventionCommentNo);
    form.append("conventionCommentContent", editCommentContent);
    axios.patch(`${backServer}/convention`,form)
    .then((res) => {
      console.log(res);
      if(res.data){
        setChangedComment(!changedComment);
        contentRef.current.style.display = "inline";
        editTextContainerRef.current.style.display = "none";
        editTextareaRef.current.style.display = "none";
        contentContainerRef.current.style.display = "block";
        setIsEditing(false);
      }
    })
    .catch((err) => {
      console.error(err); 
    })
  }
  const commentLineHeight = 20;

  // useEffect(() => {
  //   setLineType(false);
  //   // console.log(contentRef.current.offsetHeight);
  //   if(lineTypeRef.current && lineTypeRef.current.textContent === "간략히"){
  //     lineTypeRef.current.click();
  //   }
  // }, [changedComment]);


  // useEffect(() => {
  //   console.log(c);
  //   console.log(contentContainerRef.current);
  //   if(contentContainerRef.current && contentContainerRef.current.offsetHeight > 100){
  //     longContentRef.current.style.display = "block";
  //     contentContainerRef.current.style.height = "100px";
  //   }
  //   else if(contentContainerRef.current && contentContainerRef.current.offsetHeight <= 100){
  //     contentContainerRef.current.style.height = "auto";
  //     longContentRef.current.style.display = "none";
  //   }
  // }, [c]);
  
  const [isOverFlowing, setIsOverFlowing] = useState(false);
  
  useEffect(() => {
    setIsOverFlowing(false);
    if(c.conventionCommentContent.split("\n").length > 5 || (contentContainerRef.current && contentContainerRef.current.offsetHeight > 100)){
      setIsOverFlowing(true);
      setLineType(false);
      contentContainerRef.current.style.height = commentLineHeight*5 +"px";
    }
  }, [c]);

  return (
    <div className="convention-comment">
      <div className="convention-comment-header-zone-container">

        <div className="convention-comment-header-zone-child1">
          <div className="convention-comment-writer">
            <span>{c.memberId}</span>
          </div>

          <div className="convention-comment-date">
            <span>{c.conventionCommentDate.substring(0,16)}</span>
          </div>

          <div className="convention-comment-is-edit">
            <span>{c.editType === 1 ? "(수정됨)" : ""}</span>
          </div>
        </div>

        <div className="convention-comment-header-zone-child2">
          <div className="convention-comment-edit">
            {c.memberNo === memberNoState ? 
            <span className="cursor-p" onClick={isEditing ? edit : editComment}>{isEditing ? "완료" : "수정"}</span>
            : 
            ""}
          </div>

          <div className="convention-comment-delete">
          {c.memberNo === memberNoState ? 
            <span className="cursor-p" onClick={isEditing ? cancelEdit : removeComment}>{isEditing ? "취소" : "삭제"}</span>
            :
            ""
          }
          </div>
        </div>
      </div>

      

      {/* {c.conventionCommentContent.split("\n").length > 5 ?  */}
      {isOverFlowing ?
      <>
        <div className="convention-comment-content-zone-container" ref={contentContainerRef} style={{height : commentLineHeight*5 +"px"}} >
          <span id="white-space" ref={contentRef}>{c.conventionCommentContent}</span>
        </div>

        <div className="convention-comment-content-edit-zone-container" style={{display:"none"}} ref={editTextContainerRef}>
          <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
          style={{display:"none"}} value={editCommentContent} onChange={(e) => {
            setEditCommentContent(e.target.value);
            if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
              editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
            }
            else if(editTextareaRef.current.scrollHeight == editTextareaRef.current.clientHeight){
              editTextareaRef.current.style.borderRadius = "30px";
            }
          }} ></textarea>
        </div>

        
        <div className="long-convention-comment" ref={longContentRef} >
          <span className="cursor-p" ref={lineTypeRef} onClick={() => {
            if(lineType){
              contentContainerRef.current.style.height = commentLineHeight*5 +"px";
            }
            else{
              // contentContainerRef.current.style.height = commentLineHeight*c.conventionCommentContent.split("\n").length +"px";
              contentContainerRef.current.style.height = "auto";
            }
            setLineType(!lineType);
          }}>{lineType ? "간략히" : "자세히 보기"}</span>
        </div>
      </>
      : 
      <>
        <div className="convention-comment-content-zone-container" ref={contentContainerRef} style={{height:"auto"}}>
          <span id="white-space" ref={contentRef}>{c.conventionCommentContent}</span>
        </div>

        <div className="convention-comment-content-edit-zone-container" style={{display:"none"}} ref={editTextContainerRef}>
          <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
          style={{display:"none"}} value={editCommentContent} onChange={(e) => {
            setEditCommentContent(e.target.value);
            if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
              editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
            }
            else if(editTextareaRef.current.scrollHeight == editTextareaRef.current.clientHeight){
              editTextareaRef.current.style.borderRadius = "30px";
            }
          }} ></textarea>
        </div>
      </>
      }

        

      

      <div className="convention-comment-reply-container">
        <div className="convention-comment-reply">
          <span className="cursor-p" onClick={reCommentBtnType ? reCommentBtn : cancelReCommentBtn}>답글</span>
        </div>

        {c.reCommentCount !== 0 ? 
        <>
          <div className="convention-comment-more-btn-zone">
            <span id="more-recomment-btn" className="cursor-p" onClick={() => {getReComment(index)}}  >답글 {c.reCommentCount}개 {isOpenReComment[index] ? "그만보기" : "더보기"}</span>
          </div>
        </>
        : 
        ""}


      </div>

      <div className="convention-comment-write-reply-container" style={{display:"none"}} ref={reCommentRef}>
        <div className="convention-comment-reply-textarea">
          <textarea ref={reTextareaRef} id="comment-textarea" placeholder="답글을 작성해주세요" spellCheck={false} value={reCommentContent} onChange={(e) => {
            setReCommentContent(e.target.value);
            if(reTextareaRef.current.scrollHeight > reTextareaRef.current.clientHeight){
              reTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
            }
            else if(reTextareaRef.current.scrollHeight == reTextareaRef.current.clientHeight){
              reTextareaRef.current.style.borderRadius = "30px";
            }
          }} ></textarea>
        </div>
        <div className="convention-comment-reply-write-btn">
          <button onClick={reCommentWrite}>작성</button>
        </div>
      </div>

      {c.reCommentCount !== 0 ? 
      <div className="convention-reComment-container" style={{display : isOpenReComment[index] ? "block" : "none"}}>
        {comment.reCommentList?.map((rc,index) => {
          return  (
            <Fragment key={"reComment"+index}>
              {c.conventionCommentNo === rc.conventionCommentRef ? 
              <ReComment rc={rc} reCommentContent={reCommentContent} setReCommentContent={setReCommentContent} 
              cancelAllReComment={cancelAllReComment}
              conventionNo={conventionNo} changedComment={changedComment} setChangedComment={setChangedComment}
              c={c}
              />
              :
              ""
              }
            </Fragment>
          )
        })}
      </div>
      :
      ""}
        


      
    </div>
  )
}

export default Comment;