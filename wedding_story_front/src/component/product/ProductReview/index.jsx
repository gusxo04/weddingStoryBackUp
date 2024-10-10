import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginNoState } from "../../utils/RecoilData";
import axios from "axios";
import styles from "./ProductReview.module.css";
import { ReviewForm } from "../components";
import { useParams } from "react-router-dom";

const ProductReview = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [memberNo, setMemberNo] = useRecoilState(loginNoState); // 로그인 상태 확인
	const params = useParams();
	const productNo = params.productNo; // URL에서 상품 번호 가져오기
	const [reviews, setReviews] = useState([]); // 리뷰 리스트
	const [currentReview, setCurrentReview] = useState(null); // 현재 편집 중인 리뷰
	const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
	const [payNo, setPayNo] = useState(); // 실제 결제번호로 대체 (임시 값)

	// 팝업 열기 함수 (리뷰 작성)
	const handleOpenPopup = () => {
		if (!memberNo) {
			alert("리뷰를 작성하려면 로그인해야 합니다."); // 로그인 상태가 아니면 알림
			return;
		}
		setCurrentReview(null); // 새 리뷰 작성 시 currentReview 초기화
		setIsPopupOpen(true); // 팝업 열기
	};

	// 팝업 닫기 함수
	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setCurrentReview(null); // 팝업 닫을 때 현재 리뷰 초기화
	};

	// 서버에서 리뷰 데이터 가져오기 (GET)
	const fetchReviews = () => {
		axios
			.get(`${backServer}/productComment/productNo/${productNo}`) // 제품번호로 리뷰 조회
			.then((res) => {
				console.log(res.data);
				setReviews(res.data); // 응답 데이터를 리뷰로 설정
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 컴포넌트가 처음 마운트될 때 리뷰 데이터를 가져옴
	useEffect(() => {
		fetchReviews();
	}, [productNo]); // productNo 변경 시마다 리뷰 가져오기

	// 리뷰 제출 함수
	const handleReviewSubmit = (reviewData) => {
		const newReview = {
			productNo, // 제품 번호
			payNo, // 결제 번호
			memberNo, // 회원 번호
			rating: reviewData.rating, // 별점
			review: reviewData.review, // 리뷰 내용
			image: reviewData.image || null, // 이미지 추가
		};

		if (currentReview) {
			// 기존 리뷰 업데이트
			axios
				.put(`${backServer}/productComment/${currentReview.productCommentNo}`, newReview)
				.then((res) => {
					console.log(res);
					fetchReviews(); // 리뷰 업데이트 후 최신 데이터 가져오기
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// 새 리뷰 추가
			axios
				.post(`${backServer}/productComment`, newReview)
				.then((res) => {
					console.log(res);
					fetchReviews(); // 리뷰 추가 후 최신 데이터 가져오기
				})
				.catch((err) => {
					console.log(err);
				});
		}

		handleClosePopup(); // 제출 후 팝업 닫기
	};

	return (
		<div className={styles["product-reviews"]}>
			<h3>리뷰</h3>
			{/* 로그인된 사용자만 리뷰 작성 버튼을 볼 수 있음 */}
			{memberNo ? <button onClick={handleOpenPopup}>리뷰 작성</button> : <p>리뷰를 작성하려면 로그인하세요.</p>}
			{/* 리뷰 목록 표시 */}
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
							<div className={styles["review-name"]}>{review.memberId}</div>
							<div className={styles["review-text"]}>{review.review}</div>
						</div>
						{review.image && <img src={review.image} alt="Review" />}
					</div>
				))
			) : (
				<p>리뷰가 없습니다.</p>
			)}

			{/* 리뷰 작성 팝업 */}
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
