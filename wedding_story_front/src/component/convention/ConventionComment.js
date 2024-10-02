import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { loginNoState } from "../utils/RecoilData";
import Comment from './Comment';
import Swal from "sweetalert2";

const ConventionComment = (props) => {

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const textareaRef = useRef(null);
  
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    convention,
    comment,
    setComment,
    commentContent,
    setCommentContent,
    changedComment,
    setChangedComment,
    reCommentContent,
    setReCommentContent,
  } = props;


const writeCheck = () => {
  
    const commentRegex = /^[\s\S]{0,1000}$/;
    
    if(commentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    // else if(!commentRegex.test(commentContent.replace(/\n/g, ''))){
    else if(!commentRegex.test(commentContent)){
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

  const writeComment = () => {

    const checkType = writeCheck();
    if(!checkType) return;
    const form = new FormData();
    form.append("conventionNo",convention.conventionNo);
    form.append("conventionCommentContent", commentContent);
    form.append("memberNo", memberNoState);
    
    axios.post(`${backServer}/convention/comment`,form)
    .then(res => {
      // console.log(res);
      if(res.data){
        setChangedComment(!changedComment);
        textareaRef.current.style.borderRadius = "30px";
        setCommentContent("");
      }
    })
    .catch(err => {
      console.error(err); 
    })
  }



  const [isOpenReComment, setIsOpenReComment] = useState({});

  const getReComment = (e) => {
    setIsOpenReComment((prev) => ({...prev, [e]: !prev[e]}))
  }



  return (
    
    <div className="convention-comment-wrap">
      <div className="convention-comment-write-wrap">
        <div className="convention-comment-input-wrap">
          {/* <input type="text" value={commentContent} onChange={(e) => {
            setCommentContent(e.target.value);
          }} spellCheck={false} placeholder="댓글을 작성해주세요" /> */}
          <textarea ref={textareaRef} id="comment-textarea" value={commentContent} onChange={(e) => {
            setCommentContent(e.target.value);
            if(textareaRef.current.scrollHeight > textareaRef.current.clientHeight){
              textareaRef.current.style.borderRadius = "30px 0px 0px 30px";
            }
            else if(textareaRef.current.scrollHeight == textareaRef.current.clientHeight){
              textareaRef.current.style.borderRadius = "30px";
            }
          }} spellCheck={false} placeholder="댓글을 작성해주세요"
          onKeyUp={(e) => {
            if(e.key === "Enter" && e.keyCode === 13 && !e.shiftKey) writeComment()
            else if(e.keyCode === 13 && !e.shiftKey) writeComment();
          // e.key가 안 되는 브라우저를 위해서
          }}
          ></textarea>
        </div>

        <div className="convention-comment-write-btn-zone">
          <button onClick={writeComment}>작성</button>
        </div>
      </div>

      <div className="convention-comment-list-wrap">
        <div className="convention-comment-show">
          {/* c는 comment고 rc는 reComment */}
          {comment.commentList?.map((c,index) => {


            
            return (
              <div className="convention-comment-list-zone" key={"comment"+index}>
                <Comment c={c} comment={comment} index={index} 
                getReComment={getReComment} isOpenReComment={isOpenReComment} 
                reCommentContent={reCommentContent} setReCommentContent={setReCommentContent}
                changedComment={changedComment} setChangedComment={setChangedComment}
                conventionNo={convention.conventionNo}
                />
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  )
}






export default ConventionComment;