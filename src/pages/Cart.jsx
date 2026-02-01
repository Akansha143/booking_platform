import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'
import { EVENTS } from '../data/events'
import EventCard from '../components/EventCard'
import { useState, useEffect } from 'react'

export default function Cart() {
  const [couponInput, setCouponInput] = useState('')
  const {
    items, pricing, couponDiscount, couponError,
    removeFromCart, updateQuantity, applyCoupon, removeCoupon
  } = useCart()

  useEffect(() => {
    document.title = 'Cart — Eventora'
    if (couponDiscount) setCouponInput(couponDiscount.code)
  }, [couponDiscount])

  // Suggested items = top popular events not in cart
  const cartEventIds = items.map(i => i.eventId)
  const suggested = EVENTS
    .filter(e => !cartEventIds.includes(e.id))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Shopping Cart</h1>
        <p className="text-slate-500 text-sm mb-8">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>

        {items.length === 0 ? (
          <EmptyCartPage suggested={suggested} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(item => (
                <div key={`${item.eventId}-${item.zone}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-5">
                  <img src={item.image} alt={item.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-slate-100 font-semibold truncate">{item.title}</h3>
                      <p className="text-slate-500 text-sm mt-0.5">Zone: {item.zone}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.eventId, item.zone, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
                        >−</button>
                        <span className="text-slate-100 font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.eventId, item.zone, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
                        >+</button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold text-lg">{formatCurrency(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeFromCart(item.eventId, item.zone)}
                          className="text-slate-600 hover:text-red-400 transition-colors"
                          aria-label="Remove"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24">
                <h2 className="text-slate-100 font-semibold text-lg mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Order Summary</h2>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-2">Coupon Code</label>
                  {couponDiscount ? (
                    <div className="flex items-center justify-between bg-green-900/30 border border-green-800 rounded-lg px-3 py-2.5">
                      <span className="text-green-400 text-sm font-semibold">{couponDiscount.code}</span>
                      <button onClick={removeCoupon} className="text-green-500 hover:text-green-300 text-xs">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyCoupon(couponInput)}
                        placeholder="e.g. SAVE10"
                        className={`flex-1 bg-slate-800 border ${couponError ? 'border-red-700' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                      />
                      <button
                        onClick={() => applyCoupon(couponInput)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium px-4 rounded-lg transition-all"
                      >Apply</button>
                    </div>
                  )}
                  {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                </div>

                {/* Pricing */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span>
                  </div>
                  {pricing.discountAmount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({couponDiscount?.label})</span><span>−{formatCurrency(pricing.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Service Fee (12%)</span><span>{formatCurrency(pricing.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tax (8%)</span><span>{formatCurrency(pricing.tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-100 font-semibold text-base pt-3 border-t border-slate-800 mt-2">
                    <span>Grand Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout */}
                <Link
                  to="/checkout"
                  className="block mt-6 text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30"
                >
                  Proceed to Checkout
                </Link>
                <Link to="/events" className="block mt-3 text-center text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Suggested items */}
        {suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              {items.length === 0 ? 'You might enjoy' : 'You may also like'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {suggested.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyCartPage({ suggested }) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h2 className="text-slate-200 font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your cart is empty</h2>
      <p className="text-slate-500 text-sm max-w-md leading-relaxed">
        Start exploring events and add tickets you love. Your cart will appear here.
      </p>
      <Link to="/events" className="mt-5 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
        Browse Events
      </Link>
    </div>
  )
}