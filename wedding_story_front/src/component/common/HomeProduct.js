import { useState } from "react";

const HomeProduct = () => {
  const [productList, setProductList] = useState([
    {
      productImg: "/image/testImg.jpg",
      companyName: "웨딩홀이름1",
      productName: "상품이름1",
      productPrice: "2000000",
      companyKeyWord: {
        keyWord1: "키워드1",
        keyWord2: "키워드2",
        keyWord3: "키워드3",
      },
    },
    {
      productImg: "/image/testImg.jpg",
      companyName: "웨딩홀이름2",
      productName: "상품이름2",
      productPrice: "3000000",
      companyKeyWord: {
        keyWord1: "키워드4",
        keyWord2: "키워드5",
        keyWord3: "키워드6",
      },
    },
    {
      productImg: "/image/testImg.jpg",
      companyName: "웨딩홀이름3",
      productName: "상품이름3",
      productPrice: "4000000",
      companyKeyWord: {
        keyWord1: "키워드4",
        keyWord2: "키워드5",
        keyWord3: "키워드6",
      },
    },
    {
      productImg: "/image/testImg.jpg",
      companyName: "웨딩홀이름4",
      productName: "상품이름4",
      productPrice: "4000000",
      companyKeyWord: {
        keyWord1: "키워드4",
        keyWord2: "키워드5",
        keyWord3: "키워드6",
      },
    },
  ]);
  return (
    <div className="home-section1">
      <div className="home-section1-titleBox">
        <div>
          <h2>
            웨딩스토리 <span>BEST WEDDING HALL</span>
          </h2>
          <p>나에게 잘 어울리는 베스트 웨딩홀을 찾으세요!</p>
        </div>
      </div>
      <div className="home-section1-productBox">
        {productList.map((product, index) => (
          <div className="home-section1-product">
            <div className="sec1-productImgBox">
              <img src={product.productImg} />
            </div>
            <div className="sec1-productInfo">
              <div>
                <span>{product.companyKeyWord.keyWord1}</span>
                <span>{product.companyKeyWord.keyWord2}</span>
                <span>{product.companyKeyWord.keyWord3}</span>
              </div>
              <p>
                [ {product.companyName} ] {product.productName}
              </p>
              <p>{product.productPrice.toLocaleString()}원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomeProduct;
