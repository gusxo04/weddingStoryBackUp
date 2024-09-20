import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const Example = () => {
  const [selected, setSelected] = useState(["예시"]);

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="입력후 엔터"
      />
      <em>엔터를 입력하여 새로운 태그를 추가하세요.</em>
    </div>
  );
};

export default Example;
