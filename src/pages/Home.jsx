import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS, CATEGORY_LABELS } from '../data/events'
import EventCard from '../components/EventCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Home() {
  useEffect(() => {
    document.title = 'EventFlow — Live Event Tickets'
  }, [])

  // Featured = top 3 by popularity
  const featured = [...EVENTS].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 3)

  // Trending = events with high review count
  const trending = [...EVENTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6)

  // Recently viewed
  const [recentlyViewed] = useLocalStorage('eventflow_recently_viewed', [])
  const recentEvents = recentlyViewed
    .map(id => EVENTS.find(e => e.id === id))
    .filter(Boolean)
    .slice(0, 4)

  const categories = Object.entries(CATEGORY_LABELS)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full px-3.5 py-1.5 mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-slate-300 text-sm">Live events happening near you</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-5 fade-up" style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.2s' }}>
              Discover <span className="text-green-400">unforgettable</span> experiences
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 fade-up max-w-lg" style={{ animationDelay: '0.3s' }}>
              Concerts, comedy, workshops, sports & theatre — find and book tickets for the events that matter to you.
            </p>
            <div className="flex flex-wrap gap-3 fade-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/events" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-green-900/50">
                Browse All Events
              </Link>
              <Link to="/events?category=concert" className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-white font-medium px-7 py-3 rounded-xl transition-all duration-200">
                Concerts →
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-14 fade-up" style={{ animationDelay: '0.5s' }}>
            {[
              { label: 'Live Events', value: '200+' },
              { label: 'Cities', value: '50+' },
              { label: 'Happy Attendees', value: '12K+' }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{stat.value}</span>
                <span className="text-slate-500 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Quick Nav */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[{ value: 'all', label: '🎪 All Events' }, ...categories.map(([v, l]) => ({ value: v, label: `${v === 'concert' ? '🎵' : v === 'comedy' ? '😂' : v === 'workshop' ? '🛠' : v === 'sports' ? '⚽' : '🎭'} ${l}` }))].map(cat => (
            <Link
              key={cat.value}
              to={cat.value === 'all' ? '/events' : `/events?category=${cat.value}`}
              className="flex-shrink-0 bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader title="Featured Events" subtitle="Handpicked top events this season" link="/events" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {featured.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <SectionHeader title="Trending Now" subtitle="What everyone is talking about" link="/events?sort=popular" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {trending.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      {recentEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <SectionHeader title="Recently Viewed" subtitle="Pick up where you left off" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            {recentEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ title, subtitle, link }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
          View All →
        </Link>
      )}
    </div>
  )
}