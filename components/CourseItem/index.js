import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <Link to={`/courses/${id}`} className="anchor-link">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="list-image" />
        <p className="list-para">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
