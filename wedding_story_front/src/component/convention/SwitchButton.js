const SwitchButton = (props) => {

  const {
    formType,
    setFormType,
  } = props;
  
  return (
    <div className="convention-header">
      <button className={formType ? "selected" : ""} onClick={() => {
        setFormType(true); 
      }} >작성</button>
      <button className={formType ? "" : "selected"} onClick={() => {
        setFormType(false); 
      }} >프리뷰</button>
    </div>
  )
}
export default SwitchButton