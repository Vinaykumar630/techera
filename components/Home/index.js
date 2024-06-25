import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import CourseItem from '../CourseItem'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    courseList: [],
  }

  componentDidMount() {
    this.fetchCourse()
  }

  fetchCourse = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      Method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        courseList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onRetry = () => {
    this.fetchCourse()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="threeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="success-card">
        <h1 className="success-heading">Courses</h1>
        <ul className="success-list">
          {courseList.map(eachItem => (
            <CourseItem key={eachItem.id} courseDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}
export default Home
