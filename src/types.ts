export type Course = {
  id: string
  title: string
  subtitle: string
  category: string
  status: string
  imageUrl: string
  rating: number | null
  notes: string
  tags: string[]
  date: string | null
  createdAt: string
  updatedAt: string
}

export type Filter = 'Alla' | 'Kommande' | 'Pågående' | 'Avslutad'