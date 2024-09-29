import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from "axios";
import styles from "./ProductReview.module.css";
import { ReviewForm } from "../components";

const ProductReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberNo, setMemberNo] = useRecoilState(loginIdState);
  const [member, setMember] = useState({
    memberId: "",
  });
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const productNo = 123; // 실제 제품번호로 교체
  const payNo = 456; // 실제 결제번호로 대체

  const handleOpenPopup = () => {
    setCurrentReview(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentReview(null);
  };

  useEffect(() => {
    axios
      .get(`${backServer}/product/memberNo/${memberNo}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data); // 응답 구조가 리뷰 배열과 일치한다고 가정
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, memberNo]);

  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      productCommentNo: currentReview
        ? currentReview.productCommentNo
        : Date.now(),
      productNo,
      payNo,
      memberNo,
      rating: reviewData.rating,
      review: reviewData.review,
      creation: new Date(),
      image: reviewData.image, // 리뷰 객체에 이미지 추가
    };

    if (currentReview) {
      // 기존 리뷰 업데이트
      setReviews((prev) =>
        prev.map((review) =>
          review.productCommentNo === currentReview.productCommentNo
            ? newReview
            : review
        )
      );
    } else {
      // 새 리뷰 추가
      setReviews((prev) => [...prev, newReview]);
    }
    handleClosePopup(); // 제출 후 팝업 닫기
  };

  const handleEditReview = (review) => {
    setCurrentReview(review);
    setIsPopupOpen(true);
  };

  const handleDeleteReview = (productCommentNo) => {
    setReviews((prev) =>
      prev.filter((review) => review.productCommentNo !== productCommentNo)
    );
  };

  return (
    <div className={styles["product-reviews"]}>
      <h3>리뷰</h3>
      <button onClick={handleOpenPopup}>리뷰 작성</button>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.productCommentNo} className={styles["review-item"]}>
            <div className={styles["review-rating"]}>
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
            <div className={styles["review-name"]}>{loginIdState.loginId}</div>
            <div className={styles["review-text"]}>{review.review}</div>
            {review.image && (
              <img
                src={review.image}
                alt="Review"
                style={{ width: "300px", height: "300px" }}
              />
            )}
            <button onClick={() => handleEditReview(review)}>수정</button>
            <button onClick={() => handleDeleteReview(review.productCommentNo)}>
              삭제
            </button>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
      <ReviewForm
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleReviewSubmit}
        initialData={currentReview} // 편집을 위해 currentReview 데이터 전달
      />
    </div>
  );
};

export default ProductReview;
