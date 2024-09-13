import { Link } from "react-router-dom";
import "./common.css";

const Header = () => {
  return (
    <header className='header'>
        <div className="header-content">
          <Link to="/convention">박람회임</Link>

        </div>
    </header>
  )
}

export default Header