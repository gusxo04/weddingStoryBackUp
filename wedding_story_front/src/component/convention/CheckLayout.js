
import ConventionLayout from './../utils/ConventionLayout';

const CheckLayout = (props) => {

  const{
    insert
  } = props;
  
  return (
    <div className='convention-check-layout'>
      <ConventionLayout permission={0} insert={insert} />
    </div>
  )
}
export default CheckLayout