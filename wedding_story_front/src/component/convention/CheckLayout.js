
import ConventionLayout from './../utils/ConventionLayout';

const CheckLayout = (props) => {

  const{
    insert,
    conventionNo
  } = props;
  
  return (
    <div className='convention-check-layout'>
      <ConventionLayout permission={0} insert={insert} conventionNo={conventionNo} />
    </div>
  )
}
export default CheckLayout