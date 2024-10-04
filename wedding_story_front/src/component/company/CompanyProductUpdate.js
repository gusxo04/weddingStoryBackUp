import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CompanyProductFrm from "./CompanyProductFrm";
import { companyNoState } from "../utils/RecoilData";
import { useParams } from "react-router-dom";
import ToastEditor from "../utils/ToastEditor";

const CompanyProductUpdate = () => {
  const params = useParams();
  const productNo = params.productNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [companyNo, setCompanyNo] = useRecoilState(companyNoState);
  const [productName, setProductName] = useState("");
  const [productContent, setProductContent] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productThumb, setProductThumb] = useState(Array(10).fill(null));
  const [coronation, setCoronation] = useState("");
  const [diningRoom, setDiningRoom] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [companyCategory, setCompanyCategory] = useState("");
  const [delThumbsFile, setDelThumbsFile] = useState([]);
  useEffect(() => {
    axios
      .get(`${backServer}/company/product/${productNo}`)
      .then((res) => {
        console.log(res);
        setProductName(res.data.product.productName);
        setProductContent(res.data.product.productContent);
        setProductImg(res.data.product.productImg);
        setProductPrice(res.data.product.productPrice);
        setProductThumb((prevData) => {
          return [
            ...res.data.thumbsFile,
            ...prevData.slice(res.data.thumbsFile.length),
          ];
        });

        setCoronation(res.data.product.coronation);
        setDiningRoom(res.data.product.diningRoom);
        setNumberPeople(res.data.product.numberPeople);
        setCompanyCategory(res.data.product.companyCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [companyNo]);
  const updateProduct = () => {
    const form = new FormData();
  };

  return (
    <div className="companyProduct-main">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProduct();
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
          delThumbsFile={delThumbsFile}
          setDelThumbsFile={setDelThumbsFile}
        />

        <div className="btn-zone">
          <button type="submit">수정 하기</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProductUpdate;
