import { Route, Routes } from "react-router-dom";
import QuestionList from "./QuestionList";
import QuestionResponse from "./QuestionResponse";
import "./question2.css";

const Question = () => {
  return (
    <div>
      <Routes>
            <Route path="list" element={<QuestionList />} />
            <Route path="write/:questionNo" element={<QuestionResponse />} />
        </Routes>
    </div>
  );
};
export default Question;
