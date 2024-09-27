import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { loginNoState } from "../utils/RecoilData";
import Comment from './Comment';

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
  
    const commentRegex = /^.{0,1000}$/;
    
    if(commentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(commentContent.replace(/\n/g, ''))){
      console.log(commentContent);
      console.log("너무 큼");
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

  // const cancelAllTextareaRef = useRef(null);


  return (
    
    <div className="convention-comment-wrap">
      {/* 금요일날 만들 거 1 -> 로그인 안 했으면 댓글 못 달게 막아야 함 */}
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
          }} spellCheck={false} placeholder="댓글을 작성해주세요"></textarea>
        </div>

        <div className="convention-comment-write-btn-zone">
          <button onClick={writeComment}>작성</button>
        </div>
      </div>

      <div className="convention-comment-list-wrap">
        <div className="convention-comment-show">
          {/* c는 comment고 rc는 reComment */}
          {comment.commentList?.map((c,index) => {
              const cancelAllReComment = () => {
                // cancelAllTextareaRef.current.style.display = "none";
              }
            return (
              <div className="convention-comment-list-zone" key={"comment"+index}>
                <Comment c={c} comment={comment} index={index} 
                getReComment={getReComment} isOpenReComment={isOpenReComment} 
                reCommentContent={reCommentContent} setReCommentContent={setReCommentContent}
                cancelAllReComment={cancelAllReComment} 
                changedComment={changedComment} setChangedComment={setChangedComment}
                conventionNo={convention.conventionNo}
                />
                
                {/* {c.reCommentList?.map((rc, index) => {
                  console.log("dssdsd"+c);
                  console.log(rc);
                  return (
                    // {comment.conventionCommentNo === reComment.conventionCommentRef ?  : ""}
                    <div key={"reComment"+index} className="convention-reComment">
                      {rc.conventionCommentContent}
                    </div>
                  )
                })} */}
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  )
}






export default ConventionComment;