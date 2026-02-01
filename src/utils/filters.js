import { useAnalytics } from '../hooks/useAnalytics'

// Date helpers
function getStartOfWeek() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day
  const start = new Date(now.setDate(diff))
  start.setHours(0, 0, 0, 0)
  return start
}

function getEndOfWeek() {
  const start = getStartOfWeek()
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

function getEndOfMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
}

function parseEventDate(dateStr) {
  // Parse as local date (no timezone shift)
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function filterEvents(events, filters, popularityBoostFn) {
  let result = [...events]

  // --- Search ---
  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    )
  }

  // --- Category ---
  if (filters.category && filters.category !== 'all') {
    result = result.filter(e => e.category === filters.category)
  }

  // --- Price range ---
  if (filters.priceMin !== undefined && filters.priceMin !== '') {
    result = result.filter(e => e.price >= Number(filters.priceMin))
  }
  if (filters.priceMax !== undefined && filters.priceMax !== '') {
    result = result.filter(e => e.price <= Number(filters.priceMax))
  }

  // --- Date filter ---
  if (filters.dateFilter && filters.dateFilter !== 'all') {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    result = result.filter(e => {
      const eventDate = parseEventDate(e.date)
      switch (filters.dateFilter) {
        case 'upcoming':
          return eventDate >= now
        case 'this_week':
          return eventDate >= now && eventDate <= getEndOfWeek()
        case 'this_month':
          return eventDate >= now && eventDate <= getEndOfMonth()
        default:
          return true
      }
    })
  }

  // --- Sort ---
  const sort = filters.sort || 'popular'
  result.sort((a, b) => {
    switch (sort) {
      case 'popular': {
        const boostA = popularityBoostFn ? popularityBoostFn(a.id) : 0
        const boostB = popularityBoostFn ? popularityBoostFn(b.id) : 0
        return (b.popularityScore + boostB) - (a.popularityScore + boostA)
      }
      case 'price_asc':
        return a.price - b.price
      case 'price_desc':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return result
}

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  priceMin: '',
  priceMax: '',
  dateFilter: 'all',
  sort: 'popular'
}