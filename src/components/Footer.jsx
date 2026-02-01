import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Event<span className="text-green-400">ora</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Discover and book tickets for the best live events near you. Concerts, comedy, workshops, sports, and theatre — all in one place.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { label: 'Twitter', icon: 'X', href: '#' },
                { label: 'Instagram', icon: '📷', href: '#' },
                { label: 'Facebook', icon: 'f', href: '#' }
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-slate-800 text-slate-500 hover:text-green-400 hover:border-green-600 flex items-center justify-center text-xs transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'All Events' },
                { to: '/cart', label: 'Cart' },
                { to: '/login', label: 'Log In' }
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-500 hover:text-green-400 text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {['Help Center', 'Refund Policy', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-green-400 text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">© 2026 Eventora. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-xs">Payments secured by</span>
            <span className="text-slate-500 text-xs font-semibold border border-slate-700 px-2 py-0.5 rounded">STRIPE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}