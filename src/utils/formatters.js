/**
 * Utility functions for formatting data
 */

/**
 * Format number of downloads with Arabic formatting
 * @param {number} downloads - Number of downloads
 * @returns {string} Formatted download count
 */
export const formatDownloads = (downloads) => {
  if (downloads >= 1000) {
    return `${(downloads / 1000).toFixed(1)}k`
  }
  return downloads.toString()
}

/**
 * Format file size in bytes to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 بايت'

  const units = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`
}

/**
 * Format date to Arabic format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return ''

  const dateObj = new Date(date)
  const year = dateObj.getFullYear()

  // For very old dates, just return the year
  if (year < 1900) {
    return `${year}`
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return dateObj.toLocaleDateString('ar-SA', options)
}

/**
 * Format rating to stars
 * @param {number} rating - Rating value (0-5)
 * @returns {Array} Array of star objects with fill status
 */
export const formatRatingStars = (rating) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push({ type: 'full', key: i })
    } else if (i === fullStars && hasHalfStar) {
      stars.push({ type: 'half', key: i })
    } else {
      stars.push({ type: 'empty', key: i })
    }
  }

  return stars
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Convert number to Arabic numerals
 * @param {number} num - Number to convert
 * @returns {string} Number in Arabic numerals
 */
export const toArabicNumerals = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return num.toString().split('').map(digit =>
    /\d/.test(digit) ? arabicNumerals[parseInt(digit)] : digit
  ).join('')
}

/**
 * Format book title for URL
 * @param {string} title - Book title
 * @returns {string} URL-friendly title
 */
export const formatTitleForURL = (title) => {
  return title
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Highlight search query in text
 * @param {string} text - Text to highlight in
 * @param {string} query - Search query
 * @returns {string} Text with highlighted query
 */
export const highlightText = (text, query) => {
  if (!query || !text) return text

  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
