import { useState } from "react";
// import { FaStar } from 'react-icons/fa'
import { PiStarFill } from "react-icons/pi";
import ToastEditor from "../utils/ToastEditor";
import { useRecoilState } from "recoil";
//import { loginIdState } from "../utils/RecoilData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductReview = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  //글작성 시 전송할 데이터 선언
  //const [loginId, setLoginId] = useRecoilState(loginIdState); //로그인한 회원아이디값(입력할게 아니기 때문에 state사용안함)
  const [boardTitle, setBoardTitle] = useState(""); //사용자가 입력할 제목
  const [thumbnail, setThumbnail] = useState(null); //썸네일은 첨부파일로 처리
  const [boardContent, setBoardContent] = useState(""); //사용자가 입력할 내용
  const [boardFile, setBoardFile] = useState([]); //첨부파일(여러개 일 수 있으므로 배열로 처리)
  const inputTitle = (e) => {
    setBoardTitle(e.target.value);
  };
  const writeBoard = () => {
    if (boardTitle !== "" && boardContent !== "") {
      const form = new FormData();
      form.append("boardTitle", boardTitle);
      form.append("boardContent", boardContent);
      //form.append("boardWriter", loginId);

      axios
        .post(`${backServer}/product`, form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            //navigate("/product/list");
          } else {
            Swal.fire({
              title: "에러가 발생했습니다.",
              text: "원인을 찾으세요.",
              icon: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="review-wrap">
      <div className="title">
        <h3>리뷰작성</h3>
      </div>
      <div className="content">
        <label className="star">별점</label>
        <RatingStar />
        <section className="section board-content-wrap">
          <div className="page-title">게시글 작성</div>
          <form
            className="board-write-frm"
            onSubmit={(e) => {
              e.preventDefault();
              writeBoard();
            }}
          >
            <div className="board-content-wrap">
              <ToastEditor
                boardContent={boardContent}
                setBoardContent={setBoardContent}
                type={0}
              />
            </div>
            <div className="review-button">
              <button type="submit" className="btn">
                등록하기
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

{
  /*별점  */
}
const RatingStar = () => {
  const [isHover, setIsHover] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(-1);
  let tempisHover = [false, false, false, false, false];

  const handleMouseOver = (index) => {
    tempisHover = [false, false, false, false, false];
    for (let i = 0; i < index + 1; i++) {
      tempisHover[i] = true;
    }
    setIsHover(tempisHover);
  };

  const handleMouseOut = () => {
    tempisHover = [false, false, false, false, false];
    for (let i = 0; i < score + 1; i++) {
      tempisHover[i] = true;
    }
    setIsHover(tempisHover);
  };

  const handleOnClick = (index) => {
    setScore(index);
  };

  return (
    <>
      <div className="rating-stars">
        {[0, 1, 2, 3, 4].map((element, index) => (
          <PiStarFill
            className={
              isHover[element] ? "rating-star-over" : "rating-star-out"
            }
            key={index}
            size={16}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            onClick={() => handleOnClick(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductReview;
