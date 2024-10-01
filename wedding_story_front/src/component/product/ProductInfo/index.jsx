import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ProductReview from "../ProductReview";
import styles from "./ProductInfo.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { loginIdState } from "../../utils/RecoilData";

const ProductInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  const [loginId, setLoginId] = useRecoilState(loginIdState);
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
              src={
                product.productThumb
                  ? `${backServer}/product/thumb/${product.productThumb}`
                  : "/image/default_img.png"
              }
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
          <button type="button" className={styles["btn"]}>
            <Link to="/counseling/counsel">상담하기</Link>
          </button>
          <button type="button" className={styles["btn"]}>
            <Link to="/product/pay">결제하기</Link>
          </button>
        </div>
        <div className={styles["product-content-wrap"]}>
          <h3>상세보기</h3>
          {product.productContent ? (
            <Viewer initialValue={product.productContent} />
          ) : (
            ""
          )}
        </div>
        <br />
        <div>
          <ProductReview />
        </div>
        <br />
        <div className={styles["product-faq"]}>
          <h3>FAQ</h3>
        </div>
        <br />
        <div className={styles["product-map-view"]}>
          <h3>회사 위치</h3>
          {/* 지도 구성 요소에 대한 자리 표시자입니다. 여기에 지도 API를 통합하세요 */}
          {/* <MapComponent location={product.companyLocation} /> */}
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
