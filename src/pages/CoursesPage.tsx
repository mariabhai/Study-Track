import { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import StatusFilter from '../components/StatusFilter'
import type { Course, Filter } from '../types'
import { API_BASE_URL, HANDLE } from '../config'

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedStatus, setSelectedStatus] = useState<Filter>('Alla')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/${HANDLE}/items`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Kunde inte hämta kurserna.')
        }

        const data: Course[] = await response.json()

        if (!controller.signal.aborted) {
          setCourses(data)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Kunde inte hämta kurserna. Försök igen senare.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCourses()

    return () => controller.abort()
  }, [])

  if (loading) {
    return <p role="status">Laddar kurser...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  const filteredCourses = courses.filter(
    (course) =>
      selectedStatus === 'Alla' || course.status === selectedStatus,
  )

  return (
    <main>
      <h1>Mina kurser</h1>

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {courses.length === 0 ? (
        <p>Du har inga kurser ännu.</p>
      ) : filteredCourses.length === 0 ? (
        <p>Det finns inga kurser med vald status.</p>
      ) : (
        <div>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </main>
  )
}

export default CoursesPage
