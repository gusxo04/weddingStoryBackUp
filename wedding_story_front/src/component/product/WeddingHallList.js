import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

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
    <section className="board-list">
      <div className="page-title">
        <div className="title-name">웨딩홀</div>
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
        navigate(`/product/list/${product.priductNo}`);
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
        <div className="posting-title">{product.productTitle}</div>
        <div className="posting-sub-info">
          <span>{product.productWriter}</span>
          <span>{product.productDate}</span>
        </div>
      </div>
    </li>
  );
};

export default WeddingHallList;
