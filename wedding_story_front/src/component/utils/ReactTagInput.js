import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Example = (props) => {
  const [selected, setSelected] = useState(["예시"]);
  const keyWord = props.keyWord;
  const setKeyWord = props.setKeyWord;
  useEffect(() => {
    setKeyWord(selected);
    console.log(keyWord);
  }, [selected]);
  //selected 값이 변한때마다 company.keyWord 값에 복사
  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput
        value={keyWord === null ? selected : keyWord}
        onChange={setSelected}
        name="fruits"
        placeHolder="입력후 엔터"
      />
      <em>엔터를 입력하여 새로운 태그를 추가하세요.</em>
    </div>
  );
};

export default Example;
