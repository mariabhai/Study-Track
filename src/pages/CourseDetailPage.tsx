import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { API_BASE_URL, HANDLE } from '../config'
import type { Course } from '../types'

const CourseDetailPage = () => {
  const { id } = useParams()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchCourse = async () => {
      setLoading(true)
      setError('')
      setCourse(null)

      try {
        const response = await fetch(
          `${API_BASE_URL}/${HANDLE}/items/${id}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'Kursen hittades inte.'
              : 'Kunde inte hämta kursen.',
          )
        }

        const data: Course = await response.json()

        if (!controller.signal.aborted) {
          setCourse(data)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Kunde inte hämta kursen.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCourse()

    return () => controller.abort()
  }, [id])

  if (loading) {
    return <p role="status">Laddar kurs...</p>
  }

  if (error) {
    return (
      <main>
        <p role="alert">{error}</p>
        <Link to="/">Tillbaka till kurserna</Link>
      </main>
    )
  }

  if (!course) {
    return (
      <main>
        <p>Kursen hittades inte.</p>
        <Link to="/">Tillbaka till kurserna</Link>
      </main>
    )
  }

  return (
    <main>
      <Link to="/">Tillbaka till kurserna</Link>

      <h2>{course.title}</h2>
      <p>Status: {course.status}</p>
      <Link to={`/courses/${course.id}/edit`}>
  Redigera kurs
</Link>
    </main>
  )
}

export default CourseDetailPage