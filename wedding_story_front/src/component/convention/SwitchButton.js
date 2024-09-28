const SwitchButton = (props) => {

  const {
    formType,
    setFormType,
  } = props;
  
  return (
    <div className="convention-header">
      <button className={formType === 1? "selected" : ""} onClick={() => {
        setFormType(1); 
      }} >작성</button>
      <button className={formType === 2 ? "selected" : ""} onClick={() => {
        setFormType(2); 
      }} >프리뷰</button>
      <button className={formType === 3 ? "selected" : ""} onClick={() => {
        setFormType(3);
      }}>부스수정</button>
    </div>
  )
}
export default SwitchButton