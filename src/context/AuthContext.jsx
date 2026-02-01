import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext()

const initialState = {
  user: null,
  loading: true,
  error: null
}

function authReducer(state, action) {
  switch (action.type) {
    case 'INIT_DONE':
      return { ...state, loading: false, user: action.payload }
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null }
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SIGNUP_START':
      return { ...state, loading: true, error: null }
    case 'SIGNUP_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null }
    case 'SIGNUP_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { ...state, loading: false, user: null, error: null }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// Mock user database stored in localStorage
const USERS_KEY = 'eventflow_users'

function getUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [authSession, setAuthSession] = useLocalStorage('eventflow_auth_session', null)

  // On mount, check if session exists
  useEffect(() => {
    if (authSession && authSession.token) {
      dispatch({ type: 'INIT_DONE', payload: authSession.user })
    } else {
      dispatch({ type: 'INIT_DONE', payload: null })
    }
  }, [authSession])

  const login = useCallback(async (email, password) => {
    dispatch({ type: 'LOGIN_START' })
    await delay(600) // Simulate network

    const users = getUsers()
    const user = Object.values(users).find(u => u.email === email)

    if (!user || user.password !== password) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid email or password.' })
      return false
    }

    const session = {
      token: 'tok_mock_' + Math.random().toString(36).substring(2, 18),
      user: { id: user.id, name: user.name, email: user.email }
    }
    setAuthSession(session)
    dispatch({ type: 'LOGIN_SUCCESS', payload: session.user })
    return true
  }, [setAuthSession])

  const signup = useCallback(async (name, email, password) => {
    dispatch({ type: 'SIGNUP_START' })
    await delay(600)

    const users = getUsers()
    const existing = Object.values(users).find(u => u.email === email)

    if (existing) {
      dispatch({ type: 'SIGNUP_ERROR', payload: 'An account with this email already exists.' })
      return false
    }

    const id = 'usr_' + Math.random().toString(36).substring(2, 12)
    users[id] = { id, name, email, password, createdAt: new Date().toISOString() }
    saveUsers(users)

    const session = {
      token: 'tok_mock_' + Math.random().toString(36).substring(2, 18),
      user: { id, name, email }
    }
    setAuthSession(session)
    dispatch({ type: 'SIGNUP_SUCCESS', payload: session.user })
    return true
  }, [setAuthSession])

  const logout = useCallback(() => {
    setAuthSession(null)
    dispatch({ type: 'LOGOUT' })
  }, [setAuthSession])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  return (
    <AuthContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      login,
      signup,
      logout,
      clearError,
      isLoggedIn: !!state.user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}