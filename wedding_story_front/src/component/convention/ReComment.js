import { useRecoilState } from "recoil";
import { loginNoState } from "../utils/RecoilData";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  const editTextContainerRef = useRef(null);
  const reTextareaRef = useRef(null);
  const contentContainerRef = useRef(null);
  const lineTypeRef = useRef(null);
  const longContentRef = useRef(null);

  const {
    rc,
    c,
    changedComment,
    setChangedComment,
    conventionNo,
    isOpenReComment,
  } = props;



  const reCommentWrtieCheck = (editComment) => {
    let testCommentContet;

    if(editComment) testCommentContet = editCommentContent;
    else testCommentContet = reCommentContent;
    
    const commentRegex = /^[\s\S]{0,1000}$/;
    
    if(testCommentContet.trim() === ""){
      console.log("비어있음");
      return false;
    }
    // else if(!commentRegex.test(testCommentContet.replace(/\n/g, ''))){
    else if(!commentRegex.test(testCommentContet)){
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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditCommentContent(rc.conventionCommentContent);
  }, []);

  const editComment = () => {
    // setEditCommentContent(rc.conventionCommentContent);
    editTextareaRef.current.value = rc.conventionCommentContent;
    contentRef.current.style.display = "none";
    contentContainerRef.current.style.display = "none";
    editTextContainerRef.current.style.display = "block";
    editTextareaRef.current.style.display = "block";
    if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
      editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
    }
    else if(editTextareaRef.current.scrollHeight == editTextareaRef.current.clientHeight){
      editTextareaRef.current.style.borderRadius = "30px";
    }
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
        contentContainerRef.current.style.display = "block";
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
    if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
      editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
    }
  }
  
  const cancelReCommentBtn = () => {
    setReCommentBtnType(true);
    reCommentRef.current.style.display = "none";
  }

  const reCommentLineHeight = 24;

  const [isOverFlowing, setIsOverFlowing] = useState(false);
  let width = window.innerWidth;
  const [heightType, setHeightType] = useState(120);
  
  useEffect(() => {
    if(contentContainerRef.current && contentContainerRef.current.scrollHeight > heightType){
      setIsOverFlowing(true);
      setLineType(false);
      contentContainerRef.current.style.height = heightType;
    }
    else{
      setIsOverFlowing(false);
    }
  }, [rc, heightType, isOpenReComment]);

  const handleResize = () => {
    // setWidth(window.innerWidth);
    width = window.innerWidth;
    // console.log(width);
    //사용자 너비가 1200, 768 , 480 으로 될때마다 heightType 변경
    if(width > 1200) setHeightType(120);
    else if(width > 768 && width <= 1200) setHeightType(105);
    else if(width > 480 && width <= 768) setHeightType(110);
    else if(width < 480) setHeightType(95);
    
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    setChangedComment(!changedComment);
  }, [heightType]);

  return (
    <>
      <div className="convention-reComment">
        <div className="convention-reComment-header-zone-container">
          <div className="convention-reComment-header-zone-child1">
            <div className="convention-reComment-writer">
              <span>{rc.memberId}</span>
            </div>

            <div className="convention-reComment-date">
              {heightType === 110 || heightType === 95 ? 
              <span>{rc.conventionCommentDate.substring(2,16)}</span>
              :
              <span>{rc.conventionCommentDate.substring(0,16)}</span>
              }
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



        {isOverFlowing ? 
        <>

          <div className="convention-reComment-content-zone-container" ref={contentContainerRef} style={{height : heightType}}>
            <span ref={contentRef} id="white-space">{rc.conventionCommentContent}</span>
          </div>

          <div className="convention-reComment-content-edit-zone-container" style={{display:"none"}} ref={editTextContainerRef} >
            <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
            style={{display:"none"}} onChange={(e) => {
              setEditCommentContent(e.target.value);
              if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
                editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
              }
              else if(editTextareaRef.current.scrollHeight == editTextareaRef.current.clientHeight){
                editTextareaRef.current.style.borderRadius = "30px";
              }
            }} onKeyUp={(e) => {
              if(e.key === "Enter" && e.keyCode === 13 && !e.shiftKey) edit()
            }} ></textarea>
          </div>

          <div className="long-convention-reComment" ref={longContentRef}>
            <span className="cursor-p" ref={lineTypeRef} onClick={() => {
              if(lineType){
                contentContainerRef.current.style.height = heightType+"px";
                console.log(heightType);
                console.log("sdasdasdasda");
              }
              else{
                contentContainerRef.current.style.height = "auto"
              }
              setLineType(!lineType);
            }}>{lineType ? "간략히" : "자세히 보기"}</span>
          </div>
        </>
          : 
          <>
            <div className="convention-reComment-content-zone-container" ref={contentContainerRef} style={{height : "auto"}}>
              <span ref={contentRef} id="white-space">{rc.conventionCommentContent}</span>
            </div>

            <div className="convention-reComment-content-edit-zone-container" style={{display:"none"}} ref={editTextContainerRef} >
              <textarea spellCheck={false} ref={editTextareaRef} id="edit-textarea" 
              style={{display:"none"}} onChange={(e) => {
                setEditCommentContent(e.target.value);
                if(editTextareaRef.current.scrollHeight > editTextareaRef.current.clientHeight){
                  editTextareaRef.current.style.borderRadius = "30px 0px 0px 30px";
                }
                else if(editTextareaRef.current.scrollHeight == editTextareaRef.current.clientHeight){
                  editTextareaRef.current.style.borderRadius = "30px";
                }
              }} onKeyUp={(e) => {
                if(e.key === "Enter" && e.keyCode === 13 && !e.shiftKey) edit()
              }} ></textarea>
            </div>
            
          </>
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
            }} onKeyUp={(e) => {
              if(e.key === "Enter" && e.keyCode === 13 && !e.shiftKey) reCommentWrite()
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