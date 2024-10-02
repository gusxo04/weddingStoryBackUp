import { useEffect, useRef, useState } from "react";
import ToastEditor from "../utils/ToastEditor";
import { useLocation } from "react-router-dom";

const CompanyProductFrm = (props) => {
  const productName = props.productName;
  const setProductName = props.setProductName;
  const productImg = props.productImg;
  const setProductImg = props.setProductImg;
  const productPrice = props.productPrice;
  const setProductPrice = props.setProductPrice;
  const productThumb = props.productThumb;
  const setProductThumb = props.setProductThumb;
  const coronation = props.coronation;
  const setCoronation = props.setCoronation;
  const diningRoom = props.diningRoom;
  const setDiningRoom = props.setDiningRoom;
  const numberPeople = props.numberPeople;
  const setNumberPeople = props.setNumberPeople;
  const productContent = props.productContent;
  const setProductContent = props.setProductContent;
  const companyCategory = props.companyCategory;

  const [productPreImg, setProductPreImg] = useState(null);
  const imageRef = useRef();
  /*img = 대표사진 1장  => productImg("")*/
  /*thumbnails = 상품 사진 (최대 10장) => productThumbs[]*/
  const location = useLocation();
  const url = location.pathname;
  console.log(url);

  const changeImg = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] !== 0) {
      setProductImg(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setProductPreImg(reader.result);
      };
    } else {
      setProductPreImg(null);
      setProductImg(null);
    }
  };

  const priceChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    //const formattedValue = new Intl.NumberFormat().format(inputValue); // 금액 형식으로 변환
    setProductPrice(inputValue);
  };

  const coronationChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    //const formattedValue = new Intl.NumberFormat().format(inputValue); // 금액 형식으로 변환
    setCoronation(inputValue);
  };

  const diningRoomChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    //const formattedValue = new Intl.NumberFormat().format(inputValue); // 금액 형식으로 변환
    setDiningRoom(inputValue);
  };

  // 썸네일 개별 관리를 위한 상태
  const [productPreThumb, setProductPreThumb] = useState(Array(10).fill(null));
  /* productPre(view)Thumb =파일 미리보기 배열 */
  /*
  useState(Array(10).fiil(null)) Array(10) = 10개짜리 배열생성 
  .fill(null) 인자를 하나만 쓰면 안에 내용을 인자로 채워라 = [null,null,null...] 10개 까지
   */
  const thumbRefs = useRef([]);

  const changeThumb = (e, index) => {
    const files = e.currentTarget.files;
    if (files.length !== 0) {
      const newFile = files[0]; //등록할때 마다 새로 생기는 파일
      const reader = new FileReader();

      reader.readAsDataURL(newFile); // 파일을 base64로 변환하여 미리보기
      reader.onloadend = () => {
        const newProductThumb = [...productThumb]; // 전송할 파일 객체 배열 복사
        newProductThumb[index] = newFile; // 파일 객체 저장

        const newPreviews = [...productPreThumb]; // 미리보기 이미지 배열 복사
        newPreviews[index] = reader.result; // 미리보기 이미지 저장

        setProductThumb(newProductThumb); // 파일 배열 저장
        setProductPreThumb(newPreviews); // 미리보기 배열 업데이트
      };
    } else {
    }
  };

  return (
    <div className="companyProduct-wrap">
      <div className="company-title">
        {url === "/company/product/update/number" ? "상품 등록" : "상품 수정"}
      </div>
      <section className="company-section">
        <div className="thumbnail-zone">
          <div className="company-thumbnail image">
            {productPreImg ? (
              <img
                onClick={() => {
                  imageRef.current.click();
                }}
                src={productPreImg}
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
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </div>
            <div className="company-input-wrap">
              <label htmlFor="productPrice">상품 가격</label>
              <input
                style={{ width: "200px" }}
                type="text"
                id="productPrice"
                name="productPrice"
                value={productPrice}
                onChange={priceChange}
              />
              <span style={{ marginLeft: "5px" }}> 원 </span>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="productCategory">카테고리</label>
              <span>{companyCategory}</span>
            </div>
            {companyCategory === "웨딩홀" ? (
              <>
                <div className="option">
                  <div className="company-input-wrap">
                    <label htmlFor="coronation">대관료</label>
                    <input
                      style={{ width: "200px" }}
                      type="text"
                      id="coronation"
                      value={coronation}
                      name="coronation"
                      onChange={coronationChange}
                    />
                    <span style={{ marginLeft: "5px" }}> 원 </span>
                  </div>
                  <div className="company-input-wrap">
                    <label htmlFor="diningRoom">1인 식대</label>
                    <input
                      style={{ width: "200px" }}
                      type="text"
                      id="diningRoom"
                      value={diningRoom}
                      name="diningRoom"
                      onChange={diningRoomChange}
                    />
                    <span style={{ marginLeft: "5px" }}> 원 </span>
                  </div>
                  <div className="company-input-wrap">
                    <label htmlFor="numberPeople">보증 인원</label>
                    <input
                      style={{ width: "200px" }}
                      type="number"
                      id="numberPeople"
                      name="numberPeople"
                      value={numberPeople}
                      max={1000}
                      placeholder="최대인원 1,000 명"
                      onChange={(e) => {
                        setNumberPeople(e.target.value);
                      }}
                    />
                    <span style={{ marginLeft: "5px" }}> 명 </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <div className="productThumb-zone">
        <ThumbnailDiv
          productPreThumb={productPreThumb}
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
  const { productPreThumb, onChangeThumb } = props;
  const thumbRefs = useRef([]);

  return (
    <>
      {productPreThumb.map((thumb, index) => (
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
