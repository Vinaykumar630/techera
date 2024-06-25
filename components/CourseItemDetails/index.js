import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FailureView from '../FailureView'
import CourseCard from '../CourseCard'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    course: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.fetchCourseDetails()
  }

  fetchCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      Method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedFormat = [fetchData.course_details].map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        course: updatedFormat,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onRetry = () => {
    this.fetchCourseDetails()
  }

  renderFailureCourse = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="threeDots" color="#4656a1" width={50} height={50} />
    </div>
  )

  renderSuccessCourse = () => {
    const {course} = this.state
    return (
      <ul className="course-list">
        {course.map(eachCourse => (
          <CourseCard key={eachCourse.id} details={eachCourse} />
        ))}
      </ul>
    )
  }

  renderCourseApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessCourse()
      case apiStatusConstant.failure:
        return this.renderFailureCourse()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseApi()}
      </>
    )
  }
}
export default CourseItemDetails
