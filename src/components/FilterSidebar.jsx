import React, { useState } from 'react'

const CATEGORIES = [
  { value: 'all', label: 'All Events' },
  { value: 'concert', label: '🎵 Concert' },
  { value: 'comedy', label: '😂 Comedy' },
  { value: 'workshop', label: '🛠 Workshop' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'theatre', label: '🎭 Theatre' }
]

const DATE_OPTIONS = [
  { value: 'all', label: 'Any Date' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' }
]

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' }
]

export default function FilterSidebar({ filters, onFilterChange, onClearAll, mobileOpen, onMobileClose }) {
  const activeCount = [
    filters.category !== 'all',
    filters.priceMin !== '',
    filters.priceMax !== '',
    filters.dateFilter !== 'all',
    filters.search !== ''
  ].filter(Boolean).length

  const content = (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => onFilterChange('category', cat.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                filters.category === cat.value
                  ? 'bg-green-600 text-white shadow-md shadow-green-900/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Price Range</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={e => onFilterChange('priceMin', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
          </div>
          <span className="text-slate-600 text-sm">—</span>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={e => onFilterChange('priceMax', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Date</label>
        <div className="flex flex-col gap-1.5">
          {DATE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onFilterChange('dateFilter', opt.value)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                filters.dateFilter === opt.value
                  ? 'bg-slate-800 text-green-400 border border-green-800'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Sort By</label>
        <select
          value={filters.sort}
          onChange={e => onFilterChange('sort', e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-green-600 transition-colors appearance-none cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-slate-800 text-slate-200">{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Clear All */}
      {activeCount > 0 && (
        <button
          onClick={onClearAll}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors text-center pt-1 border-t border-slate-800"
        >
          Clear All Filters ({activeCount})
        </button>
      )}
    </div>
  )

  // Desktop
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-slate-200 font-semibold text-base">Filters</h2>
            {activeCount > 0 && (
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{activeCount}</span>
            )}
          </div>
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-animate"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[90vw] bg-slate-900 border-l border-slate-800 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900">
              <h2 className="text-slate-200 font-semibold">Filters</h2>
              <button
                onClick={onMobileClose}
                className="text-slate-500 hover:text-white transition-colors p-1"
                aria-label="Close filters"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="p-5">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  )
}