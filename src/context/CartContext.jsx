import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { COUPONS } from '../data/events'

const CartContext = createContext()

const initialState = {
  items: [],           // { eventId, title, zone, price, quantity, image }
  couponCode: '',
  couponDiscount: null, // { code, discount, label } or null
  couponError: ''
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload }

    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.eventId === action.payload.eventId && i.zone === action.payload.zone
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.eventId === action.payload.eventId && i.zone === action.payload.zone
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.eventId === action.payload.eventId && i.zone === action.payload.zone)
        )
      }

    case 'UPDATE_QTY': {
      const { eventId, zone, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => !(i.eventId === eventId && i.zone === zone))
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.eventId === eventId && i.zone === zone ? { ...i, quantity } : i
        )
      }
    }

    case 'CLEAR_CART':
      return { ...initialState }

    case 'APPLY_COUPON': {
      const code = action.payload.toUpperCase()
      const coupon = COUPONS[code]
      if (!coupon) {
        return { ...state, couponCode: code, couponDiscount: null, couponError: 'Invalid coupon code.' }
      }
      return { ...state, couponCode: code, couponDiscount: { code, ...coupon }, couponError: '' }
    }

    case 'REMOVE_COUPON':
      return { ...state, couponCode: '', couponDiscount: null, couponError: '' }

    case 'SET_COUPON_ERROR':
      return { ...state, couponError: action.payload }

    default:
      return state
  }
}

// Pricing constants
const SERVICE_FEE_RATE = 0.12   // 12% service fee
const TAX_RATE = 0.08           // 8% tax

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [savedCart, setSavedCart] = useLocalStorage('eventflow_cart', initialState)
  const hydratedRef = React.useRef(false)

  // Hydrate from localStorage once
  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true
      if (savedCart && savedCart.items) {
        dispatch({ type: 'HYDRATE', payload: savedCart })
      }
    }
  }, [savedCart])

  // Persist on change
  useEffect(() => {
    if (hydratedRef.current) {
      setSavedCart(state)
    }
  }, [state, setSavedCart])

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeFromCart = useCallback((eventId, zone) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { eventId, zone } })
  }, [])

  const updateQuantity = useCallback((eventId, zone, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { eventId, zone, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const applyCoupon = useCallback((code) => {
    if (!code || !code.trim()) {
      dispatch({ type: 'SET_COUPON_ERROR', payload: 'Please enter a coupon code.' })
      return
    }
    dispatch({ type: 'APPLY_COUPON', payload: code })
  }, [])

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' })
  }, [])

  // --- Computed pricing ---
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = state.couponDiscount ? subtotal * state.couponDiscount.discount : 0
  const afterDiscount = subtotal - discountAmount
  const serviceFee = afterDiscount * SERVICE_FEE_RATE
  const tax = afterDiscount * TAX_RATE
  const grandTotal = afterDiscount + serviceFee + tax
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      couponCode: state.couponCode,
      couponDiscount: state.couponDiscount,
      couponError: state.couponError,
      pricing: {
        subtotal,
        discountAmount,
        afterDiscount,
        serviceFee,
        tax,
        grandTotal
      },
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}