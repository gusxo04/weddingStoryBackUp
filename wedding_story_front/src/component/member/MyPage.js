import { Link, Route, Routes } from "react-router-dom";
import "./mypage.css";
import { useState } from "react";
import MyFavorite from "./MyFavorite";
import MyInfo from "./MyInfo";
import MySchedule from "./MySchedule";
import MyPayment from "./MyPayment";

const MyPage = () => {
  const [nowPath, setNowPath] = useState("schedule");

  return (
    <section className="mypage-wrap">
      <div className="mypage-wrap-content">
        <div className="mypage-step">
          <div>
            <h3>
              {`${
                nowPath == "schedule"
                  ? "My Wedding Schedule"
                  : nowPath == "payment"
                  ? "My Wedding Payment"
                  : nowPath == "favorite"
                  ? "My Favorite Product"
                  : "My Information"
              }`}
            </h3>
          </div>
        </div>
        <div className="mypage-main-content">
          <div className="mypage-menu-box">
            <div>
              <Link to="schedule">
                <div
                  className={`${
                    nowPath === "schedule" ? "mypage-menu here" : "mypage-menu"
                  }`}
                >
                  일정 관리
                </div>
              </Link>
              <Link to="payment">
                <div
                  className={`${
                    nowPath === "payment" ? "mypage-menu here" : "mypage-menu"
                  }`}
                >
                  결제 내역
                </div>
              </Link>
              <Link to="favorite">
                <div
                  className={`${
                    nowPath === "favorite" ? "mypage-menu here" : "mypage-menu"
                  }`}
                >
                  관심 상품
                </div>
              </Link>
              <Link to="info">
                <div
                  className={`${
                    nowPath === "info" ? "mypage-menu here" : "mypage-menu"
                  }`}
                >
                  나의 정보
                </div>
              </Link>
            </div>
          </div>
          <div className="mypage-content">
            <Routes>
              <Route
                path="schedule"
                element={<MySchedule setNowPath={setNowPath} />}
              />
              <Route
                path="payment"
                element={<MyPayment setNowPath={setNowPath} />}
              />
              <Route
                path="favorite"
                element={<MyFavorite setNowPath={setNowPath} />}
              />
              <Route path="info" element={<MyInfo setNowPath={setNowPath} />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MyPage;
