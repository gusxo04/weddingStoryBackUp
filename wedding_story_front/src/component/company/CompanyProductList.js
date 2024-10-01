import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";
import PageNavi from "../utils/PagiNavi";
import { Link } from "react-router-dom";

const CompanyProductList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [productList, setProductList] = useState([]); //조회한 리스트 결과가 들어갈 state
  const [reqPage, setReqPage] = useState(1); //페이지 시작 번호
  const [pi, setPi] = useState({});

  useEffect(() => {
    axios
      .get(`${backServer}/company/list/${companyNo}/${reqPage}`)
      .then((res) => {
        console.log(res);
        setProductList(res.data.list);
        setPi(res.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyNo]);

  return (
    <div>
      <section className="section">
        <div className="list-wrap">
          <div className="title">상품 목록</div>
          <div className="product-list-wrap">
            <table className="tbl">
              <thead border={1}>
                <tr>
                  <th style={{ width: "10%" }}>상품번호</th>
                  <th style={{ width: "50%" }}>상품명</th>
                  <th style={{ width: "20%" }}>상품 가격</th>
                  <th colSpan={2} style={{ width: "20%" }}>
                    상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => {
                  return (
                    <ProductItem
                      key={"product" + index}
                      product={product}
                      index={index}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="product-page-wrap">
              <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductItem = (props) => {
  const product = props.product;
  const index = props.index;
  return (
    <tr>
      <td style={{ width: "10%" }}>{product.productNo}</td>
      <td style={{ width: "50%" }}>{product.productName}</td>
      <td style={{ width: "20%" }}>{product.productPrice}</td>
      <td style={{ width: "10%" }}>
        <button>
          <Link to={`/company/product/update/${product.productNo}`}>수정</Link>
        </button>
      </td>
      <td style={{ width: "10%" }}>
        <button>삭제</button>
      </td>
    </tr>
  );
};

export default CompanyProductList;
