import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
// Assuming you have necessary imports for Viewer and any other components

const ProductInfo = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const params = useParams();
  const productNo = params.productNo;
  const [product, setProduct] = useState({});
  const [productComment, setProductComment] = useState({});
  //const [loginId, setLoginId] = useRecoilState();
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
  }, [productNo, backServer]);

  return (
    <section className="product-view-wrap">
      <div className="product-title">
        <h3>{product.productName}상세보기</h3>
      </div>
      <div className="product-view-content">
        <div className="product-view-info">
          <div className="product-thumbnail">
            <img
              src={
                product.productThumb
                  ? `${backServer}/product/thumb/${product.productThumb}`
                  : "/image/default_img.png"
              }
              //alt={product.productTitle}
            />
          </div>
          <div className="product-view-preview">
            <div className="prduct-report">
              <Link to="/">
                <h5>뒤로가기/</h5>
              </Link>
              <Link>
                <h5>신고하기</h5>
              </Link>
            </div>
            <table className="product-tbl">
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
        <div className="product-btn-zone">
          <button type="button" className="btn">
            <Link to="/counseling/counsel">상담하기</Link>
          </button>
          <button type="button" className="btn">
            <Link to="/product/pay">결제하기</Link>
          </button>
        </div>
        <div className="product-content-wrap">
          <h3>상세보기</h3>
          {product.productContent ? (
            <Viewer initialValue={product.productContent} />
          ) : (
            ""
          )}
        </div>
        <br />
        <div className="product-reviews">
          <h3>리뷰</h3>
          {productComment.review && productComment.review.length > 0 ? (
            productComment.review.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-Date">{review.creationDate}</div>
                <div className="review-rating">⭐️ {review.rating} / 5</div>
                <div className="review-text">{review.review}</div>
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
        </div>
        <br />
        <div className="product-faq">
          <h3>FAQ</h3>
        </div>
        <br />
        <div className="product-map-view">
          {/* Assuming you have a Map component to display the company location */}
          <h3>회사 위치</h3>
          {/* Placeholder for map component; integrate your Map API here */}
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
    <div className="board-file">
      <span className="material-icons file-icon" onClick={filedown}>
        file_download
      </span>
      <span className="file-name">{file.filename}</span>
    </div>
  );
};

export default ProductInfo;
