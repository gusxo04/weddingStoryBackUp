import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styles from "./ProductInfo.module.css";
import "slick-carousel/slick/slick.css";
import { loginIdState } from "../../utils/RecoilData";
import { Report } from "../components";
import { FaStar } from "react-icons/fa";
import KakaoMap from "../../utils/KakaoMap";

const ProductInfo = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const params = useParams();
	const productNo = params.productNo;
	const companyNo = params.companyNo; // URL에서 회사 번호 가져오기
	const location = useLocation(); // 현재 location 객체 가져오기
	const queryParams = new URLSearchParams(location.search); // 쿼리 문자열 파라미터 파싱
	console.log(queryParams);
	const category = queryParams.get("category"); // '123'
	const showConsultButton = ["드레스", "예복"].includes(category); // 비즈니스 코드에 따라 버튼 보이기 여부 결정

	const [product, setProduct] = useState({});
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [company, setCompany] = useState({ companyAddr: "" });
	const navigator = useNavigate();

	useEffect(() => {
		axios
			.get(`${backServer}/product/productInfo/${productNo}`)
			.then((res) => {
				console.log(res);
				setProduct(res.data.product);

				// 회사 정보가 제대로 응답되는지 확인 후 설정
				if (res.data.company) {
					setCompany({
						companyNo: res.data.company.companyNo,
						companyName: res.data.company.companyName, // 회사명이 없을 경우 빈 문자열로 대체
						companyAddr: res.data.company.companyAddr, // 주소가 없을 경우 빈 문자열로 대체
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [backServer, productNo, companyNo]);
	console.log(company);
	const NumberFormatter = ({ number }) => {
		const formattedNumber = new Intl.NumberFormat("ko-KR").format(number);
		return <span>{formattedNumber}</span>;
	};

	return (
		<section className={styles["product-view-wrap"]}>
			<div className={styles["product-title"]}>
				<h3>{product.productName}상세보기</h3>
			</div>
			<div className={styles["product-view-content"]}>
				<div className={styles["product-view-info"]}>
					<div className={styles["product-thumbnail"]}>
						<img
							src={product.productThumb ? `${backServer}/product/image/${product.productImage}` : "/image/default_img.png"}
							alt={product.productTitle}
						/>
					</div>
					<div className={styles["product-view-preview"]}>
						<div className={styles["prduct-report"]}>
							<Link to="/product/list">
								<h5>뒤로가기/</h5>
							</Link>
							<Report companyNo={company.companyNo} />
						</div>
						<table className={styles["product-tbl"]}>
							<tbody>
								<tr>
									<th style={{ width: "20%" }}>회사명</th>
									<td style={{ width: "30%" }}>{company.companyName}</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>상품명</th>
									<td style={{ width: "30%" }}>{product.productName}</td>
								</tr>
								<tr>
									<th style={{ width: "20%" }}>가격</th>
									<td colSpan={4}>{product.productPrice}원</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className={styles["product-btn-zone"]}>
					{showConsultButton && (
						<Link to="/consult/consult" className={styles["btn"]}>
							상담하기
						</Link>
					)}

					<Link to={`/product/pay/${productNo}`} className={styles["btn"]}>
						결제하기
					</Link>
				</div>
				<div className={styles["product-content-wrap"]}>
					<h3>상세보기</h3>
					{product.productContent ? <Viewer initialValue={product.productContent} /> : "상세보기가 없습니다."}
				</div>
				<br />
				<div>
					<ReviewList />
				</div>
				<br />
				<div className={styles["product-map-view"]}>
					<h3>회사 위치</h3>
					{company.companyAddr ? <Viewer initialValue={company.companyAddr} /> : "회사위치 뷰"}
					<div>{company.companyAddr ? <KakaoMap address={company.companyAddr} /> : ""}</div>
				</div>
			</div>
		</section>
	);
};

//첨부파일
const FileItem = ({ file }) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;

	const filedown = () => {
		axios
			.get(`${backServer}/product/file/${file.boardFileNo}`, {
				responseType: "blob",
			})
			.then((res) => {
				const blob = new Blob([res.data]);
				const fileObjectUrl = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = fileObjectUrl;
				link.style.display = "none";
				link.download = file.filename;
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(fileObjectUrl);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={styles["board-file"]}>
			<span className="material-icons" onClick={filedown}>
				file_download
			</span>
			<span className={styles["file-name"]}>{file.filename}</span>
		</div>
	);
};

const ReviewList = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER; // 서버 주소
	const productNo = props.productNo;
	const [reviews, setReviews] = useState([]); // 리뷰 리스트 상태
	const [productComment, setProductComment] = useState([]);

	useEffect(() => {
		axios
			.get(`${backServer}/productComment/${productNo}`)
			.then((res) => {
				console.log(res);
				setProductComment(res.data || []); // 데이터가 없을 경우 빈 배열로 설정
			})
			.catch((err) => {
				console.log(err);
			});
	}, [backServer, productNo]); // 주의: setProductComment를 여기에 넣지 않음
	console.log(productComment);
	// 별점 렌더링 함수
	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(<FaStar key={i} color={i <= rating ? "gold" : "lightgray"} />);
		}
		return stars;
	};
	return (
		<div className={styles["review-list"]}>
			<h3>리뷰 보기</h3>
			{productComment.length > 0 ? (
				productComment.map((review) => (
					<div key={review.productCommentNo} className={styles["review-item"]}>
						<div className={styles["review-content"]}>
							{/* 별점 */}
							<div className={styles["review-rating"]}>
								{/* 별점 표시 */}
								{renderStars(review.rating)}
							</div>
							{/* 작성 날짜 */}
							<span className={styles["review-date"]}>작성일: {review.creationDate}</span>
							{/* 리뷰 내용 */}
							<p>{review.review}</p>
							{/* 리뷰 이미지 */}
							{review.imageUrl && (
								<div className={styles["review-image"]}>
									<img
										src={`${backServer}/${review.imageUrl}`} // 이미지 경로
										alt="리뷰 이미지"
									/>
								</div>
							)}
						</div>
					</div>
				))
			) : (
				<p>아직 등록된 리뷰가 없습니다.</p>
			)}
		</div>
	);
};
export default ProductInfo;
