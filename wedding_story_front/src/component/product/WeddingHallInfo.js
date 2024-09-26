import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../utils/ReviewFrom";
import { FaStar } from "react-icons/fa";

const WeddingHallInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const boardNo = params.boardNo;
  const [product, setProduct] = useState();
  const [board, setBoard] = useState({});
  //const [loginId, setLoginId] = useRecoilState();
  const [reviews, setReviews] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const navigator = useNavigate();

  const handleOpenPopup = () => {
    setCurrentReview(null); // Reset currentReview for new review
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentReview(null);
  };

  const handleReviewSubmit = (reviewData) => {
    if (currentReview) {
      // 리뷰 수정
      setReviews((prev) =>
        prev.map((review) =>
          review.id === currentReview.id ? { ...review, ...reviewData } : review
        )
      );
    } else {
      // 새 리뷰 추가
      setReviews((prev) => [...prev, { id: Date.now(), ...reviewData }]);
    }
    handleClosePopup(); // Close popup after submission
  };

  useEffect(() => {
    axios
      .get(`${backServer}/product/boardNo/${boardNo}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [boardNo, backServer]);

  return (
    <section className="product-view-wrap">
      <div className="product-title">
        <h3>웨딩홀 상세보기</h3>
      </div>
      <div className="product-view-content">
        <div className="product-view-info">
          <div className="product-thumbnail">
            <img
              src={
                board.boardThumb
                  ? `${backServer}/board/thumb/${board.boardThumb}`
                  : "/image/default_img.png"
              }
              alt={board.boardTitle}
            />
          </div>
          <div className="product-view-preview">
            <div className="prduct-report">
              <Link to="/">
                <h5>뒤로가기/</h5>
              </Link>
              <Link>
                <h5>신고하기</h5>
              </Link>
            </div>
            <table className="product-tbl">
              <tbody>
                <tr>
                  <th style={{ width: "20%" }}>회사명</th>
                  <td style={{ width: "30%" }}>{board.companyName}</td>
                </tr>
                <tr>
                  <th style={{ width: "20%" }}>작성자</th>
                  <td style={{ width: "30%" }}>{board.boardWriter}</td>
                </tr>
                <tr>
                  <th style={{ width: "20%" }}>가격</th>
                  <td colSpan={4}>{board.productPrice}원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="product-btn-zone">
          <button type="button" className="btn">
            <Link to="/counseling/counsel">상담하기</Link>
          </button>
          <button type="button" className="btn">
            <Link to="/product/weddingHall">예약하기</Link>
          </button>
        </div>
        <div className="product-content-wrap">
          <h3>상세보기</h3>
          {board.boardContent ? (
            <Viewer initialValue={board.boardContent} />
          ) : (
            ""
          )}
        </div>
        <br />
        <div className="product-reviews">
          <h3>리뷰</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-rating">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      style={{
                        color: index < review.rating ? "gold" : "gray",
                        fontSize: "24px",
                      }}
                    />
                  ))}
                  <span>{` ${review.rating} / 5`}</span>
                </div>
                <div className="review-text">{review.review}</div>
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
          <ReviewForm
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            onSubmit={handleReviewSubmit}
            initialData={currentReview}
          />
        </div>
        <br />
        <div className="product-faq">
          <h3>FAQ</h3>
        </div>
        <br />
        <div className="product-map-view">
          {/* 회사 위치를 표시하는 지도 구성 요소가 있다고 가정합니다. */}
          <h3>회사 위치</h3>
          {/* 지도 구성 요소에 대한 자리 표시자입니다. 여기에 지도 API를 통합하세요 */}
          {/* <MapComponent location={board.companyLocation} /> */}
        </div>
      </div>
    </section>
  );
};

export default WeddingHallInfo;