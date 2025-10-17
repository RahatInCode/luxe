export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+KATEX_INLINE_OPENKATEX_INLINE_CLOSE]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

export function isValidCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '')
  if (!/^\d{13,19}$/.test(cleaned)) return false

  // Luhn algorithm
  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

export function getCardType(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, '')

  if (/^4/.test(cleaned)) return 'Visa'
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard'
  if (/^3[47]/.test(cleaned)) return 'American Express'
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover'

  return 'Unknown'
}