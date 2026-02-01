import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found — EventFlow'
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Giant 404 */}
      <div className="relative mb-6">
        <h1
          className="text-9xl font-bold text-slate-800 select-none"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: '12rem', lineHeight: 1 }}
        >
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-green-900/20 border border-green-800 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Page not found
      </h2>
      <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <Link to="/" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          Go Home
        </Link>
        <Link to="/events" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-6 py-2.5 rounded-xl transition-all border border-slate-700">
          Browse Events
        </Link>
      </div>
    </div>
  )
}