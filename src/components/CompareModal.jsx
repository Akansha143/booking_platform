import React from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { formatCurrency } from '../utils/currency'
import StarRating from './StarRating'

export default function CompareModal({ compareItems, onClose, onRemove }) {
  if (compareItems.length < 2) return null

  const events = compareItems.map(id => EVENTS.find(e => e.id === id)).filter(Boolean)
  if (events.length < 2) return null

  const fields = [
    { label: 'Price', key: 'price', render: (e) => <span className="text-green-400 font-semibold">{formatCurrency(e.price)}</span> },
    { label: 'Rating', key: 'rating', render: (e) => <div className="flex items-center gap-1.5"><StarRating rating={e.rating} size={14} /><span className="text-slate-400 text-sm">{e.rating}/5</span></div> },
    { label: 'Reviews', key: 'reviewCount', render: (e) => <span className="text-slate-400 text-sm">{e.reviewCount}</span> },
    { label: 'Date', key: 'date', render: (e) => <span className="text-slate-400 text-sm">{e.date} at {e.time}</span> },
    { label: 'Venue', key: 'venue', render: (e) => <span className="text-slate-300 text-sm">{e.venue}</span> },
    { label: 'City', key: 'city', render: (e) => <span className="text-slate-400 text-sm">{e.city}</span> },
    { label: 'Category', key: 'category', render: (e) => <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg capitalize">{e.category}</span> },
    { label: 'Availability', key: 'avail', render: (e) => {
      const total = e.zones.reduce((s, z) => s + z.available, 0)
      if (total === 0) return <span className="text-red-400 text-sm">Sold Out</span>
      if (total <= 5) return <span className="text-amber-400 text-sm">{total} Left</span>
      return <span className="text-green-400 text-sm">Available</span>
    }},
    { label: 'Tags', key: 'tags', render: (e) => (
      <div className="flex flex-wrap gap-1">
        {e.tags.slice(0, 4).map(t => <span key={t} className="bg-slate-800 text-slate-500 text-xs px-2 py-0.5 rounded-full">{t}</span>)}
      </div>
    )}
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-animate" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-1">
          <h2 className="text-slate-100 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Compare Events
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors" aria-label="Close compare">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Event headers */}
          <div className={`grid gap-4 mb-6 ${events.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {events.map(e => (
              <div key={e.id} className="bg-slate-800/50 rounded-xl p-4 text-center">
                <div className="flex justify-end mb-2">
                  <button onClick={() => onRemove(e.id)} className="text-slate-600 hover:text-red-400 transition-colors text-xs">✕ Remove</button>
                </div>
                <img src={e.images[0]} alt={e.title} className="w-full h-28 object-cover rounded-lg mb-3" />
                <h3 className="text-slate-200 font-semibold text-sm leading-snug text-center">{e.title}</h3>
              </div>
            ))}
          </div>

          {/* Comparison rows */}
          <div className="flex flex-col">
            {fields.map((field, idx) => (
              <div
                key={field.key}
                className={`grid gap-4 items-start py-3 border-b border-slate-800 ${events.length === 2 ? 'grid-cols-3' : 'grid-cols-4'} ${idx % 2 === 0 ? '' : 'bg-slate-800/20'}`}
              >
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wide pt-0.5">{field.label}</div>
                {events.map(e => (
                  <div key={e.id} className="flex items-center">
                    {field.render(e)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* View Detail links */}
          <div className={`grid gap-4 mt-6 ${events.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {events.map(e => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                onClick={onClose}
                className="text-center bg-slate-800 hover:bg-slate-700 text-green-400 text-sm font-medium py-2.5 rounded-lg transition-all"
              >
                View Details →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}