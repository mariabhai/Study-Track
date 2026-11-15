import { Link } from 'react-router'
import type { Course } from '../types'
import { courseImageSizes, courseImageSrcSet, optimizeImage } from '../utils/images'

type CourseCardProps = {
  course: Course
  prioritizeImage?: boolean
}

const CourseCard = ({ course, prioritizeImage = false }: CourseCardProps) => {
  return (
    <article className="course-card">
      {course.imageUrl ? (
        <img
          src={optimizeImage(course.imageUrl, 640)}
          srcSet={courseImageSrcSet(course.imageUrl)}
          sizes={courseImageSizes}
          fetchPriority={prioritizeImage ? 'high' : 'auto'}
          loading="eager"
          alt=""
          className="course-image"
        />
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
