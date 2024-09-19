import { Route, Routes } from "react-router-dom";
import BoardList from "./BoardList";
import BoardWrite from "./BoardWrite";
import BoardView from "./BoardView";
import BoardUpdate from "./BoardUpdate";

const Board = () => {
  return (
    <Routes>
      <Route path="list" element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="view/:boardNo" element={<BoardView />} />
      <Route path="update/:boardNo" element={<BoardUpdate />} />
    </Routes>
  );
};

export default Board;
