import { useState, useMemo } from 'react'
import BookCard from './BookCard'
import './SearchResults.css'

const SearchResults = ({ searchQuery, onClose, onBookSelect }) => {
  const [sortBy, setSortBy] = useState('relevance')
  const [filterBy, setFilterBy] = useState('all')

  // Dummy search results data
  const searchResults = [
    {
      id: 1,
      title: 'الأسود يليق بك',
      author: 'أحلام مستغانمي',
      category: 'رواية',
      rating: 4.5,
      downloads: 15420,
      description: 'رواية عاطفية تحكي قصة حب معقدة في زمن الحرب والسلام، تجمع بين الواقع والخيال في سرد مميز.',
      filename: 'sample-book-1.epub'
    },
    {
      id: 2,
      title: 'مئة عام من العزلة',
      author: 'غابرييل غارسيا ماركيز',
      category: 'أدب عالمي',
      rating: 4.8,
      downloads: 23150,
      description: 'رواية ملحمية تحكي تاريخ عائلة بوينديا عبر سبعة أجيال في قرية ماكوندو الخيالية.'
    },
    {
      id: 3,
      title: 'كتاب الفلسفة',
      author: 'مجموعة مؤلفين',
      category: 'فلسفة',
      rating: 4.2,
      downloads: 8930,
      description: 'مقدمة شاملة للفلسفة تغطي أهم المدارس الفلسفية والمفكرين عبر التاريخ.'
    },
    {
      id: 4,
      title: 'تاريخ الحضارة الإسلامية',
      author: 'د. حسن إبراهيم حسن',
      category: 'تاريخ',
      rating: 4.6,
      downloads: 12750,
      description: 'دراسة معمقة لتطور الحضارة الإسلامية من بداياتها حتى العصر الحديث.'
    },
    {
      id: 5,
      title: 'علم النفس التربوي',
      author: 'د. عبد الحميد جابر',
      category: 'علم نفس',
      rating: 4.3,
      downloads: 9840,
      description: 'كتاب أساسي في علم النفس التربوي يتناول نظريات التعلم والتطوير المعرفي.'
    },
    {
      id: 6,
      title: 'الكيمياء العضوية',
      author: 'د. محمد أحمد السيد',
      category: 'علوم',
      rating: 4.1,
      downloads: 6420,
      description: 'مرجع شامل في الكيمياء العضوية يغطي المفاهيم الأساسية والتطبيقات العملية.'
    }
  ]

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let results = [...searchResults]

    // Filter by category
    if (filterBy !== 'all') {
      results = results.filter(book => book.category === filterBy)
    }

    // Filter by search query
    if (searchQuery) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort results
    switch (sortBy) {
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title, 'ar'))
        break
      case 'author':
        results.sort((a, b) => a.author.localeCompare(b.author, 'ar'))
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'downloads':
        results.sort((a, b) => b.downloads - a.downloads)
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    return results
  }, [searchQuery, sortBy, filterBy])

  const categories = ['all', 'رواية', 'أدب عالمي', 'فلسفة', 'تاريخ', 'علم نفس', 'علوم']
  const categoryLabels = {
    'all': 'جميع الفئات',
    'رواية': 'رواية',
    'أدب عالمي': 'أدب عالمي',
    'فلسفة': 'فلسفة',
    'تاريخ': 'تاريخ',
    'علم نفس': 'علم نفس',
    'علوم': 'علوم'
  }

  const sortOptions = [
    { value: 'relevance', label: 'الأكثر صلة' },
    { value: 'title', label: 'العنوان' },
    { value: 'author', label: 'المؤلف' },
    { value: 'rating', label: 'التقييم' },
    { value: 'downloads', label: 'التحميلات' }
  ]

  return (
    <div className="search-results">
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
        <button className="close-search" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      </div>

      <div className="search-filters">
        <div className="filter-group">
          <label>ترتيب حسب:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
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
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${filterBy === category ? 'active' : ''}`}
                onClick={() => setFilterBy(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="search-results-grid">
        {filteredAndSortedResults.length > 0 ? (
          filteredAndSortedResults.map(book => (
            <BookCard key={book.id} book={book} onBookSelect={onBookSelect} />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
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