import ConventionLayout from "../utils/ConventionLayout";

const ShowLayout = (props) => {

  const {
    closeAlert,
  } = props;
  
  return (
    <div className="convention-show-layout-wrap" id="convention-close-screen" onClick={closeAlert}>
      <div className="convention-show-layout-container">
        <ConventionLayout />
      </div>
    </div>
  )
}
export default ShowLayout