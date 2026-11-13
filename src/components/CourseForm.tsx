import { useState, type SubmitEvent } from 'react'

export type CourseFormData = {
  title: string
  status: string
  imageUrl: string
}

type CourseFormProps = {
  onSave: (course: CourseFormData) => Promise<boolean>
  initialTitle?: string
  initialStatus?: string
  initialImageUrl?: string
  submitLabel?: string
}

const CourseForm = ({
  onSave,
  initialTitle = '',
  initialStatus = 'Kommande',
  initialImageUrl = '',
  submitLabel = 'Spara kurs',
}: CourseFormProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialTitle,
    status: initialStatus,
    imageUrl: initialImageUrl,
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

        <div>
          <label htmlFor="imageUrl">Bildlänk</label>
          <input
            id="imageUrl"
            type="url"
            placeholder="https://exempel.se/kursbild.jpg"
            value={formData.imageUrl}
            onChange={(event) =>
              setFormData({
                ...formData,
                imageUrl: event.target.value,
              })
            }
          />
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
