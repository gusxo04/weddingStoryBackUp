import { Route, Routes } from "react-router-dom";
import QuestionMain from "./QuestionMain";
import WriteQuestion from "./WriteQuestion";

const Question = () => {
    return (
        <Routes>
            <Route path="main" element={<QuestionMain />} />
            <Route path="write/:questionType" element={<WriteQuestion />} />
        </Routes>
    );
}

export default Question;
