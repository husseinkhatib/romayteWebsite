import { books } from '../data/books'

/**
 * Book Service - Centralized data management for books
 * This service simulates API calls and provides a single source of truth for book data
 */

class BookService {
  constructor() {
    this.books = books
  }

  /**
   * Get all books
   * @returns {Promise<Array>} Array of all books
   */
  async getAllBooks() {
    return this.simulateAPICall(this.books)
  }

  /**
   * Get books by tab/category
   * @param {string} tab - Tab name (home, categories, authors, new, popular)
   * @returns {Promise<Array>} Filtered books
   */
  async getBooksByTab(tab) {
    let filteredBooks = []

    switch (tab) {
      case 'home':
        // Featured books - first 6 books
        filteredBooks = this.books.slice(0, 6)
        break
      case 'categories':
        // History books
        filteredBooks = this.books.filter(book => book.category === 'تاريخ')
        break
      case 'authors':
        // Famous authors - poetry and classics
        filteredBooks = this.books.filter(book =>
          book.category === 'شعر' || book.category === 'أدب'
        )
        break
      case 'new':
        // New books - books from recent years (after 1980)
        filteredBooks = this.books.filter(book => {
          const year = new Date(book.publishedDate).getFullYear()
          return year >= 1980
        })
        break
      case 'popular':
        // Popular books - top 5 by downloads
        filteredBooks = [...this.books]
          .sort((a, b) => b.downloads - a.downloads)
          .slice(0, 5)
        break
      default:
        filteredBooks = this.books.slice(0, 6)
    }

    return this.simulateAPICall(filteredBooks)
  }

  /**
   * Get book by ID
   * @param {number} id - Book ID
   * @returns {Promise<Object|null>} Book object or null
   */
  async getBookById(id) {
    const book = this.books.find(book => book.id === parseInt(id))
    return this.simulateAPICall(book || null)
  }

  /**
   * Search books
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching books
   */
  async searchBooks(query) {
    if (!query || query.trim() === '') {
      return this.simulateAPICall(this.books)
    }

    const lowerQuery = query.toLowerCase().trim()
    const results = this.books.filter(book =>
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.category.toLowerCase().includes(lowerQuery) ||
      book.description.toLowerCase().includes(lowerQuery) ||
      (book.tags && book.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    )

    return this.simulateAPICall(results)
  }

  /**
   * Filter books by category
   * @param {string} category - Category name
   * @returns {Promise<Array>} Filtered books
   */
  async getBooksByCategory(category) {
    if (category === 'all') {
      return this.simulateAPICall(this.books)
    }

    const filtered = this.books.filter(book => book.category === category)
    return this.simulateAPICall(filtered)
  }

  /**
   * Get unique categories
   * @returns {Promise<Array>} Array of categories
   */
  async getCategories() {
    const categories = [...new Set(this.books.map(book => book.category))]
    return this.simulateAPICall(categories)
  }

  /**
   * Get unique authors
   * @returns {Promise<Array>} Array of authors
   */
  async getAuthors() {
    const authors = [...new Set(this.books.map(book => book.author))]
    return this.simulateAPICall(authors)
  }

  /**
   * Sort books
   * @param {Array} books - Books to sort
   * @param {string} sortBy - Sort criteria (title, author, rating, downloads, date)
   * @returns {Array} Sorted books
   */
  sortBooks(books, sortBy) {
    const sorted = [...books]

    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title, 'ar'))
        break
      case 'author':
        sorted.sort((a, b) => a.author.localeCompare(b.author, 'ar'))
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'downloads':
        sorted.sort((a, b) => b.downloads - a.downloads)
        break
      case 'date':
        sorted.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
        break
      default:
        // Keep original order (relevance)
        break
    }

    return sorted
  }

  /**
   * Get book statistics
   * @returns {Promise<Object>} Statistics object
   */
  async getStatistics() {
    const stats = {
      totalBooks: this.books.length,
      totalDownloads: this.books.reduce((sum, book) => sum + book.downloads, 0),
      totalAuthors: new Set(this.books.map(book => book.author)).size,
      totalCategories: new Set(this.books.map(book => book.category)).size,
      averageRating: (this.books.reduce((sum, book) => sum + book.rating, 0) / this.books.length).toFixed(1)
    }

    return this.simulateAPICall(stats)
  }

  /**
   * Simulate API call with delay
   * @param {*} data - Data to return
   * @param {number} delay - Delay in milliseconds
   * @returns {Promise} Promise resolving to data
   */
  simulateAPICall(data, delay = 300) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay)
    })
  }
}

// Export singleton instance
export default new BookService()
