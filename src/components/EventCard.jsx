import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatCurrency } from '../utils/currency'
import { CATEGORY_LABELS } from '../data/events'
import StarRating from './StarRating'

function getAvailabilityLabel(count) {
  if (count === 0) return { label: 'Sold Out', color: 'bg-red-900/40 text-red-400 border-red-800' }
  if (count <= 5) return { label: `${count} Left`, color: 'bg-amber-900/40 text-amber-400 border-amber-800' }
  return { label: 'Available', color: 'bg-green-900/40 text-green-400 border-green-800' }
}

export default function EventCard({ event, compareItems, onToggleCompare }) {
  const { addToCart } = useCart()
  const toast = useToast()
  const [wishlist, setWishlist] = useLocalStorage('eventflow_wishlist', [])
  const [isWished, setIsWished] = useState(() => wishlist.includes(event.id))
  const [showZones, setShowZones] = useState(false)

  const totalAvailable = event.zones.reduce((s, z) => s + z.available, 0)
  const avail = getAvailabilityLabel(totalAvailable)
  const isInCompare = compareItems?.includes(event.id)

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const updated = isWished
      ? wishlist.filter(id => id !== event.id)
      : [...wishlist, event.id]
    setWishlist(updated)
    setIsWished(!isWished)
    toast.info(isWished ? `Removed "${event.title}" from wishlist` : `Added "${event.title}" to wishlist`)
  }

  const handleAddToCart = (zone) => {
    if (zone.available <= 0) {
      toast.error('This zone is sold out.')
      return
    }
    addToCart({
      eventId: event.id,
      title: event.title,
      zone: zone.name,
      price: zone.price,
      quantity: 1,
      image: event.images[0]
    })
    toast.success(`Added "${event.title}" (${zone.name}) to cart!`)
    setShowZones(false)
  }

  const cheapestAvailable = [...event.zones].filter(z => z.available > 0).sort((a, b) => a.price - b.price)[0]

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 flex flex-col fade-up">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <span className="bg-slate-950/80 backdrop-blur-sm text-slate-300 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-700">
            {CATEGORY_LABELS[event.category]}
          </span>
          <div className="flex gap-1.5">
            {/* Compare toggle */}
            {onToggleCompare && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(event.id) }}
                className={`p-1.5 rounded-lg backdrop-blur-sm border transition-all ${isInCompare ? 'bg-blue-600/80 border-blue-500 text-white' : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:text-white'}`}
                aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
                title="Compare"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 21L17 3"/><path d="M21 15l-4 6"/><path d="M3 9l4-6"/>
                </svg>
              </button>
            )}
            {/* Wishlist */}
            <button
              onClick={toggleWishlist}
              className={`p-1.5 rounded-lg backdrop-blur-sm border transition-all ${isWished ? 'bg-red-600/80 border-red-500 text-white' : 'bg-slate-950/60 border-slate-700 text-slate-400 hover:text-white'}`}
              aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Availability badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${avail.color}`}>
            {avail.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs uppercase tracking-wider">{event.city}</span>
          <div className="flex items-center gap-1">
            <StarRating rating={event.rating} size={13} />
            <span className="text-slate-500 text-xs ml-0.5">{event.rating}</span>
          </div>
        </div>

        <Link to={`/events/${event.id}`} className="group/title">
          <h3 className="text-slate-100 font-semibold text-base leading-snug group-hover/title:text-green-400 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span>{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{event.venue}</span>
        </div>

        {/* Bottom */}
        <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-green-400 font-bold text-lg">{formatCurrency(event.price)}</span>
            <span className="text-slate-600 text-xs ml-1">/ ticket</span>
          </div>

          {totalAvailable === 0 ? (
            <span className="text-slate-600 text-sm font-medium px-4 py-2 rounded-lg bg-slate-800 cursor-not-allowed">Sold Out</span>
          ) : event.zones.length === 1 ? (
            <button
              onClick={() => handleAddToCart(event.zones[0])}
              className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-green-900/30 hover:shadow-green-900/50"
            >
              Add to Cart
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowZones(!showZones)}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-green-900/30"
              >
                {showZones ? 'Close' : 'Select Zone'}
              </button>
              {showZones && (
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-10">
                  <div className="p-2 border-b border-slate-700">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wide">Choose a Zone</span>
                  </div>
                  {event.zones.map((zone, i) => (
                    <button
                      key={i}
                      onClick={() => handleAddToCart(zone)}
                      disabled={zone.available <= 0}
                      className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors ${zone.available <= 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'}`}
                    >
                      <span className="text-slate-300 text-sm">{zone.name}</span>
                      <div className="text-right">
                        <span className="text-green-400 text-sm font-semibold">{formatCurrency(zone.price)}</span>
                        {zone.available <= 0 && <span className="block text-red-400 text-xs">Sold Out</span>}
                        {zone.available > 0 && zone.available <= 5 && <span className="block text-amber-400 text-xs">{zone.available} left</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}