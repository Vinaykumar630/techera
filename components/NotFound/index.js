import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          alt="not found"
          className="not-image"
        />
      </div>
      <h1 className="not-heading">Page Not Found</h1>
      <p className="not-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
