import { useState } from "react";
import Select from "react-select";
import "./company.css";
import Example from "../utils/ReactTagInput";

// 시간 option 만들기 - 시(hour)
let openHour = [];
for (let i = 8; i < 13; i++) {
  let op = {};

  // 시간을 00시로 나타내기 위해
  op.value = ("0" + i).slice(-2);
  op.label = ("0" + i).slice(-2) + "시";

  openHour.push(op);
}
let closeHour = [];
for (let i = 16; i < 25; i++) {
  let op = {};

  // 시간을 00시로 나타내기 위해
  op.value = ("0" + i).slice(-2);
  op.label = ("0" + i).slice(-2) + "시";

  closeHour.push(op);
} //출처: https://anerim.tistory.com/213 [디발자 뚝딱:티스토리]

const CompanyJoin = () => {
  const [company, setCompany] = useState({
    companyName: "",
    companyTel: "",
    companyAddr: "",
    companyCategory: "",
    startTime: "",
    endTime: "",
    dayOff: "",
    keyWord: "",
  });
  const [selectOption, setSelectOption] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [category, setCategory] = useState(null);
  const selectOptions = [
    { value: "웨딩홀", label: "웨딩홀" },
    { value: "스튜디오", label: "스튜디오" },
    { value: "드레스", label: "드레스" },
    { value: "메이크업", label: "메이크업" },
    { value: "예복", label: "예복" },
    { value: "본식", label: "본식" },
  ];
  const handleOptionChange = (option) => {
    setCategory(option);
  };
  return (
    <div className="join-wrap">
      <section className="section">
        <div className="main-content">
          <div className="title">업체 등록</div>
          <div className="company-info-input-zone">
            <div className="company-input-wrap">
              <label htmlFor="companyCode">업체코드</label>
              <input type="text" id="companyCode"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyName">업체명</label>
              <input type="text" id="companyName" name="companyName"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyPhone">업체 전화번호</label>
              <input type="text" id="companyPhone"></input>
              <span>-</span>
              <input type="text" id="companyPhone"></input>
              <span>-</span>
              <input type="text" id="companyPhone"></input>
              <input type="hidden"></input>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr">업체주소</label>
              <input type="text" id="companyAddr" readOnly></input>
              <button>검색</button>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="companyAddr-detail">상세주소</label>
              <input type="text" id="companyAddr-detail"></input>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="open-time">영업시간</label>
              <div className="time-select" id="open-time">
                <Select
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={openHour}
                />
              </div>
              <span>~</span>
              <div className="time-select">
                <Select
                  onChange={(e) => setTimeValue(e.value)}
                  placeholder="시간을 선택하세요."
                  options={closeHour}
                />
              </div>
            </div>
            <div className="company-select-wrap">
              <label htmlFor="category">카테고리</label>
              <div className="category-select" id="category">
                <Select
                  onChange={(e) => setCategory(e.value)}
                  placeholder="카테고리"
                  options={selectOptions}
                />
              </div>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="company-closed-days">업체 휴무일</label>
              <div className="checkbox" id="company-closed-day">
                <label htmlFor="monday">월</label>
                <input type="checkbox" id="monday" readOnly></input>
                <label htmlFor="tuesday">화</label>
                <input type="checkbox" id="tuesday" readOnly></input>
                <label htmlFor="wednesday">수</label>
                <input type="checkbox" id="wednesday" readOnly></input>
                <label htmlFor="thursday">목</label>
                <input type="checkbox" id="thursday" readOnly></input>
                <label htmlFor="friday">금</label>
                <input type="checkbox" id="friday" readOnly></input>
                <label htmlFor="saturday">토</label>
                <input type="checkbox" id="saturday" readOnly></input>
                <label htmlFor="sunday">일</label>
                <input type="checkbox" id="sunday" readOnly></input>
              </div>
            </div>
            <div className="company-input-wrap">
              <label htmlFor="keyword">키워드</label>
              <Example />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const KeyWord = (props) => {
  const setCompany = props.setCompany;

  const [keyWord, setKeyWord] = useState([]);
  const [inputContent, setInputContent] = useState("");
  // 키워드가 추가됐을 때 실행되는 함수
  const keyWordPush = () => {
    // 키워드가 이미 있거나 비어있으면 alert창 띄운 후 반환.
    if (keyWord.includes(inputContent) || inputContent === "") {
      alert(`이미 ${inputContent} 가 선택되어있습니다.`);
      return;
    }
    // 키워드가 없다면 추가시켜주고 input창 비워주기.
    setKeyWord([...keyWord, inputContent]);
    setInputContent("");
  };
  // 키원드 hover 시 X 표시 누르면 키워드 삭제 시켜주기.
  const deleteKeyWord = (index) => {
    setKeyWord(keyWord.filter((item, i) => item !== keyWord[index]));
    setInputContent("");
  };
  return (
    <>
      <div className="key_word_contain" id="keyword">
        <div className="keyWordInputContain">
          <input
            type="text"
            value={inputContent}
            onChange={(event) => {
              setInputContent(event.target.value);
            }}
            placeholder="키워드를 입력해주세요"
          />
          <button
            onClick={() => {
              keyWordPush();
            }}
            className="add"
          >
            추가
          </button>
        </div>
        <span className="my_keyWords">
          {keyWord.map((item, index) => (
            <span className="keyWord" key={index}>
              {item}
              <sup>
                <span
                  className="material-icons close"
                  onClick={() => {
                    deleteKeyWord(index);
                  }}
                >
                  close
                </span>
              </sup>
            </span>
          ))}
        </span>
      </div>
    </>
  );
};
export default CompanyJoin;
