import './BookCard.css'

const BookCard = ({ book, onBookSelect }) => {
  const {
    title,
    author,
    category,
    cover,
    downloads,
    description
  } = book

  const formatDownloads = (downloads) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`
    }
    return downloads.toString()
  }

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <div className="book-cover">
          {/* Placeholder for book cover - using gradient background */}
          <div className="book-cover-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path 
                d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="book-category">{category}</div>
      </div>
      
      <div className="book-content">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">{author}</p>
        
        
        <p className="book-description">{description}</p>
        
        <div className="book-footer">
          <div className="book-stats">
            <div className="stat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M7 10L12 15L17 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 15V3" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span>{formatDownloads(downloads)}</span>
            </div>
          </div>
          
          <div className="book-actions">
            <button className="btn-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M7 10L12 15L17 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 15V3" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              تحميل
            </button>
            <button 
              className="btn-secondary"
              onClick={() => onBookSelect && onBookSelect(book)}
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path 
                  d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              </svg>
              معاينة
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard