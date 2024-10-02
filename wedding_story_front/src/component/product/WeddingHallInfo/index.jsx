import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import styles from "./WeddingHallInfo.module.css";
import { KakaoMap, ReviewForm } from "../components";
import { useRecoilState } from "recoil";
import { companyNoState, loginIdState } from "../../utils/RecoilData";
import ProductReview from "../ProductReview";

const WeddingHallInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo; // URL에서 상품 번호 가져오기
  const companyNo = params.companyNo; // URL에서 회사 번호 가져오기 (이 부분 추가)
  const [product, setProduct] = useState({});
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [company, setCompany] = useState({ companyAddr: "", companyName: "" });
  const navigator = useNavigate();

  //console.log(companyNo); // companyNo가 제대로 출력되는지 확인
  //console.log(productNo); // productNo가 제대로 출력되는지 확인

  useEffect(() => {
    axios
      .get(`${backServer}/product/productInfo/${productNo}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.product);
        setCompany(res.data.company);
        //console.log(companyNo);
        //console.log(productNo);
        // 회사 정보를 별도로 설정
        if (res.data.companyAddr) {
          setCompany({ companyAddr: res.data.companyAddr });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backServer, productNo, companyNo]); // 의존성 배열에 companyNo 추가

  return (
    <section className={styles["product-view-wrap"]}>
      <div className={styles["product-title"]}>
        <h3>웨딩홀 상세보기</h3>
      </div>
      <div className={styles["product-view-content"]}>
        <div className={styles["product-view-info"]}>
          <div className={styles["product-thumbnail"]}>
            <img
              src={
                product.productImg
                  ? `${backServer}/product/thumb/${product.productImg}`
                  : "/image/default_img.png"
              }
              alt={product.productName}
            />
          </div>
          <div className={styles["product-view-preview"]}>
            <div className={styles["prduct-report"]}>
              <Link to="/product/hallList">
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
          <button type="button" className={styles["btn"]}>
            <Link to={`/consult/consult/:${productNo}`}>상담하기</Link>
          </button>
          <button type="button" className={styles["btn"]}>
            <Link to="/product/weddingHall">예약하기</Link>
          </button>
        </div>
        <div className={styles["product-content-wrap"]}>
          <h3>상세보기</h3>
          {product.productContent ? (
            <Viewer initialValue={product.productContent} />
          ) : (
            "상세보기가 없습니다."
          )}
        </div>
        <br />
        <div>
          <ProductReview />
        </div>
        <br />
        <div className={styles["product-faq"]}>
          <h3>QnA</h3>
          {product.productContent ? (
            <Viewer initialValue={product.productContent} />
          ) : (
            "QnA가 없습니다."
          )}
        </div>
        <br />
        <div className={styles["product-map-view"]}>
          <h3>회사 위치</h3>
          {company.companyAddr ? (
            <Viewer initialValue={company.companyAddr} />
          ) : (
            "회사위치 뷰"
          )}
          <KakaoMap />
        </div>
      </div>
    </section>
  );
};

export default WeddingHallInfo;
