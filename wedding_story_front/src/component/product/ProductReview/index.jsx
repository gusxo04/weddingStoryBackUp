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
	const [memberNo, setMemberNo] = useRecoilState(loginIdState); // 로그인 상태 확인
	const [member, setMember] = useState({
		memberId: "",
	});
	const [reviews, setReviews] = useState([]); // 배열로 수정
	const [currentReview, setCurrentReview] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [productNo, setProductNo] = useState(); // 실제 제품번호로 교체
	const [payNo, setPayNo] = useState(); // 실제 결제번호로 대체

	// 팝업 열기 함수 (리뷰 작성)
	const handleOpenPopup = () => {
		if (!memberNo) {
			alert("리뷰를 작성하려면 로그인해야 합니다."); // 로그인 상태가 아니면 알림
			return;
		}
		setCurrentReview(null);
		setIsPopupOpen(true);
	};

	// 팝업 닫기 함수
	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setCurrentReview(null);
	};

	// 리뷰 가져오기
	useEffect(() => {
		if (memberNo) {
			axios
				.get(`${backServer}/productComment/memberNo/${memberNo}`)
				.then((res) => {
					console.log(res.data);
					setReviews(res.data); // 응답 구조가 리뷰 배열과 일치한다고 가정
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [backServer, memberNo]);

	// 리뷰 제출 함수
	const handleReviewSubmit = (reviewData) => {
		const newReview = {
			productCommentNo: currentReview ? currentReview.productCommentNo : Date.now(),
			productNo, // 제품번호
			payNo, // 결제번호
			memberNo, // 회원번호
			rating: reviewData.rating, // 별점
			review: reviewData.review, // 리뷰내용
			image: reviewData.image || null, // 리뷰 객체에 이미지 추가
		};

		if (currentReview) {
			// 기존 리뷰 업데이트
			setReviews((prev) => prev.map((review) => (review.productCommentNo === currentReview.productCommentNo ? newReview : review)));
		} else {
			// 새 리뷰 추가
			setReviews((prev) => [...prev, newReview]); // 기존 리뷰 배열에 추가
		}

		handleClosePopup(); // 제출 후 팝업 닫기
	};

	return (
		<div className={styles["product-reviews"]}>
			<h3>리뷰</h3>
			{/* 로그인된 사용자만 리뷰 작성 버튼을 볼 수 있음 */}
			{memberNo ? <button onClick={handleOpenPopup}>리뷰 작성</button> : <p>리뷰를 작성하려면 로그인하세요.</p>}
			{Array.isArray(reviews) && reviews.length > 0 ? (
				reviews.map((review) => (
					<div key={review.productCommentNo} className={styles["review-item"]}>
						<div>
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
							</div>
							<div className={styles["review-name"]}>{loginIdState.loginId}</div>
							<div className={styles["review-text"]}>{review.review}</div>
						</div>
						{review.image && <img src={review.image} alt="Review" />}
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
