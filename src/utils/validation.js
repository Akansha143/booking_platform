export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password) {
  if (!password || password.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  return null
}

export function validateLoginForm(fields) {
  const errors = {}
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.password || !fields.password.trim()) {
    errors.password = 'Password is required'
  }
  return errors
}

export function validateSignupForm(fields) {
  const errors = {}
  if (!fields.name || !fields.name.trim()) {
    errors.name = 'Full name is required'
  }
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.password || !fields.password.trim()) {
    errors.password = 'Password is required'
  } else {
    const pwErr = validatePassword(fields.password)
    if (pwErr) errors.password = pwErr
  }
  if (!fields.confirmPassword || !fields.confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export function validateCheckoutAddress(fields) {
  const errors = {}
  if (!fields.firstName?.trim()) errors.firstName = 'First name is required'
  if (!fields.lastName?.trim()) errors.lastName = 'Last name is required'
  if (!fields.email?.trim()) errors.email = 'Email is required'
  else if (!validateEmail(fields.email)) errors.email = 'Enter a valid email'
  if (!fields.address?.trim()) errors.address = 'Address is required'
  if (!fields.city?.trim()) errors.city = 'City is required'
  if (!fields.state?.trim()) errors.state = 'State is required'
  if (!fields.zip?.trim()) errors.zip = 'ZIP code is required'
  return errors
}