import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { mockStripeCharge } from '../utils/stripe'
import { validateCheckoutAddress } from '../utils/validation'
import { formatCurrency } from '../utils/currency'

const STEPS = ['Address', 'Payment', 'Review', 'Success']

export default function Checkout() {
  const { items, pricing, clearCart } = useCart()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [addressData, setAddressData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: '', city: '', state: '', zip: ''
  })
  const [addressErrors, setAddressErrors] = useState({})
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvc: '', nameOnCard: '' })
  const [paymentError, setPaymentError] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    document.title = `Checkout — Step ${step + 1} — EventFlow`
  }, [step])

  useEffect(() => {
    if (items.length === 0 && step < 3) {
      navigate('/cart')
    }
  }, [items.length, step])

  // --- Step 0: Address ---
  const handleAddressSubmit = () => {
    const errors = validateCheckoutAddress(addressData)
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors)
      return
    }
    setAddressErrors({})
    setStep(1)
  }

  // --- Step 1: Payment ---
  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const handlePaymentSubmit = async () => {
    setPaymentError('')
    setPaymentLoading(true)

    const result = await mockStripeCharge({
      cardNumber: paymentData.cardNumber,
      expiry: paymentData.expiry,
      cvc: paymentData.cvc,
      amount: Math.round(pricing.grandTotal * 100)
    })

    setPaymentLoading(false)

    if (!result.success) {
      setPaymentError(result.error)
      return
    }

    // Generate order
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      paymentIntentId: result.paymentIntentId,
      items: [...items],
      pricing: { ...pricing },
      address: { ...addressData },
      createdAt: new Date().toISOString(),
      userId: user?.id
    }
    setOrder(newOrder)

    // Save to orders history in localStorage
    try {
      const existing = JSON.parse(window.localStorage.getItem('eventflow_orders') || '[]')
      existing.unshift(newOrder)
      window.localStorage.setItem('eventflow_orders', JSON.stringify(existing))
    } catch (e) {
      console.error('Failed to save order:', e)
    }

    clearCart()
    setStep(3)
    toast.success('Payment successful! Your order is confirmed.')
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-0">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    idx < step ? 'bg-green-600 text-white' :
                    idx === step ? 'bg-green-600 text-white ring-4 ring-green-900/40' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {idx < step ? '✓' : idx + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${idx === step ? 'text-green-400' : 'text-slate-600'}`}>{s}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 mx-1 mb-5 rounded-full transition-all duration-500 ${idx < step ? 'bg-green-600' : 'bg-slate-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <AddressStep
                data={addressData}
                errors={addressErrors}
                onChange={setAddressData}
                onSubmit={handleAddressSubmit}
              />
            )}
            {step === 1 && (
              <PaymentStep
                data={paymentData}
                error={paymentError}
                loading={paymentLoading}
                onChange={setPaymentData}
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(0)}
                formatCardNumber={formatCardNumber}
                formatExpiry={formatExpiry}
              />
            )}
            {step === 2 && (
              <ReviewStep
                addressData={addressData}
                items={items}
                pricing={pricing}
                onBack={() => setStep(1)}
                onConfirm={handlePaymentSubmit}
              />
            )}
            {step === 3 && order && (
              <SuccessStep order={order} />
            )}
          </div>

          {/* Order summary sidebar */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <OrderSummary items={items} pricing={pricing} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Sub-components ---

function AddressStep({ data, errors, onChange, onSubmit }) {
  const fields = [
    { key: 'firstName', label: 'First Name', placeholder: 'John', half: true },
    { key: 'lastName', label: 'Last Name', placeholder: 'Doe', half: true },
    { key: 'email', label: 'Email Address', placeholder: 'john@example.com', half: false },
    { key: 'address', label: 'Street Address', placeholder: '123 Main St', half: false },
    { key: 'city', label: 'City', placeholder: 'New York', half: true },
    { key: 'state', label: 'State', placeholder: 'NY', half: true },
    { key: 'zip', label: 'ZIP Code', placeholder: '10001', half: true }
  ]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Attendee Information</h2>
      <p className="text-slate-500 text-sm mb-6">Enter the details for the ticket holder.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
            <label className="text-slate-400 text-sm block mb-1.5">{f.label}</label>
            <input
              type={f.key === 'email' ? 'email' : 'text'}
              value={data[f.key]}
              onChange={e => onChange(prev => ({ ...prev, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className={`w-full bg-slate-800 border ${errors[f.key] ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
            />
            {errors[f.key] && <p className="text-red-400 text-xs mt-1.5">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
      <button onClick={onSubmit} className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-900/30">
        Continue to Payment →
      </button>
    </div>
  )
}

function PaymentStep({ data, error, loading, onChange, onSubmit, onBack, formatCardNumber, formatExpiry }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Details</h2>
      <p className="text-slate-500 text-sm mb-2">Simulated Stripe payment. Use test card numbers below.</p>

      {/* Test cards hint */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-5">
        <p className="text-slate-500 text-xs font-semibold mb-1.5">Test Card Numbers:</p>
        <p className="text-green-400 text-xs font-mono">4242 4242 4242 4242 → Success</p>
        <p className="text-red-400 text-xs font-mono">4000 0000 0000 0002 → Declined</p>
        <p className="text-amber-400 text-xs font-mono">4000 0000 0000 9995 → Insufficient Funds</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-slate-400 text-sm block mb-1.5">Name on Card</label>
          <input
            type="text"
            value={data.nameOnCard}
            onChange={e => onChange(prev => ({ ...prev, nameOnCard: e.target.value }))}
            placeholder="John Doe"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors"
          />
        </div>
        <div>
          <label className="text-slate-400 text-sm block mb-1.5">Card Number</label>
          <input
            type="text"
            value={data.cardNumber}
            onChange={e => onChange(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono tracking-wider"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Expiry (MM/YY)</label>
            <input
              type="text"
              value={data.expiry}
              onChange={e => onChange(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">CVC</label>
            <input
              type="text"
              value={data.cvc}
              onChange={e => onChange(prev => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
              placeholder="123"
              maxLength={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors font-mono"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-900/30 border border-red-800 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={onBack} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">
          ← Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing…
            </span>
          ) : 'Pay Now'}
        </button>
      </div>
    </div>
  )
}

function ReviewStep({ addressData, items, pricing, onBack, onConfirm }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-slate-100 font-semibold text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Review Your Order</h2>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-3">
            <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">{item.title}</p>
              <p className="text-slate-500 text-xs">{item.zone} × {item.quantity}</p>
            </div>
            <span className="text-green-400 font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Address summary */}
      <div className="bg-slate-800/50 rounded-xl p-4 mb-5">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-2">Shipping To</p>
        <p className="text-slate-300 text-sm">{addressData.firstName} {addressData.lastName}</p>
        <p className="text-slate-500 text-sm">{addressData.address}, {addressData.city}, {addressData.state} {addressData.zip}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all">← Back</button>
        <button onClick={onConfirm} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          Confirm & Pay {formatCurrency(pricing.grandTotal)}
        </button>
      </div>
    </div>
  )
}

function SuccessStep({ order }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
      <div className="w-20 h-20 rounded-full bg-green-900/40 border-2 border-green-600 flex items-center justify-center mx-auto mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Order Confirmed!</h2>
      <p className="text-slate-500 text-sm mb-5">Your payment was successful. Enjoy the event!</p>

      <div className="bg-slate-800/50 rounded-xl p-4 mb-5 text-left">
        <div className="flex justify-between mb-2">
          <span className="text-slate-500 text-sm">Order ID</span>
          <span className="text-slate-200 text-sm font-mono font-semibold">{order.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 text-sm">Total Charged</span>
          <span className="text-green-400 font-bold">{formatCurrency(order.pricing.grandTotal)}</span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2 mb-6 text-left">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-slate-400">{item.title} ({item.zone}) × {item.quantity}</span>
            <span className="text-slate-300">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/account" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-green-900/30">
          View My Orders
        </Link>
        <Link to="/events" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-6 py-2.5 rounded-xl transition-all">
          Browse More Events
        </Link>
      </div>
    </div>
  )
}

function OrderSummary({ items, pricing }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
      <h3 className="text-slate-200 font-semibold mb-4">Order Summary</h3>
      <div className="flex flex-col gap-2 mb-4 max-h-48 overflow-y-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5">
            <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-xs truncate">{item.title}</p>
              <p className="text-slate-600 text-xs">{item.zone} × {item.quantity}</p>
            </div>
            <span className="text-slate-400 text-xs font-medium">{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800 pt-3 flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatCurrency(pricing.subtotal)}</span></div>
        {pricing.discountAmount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>−{formatCurrency(pricing.discountAmount)}</span></div>}
        <div className="flex justify-between text-slate-500"><span>Service Fee</span><span>{formatCurrency(pricing.serviceFee)}</span></div>
        <div className="flex justify-between text-slate-500"><span>Tax</span><span>{formatCurrency(pricing.tax)}</span></div>
        <div className="flex justify-between text-slate-100 font-semibold pt-2 border-t border-slate-800 mt-1">
          <span>Total</span><span className="text-green-400">{formatCurrency(pricing.grandTotal)}</span>
        </div>
      </div>
    </div>
  )
}