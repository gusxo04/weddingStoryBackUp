import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../../utils/PagiNavi";
import styles from "./ProductAllList.module.css";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const dummyData = [
	{ productNo: 1, productName: "웨딩홀 A", productPrice: "100000", businessCode: 0 },
	{ productNo: 2, productName: "스튜디오 B", productPrice: "200000", businessCode: 1 },
	{ productNo: 3, productName: "드레스 C", productPrice: "150000", businessCode: 2 },
	{ productNo: 4, productName: "메이크업 D", productPrice: "50000", businessCode: 3 },
	{ productNo: 5, productName: "예복 E", productPrice: "300000", businessCode: 4 },
	{ productNo: 6, productName: "본식 F", productPrice: "250000", businessCode: 5 },
	{ productNo: 7, productName: "웨딩홀 G", productPrice: "120000", businessCode: 0 },
	{ productNo: 8, productName: "스튜디오 H", productPrice: "180000", businessCode: 1 },
	{ productNo: 9, productName: "드레스 I", productPrice: "130000", businessCode: 2 },
	{ productNo: 10, productName: "메이크업 J", productPrice: "70000", businessCode: 3 },
];

const businessCodes = {
	0: "웨딩홀",
	1: "스튜디오",
	2: "드레스",
	3: "메이크업",
	4: "예복",
	5: "본식",
};

const ProductAllList = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [productList, setProductList] = useState([]);
	const [reqPage, setReqPage] = useState(1);
	const [pi, setPi] = useState({});
	const [businessCode, setBusinessCode] = useState(1); // Default to '스튜디오'

	useEffect(() => {
		axios
			.get(`${backServer}/product/list/${reqPage}`)
			.then((res) => {
				console.log(res);
				setProductList(res.data.list); //게시물
				setPi(res.data.pi); //페이지넘버링
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reqPage]);

	// 비즈니스 코드를 기준으로 제품 필터링
	// const filteredProducts = productList.filter((product) => product.businessCode === businessCode);
	const filteredProducts = dummyData.filter((product) => product.businessCode === businessCode);

	return (
		<section className={styles["board-list"]}>
			<div className={styles["page-title"]}>
				<ul className={styles["name-title"]}>
					{Object.entries(businessCodes).map(([code, name]) => (
						<li key={code}>
							<Link to="/product/list" onClick={() => setBusinessCode(Number(code))}>
								{name}
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className={styles["product-list-wrap"]}>
				<ul className={styles["posting-wrap"]}>
					{filteredProducts.map((product, i) => (
						<BoardItem key={"product-" + i} product={product} />
					))}
				</ul>
			</div>

			<div className={styles["board-paging-wrap"]}>
				<PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
			</div>
		</section>
	);
};

const BoardItem = (props) => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const product = props.product;
	const productNo = product.productNo;
	const navigate = useNavigate();
	const [liked, setLiked] = useState(false);

	const handleLikeToggle = (e) => {
		e.stopPropagation(); //클릭 시 상품정보로 이동되는 것을 방지

		setLiked((prev) => !prev);
		// 선택적으로 여기에서 좋아요 상태를 서버에 보낼 수 있습니다.
		// axios.post(`${backServer}/product/favorite`, { productNo: product.productNo, liked: !liked });
	};

	return (
		<li
			className={styles["posting-item"]}
			onClick={() => {
				navigate(`/product/info/${productNo}`);
			}}
		>
			<div className={styles["posting-info"]}>
				<div>
					<img
						src={product.productImg ? `${backServer}/product/thumb/${product.productImg}` : "/image/default_img.png"}
						alt={product.productName}
					/>
				</div>
				<div className={styles["favirite"]} onClick={handleLikeToggle}>
					{liked ? <MdFavorite fill="red" /> : <MdFavoriteBorder />}
				</div>
				<div className={styles["posting-title"]}>{product.productName}</div>
				<div className={styles["posting-sub-info"]}>
					<span>{product.productPrice}</span>
				</div>
			</div>
		</li>
	);
};

export default ProductAllList;
