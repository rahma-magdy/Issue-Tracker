import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

// export function mockDelay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }
