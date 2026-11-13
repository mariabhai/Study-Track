import { Link } from 'react-router'
import type { Course } from '../types'

type CourseCardProps = {
  course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className="course-card">
      {course.imageUrl ? (
        <img src={course.imageUrl} alt="" className="course-image" />
      ) : (
        <div className="course-placeholder" aria-hidden="true">⌘</div>
      )}

      <h2>
        <Link to={`/courses/${course.id}`}>
          {course.title}
        </Link>
      </h2>

      <div className="card-footer">
        <span className="status-badge" data-status={course.status}>{course.status}</span>
        <Link className="card-arrow" to={`/courses/${course.id}`} aria-label={`Visa ${course.title}`}>→</Link>
      </div>
    </article>
  )
}

export default CourseCard
