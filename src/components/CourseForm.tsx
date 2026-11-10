import { useState, type SubmitEvent } from 'react'

export type CourseFormData = {
  title: string
  status: string
}

type CourseFormProps = {
  onSave: (course: CourseFormData) => Promise<boolean>
  initialTitle?: string
  initialStatus?: string
  submitLabel?: string
}

const CourseForm = ({
  onSave,
  initialTitle = '',
  initialStatus = 'Kommande',
  submitLabel = 'Spara kurs',
}: CourseFormProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialTitle,
    status: initialStatus,
  })
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSaving) {
      return
    }

    setError('')

    if (!formData.title.trim()) {
      setError('Ange ett kursnamn.')
      return
    }

    setIsSaving(true)

    try {
      const success = await onSave({
        ...formData,
        title: formData.title.trim(),
      })

      if (!success) {
        setError('Kunde inte spara kursen. Försök igen.')
      }
    } catch {
      setError('Kunde inte spara kursen. Försök igen.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isSaving}>
        <legend>Kursuppgifter</legend>

        <div>
          <label htmlFor="title">Kursnamn</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            maxLength={100}
            required
            onChange={(event) =>
              setFormData({
                ...formData,
                title: event.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(event) =>
              setFormData({
                ...formData,
                status: event.target.value,
              })
            }
          >
            <option value="Kommande">Kommande</option>
            <option value="Pågående">Pågående</option>
            <option value="Avslutad">Avslutad</option>
          </select>
        </div>

        <button type="submit">
          {isSaving ? 'Sparar...' : submitLabel}
        </button>
      </fieldset>

      {error && <p role="alert">{error}</p>}
    </form>
  )
}

export default CourseForm
