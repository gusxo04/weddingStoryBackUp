import { useEffect, useState } from "react";
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
  const [productName, setProductName] = useState("");
  const [productContent, setProductContent] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productThumb, setProductThumb] = useState([]);
  const [coronation, setCoronation] = useState("");
  const [diningRoom, setDiningRoom] = useState("");
  const [numberPeople, setNumberPeople] = useState("");

  const [companyCategory, setCompanyCategory] = useState("");
  /*카테고리를 조회 해서 담기위한 state*/
  useEffect(() => {
    if (companyCategory === "") {
      axios
        .get(`${backServer}/company/category/${companyNo}`)
        .then((res) => {
          console.log(res);
          setCompanyCategory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [companyNo]);

  const insertProduct = () => {
    console.log("서브밋 버튼");

    if (
      productName !== "" &&
      productImg !== "" &&
      productPrice !== "" &&
      productThumb !== null &&
      productContent !== null
    ) {
      const form = new FormData();

      console.log(companyNo);
      form.append("companyNo", companyNo);
      form.append("productName", productName);
      form.append("productPrice", productPrice);
      form.append("productContent", productContent);
      form.append("thumbFile", productImg);
      if (coronation !== "" && diningRoom !== "" && numberPeople !== "") {
        form.append("coronation", coronation);
        form.append("diningRoom", diningRoom);
        form.append("numberPeople", numberPeople);
      }
      if (productThumb !== null) {
        for (let i = 0; i < productThumb.length; i++) {
          form.append("thumbnailFiles", productThumb[i]);
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
          productName={productName}
          setProductName={setProductName}
          productImg={productImg}
          setProductImg={setProductImg}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productContent={productContent}
          setProductContent={setProductContent}
          productThumb={productThumb}
          setProductThumb={setProductThumb}
          coronation={coronation}
          setCoronation={setCoronation}
          diningRoom={diningRoom}
          setDiningRoom={setDiningRoom}
          numberPeople={numberPeople}
          setNumberPeople={setNumberPeople}
          companyCategory={companyCategory}
        />
        <div className="btn-zone">
          <button type="submit">등록 하기</button>
        </div>
      </form>
    </div>
  );
};
export default CompanyProduct;
