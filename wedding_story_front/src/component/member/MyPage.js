import { Link } from "react-router-dom";
import "./mypage.css";

const MyPage = () => {
  return (
    <section className="mypage-wrap">
      <div className="mypage-wrap-content">
        <div className="mypage-step1">
          <div>
            <div>마이페이지 헤더</div>
          </div>
        </div>
        <div className="mypage-main-content">
          <div className="mypage-step2">
            <div>
              <Link to="#">
                <div>
                  <span>내정보</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="mypage-content">
            <div>내용</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
