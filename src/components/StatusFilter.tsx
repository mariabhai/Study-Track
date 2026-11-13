import type { Filter } from '../types'

type StatusFilterProps = {
  selectedStatus: Filter
  onStatusChange: (status: Filter) => void
}

const statuses: Filter[] = [
  'Alla',
  'Kommande',
  'Pågående',
  'Avslutad',
]

const StatusFilter = ({
  selectedStatus,
  onStatusChange,
}: StatusFilterProps) => {
  return (
    <div className="status-filter" role="group" aria-label="Filtrera kurser efter status">
      {statuses.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={selectedStatus === status}
          onClick={() => onStatusChange(status)}
        >
          {status === 'Avslutad' ? 'Avslutade' : status}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter
