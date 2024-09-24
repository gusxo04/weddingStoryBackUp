import { useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import { FaStar } from "react-icons/fa";
import ReviewForm from "../utils/ReviewFrom";

const ProductReviewUpdate = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      setReviews((prev) => [
        ...prev,
        { id: Date.now(), ...reviewData },
      ]);
    }
    handleClosePopup(); // Close popup after submission
  };

  const handleEditReview = (review) => {
    setCurrentReview(review);
    setIsPopupOpen(true);
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => prev.filter((review) => review.id !== id));
  };

  return (
    <div className="product-reviews">
      <h3>리뷰</h3>
      <button onClick={handleOpenPopup}>리뷰 작성</button>
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
            <button onClick={() => handleEditReview(review)}>수정</button>
            <button onClick={() => handleDeleteReview(review.id)}>삭제</button>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
      <ReviewForm
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleReviewSubmit}
        initialData={currentReview} // Pass currentReview data for editing
      />
    </div>
  );
};

export default ProductReviewUpdate;
