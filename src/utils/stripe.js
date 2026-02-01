/**
 * Mock Stripe integration.
 *
 * Since we cannot spin up a backend server within the constraints,
 * this module simulates Stripe Checkout entirely on the client side.
 *
 * Test card numbers:
 *   4242 4242 4242 4242  → Always succeeds
 *   4000 0000 0000 0002  → Always declines (card declined)
 *   4000 0000 0000 9995  → Insufficient funds
 *   4111 1111 1111 1111  → Success (Visa test)
 *
 * Any other card number will succeed as long as it passes basic Luhn check.
 *
 * Expiry: any future MM/YY
 * CVC: any 3-digit number
 */

const DECLINE_CARDS = {
  '4000000000000002': 'Your card was declined.',
  '4000000000009995': 'Insufficient funds on your card.'
}

const SUCCESS_CARDS = [
  '4242424242424242',
  '4111111111111111'
]

function luhnCheck(cardNum) {
  const digits = cardNum.split('').reverse().map(Number)
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i]
    if (i % 2 === 1) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return sum % 10 === 0
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Simulates creating a Stripe PaymentIntent & confirming payment.
 * @param {object} paymentData
 * @param {string} paymentData.cardNumber
 * @param {string} paymentData.expiry    MM/YY
 * @param {string} paymentData.cvc
 * @param {number} paymentData.amount    in cents
 * @returns {Promise<{success: boolean, error?: string, paymentIntentId?: string}>}
 */
export async function mockStripeCharge(paymentData) {
  const { cardNumber, expiry, cvc, amount } = paymentData
  const cleanCard = cardNumber.replace(/\s/g, '')

  // Simulate network latency
  await delay(1200 + Math.random() * 800)

  // --- Validation ---
  if (!cleanCard || cleanCard.length < 12) {
    return { success: false, error: 'Card number is incomplete.' }
  }
  if (!luhnCheck(cleanCard)) {
    return { success: false, error: 'Card number is invalid.' }
  }
  if (!expiry || expiry.length < 5) {
    return { success: false, error: 'Expiry date is incomplete.' }
  }
  const [mm, yy] = expiry.split('/').map(Number)
  if (mm < 1 || mm > 12) {
    return { success: false, error: 'Invalid expiry month.' }
  }
  const now = new Date()
  const expYear = 2000 + yy
  const expMonth = mm
  if (expYear < now.getFullYear() || (expYear === now.getFullYear() && expMonth < now.getMonth() + 1)) {
    return { success: false, error: 'Your card has expired.' }
  }
  if (!cvc || cvc.length < 3) {
    return { success: false, error: 'CVC is incomplete.' }
  }

  // --- Decline simulation ---
  if (DECLINE_CARDS[cleanCard]) {
    return { success: false, error: DECLINE_CARDS[cleanCard] }
  }

  // --- Success ---
  // Generate a fake PaymentIntent ID
  const intentId = 'pi_mock_' + Math.random().toString(36).substring(2, 18)
  return {
    success: true,
    paymentIntentId: intentId,
    amountCharged: amount
  }
}

export const STRIPE_TEST_CARDS = [
  { number: '4242 4242 4242 4242', label: 'Visa (Success)', result: 'success' },
  { number: '4111 1111 1111 1111', label: 'Visa (Success)', result: 'success' },
  { number: '4000 0000 0000 0002', label: 'Visa (Declined)', result: 'decline' },
  { number: '4000 0000 0000 9995', label: 'Visa (Insufficient Funds)', result: 'decline' }
]