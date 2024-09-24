import axios from "axios";
import "./conventionComment.css";
import { useRecoilState } from "recoil";
import { Fragment, useState } from "react";

const ConventionComment = (props) => {

  // const [memberNoState, setMemberNoState] = useRecoilState();
  const [memberNoState, setMemberNoState] = useState(1);
  
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const {
    convention,
    comment,
    setComment,
    commentContent,
    setCommentContent,
  } = props;



  const writeComment = () => {
    const form = new FormData();
    form.append("conventionNo",convention.conventionNo);
    form.append("conventionCommentContent", commentContent);
    form.append("memberNo", memberNoState);
    
    axios.post(`${backServer}/convention/comment`,form)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err); 
    })
  }

  console.log(comment);
  
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
                <div className="convention-comment">
                  {c.conventionCommentContent}
                </div>
                <ReComment comment={comment} c={c} />
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

const ReComment = (props) => {

  const {
    comment,
    c,
  } = props;


  return (
    <>
      {comment.reCommentList?.map((rc,index) => {
        return (
          <Fragment key={"reComment"+index}>
            {c.conventionCommentNo === rc.conventionCommentRef ? 
            <div className="convention-reComment">
              {rc.conventionCommentContent}
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