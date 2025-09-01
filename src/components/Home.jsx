import { useState, useEffect } from 'react'
import BookCard from './BookCard'
import './Home.css'

// Dummy Arabic book data
const dummyBooks = {
  home: [
    {
      id: 1,
      title: 'الأسود يليق بك',
      author: 'أحلام مستغانمي',
      category: 'رواية',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.5,
      downloads: 1250,
      description: 'رواية عربية معاصرة تحكي قصة حب وفقدان في زمن الحرب',
      filename: 'sample-book-1.epub'
    },
    {
      id: 2,
      title: 'مئة عام من العزلة',
      author: 'غابرييل غارسيا ماركيز',
      category: 'أدب عالمي',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.8,
      downloads: 2100,
      description: 'رواية كلاسيكية من أدب أمريكا اللاتينية'
    },
    {
      id: 3,
      title: 'البحث عن الزمن المفقود',
      author: 'مارسيل بروست',
      category: 'فلسفة',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.3,
      downloads: 890,
      description: 'عمل أدبي فلسفي عميق يستكشف الذاكرة والزمن'
    },
    {
      id: 4,
      title: 'كتاب الأغاني',
      author: 'أبو الفرج الأصفهاني',
      category: 'تراث',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.7,
      downloads: 1680,
      description: 'موسوعة أدبية تراثية في الشعر والغناء العربي'
    },
    {
      id: 5,
      title: 'الطنطورية',
      author: 'رضوى عاشور',
      category: 'رواية تاريخية',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.4,
      downloads: 1420,
      description: 'رواية تاريخية تحكي قصة فلسطين عبر العصور'
    },
    {
      id: 6,
      title: 'موسم الهجرة إلى الشمال',
      author: 'الطيب صالح',
      category: 'أدب عربي',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.6,
      downloads: 1950,
      description: 'رواية سودانية كلاسيكية تناقش الهوية والاستعمار'
    }
  ],
  categories: [
    {
      id: 7,
      title: 'تاريخ الطبري',
      author: 'محمد بن جرير الطبري',
      category: 'تاريخ',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.9,
      downloads: 3200,
      description: 'موسوعة تاريخية شاملة للتاريخ الإسلامي'
    },
    {
      id: 8,
      title: 'البداية والنهاية',
      author: 'ابن كثير',
      category: 'تاريخ',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.8,
      downloads: 2800,
      description: 'كتاب تاريخي يغطي تاريخ العالم من البداية إلى النهاية'
    }
  ],
  authors: [
    {
      id: 9,
      title: 'ديوان المتنبي',
      author: 'أبو الطيب المتنبي',
      category: 'شعر',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.9,
      downloads: 2500,
      description: 'ديوان شعري لأعظم شعراء العربية'
    },
    {
      id: 10,
      title: 'الأغاني',
      author: 'أبو الفرج الأصفهاني',
      category: 'أدب',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.7,
      downloads: 1800,
      description: 'موسوعة الأدب والشعر العربي القديم'
    }
  ],
  new: [
    {
      id: 11,
      title: 'الخبز الحافي',
      author: 'محمد شكري',
      category: 'سيرة ذاتية',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.2,
      downloads: 950,
      description: 'سيرة ذاتية صادمة ومؤثرة'
    },
    {
      id: 12,
      title: 'عصر الصورة',
      author: 'شاكر عبد الحميد',
      category: 'فلسفة',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.1,
      downloads: 720,
      description: 'دراسة فلسفية معاصرة حول الصورة والإعلام'
    }
  ],
  popular: [
    {
      id: 13,
      title: 'القرآن الكريم',
      author: 'كلام الله',
      category: 'دين',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 5.0,
      downloads: 15000,
      description: 'الكتاب المقدس للمسلمين'
    },
    {
      id: 14,
      title: 'نهج البلاغة',
      author: 'الإمام علي بن أبي طالب',
      category: 'دين',
      cover: '/assets/images/book-cover-placeholder.svg',
      rating: 4.9,
      downloads: 8500,
      description: 'مجموعة خطب وحكم الإمام علي'
    }
  ]
}

const Home = ({ activeTab, onBookSelect }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      setBooks(dummyBooks[activeTab] || dummyBooks.home)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
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
      <section className="home-section">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>جاري التحميل...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="home-section">
      <div className="section-header">
        <h2 className="section-title">{getTabTitle(activeTab)}</h2>
        <p className="section-subtitle">
          {books.length} كتاب متاح
        </p>
      </div>
      
      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onBookSelect={onBookSelect} />
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
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