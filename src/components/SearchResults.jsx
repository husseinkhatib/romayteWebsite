import { useState, useMemo, useEffect } from 'react'
import BookCard from './BookCard'
import bookService from '../services/bookService'
import { categories, categoryLabels } from '../data/books'
import './SearchResults.css'

const SearchResults = ({ searchQuery, onClose, onBookSelect }) => {
  const [sortBy, setSortBy] = useState('relevance')
  const [filterBy, setFilterBy] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)

  // Load search results
  useEffect(() => {
    const loadSearchResults = async () => {
      setLoading(true)
      try {
        const results = await bookService.searchBooks(searchQuery)
        setSearchResults(results)
      } catch (error) {
        console.error('Error searching books:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [searchQuery])

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let results = [...searchResults]

    // Filter by category
    if (filterBy !== 'all') {
      results = results.filter(book => book.category === filterBy)
    }

    // Sort results
    results = bookService.sortBooks(results, sortBy)

    return results
  }, [searchResults, sortBy, filterBy])

  const sortOptions = [
    { value: 'relevance', label: 'الأكثر صلة' },
    { value: 'title', label: 'العنوان' },
    { value: 'author', label: 'المؤلف' },
    { value: 'rating', label: 'التقييم' },
    { value: 'downloads', label: 'التحميلات' }
  ]

  if (loading) {
    return (
      <div className="search-results" role="main" aria-label="نتائج البحث">
        <div className="loading-container">
          <div className="loading-spinner" role="status" aria-live="polite"></div>
          <p>جاري البحث...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="search-results" role="main" aria-label="نتائج البحث">
      <div className="search-results-header">
        <div className="search-info">
          <h2>نتائج البحث</h2>
          <p>
            {searchQuery && (
              <span>البحث عن: <strong>"{searchQuery}"</strong> - </span>
            )}
            تم العثور على {filteredAndSortedResults.length} نتيجة
          </p>
        </div>
        {onClose && (
          <button
            className="close-search"
            onClick={onClose}
            aria-label="إغلاق نتائج البحث"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="search-filters" role="search" aria-label="مرشحات البحث">
        <div className="filter-group">
          <label htmlFor="sort-select">ترتيب حسب:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="ترتيب النتائج"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>تصفية حسب الفئة:</label>
          <div className="category-filters" role="group" aria-label="تصفية حسب الفئة">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${filterBy === category ? 'active' : ''}`}
                onClick={() => setFilterBy(category)}
                aria-pressed={filterBy === category}
                aria-label={`تصفية حسب ${categoryLabels[category]}`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="search-results-grid" role="region" aria-label="نتائج الكتب">
        {filteredAndSortedResults.length > 0 ? (
          filteredAndSortedResults.map(book => (
            <article key={book.id}>
              <BookCard book={book} onBookSelect={onBookSelect} />
            </article>
          ))
        ) : (
          <div className="no-results" role="status">
            <div className="no-results-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" role="img" aria-label="أيقونة لا توجد نتائج">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>لم يتم العثور على نتائج</h3>
            <p>جرب تغيير كلمات البحث أو إزالة المرشحات</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults