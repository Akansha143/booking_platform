import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'

export default function CartDrawer() {
  const [open, setOpen] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const {
    items, pricing, couponDiscount, couponError,
    removeFromCart, updateQuantity, applyCoupon, removeCoupon
  } = useCart()

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-cart-drawer', handler)
    return () => window.removeEventListener('open-cart-drawer', handler)
  }, [])

  // Sync coupon input with applied coupon
  useEffect(() => {
    if (couponDiscount) setCouponInput(couponDiscount.code)
  }, [couponDiscount])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-animate" onClick={() => setOpen(false)} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-96 max-w-[92vw] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-slate-100 font-semibold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart
            {items.length > 0 && <span className="text-green-400 text-sm font-normal ml-2">({items.length})</span>}
          </h2>
          <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="p-4 flex flex-col gap-3">
              {items.map((item, idx) => (
                <CartItem
                  key={`${item.eventId}-${item.zone}`}
                  item={item}
                  onRemove={() => removeFromCart(item.eventId, item.zone)}
                  onQtyChange={(qty) => updateQuantity(item.eventId, item.zone, qty)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer (visible when cart has items) */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 p-5 flex flex-col gap-4">
            {/* Coupon */}
            <div>
              <label className="text-slate-500 text-xs font-semibold uppercase tracking-wide block mb-2">Coupon Code</label>
              {couponDiscount ? (
                <div className="flex items-center justify-between bg-green-900/30 border border-green-800 rounded-lg px-3 py-2">
                  <span className="text-green-400 text-sm font-semibold">{couponDiscount.code} — {couponDiscount.label}</span>
                  <button onClick={removeCoupon} className="text-green-500 hover:text-green-300 text-xs transition-colors">Remove</button>
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
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
            </div>

            {/* Pricing Summary */}
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span><span>−{formatCurrency(pricing.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Service Fee</span><span>{formatCurrency(pricing.serviceFee)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax</span><span>{formatCurrency(pricing.tax)}</span>
              </div>
              <div className="flex justify-between text-slate-100 font-semibold text-base pt-2 border-t border-slate-800 mt-1">
                <span>Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="block text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/30 hover:shadow-green-900/50"
            >
              Checkout — {formatCurrency(pricing.grandTotal)}
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="text-center text-slate-500 hover:text-slate-300 text-sm transition-colors">
              View full cart →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex gap-3 bg-slate-800/50 rounded-xl p-3">
      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-slate-200 text-sm font-medium truncate">{item.title}</h4>
        <p className="text-slate-500 text-xs">{item.zone}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onQtyChange(item.quantity - 1)}
              className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-sm transition-all"
            >−</button>
            <span className="text-slate-200 text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => onQtyChange(item.quantity + 1)}
              className="w-6 h-6 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center text-sm transition-all"
            >+</button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            <button onClick={onRemove} className="text-slate-600 hover:text-red-400 transition-colors" aria-label="Remove item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
      <h3 className="text-slate-300 font-semibold mb-1.5">Your cart is empty</h3>
      <p className="text-slate-500 text-sm leading-relaxed">Browse our events and add tickets to get started.</p>
      <Link to="/events" className="mt-4 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
        Browse Events →
      </Link>
    </div>
  )
}