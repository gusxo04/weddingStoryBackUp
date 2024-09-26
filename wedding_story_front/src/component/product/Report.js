import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [reportText, setReportText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigator = useNavigate();

  const handleChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 신고 처리 로직을 추가 (예: API 호출)
    console.log("신고 내용:", reportText);

    // 신고 성공 메시지 표시
    setSuccessMessage("신고가 완료되었습니다.");
    setReportText(""); // 폼 초기화
    navigator("/");
  };

  return (
    <div>
      <h2>신고하기</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reportText}
          onChange={handleChange}
          placeholder="신고 내용을 입력하세요."
          rows="5"
          cols="30"
          required
        />
        <br />
        <button type="submit">신고하기</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Report;
