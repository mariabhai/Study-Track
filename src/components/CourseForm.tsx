import { useState, type SubmitEvent } from 'react'

export type CourseFormData = {
  title: string
  status: string
  subtitle: string
  tags: string[]
  imageUrl: string
}

type CourseFormProps = {
  onSave: (course: CourseFormData) => Promise<boolean>
  initialTitle?: string
  initialStatus?: string
  initialSubtitle?: string
  initialTags?: string[]
  initialImageUrl?: string
  submitLabel?: string
}

const CourseForm = ({
  onSave,
  initialTitle = '',
  initialStatus = 'Kommande',
  initialSubtitle = '',
  initialTags = [],
  initialImageUrl = '',
  submitLabel = 'Spara kurs',
}: CourseFormProps) => {
  const [formData, setFormData] = useState({
    title: initialTitle,
    status: initialStatus,
    imageUrl: initialImageUrl,
    subtitle: initialSubtitle,
    tags: initialTags.join('\n'),
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

    const tags = formData.tags.split('\n').map((tag) => tag.trim()).filter(Boolean)

    if (tags.length > 20 || tags.some((tag) => tag.length > 40)) {
      setError('Ange högst 20 utbildningsmoment med högst 40 tecken per moment.')
      return
    }

    setIsSaving(true)

    try {
      const success = await onSave({
        ...formData,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        tags: [...new Set(tags)],
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

        <div>
          <label htmlFor="subtitle">Kurslängd och poäng</label>
          <input id="subtitle" type="text" maxLength={100}
            placeholder="Exempel: 60p / 12v"
            value={formData.subtitle}
            onChange={(event) => setFormData({ ...formData, subtitle: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="tags">Utbildningsmoment</label>
          <p id="tags-help">Ett moment per rad. Högst 20 moment, 40 tecken per moment.</p>
          <textarea id="tags" rows={6} aria-describedby="tags-help"
            value={formData.tags}
            onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
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
