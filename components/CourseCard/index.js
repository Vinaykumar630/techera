import './index.css'

const CourseCard = props => {
  const {details} = props
  const {imageUrl, name, description} = details
  return (
    <li className="course-item">
      <div className="card-container">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="course-info">
          <h1 className="item-heading">{name}</h1>
          <p className="item-desc">{description}</p>
        </div>
      </div>
    </li>
  )
}
export default CourseCard
