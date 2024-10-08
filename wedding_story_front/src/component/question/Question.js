import { Route, Routes } from "react-router-dom";
import QuestionMain from "./QuestionMain";
import WriteQuestion from "./WriteQuestion";
import QuestionView from "./QuestionView";

const Question = () => {
    return (
        <Routes>
            <Route path="main" element={<QuestionMain />} />
            <Route path="write/:questionType" element={<WriteQuestion />} />
            <Route path="view/:questionNo" element={<QuestionView />} />
        </Routes>
    );
}

export default Question;
