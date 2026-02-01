import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateSignupForm } from '../utils/validation'

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: 'bg-slate-700' }
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  if (score <= 2) return { score, label: 'Weak', color: 'bg-red-600' }
  if (score === 3) return { score, label: 'Fair', color: 'bg-amber-500' }
  if (score === 4) return { score, label: 'Good', color: 'bg-blue-500' }
  return { score, label: 'Strong', color: 'bg-green-500' }
}

export default function Signup() {
  const { signup, error: authError, loading, isLoggedIn, clearError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.title = 'Sign Up — Eventora'
    return () => clearError()
  }, [clearError])

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [isLoggedIn, navigate])

  const strength = getPasswordStrength(form.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateSignupForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    await signup(form.name, form.email, form.password)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-md shadow-green-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Event<span className="text-green-400">Flow</span>
            </span>
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-slate-100 font-bold text-2xl text-center mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Create account</h1>
          <p className="text-slate-500 text-sm text-center mb-6">Join Eventora and get exclusive access to events</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })) }}
                placeholder="John Doe"
                autoComplete="name"
                className={`w-full bg-slate-800 border ${errors.name ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })) }}
                placeholder="you@example.com"
                autoComplete="email"
                className={`w-full bg-slate-800 border ${errors.email || authError ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="text-slate-400 text-sm block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })) }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`w-full bg-slate-800 border ${errors.password ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {showPassword ? (
                      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                    ) : (
                      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
            </div>

            {/* Password strength */}
            {form.password && (
              <div className="mb-4">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-slate-700'}`} />
                  ))}
                </div>
                <p className={`text-xs ${strength.score <= 2 ? 'text-red-400' : strength.score === 3 ? 'text-amber-400' : strength.score === 4 ? 'text-blue-400' : 'text-green-400'}`}>
                  {strength.label} password
                </p>
              </div>
            )}

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="text-slate-400 text-sm block mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={e => { setForm(p => ({ ...p, confirmPassword: e.target.value })); setErrors(p => ({ ...p, confirmPassword: undefined })) }}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`w-full bg-slate-800 border ${errors.confirmPassword ? 'border-red-700' : 'border-slate-700'} rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:border-green-600 transition-colors`}
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1.5">{errors.confirmPassword}</p>}
            </div>

            {/* Auth error */}
            {authError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 mb-4">
                <p className="text-red-400 text-sm">{authError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-green-900/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account…
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}