import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-heading">Oops! Something Went Wrong</h1>
      <p className="error-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={onClickRetry} type="button" className="error-btn">
        Retry
      </button>
    </div>
  )
}
export default FailureView
