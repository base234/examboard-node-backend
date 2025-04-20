export function generateUniqueCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const datePart = Date.now().toString(36).toUpperCase()
  let randomPart = ''

  for (let i = 0; i < 10 - datePart.length; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return (randomPart + datePart).slice(0, 10)
}
