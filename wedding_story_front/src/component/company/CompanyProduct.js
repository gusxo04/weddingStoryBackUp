import { useState } from "react";
import CompanyProductFrm from "./CompanyProductFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useRecoilState } from "recoil";
import { companyNoState } from "../utils/RecoilData";

const CompanyProduct = () => {
  //   const [productName, setProductName] = useState("");
  //   const [productImg, setProductImg] = useState("");
  //   const [productContent, setProductContent] = useState("");
  //   const [productPrice, setProductPrice] = useState("");
  //   const [ProductThumb, setProductThumb] = useState([]);
  //   const [coronation, setCoronation] = useState("");
  //   const [diningRoom, setDiningRoom] = useState("");
  //   const [numberPeople, setNumberPeople] = useState("");
  // 하나씩 써서 넘기기 뭐해서 콘텐츠만 빼고 product 객체 만들어서 props.

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [product, setProduct] = useState({
    productName: "",
    productImg: "",
    productPrice: "",
    productThumb: [],
    coronation: "",
    diningRoom: "",
    numberPeople: "",
  });

  const [productContent, setProductContent] = useState("");
  const insertProduct = () => {
    console.log("서브밋 버튼");
    console.log(product);
    console.log(productContent);
    if (
      product.productName !== "" &&
      product.productImg !== "" &&
      product.productPrice !== "" &&
      product.productThumb !== null &&
      productContent !== null
    ) {
      const form = new FormData();
      console.log(product);
      console.log(companyNo);
      form.append("companyNo", companyNo);
      form.append("productName", product.productName);
      form.append("productPrice", product.productPrice);
      form.append("productContent", productContent);
      form.append("thumbFile", product.productImg);
      if (
        product.coronation !== "" &&
        product.diningRoom !== "" &&
        product.numberPeople !== ""
      ) {
        form.append("coronation", product.coronation);
        form.append("diningRoom", product.diningRoom);
        form.append("numberPeople", product.numberPeople);
      }
      if (product.productThumb !== null) {
        for (let i = 0; i < product.productThumb.length; i++) {
          form.append("thumbnailFiles", product.productThumb[i]);
        }
      }
      axios
        .post(`${backServer}/company/product`, form, {
          headers: {
            contentType: "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "상품 등록 성공",
            text: "상품등록을 완료하였습니다.",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "입력 오류",
        text: "필수 정보를 모두 입력해주세요.",
        icon: "error",
      });
    }
  };
  return (
    <div className="companyProduct-main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          insertProduct();
        }}
      >
        <CompanyProductFrm
          product={product}
          setProduct={setProduct}
          productContent={productContent}
          setProductContent={setProductContent}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};
export default CompanyProduct;
