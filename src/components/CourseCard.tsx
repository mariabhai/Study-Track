import { Link } from 'react-router'
import type { Course } from '../types'

type CourseCardProps = {
  course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className="course-card">
      <h2>
        <Link to={`/courses/${course.id}`}>
          {course.title}
        </Link>
      </h2>

      <p>Status: {course.status}</p>
    </article>
  )
}

export default CourseCard