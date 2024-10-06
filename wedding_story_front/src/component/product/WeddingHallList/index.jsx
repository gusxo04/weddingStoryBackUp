import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../../utils/PagiNavi";
import styles from "./WeddingHallList.module.css";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

const WeddingHallList = () => {
	const backServer = process.env.REACT_APP_BACK_SERVER;
	const [productList, setProductList] = useState([]);
	const [reqPage, setReqPage] = useState(1);
	const [pi, setPi] = useState({});

	useEffect(() => {
		axios
			.get(`${backServer}/product/hallList/${reqPage}`)
			.then((res) => {
				console.log(res);
				setProductList(res.data.list); //게시물
				setPi(res.data.pi); //페이지넘버링
			})
			.catch((err) => {
				console.log(err);
			});
	}, [reqPage]);

	return (
		<section className={styles["board-list"]}>
			<div className={styles["page-title"]}>
				<div className={styles["title-name"]}>웨딩홀</div>
			</div>

			<div className={styles["product-list-wrap"]}>
				<ul className={styles["posting-wrap"]}>
					{productList.map((product, i) => {
						return <BoardItem key={"product-" + i} product={product} />;
					})}
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
				navigate(`/product/hallInfo/${productNo}`);
			}}
		>
			<div>
				<img
					src={product.productImg ? `${backServer}/product/thumb/${product.productImg}` : "/image/default_img.png"}
					alt={product.productName}
				/>
			</div>
			<div className={styles["posting-info"]}>
				<div className={styles["favirite"]} onClick={handleLikeToggle}>
					{liked ? <MdFavorite fill="red" /> : <MdFavoriteBorder />}
				</div>
				<div className={styles["posting-title"]}>상품명: {product.productName}</div>
				<div className={styles["posting-sub-info"]}>
					<span>대관료: {product.coronation}</span>
					<span>식비: {product.dinningRoom}</span>
					<span>가격: {product.productPrice}</span>
				</div>
			</div>
		</li>
	);
};

export default WeddingHallList;
