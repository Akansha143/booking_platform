import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { filterEvents, DEFAULT_FILTERS } from '../utils/filters'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAnalytics } from '../hooks/useAnalytics'
import FilterSidebar from '../components/FilterSidebar'
import EventCard from '../components/EventCard'
import CompareModal from '../components/CompareModal'
import { ListingSkeleton } from '../components/Skeleton'

const PAGE_SIZE = 6

export default function Listing() {
  useEffect(() => {
    document.title = 'All Events — EventFlow'
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useLocalStorage('eventflow_filters', DEFAULT_FILTERS)
  const [searchInput, setSearchInput] = useState(filters.search || '')
  const debouncedSearch = useDebounce(searchInput, 350)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [compareItems, setCompareItems] = useState([])
  const { getPopularityBoost } = useAnalytics()

  // Sync URL params → filters (for category links from Home)
  useEffect(() => {
    const cat = searchParams.get('category')
    const sort = searchParams.get('sort')
    if (cat) setFilters(prev => ({ ...prev, category: cat }))
    if (sort) setFilters(prev => ({ ...prev, sort }))
  }, [searchParams])

  // Sync debounced search → filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])

  // Simulate loading on filter change
  useEffect(() => {
    setLoading(true)
    setVisibleCount(PAGE_SIZE)
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [filters])

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [setFilters])

  const handleClearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchInput('')
  }, [setFilters])

  const filtered = filterEvents(EVENTS, filters, getPopularityBoost)
  const visible = filtered.slice(0, visibleCount)
  const hasMore = filtered.length > visibleCount

  // Compare
  const toggleCompare = (id) => {
    setCompareItems(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= 3) return prev // max 3
      return [...prev, id]
    })
  }

  const removeCompare = (id) => {
    setCompareItems(prev => prev.filter(i => i !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>All Events</h1>
          <p className="text-slate-500 text-sm">Discover concerts, comedy, workshops, sports & theatre near you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top bar: search + mobile filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search events, venues, cities…"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setFilters(prev => ({ ...prev, search: '' })) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:border-slate-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filters
          </button>
        </div>

        {/* Compare bar */}
        {compareItems.length >= 2 && (
          <div className="mb-4 bg-blue-950/40 border border-blue-900/50 rounded-xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-sm font-medium">Comparing {compareItems.length} events</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCompareItems([])}
                className="text-blue-500 hover:text-blue-300 text-xs transition-colors"
              >Clear</button>
              <button
                onClick={() => {/* modal auto-shows */}}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-lg transition-all"
              >Compare →</button>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            mobileOpen={mobileFilterOpen}
            onMobileClose={() => setMobileFilterOpen(false)}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {/* Result count */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm">
                {loading ? '…' : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} found`}
              </span>
            </div>

            {loading ? (
              <ListingSkeleton count={PAGE_SIZE} />
            ) : filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {visible.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      compareItems={compareItems}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                    >
                      Load More ({filtered.length - visibleCount} more)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      {compareItems.length >= 2 && (
        <CompareModal
          compareItems={compareItems}
          onClose={() => setCompareItems([])}
          onRemove={removeCompare}
        />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <h3 className="text-slate-300 font-semibold text-lg mb-1.5">No events found</h3>
      <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
        Try adjusting your filters or search terms. We update our listings daily.
      </p>
    </div>
  )
}