import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="nav-container">
    <div>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="header-image"
        />
      </Link>
    </div>
  </div>
)
export default Header
