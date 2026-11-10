import { useNavigate } from 'react-router'
import CourseForm from '../components/CourseForm'
import type { CourseFormData } from '../components/CourseForm'
import type { Course } from '../types'
import { API_BASE_URL, HANDLE } from '../config'

const NewCoursePage = () => {
  const navigate = useNavigate()

  const handleSave = async (course: CourseFormData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${HANDLE}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
      })

      if (!response.ok) {
        return false
      }

      const data: Course = await response.json()

      navigate(`/courses/${data.id}`)
      return true
    } catch {
      return false
    }
  }

  return (
    <section>
      <h2>Lägg till kurs</h2>
      <CourseForm onSave={handleSave} />
    </section>
  )
}

export default NewCoursePage