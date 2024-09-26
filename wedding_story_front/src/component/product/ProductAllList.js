import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

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
    <section className="board-list">
      <div className="page-title">
        <ul className="name-title">
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
            <Link to="#">예복</Link>
          </li>
          <li>
            <Link to="#">본식</Link>
          </li>
        </ul>
      </div>

      <div className="product-list-wrap">
        <ul className="posting-wrap">
          {productList.map((product, i) => {
            return <BoardItem key={"product-" + i} product={product} />;
          })}
        </ul>
      </div>
      <div className="board-paging-wrap">
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
      className="posting-item"
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
      <div className="posting-info">
        <div className="favirite">
          <span className="material-icons-outlined">favorite</span>
        </div>
        <div className="posting-title">{product.productName}</div>
        <div className="posting-sub-info">
          <span>{product.productPrice}</span>
        </div>
      </div>
    </li>
  );
};

export default ProductAllList;
