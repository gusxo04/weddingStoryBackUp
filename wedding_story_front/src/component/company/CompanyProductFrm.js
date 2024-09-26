import { useEffect, useRef, useState } from "react";
import ToastEditor from "../utils/ToastEditor";

const CompanyProductFrm = (props) => {
  const product = props.product;
  const setProduct = props.setProduct;
  const productContent = props.productContent;
  const setProductContent = props.setProductContent;

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
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      setProduct({ ...product, productImg: files[0] });
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg(null);
      setProduct({ ...product, productImg: null });
    }
  };

  // 썸네일 개별 관리를 위한 상태
  const [productThumbs, setProductThumbs] = useState(Array(10).fill(null));
  const thumbRefs = useRef([]);

  const changeThumb = (e, index) => {
    const files = e.currentTarget.files;
    if (files.length !== 0) {
      const newFile = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(newFile); // 파일을 base64로 변환하여 미리보기
      reader.onloadend = () => {
        const newProductThumbs = [...product.productThumb]; // 파일 객체 배열 복사
        newProductThumbs[index] = newFile; // 파일 객체 저장

        const newPreviews = [...productThumbs]; // 미리보기 이미지 배열 복사
        newPreviews[index] = reader.result; // 미리보기 이미지 저장

        setProduct({ ...product, productThumb: newProductThumbs }); // 파일 배열 저장
        setProductThumbs(newPreviews); // 미리보기 배열 업데이트
      };
    }
  };

  useEffect(() => {
    console.log(product);
    console.log(productThumbs);
    console.log(productContent);
  }, [product, productThumbs, productContent]);
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
        <ThumbnailDiv
          productThumbs={productThumbs}
          onChangeThumb={changeThumb}
        />
      </div>
      <div className="editor-zone">
        <ToastEditor
          boardContent={productContent}
          setBoardContent={setProductContent}
        />
      </div>
    </div>
  );
};
export default CompanyProductFrm;

const ThumbnailDiv = (props) => {
  const { productThumbs, onChangeThumb } = props;
  const thumbRefs = useRef([]);

  return (
    <>
      {productThumbs.map((thumb, index) => (
        <div key={index} className="productThumb">
          <img
            src={thumb || "/image/default_img.png"}
            onClick={() => thumbRefs.current[index].click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={(el) => (thumbRefs.current[index] = el)}
            onChange={(e) => onChangeThumb(e, index)}
            style={{ display: "none" }}
          />
        </div>
      ))}
    </>
  );
};
