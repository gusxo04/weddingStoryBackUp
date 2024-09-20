import { useRecoilValue } from "recoil";
import Counsel from "../marriageCounseling/Counsel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PageNavi from "../utils/PagiNavi";

const ProductAllList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [boardList, setBoarList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pi, setPi] = useState({});

  useEffect(() => {
    axios
      .get(`${backServer}/product/list/${reqPage}`)
      .then((res) => {
        console.log(res);
        setBoarList(res.data.list); //게시물
        setPi(res.data.pi); //페이지넘버링
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reqPage]);
  return (
    <section className="board-list">
      <div className="page-title">
        <ul className="name-title">
          <li>
            <Link to="/product/pay">스튜디오</Link>
          </li>
          <li>
            <Link to="/product/review">드레스</Link>
          </li>
          <li>
            <Link to="#">메이크업</Link>
          </li>
          <li>
            <Link to="#">예복</Link>
          </li>
          <li>
            <Link to="#">예물</Link>
          </li>
        </ul>
      </div>

      <div className="board-list-wrap">
        <ul className="posting-wrap">
          {boardList.map((board, i) => {
            return <BoardItem key={"board-" + i} board={board} />;
          })}
        </ul>
      </div>
      <div className="board-paging-wrap">
        <PageNavi pi={pi} reqPage={reqPage} setReqPage={setReqPage} />
      </div>
    </section>
  );
};

const BoardItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const board = props.board;
  const navigate = useNavigate();
  return (
    <li
      className="posting-item"
      onClick={() => {
        navigate(`/product/list/${board.boardNo}`);
      }}
    >
      <div>
        <img
          src={
            board.boardThumb
              ? `${backServer}/product/thumb/${board.boardThumb}`
              : "/image/default_img.png"
          }
        />
      </div>
      <div className="posting-info">
        <div className="posting-title">{board.boardTitle}</div>
        <div className="posting-sub-info">
          <span>{board.boardWriter}</span>
          <span>{board.boardDate}</span>
        </div>
      </div>
    </li>
  );
};

export default ProductAllList;
