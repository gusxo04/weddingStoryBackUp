import React from "react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from "axios";
import styles from "./ProductReview.module.css";
import { ReviewForm } from "../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

const showMaxCnt = 4;
const arr = Array.from(new Array(3));
const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 4,
	initialSlide: 0,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};

const ProductReview = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [memberNo, setMemberNo] = useRecoilState(loginIdState);
	const [member, setMember] = useState({
		memberId: "",
	});

	const [reviews, setReviews] = useState({});
	const [currentReview, setCurrentReview] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [productNo, setProductNo] = useState(); // 실제 제품번호로 교체
	const [payNo, setPayNo] = useState(); // 실제 결제번호로 대체

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
			.get(`${backServer}/productComment/memberNo/${memberNo}`)
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
			productCommentNo: currentReview ? currentReview.productCommentNo : Date.now(),
			productNo, //제품번호
			payNo, //결제번호
			memberNo, //회원번호
			rating: reviewData.rating, //별점
			review: reviewData.review, //리뷰내용
			creationDate: new Date(), //작성일
			image: reviewData.image || null, // 리뷰 객체에 이미지 추가
		};

		if (currentReview) {
			// 기존 리뷰 업데이트
			setReviews((prev) => prev.map((review) => (review.productCommentNo === currentReview.productCommentNo ? newReview : review)));
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
		setReviews((prev) => prev.filter((review) => review.productCommentNo !== productCommentNo));
	};

	return (
		<div className={styles["product-reviews"]}>
			<h3>리뷰</h3>
			<button onClick={handleOpenPopup}>리뷰 작성</button>
			<Slider {...settings}>
				{reviews.length > 0 ? (
					reviews.map((review) => (
						<div key={review.productCommentNo}>
							<div className={styles["review-item"]}>
								<div style={{ display: "flex", flexDirection: "column" }}>
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

								{review.image && (
									<img
										src={review.image}
										alt="Review"
										style={{
											width: "100%", // 이미지가 슬라이드의 너비에 맞춰짐
											height: "auto", // 이미지의 비율을 유지하면서 높이를 자동으로 조정
											maxHeight: "200px", // 이미지의 최대 높이 제한 (선택 사항)
											objectFit: "contain", // 이미지가 컨테이너 안에 맞춰져서 표시됨
										}}
									/>
								)}

								<div style={{ display: "flex", justifyContent: "center", alignItems: "center", columnGap: "10px" }}>
									<button onClick={() => handleEditReview(review)}>수정</button>
									<button onClick={() => handleDeleteReview(review.productCommentNo)}>삭제</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p>리뷰가 없습니다.</p>
				)}
			</Slider>
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
