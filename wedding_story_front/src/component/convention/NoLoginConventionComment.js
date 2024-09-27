import { Link } from "react-router-dom";
import "./noLoginConventionComment.css";

const NoLoginConventionComment = () => {
  return (
    <div className="convention-comment-no-login">
      <span>로그인이 필요한 서비스 입니다.</span>
      <Link to="/login">로그인 하러가기</Link>
    </div>
  )
}
export default NoLoginConventionComment
