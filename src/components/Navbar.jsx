import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Dispatch custom event for CartDrawer
  const openCartDrawer = () => {
    window.dispatchEvent(new CustomEvent('open-cart-drawer'))
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md shadow-green-900/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Event<span className="text-green-400">Flow</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'Events' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === link.to ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={openCartDrawer}
                className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md shadow-green-900/40">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link to="/account" className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-800/60 transition-all">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm text-slate-300">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800/40 transition-all"
                    aria-label="Logout"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors">Log in</Link>
                  <Link to="/signup" className="px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md shadow-green-900/30">Sign up</Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={openCartDrawer} className="relative p-2 rounded-lg text-slate-400 hover:text-white" aria-label="Cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center" style={{ width: '18px', height: '18px', fontSize: '10px' }}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
                aria-label="Toggle menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-t border-slate-800 px-4 py-4 flex flex-col gap-1">
            <Link to="/" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Home</Link>
            <Link to="/events" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Events</Link>
            <Link to="/cart" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all flex items-center justify-between">
              Cart
              {itemCount > 0 && <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>}
            </Link>
            <div className="border-t border-slate-800 my-2"></div>
            {isLoggedIn ? (
              <>
                <Link to="/account" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Account</Link>
                <button onClick={logout} className="px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-slate-800/40 transition-all text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all">Log in</Link>
                <Link to="/signup" className="px-4 py-3 rounded-xl bg-green-600 text-white font-medium text-center">Sign up</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}