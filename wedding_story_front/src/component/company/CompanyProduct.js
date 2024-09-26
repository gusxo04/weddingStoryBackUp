import { useRef, useState } from "react";
import ToastEditor from "../utils/ToastEditor";

const CompanyProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productImg: "",
    productContent: "",
    productPrice: "",
    productThumb: [],
    coronation: "",
    diningRoom: "",
    numberPeople: "",
  });

  const changeValue = (e) => {
    const name = e.target.name;
    setProduct({ ...product, [name]: e.target.value });
  };
  const optionRef = useRef();
  const optionView = () => {
    optionRef.current.style.display = "block";
  };
  const optionClose = () => {
    optionRef.current.style.display = "none";
  };
  const [productImg, setProductImg] = useState(null);
  const imageRef = useRef();
  const changeImg = (e) => {
    console.log(e.currentTarget.files);
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      //files. 길이가 0이아니거나 배열의 처음이 0이 아니면
      setProductImg({ ...product, productImg: files[0] }); //썸네일 표시 state에 배열의 처음 객체를 넣어라
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductImg(reader.result);
      }; //onloadend는 파일이 완전히 읽힌 후에 호출되는 이벤트 핸들러입니다.
    } else {
      setProductImg(null);
      setProduct({ ...product, productImg: null });
    }
  };

  const [productThumbs, setProductThumbs] = useState([]);

  return (
    <div className="companyProduct-wrap">
      <div className="company-title">상품 등록</div>
      <section className="company-section">
        <div className="thumbnail-zone">
          <div className="company-thumbnail image">
            {productImg ? (
              <img
                onClick={() => {
                  imageRef.current.click();
                }}
                src={productImg}
              />
            ) : (
              <img
                onClick={() => {
                  imageRef.current.click();
                }}
                src="/image/default_img.png"
              />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={changeImg}
            ref={imageRef}
            style={{ display: "none" }}
          ></input>
        </div>
        <div className="main-content">
          <div className="company-product-input-zone">
            <div className="company-input-wrap">
              <label htmlFor="productName">상품명</label>
              <input
                type="text"
                id="productName"
                name="productName"
                onChange={changeValue}
              />
            </div>
            <div className="company-input-wrap">
              <label htmlFor="productPrice">상품 가격</label>
              <input
                type="text"
                id="productPrice"
                name="productPrice"
                onChange={changeValue}
              />
            </div>
            <div className="company-input-wrap">
              <label htmlFor="productCategory">카테고리</label>
              <span className="radio-zone">
                <label htmlFor="no0">웨딩홀</label>
                <input
                  type="radio"
                  id="no0"
                  name="productCategory"
                  onClick={optionView}
                />
                <label htmlFor="no1">스튜디오</label>
                <input
                  type="radio"
                  id="no1"
                  name="productCategory"
                  onClick={optionClose}
                />
                <label htmlFor="no2">드레스</label>
                <input
                  type="radio"
                  id="no2"
                  name="productCategory"
                  onClick={optionClose}
                />
                <label htmlFor="no3">메이크업</label>
                <input
                  type="radio"
                  id="no3"
                  name="productCategory"
                  onClick={optionClose}
                />
                <label htmlFor="no4">예복</label>
                <input
                  type="radio"
                  id="no4"
                  name="productCategory"
                  onClick={optionClose}
                />
                <label htmlFor="no5">본식</label>
                <input
                  type="radio"
                  id="no5"
                  name="productCategory"
                  onClick={optionClose}
                />
              </span>
            </div>
            <div className="option" ref={optionRef}>
              <div className="company-input-wrap">
                <label htmlFor="coronation">대관료</label>
                <input
                  type="text"
                  id="coronation"
                  name="coronation"
                  onChange={changeValue}
                />
              </div>
              <div className="company-input-wrap">
                <label htmlFor="diningRoom">1인 식대</label>
                <input
                  type="text"
                  id="diningRoom"
                  name="diningRoom"
                  onChange={changeValue}
                />
              </div>
              <div className="company-input-wrap">
                <label htmlFor="numberPeople">보증 인원</label>
                <input
                  type="text"
                  id="numberPeople"
                  name="numberPeople"
                  onChange={changeValue}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="productThumb-zone">
        <ThumbnailDiv productThumbs={productThumbs} />
      </div>
      <div className="editor-zone">
        <ToastEditor />
      </div>
    </div>
  );
};
export default CompanyProduct;

const ThumbnailDiv = (props) => {
  const productThumbs = props.productThumbs;

  const productRef1 = useRef();

  const changeThumb = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
    }
  };

  return (
    <>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img
            src={productThumbs}
            onClick={() => {
              productRef1.current.click();
            }}
          ></img>
        ) : (
          <img
            src="/image/default_img.png"
            onClick={() => {
              productRef1.current.click();
            }}
          />
        )}
      </div>
      <input
        type="file"
        accept="/image"
        ref={productRef1}
        onChange={changeThumb}
      ></input>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
      <div className="productThumb">
        {productThumbs === "" ? (
          <img src={productThumbs}></img>
        ) : (
          <img src="/image/default_img.png" />
        )}
      </div>
    </>
  );
};