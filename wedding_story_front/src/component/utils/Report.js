import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h2>신고하기</h2>
      <button onClick={handleOpen}>신고하기</button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <ReportForm onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  );
};

const ReportForm = ({ onClose }) => {
  const [reportText, setReportText] = useState("");
  const navigator = useNavigate();

  const handleChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("신고 내용:", reportText);  
    setReportText(""); // 폼 초기화
    //navigator("/"); // 신고 후 이동
    onClose(); // 팝업 닫기
  };

  return (
    <div className="report-popup" style={popupStyle}>
      <img src="/image/main_logo.png" style={{ width: "300px" }} />
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
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  border: "1px solid #ccc",
  zIndex: 1000,
};

export default Report;