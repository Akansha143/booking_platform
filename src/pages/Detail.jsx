import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { EVENTS } from '../data/events'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAnalytics } from '../hooks/useAnalytics'
import { formatCurrency } from '../utils/currency'
import Breadcrumb from '../components/Breadcrumb'
import StarRating from '../components/StarRating'
import EventCard from '../components/EventCard'
import { DetailSkeleton } from '../components/Skeleton'

export default function Detail() {
  const { id } = useParams()
  const eventId = parseInt(id, 10)
  const event = EVENTS.find(e => e.id === eventId)

  const { addToCart } = useCart()
  const toast = useToast()
  const { trackView, trackAddToCart } = useAnalytics()
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('eventflow_recently_viewed', [])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedZone, setSelectedZone] = useState(null)
  const [loading, setLoading] = useState(true)
  const [faqOpen, setFaqOpen] = useState({})

  // Track view & recently viewed
  useEffect(() => {
    if (event) {
      trackView(event.id)
      document.title = `${event.title} — EventFlow`
      // Update recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(eid => eid !== event.id)
        return [event.id, ...filtered].slice(0, 10)
      })
    }
  }, [event])

  // Simulate loading
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [eventId])

  if (!event) return <Navigate to="/404" replace />
  if (loading) return <div className="min-h-screen bg-slate-950 pt-20"><DetailSkeleton /></div>

  const totalAvailable = event.zones.reduce((s, z) => s + z.available, 0)
  const availableZones = event.zones.filter(z => z.available > 0)

  // Related events: same category, exclude current
  const related = EVENTS
    .filter(e => e.category === event.category && e.id !== event.id)
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4)

  const avgRating = event.reviews.length
    ? (event.reviews.reduce((s, r) => s + r.rating, 0) / event.reviews.length).toFixed(1)
    : event.rating

  const handleAddToCart = () => {
    if (!selectedZone) {
      toast.warning('Please select a seating zone first.')
      return
    }
    if (selectedZone.available <= 0) {
      toast.error('This zone is sold out.')
      return
    }
    addToCart({
      eventId: event.id,
      title: event.title,
      zone: selectedZone.name,
      price: selectedZone.price,
      quantity: 1,
      image: event.images[0]
    })
    trackAddToCart(event.id)
    toast.success(`"${event.title}" (${selectedZone.name}) added to cart!`)
  }

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: event.title }
          ]} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Image Gallery */}
            <div className="flex flex-col gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video">
                <img
                  src={event.images[selectedImage]}
                  alt={`${event.title} - image ${selectedImage + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Nav arrows */}
                {event.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(i => (i - 1 + event.images.length) % event.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Previous image"
                    >◀</button>
                    <button
                      onClick={() => setSelectedImage(i => (i + 1) % event.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
                      aria-label="Next image"
                    >▶</button>
                  </>
                )}
                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg">
                  {selectedImage + 1} / {event.images.length}
                </span>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {event.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-green-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-75'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-slate-200 font-semibold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>About This Event</h2>
              <p className="text-slate-400 leading-relaxed">{event.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {event.tags.map(tag => (
                  <span key={tag} className="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">{tag}</span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-200 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold text-lg">{avgRating}</span>
                  <StarRating rating={parseFloat(avgRating)} size={16} />
                  <span className="text-slate-500 text-sm">({event.reviews.length})</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {event.reviews.map(review => (
                  <div key={review.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-slate-300 text-xs font-bold">
                          {review.author[0]}
                        </div>
                        <div>
                          <span className="text-slate-200 text-sm font-medium">{review.author}</span>
                          <span className="text-slate-600 text-xs ml-2">{review.date}</span>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size={13} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed ml-11">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-slate-200 font-semibold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
              <div className="flex flex-col gap-2">
                {event.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-800/40"
                    >
                      <span className="text-slate-200 text-sm font-medium">{faq.q}</span>
                      <svg
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ml-3 ${faqOpen[idx] ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>
                    {faqOpen[idx] && (
                      <div className="px-4 pb-3.5 slide-down">
                        <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky booking card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
              {/* Event Quick Info */}
              <div className="mb-5">
                <span className="bg-slate-800 text-slate-400 text-xs font-medium px-2.5 py-1 rounded-lg capitalize">{event.category}</span>
                <h3 className="text-slate-100 font-bold text-xl mt-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{event.title}</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  <StarRating rating={event.rating} size={14} />
                  <span className="text-slate-400 text-sm">{event.rating} ({event.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Date / Venue */}
              <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{event.venue}, {event.city}</span>
                </div>
              </div>

              {/* Zone Selector */}
              <div className="mb-5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-3">Select Zone</label>
                <div className="flex flex-col gap-2">
                  {event.zones.map((zone, idx) => {
                    const isSoldOut = zone.available <= 0
                    const isLow = zone.available > 0 && zone.available <= 5
                    const isSelected = selectedZone?.name === zone.name
                    return (
                      <button
                        key={idx}
                        onClick={() => !isSoldOut && setSelectedZone(zone)}
                        disabled={isSoldOut}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 ${
                          isSoldOut
                            ? 'bg-slate-800/30 border-slate-800 opacity-40 cursor-not-allowed'
                            : isSelected
                              ? 'bg-green-900/30 border-green-600 shadow-md shadow-green-900/20'
                              : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-left">
                          <span className={`text-sm font-medium ${isSelected ? 'text-green-400' : 'text-slate-200'}`}>{zone.name}</span>
                          {isSoldOut && <span className="block text-red-400 text-xs mt-0.5">Sold Out</span>}
                          {isLow && <span className="block text-amber-400 text-xs mt-0.5">Only {zone.available} left!</span>}
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-green-400' : 'text-slate-300'}`}>
                          {formatCurrency(zone.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Availability indicator */}
              <div className="flex items-center gap-2 mb-5">
                {totalAvailable === 0 ? (
                  <><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-red-400 text-sm">Sold Out</span></>
                ) : totalAvailable <= 5 ? (
                  <><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span><span className="text-amber-400 text-sm">Low stock — {totalAvailable} tickets left</span></>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-green-400"></span><span className="text-green-400 text-sm">Tickets available</span></>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                disabled={totalAvailable === 0}
                className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                  totalAvailable === 0
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30 hover:shadow-green-900/50'
                }`}
              >
                {totalAvailable === 0 ? 'Sold Out' : selectedZone ? `Add to Cart — ${formatCurrency(selectedZone.price)}` : 'Select a Zone'}
              </button>

              {/* Price note */}
              <p className="text-slate-600 text-xs text-center mt-3">* Service fee & tax applied at checkout</p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>You May Also Like</h2>
              <Link to="/events" className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">View All →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(evt => <EventCard key={evt.id} event={evt} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}