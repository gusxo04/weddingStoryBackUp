import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import React, { Fragment, useRef, useState } from "react";
import { loginNoState } from "../utils/RecoilData";

const ConventionComment = (props) => {

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  // const [memberNoState, setMemberNoState] = useState(1);
  console.log(memberNoState);
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    convention,
    comment,
    setComment,
    commentContent,
    setCommentContent,
    addedComment,
    setAddedComment,
  } = props;


const writeCheck = () => {

    const commentRegex = /^.{1,1300}$/;
    
    if(commentContent.trim() === ""){
      console.log("비어있음");
      return false;
    }
    else if(!commentRegex.test(commentContent)){
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
        setAddedComment(!addedComment);
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
          <input type="text" value={commentContent} onChange={(e) => {
            setCommentContent(e.target.value);
          }} spellCheck={false} placeholder="댓글을 작성해주세요" />
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
                <Comment c={c} comment={comment} index={index} getReComment={getReComment} isOpenReComment={isOpenReComment} />
                
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

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);
  
  const{
    c,
    comment,
    index,
    getReComment,
    isOpenReComment,
  } = props;

  const reCommentBtn = () => {
    console.log(c.conventionCommentNo);
    setReCommentBtnType(false);
    reCommentRef.current.style.display = "block";
  }
  
  const cancelReCommentBtn = () => {
    console.log(c.conventionCommentNo);
    setReCommentBtnType(true);
    reCommentRef.current.style.display = "none";
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
        </div>

        <div className="convention-comment-header-zone-child2">
          <div className="convention-comment-edit">
            {c.memberNo === memberNoState ? 
            <span className="cursor-p">수정</span>
            : 
            ""}
          </div>

          <div className="convention-comment-delete">
          {c.memberNo === memberNoState ? 
            <span className="cursor-p">삭제</span>
            :
            ""
          }
          </div>
        </div>
      </div>

      <div className="convention-comment-content-zone-container">
        <span>{c.conventionCommentContent}</span>
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
        <input type="text" />
      </div>

      {c.reCommentCount !== 0 ? 
      <div className="convention-reComment-container" style={{display : isOpenReComment[index] ? "block" : "none"}}>
        <ReComment comment={comment} c={c} />
      </div>
      :
      ""}
        


      
    </div>
  )
}

const ReComment = (props) => {

  const [memberNoState, setMemberNoState] = useRecoilState(loginNoState);
  const [reCommentBtnType, setReCommentBtnType] = useState(true);
  const reCommentRef = useRef(null);

  
  
  const {
    comment,
    c,
  } = props;
  

  return (
    <>
      {comment.reCommentList?.map((rc,index) => {
        const reCommentBtn = () => {
          console.log();
          setReCommentBtnType(false);
          reCommentRef.current.style.display = "block";
        }
        
        const cancelReCommentBtn = (e) => {
          console.log(rc.conventionCommentNo);
          setReCommentBtnType(true);
          reCommentRef.current.style.display = "none";
        }
        return (
          <Fragment key={"reComment"+index}>
            {c.conventionCommentNo === rc.conventionCommentRef ? 
            <div className="convention-reComment">
              <div className="convention-reComment-header-zone-container">
                <div className="convention-reComment-header-zone-child1">
                  <div className="convention-reComment-writer">
                    <span>{rc.memberId}</span>
                  </div>

                  <div className="convention-reComment-date">
                    <span>{rc.conventionCommentDate.substring(0,16)}</span>
                  </div>
                </div>

                <div className="convention-reComment-header-zone-child2">
                  <div className="convention-reComment-edit">
                  {rc.memberNo === memberNoState ? 
                    <span className="cursor-p">수정</span>
                    :
                    ""
                  }
                  </div>

                  <div className="convention-reComment-delete">
                  {rc.memberNo === memberNoState ? 
                    <span className="cursor-p">삭제</span>
                    :
                    ""
                  }
                  </div>
                </div>
              </div>

              <div className="convention-reComment-content-zone-container">
                <span>{rc.conventionCommentContent}</span>
              </div>

              <div className="convention-reComment-reply">
                <span className="cursor-p" onClick={reCommentBtnType ? reCommentBtn : cancelReCommentBtn}>답글</span>
              </div>

              <div className="convention-reComment-write-reply-container" style={{display:"none"}} ref={reCommentRef}>
                <input type="text" />
              </div>
              
            </div>
            : 
            ""
            }
          </Fragment>
        )
      })}
    </>
  )
}


export default ConventionComment