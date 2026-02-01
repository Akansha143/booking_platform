import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { EVENTS } from '../data/events'
import { formatCurrency } from '../utils/currency'
import EventCard from '../components/EventCard'

export default function Account() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders] = useLocalStorage('eventflow_orders', [])
  const [wishlist] = useLocalStorage('eventflow_wishlist', [])

  useEffect(() => {
    document.title = 'My Account — EventFlow'
  }, [])

  const wishlistEvents = wishlist
    .map(id => EVENTS.find(e => e.id === id))
    .filter(Boolean)

  const TABS = [
    { id: 'orders', label: 'Orders', count: orders.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlistEvents.length },
    { id: 'profile', label: 'Profile' }
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-green-900/30">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{user?.name}</h1>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 rounded-xl text-sm font-medium border border-slate-700 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-slate-800">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-green-400 border-b-2 border-green-500'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'orders' && <OrdersTab orders={orders} />}
        {activeTab === 'wishlist' && <WishlistTab events={wishlistEvents} />}
        {activeTab === 'profile' && <ProfileTab user={user} />}
      </div>
    </div>
  )
}

function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h3 className="text-slate-300 font-semibold mb-1.5">No orders yet</h3>
        <p className="text-slate-500 text-sm max-w-sm">Your past orders will appear here after your first purchase.</p>
        <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">Browse Events →</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => (
        <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <span className="text-slate-200 font-semibold font-mono text-sm">{order.id}</span>
              <span className="text-slate-600 text-xs ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <span className="bg-green-900/40 text-green-400 text-xs font-semibold px-3 py-1 rounded-full border border-green-800">Confirmed</span>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-300 text-sm truncate">{item.title}</p>
                  <p className="text-slate-500 text-xs">{item.zone} × {item.quantity}</p>
                </div>
                <span className="text-slate-400 text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-slate-800">
            <span className="text-slate-500 text-sm mr-2">Total:</span>
            <span className="text-green-400 font-bold">{formatCurrency(order.pricing.grandTotal)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function WishlistTab({ events }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h3 className="text-slate-300 font-semibold mb-1.5">No wishlisted events</h3>
        <p className="text-slate-500 text-sm max-w-sm">Click the heart icon on any event to save it here.</p>
        <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">Browse Events →</Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map(event => <EventCard key={event.id} event={event} />)}
    </div>
  )
}

function ProfileTab({ user }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg">
      <h2 className="text-slate-200 font-semibold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Profile Details</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Name</label>
          <p className="text-slate-200">{user?.name}</p>
        </div>
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
          <p className="text-slate-200">{user?.email}</p>
        </div>
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1.5">Account ID</label>
          <p className="text-slate-500 font-mono text-sm">{user?.id}</p>
        </div>
      </div>
    </div>
  )
}