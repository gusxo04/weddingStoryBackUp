import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import React, { Fragment, useRef, useState } from "react";
import { loginNoState } from "../utils/RecoilData";

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

const Comment = (props) => {

  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);
  const [reCommentContent, setReCommentContent] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");

  const contentRef = useRef(null);
  const editTextareaRef = useRef(null);
  const reTextareaRef = useRef(null);
  
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

  // 댓글꺼




  const reCommentBtn = () => {
    setReCommentBtnType(false);
    reCommentRef.current.style.display = "flex";
  }
  
  const cancelReCommentBtn = () => {
    setReCommentBtnType(true);
    reCommentRef.current.style.display = "none";
  }
  
  const reCommentWrtieCheck = () => {
    const commentRegex = /^.{1,1000}$/;
    
    if(reCommentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(reCommentContent.replace(/\n/g, ''))){
      console.log("너무 큼");
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
    editTextareaRef.current.style.display = "block";
    setIsEditing(true);
  }

  const cancelEdit = () => {
    contentRef.current.style.display = "inline";
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
    const form = new FormData();
    form.append("conventionCommentNo", c.conventionCommentNo);
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

      <div className="convention-comment-content-zone-container">
        <span id="white-space" ref={contentRef}>{c.conventionCommentContent}</span>
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

const ReComment = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);
  const [reCommentContent, setReCommentContent] = useState("");

  const [editCommentContent, setEditCommentContent] = useState("");

  const contentRef = useRef(null);
  const editTextareaRef = useRef(null);
  const reTextareaRef = useRef(null);

  const {
    rc,
    c,
    changedComment,
    setChangedComment,
    conventionNo,
  } = props;



  const reCommentWrtieCheck = () => {
    const commentRegex = /^.{1,1000}$/;
    
    if(reCommentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(reCommentContent.replace(/\n/g, ''))){
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

        <div className="convention-reComment-content-zone-container">
          <span ref={contentRef} id="white-space">{rc.conventionCommentContent}</span>
          <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
          style={{display:"none"}} value={editCommentContent} onChange={(e) => {
            setEditCommentContent(e.target.value);
          }} ></textarea>
        </div>

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


export default ConventionComment