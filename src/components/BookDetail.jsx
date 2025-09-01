import { useState } from 'react'
import { ArrowRight, Download, Eye, Star, Calendar, User, BookOpen, Tag, FileText, Share2, Heart, Clock } from 'lucide-react'
import './BookDetail.css'

const BookDetail = ({ book, onBackToLibrary, onReadBook, onDownload }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book.title,
          text: `اقرأ كتاب "${book.title}" للمؤلف ${book.author}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('تم نسخ الرابط إلى الحافظة')
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="star-filled" fill="currentColor" />
      )
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="star-half" fill="currentColor" />
      )
    }
    
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="star-empty" />
      )
    }
    
    return stars
  }

  const formatFileSize = (size) => {
    if (!size) return 'غير محدد'
    if (typeof size === 'string') return size
    
    const mb = size / (1024 * 1024)
    if (mb < 1) {
      const kb = size / 1024
      return `${kb.toFixed(0)} كيلوبايت`
    }
    return `${mb.toFixed(1)} ميجابايت`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد'
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="book-detail-page">
      {/* Header with navigation */}
      <header className="book-detail-header">
        <div className="header-container">
          <button 
            onClick={onBackToLibrary}
            className="back-button"
            aria-label="العودة إلى المكتبة"
          >
            <ArrowRight size={20} />
            <span>العودة إلى المكتبة</span>
          </button>
          
          <div className="header-actions">
            <button 
              onClick={handleShare}
              className="action-button"
              aria-label="مشاركة الكتاب"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={handleFavoriteToggle}
              className={`action-button ${isFavorite ? 'favorite-active' : ''}`}
              aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="book-detail-main">
        <div className="container">
          <div className="book-detail-content">
            {/* Book cover and primary info */}
            <div className="book-hero">
              <div className="book-cover-section">
                <div className="book-cover-large">
                  {book.cover ? (
                    <img 
                      src={`/books/${book.cover}`} 
                      alt={book.title}
                      className="cover-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div className="cover-placeholder">
                    <BookOpen size={48} />
                  </div>
                </div>
                
                {book.category && (
                  <div className="book-category-badge">
                    <Tag size={14} />
                    <span>{book.category}</span>
                  </div>
                )}
              </div>

              <div className="book-info-section">
                <div className="book-title-area">
                  <h1 className="book-title">{book.title}</h1>
                  <div className="book-author">
                    <User size={16} />
                    <span>{book.author}</span>
                  </div>
                </div>

                {book.rating && (
                  <div className="book-rating">
                    <div className="stars">
                      {renderStars(book.rating)}
                    </div>
                    <span className="rating-text">({book.rating} من 5)</span>
                  </div>
                )}

                <div className="book-meta">
                  {book.publishedDate && (
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>تاريخ النشر: {formatDate(book.publishedDate)}</span>
                    </div>
                  )}
                  
                  {book.language && (
                    <div className="meta-item">
                      <FileText size={16} />
                      <span>اللغة: {book.language === 'ar' ? 'العربية' : book.language}</span>
                    </div>
                  )}
                  
                  {book.fileSize && (
                    <div className="meta-item">
                      <Download size={16} />
                      <span>حجم الملف: {formatFileSize(book.fileSize)}</span>
                    </div>
                  )}
                  
                  {book.downloads && (
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>عدد التحميلات: {book.downloads.toLocaleString('ar-SA')}</span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="book-actions">
                  <button 
                    onClick={() => onReadBook(book)}
                    className="btn-primary"
                  >
                    <Eye size={18} />
                    <span>قراءة الكتاب</span>
                  </button>
                  
                  <button 
                    onClick={() => onDownload && onDownload(book)}
                    className="btn-secondary"
                  >
                    <Download size={18} />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Book description */}
            {book.description && (
              <div className="book-description-section">
                <h2 className="section-title">وصف الكتاب</h2>
                <div className="description-content">
                  <p className={`description-text ${showFullDescription ? 'expanded' : ''}`}>
                    {book.description}
                  </p>
                  {book.description.length > 300 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="toggle-description"
                    >
                      {showFullDescription ? 'عرض أقل' : 'عرض المزيد'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Additional details */}
            <div className="book-details-section">
              <h2 className="section-title">تفاصيل إضافية</h2>
              <div className="details-grid">
                <div className="detail-card">
                  <div className="detail-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="detail-content">
                    <h3>نوع الملف</h3>
                    <p>EPUB</p>
                  </div>
                </div>
                
                {book.genre && (
                  <div className="detail-card">
                    <div className="detail-icon">
                      <Tag size={20} />
                    </div>
                    <div className="detail-content">
                      <h3>التصنيف</h3>
                      <p>{book.genre}</p>
                    </div>
                  </div>
                )}
                
                <div className="detail-card">
                  <div className="detail-icon">
                    <User size={20} />
                  </div>
                  <div className="detail-content">
                    <h3>المؤلف</h3>
                    <p>{book.author}</p>
                  </div>
                </div>
                
                {book.publishedDate && (
                  <div className="detail-card">
                    <div className="detail-icon">
                      <Calendar size={20} />
                    </div>
                    <div className="detail-content">
                      <h3>سنة النشر</h3>
                      <p>{new Date(book.publishedDate).getFullYear()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookDetail