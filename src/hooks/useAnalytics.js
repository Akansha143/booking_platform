import { useCallback } from 'react'

const ANALYTICS_KEY = 'eventflow_analytics'

function readAnalytics() {
  try {
    const raw = window.localStorage.getItem(ANALYTICS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAnalytics(data) {
  try {
    window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Analytics write error:', e)
  }
}

export function useAnalytics() {
  const trackView = useCallback((eventId) => {
    const data = readAnalytics()
    const key = `view_${eventId}`
    data[key] = (data[key] || 0) + 1
    writeAnalytics(data)
  }, [])

  const trackAddToCart = useCallback((eventId) => {
    const data = readAnalytics()
    const key = `atc_${eventId}`
    data[key] = (data[key] || 0) + 1
    writeAnalytics(data)
  }, [])

  const getViewCount = useCallback((eventId) => {
    const data = readAnalytics()
    return data[`view_${eventId}`] || 0
  }, [])

  const getAddToCartCount = useCallback((eventId) => {
    const data = readAnalytics()
    return data[`atc_${eventId}`] || 0
  }, [])

  const getPopularityBoost = useCallback((eventId) => {
    const data = readAnalytics()
    const views = data[`view_${eventId}`] || 0
    const atc = data[`atc_${eventId}`] || 0
    return views * 0.5 + atc * 2
  }, [])

  return { trackView, trackAddToCart, getViewCount, getAddToCartCount, getPopularityBoost }
}