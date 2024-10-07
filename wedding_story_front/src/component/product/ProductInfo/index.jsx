import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ProductReview from "../ProductReview";
import styles from "./ProductInfo.module.css";
import "slick-carousel/slick/slick.css";
import { loginIdState } from "../../utils/RecoilData";
import KakaoMap from "../../utils/KakaoMap";

const ProductInfo = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const params = useParams();
	const productNo = params.productNo;
	const location = useLocation(); // 현재 location 객체 가져오기
	const queryParams = new URLSearchParams(location.search); // 쿼리 문자열 파라미터 파싱

	const businessCode = queryParams.get("businessCode"); // '123'
	const showConsultButton = ["weddingHall", "dressShop", "robe"].includes(businessCode); // 비즈니스 코드에 따라 버튼 보이기 여부 결정

	const [product, setProduct] = useState({});
	const [loginId, setLoginId] = useRecoilState(loginIdState);
	const [company, setCompany] = useState({ companyAddr: "" });
	const navigator = useNavigate();

	useEffect(() => {
		axios
			.get(`${backServer}/product/productNo/${productNo}`)
			.then((res) => {
				console.log(res);
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<section className={styles["product-view-wrap"]}>
			<div className={styles["product-title"]}>
				<h3>{product.productName}상세보기</h3>
			</div>
			<div className={styles["product-view-content"]}>
				<div className={styles["product-view-info"]}>
					<div className={styles["product-thumbnail"]}>
						<img
							src={product.productThumb ? `${backServer}/product/thumb/${product.productThumb}` : "/image/default_img.png"}
							alt={product.productTitle}
						/>
					</div>
					<div className={styles["product-view-preview"]}>
						<div className={styles["prduct-report"]}>
							<Link to="/product/list">
								<h5>뒤로가기/</h5>
							</Link>
							<Link to="/report">
								<h5>신고하기</h5>
							</Link>
						</div>
						<table className={styles["product-tbl"]}>
							<tbody>
								<tr>
									<th style={{ width: "20%" }}>회사명</th>
									<td style={{ width: "30%" }}>{product.companyName}</td>
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

					<Link to="/product/pay" className={styles["btn"]}>
						결제하기
					</Link>
				</div>
				<div className={styles["product-content-wrap"]}>
					<h3>상세보기</h3>
					{product.productContent ? <Viewer initialValue={product.productContent} /> : "상세보기가 없습니다."}
				</div>
				<br />
				<div>
					<ProductReview />
				</div>
				<br />
				<div className={styles["product-faq"]}>
					<h3>QnA</h3>
					{product.productContent ? <Viewer initialValue={product.productContent} /> : "QnA가 없습니다."}
				</div>
				<br />
				<div className={styles["product-map-view"]}>
					<h3>회사 위치</h3>
					{company.companyAddr ? <Viewer initialValue={company.companyAddr} /> : "회사위치 뷰"}
					{/* <KakaoMap address={""} /> */}
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

export default ProductInfo;
