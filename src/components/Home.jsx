import { useState, useEffect } from 'react'
import BookCard from './BookCard'
import bookService from '../services/bookService'
import './Home.css'

const Home = ({ activeTab, onBookSelect }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await bookService.getBooksByTab(activeTab)
        setBooks(data)
      } catch (err) {
        setError('حدث خطأ أثناء تحميل الكتب')
        console.error('Error loading books:', err)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [activeTab])

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'home': return 'الكتب المميزة'
      case 'categories': return 'كتب التاريخ'
      case 'authors': return 'كتب المؤلفين المشهورين'
      case 'new': return 'الكتب الجديدة'
      case 'popular': return 'الكتب الأكثر شعبية'
      default: return 'الكتب المميزة'
    }
  }

  if (loading) {
    return (
      <section className="home-section" role="main" aria-label="قسم الكتب">
        <div className="loading-container">
          <div className="loading-spinner" role="status" aria-live="polite"></div>
          <p>جاري التحميل...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="home-section" role="main" aria-label="قسم الكتب">
        <div className="error-container">
          <div className="error-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
            </svg>
          </div>
          <h3>{error}</h3>
          <p>يرجى المحاولة مرة أخرى</p>
        </div>
      </section>
    )
  }

  return (
    <section className="home-section" role="main" aria-label="قسم الكتب">
      <div className="section-header">
        <h2 className="section-title">{getTabTitle(activeTab)}</h2>
        <p className="section-subtitle">
          {books.length} كتاب متاح
        </p>
      </div>

      <div className="books-grid" role="region" aria-label="شبكة الكتب">
        {books.map((book) => (
          <article key={book.id}>
            <BookCard book={book} onBookSelect={onBookSelect} />
          </article>
        ))}
      </div>

      {books.length === 0 && (
        <div className="empty-state" role="status">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" role="img" aria-label="أيقونة فارغة">
              <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>لا توجد كتب متاحة</h3>
          <p>لم يتم العثور على كتب في هذا القسم حالياً</p>
        </div>
      )}
    </section>
  )
}

export default Home