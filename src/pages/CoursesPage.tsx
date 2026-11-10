import { useEffect, useState } from 'react'
import { API_BASE_URL, HANDLE } from '../config'
import type { Course } from '../types'

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
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

  return (
    <main>
      <h1>StudyTrack</h1>

      {courses.length === 0 ? (
        <p>Du har inga kurser ännu.</p>
      ) : (
        <div>
          {courses.map((course) => (
            <article key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.status}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default CoursesPage