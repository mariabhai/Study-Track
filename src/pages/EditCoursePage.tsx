import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import CourseForm from '../components/CourseForm'
import type { CourseFormData } from '../components/CourseForm'
import type { Course } from '../types'
import { API_BASE_URL, HANDLE } from '../config'

const EditCoursePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController() // Create an AbortController to handle fetch cancellation

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

  const handleSave = async (
    formData: CourseFormData,
  ): Promise<boolean> => {
    if (!course) {
      return false
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/${HANDLE}/items/${course.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )

      if (!response.ok) {
        return false
      }

      navigate(`/courses/${course.id}`)
      return true
    } catch {
      return false
    }
  }

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
      <Link to={`/courses/${course.id}`}>
        Tillbaka till kursen
      </Link>

      <h2>Redigera kurs</h2>

      <CourseForm
        key={course.id}
        initialTitle={course.title}
        initialStatus={course.status}
        initialImageUrl={course.imageUrl}
        initialSubtitle={course.subtitle}
        initialTags={course.tags}
        submitLabel="Spara ändringar"
        onSave={handleSave}
      />
    </main>
  )
}

export default EditCoursePage
