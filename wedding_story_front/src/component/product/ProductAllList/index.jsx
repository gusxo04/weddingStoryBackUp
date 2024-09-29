import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../../utils/PagiNavi";
import styles from "./ProductAllList.module.css";

const ProductAllList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [productList, setProductList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});

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

  return (
    <section className={styles["board-list"]}>
      <div className={styles["page-title"]}>
        <ul className={styles["name-title"]}>
          <li>
            <Link to="/product/list">스튜디오</Link>
          </li>
          <li>
            <Link to="/product/info">드레스</Link>
          </li>
          <li>
            <Link to="/product/review">메이크업</Link>
          </li>
          <li>
            <Link to="/product/report">예복</Link>
          </li>
          <li>
            <Link to="#">본식</Link>
          </li>
        </ul>
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
  const navigate = useNavigate();
  return (
    <li
      className={styles["posting-item"]}
      onClick={() => {
        navigate(`/product/list/${product.productNo}`);
      }}
    >
      <div>
        <img
          src={
            product.productThumb
              ? `${backServer}/product/thumb/${product.productThumb}`
              : "/image/default_img.png"
          }
        />
      </div>
      <div className={styles["posting-info"]}>
        <div className={styles["favirite"]}>
          <span className="material-icons-outlined">favorite</span>
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