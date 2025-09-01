import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './components/Home'
import SearchResults from './components/SearchResults'
import Statistics from './components/Statistics'
import Footer from './components/Footer'
import BookDetail from './components/BookDetail'
import EpubjsReader from './components/EpubjsReader'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [currentView, setCurrentView] = useState('library') // 'library', 'detail', or 'reader'
  const [selectedBook, setSelectedBook] = useState(null)

  const handleSearch = (query) => {
    setSearchQuery(query)
    setShowSearchResults(true)
    setActiveTab('search')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== 'search') {
      setShowSearchResults(false)
    }
  }

  const handleBookSelect = (book) => {
    // Convert book data to EPUB format expected by EpubjsReader
    const epubBook = {
      id: book.id || Date.now(),
      title: book.title,
      author: book.author,
      filename: book.filename || `${book.title.replace(/\s+/g, '-').toLowerCase()}.epub`,
      description: book.description,
      cover: book.cover,
      category: book.category,
      rating: book.rating || 4.2,
      publishedDate: book.publishedDate,
      language: book.language || 'ar',
      fileSize: book.fileSize,
      downloads: book.downloads || Math.floor(Math.random() * 10000) + 1000,
      genre: book.genre
    }
    setSelectedBook(epubBook)
    setCurrentView('detail')
  }

  const handleReadBook = (book) => {
    setCurrentView('reader')
  }

  const handleDownloadBook = (book) => {
    // Implement download functionality
    const link = document.createElement('a')
    link.href = `/books/${book.filename}`
    link.download = book.filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackToLibrary = () => {
    setCurrentView('library')
    setSelectedBook(null)
  }

  return (
    <Router>
      <div className="app" dir="rtl">
        {currentView === 'library' ? (
          <>
            <Header onSearch={handleSearch} />
            <main className="main-content">
              <div className="container">
                <Statistics />
                <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
                
                {showSearchResults ? (
                  <SearchResults query={searchQuery} onBookSelect={handleBookSelect} />
                ) : (
                  <Routes>
                    <Route path="/" element={<Home activeTab={activeTab} onBookSelect={handleBookSelect} />} />
                    <Route path="/categories" element={<Home activeTab={activeTab} onBookSelect={handleBookSelect} />} />
                    <Route path="/authors" element={<Home activeTab={activeTab} onBookSelect={handleBookSelect} />} />
                    <Route path="/new" element={<Home activeTab={activeTab} onBookSelect={handleBookSelect} />} />
                    <Route path="/popular" element={<Home activeTab={activeTab} onBookSelect={handleBookSelect} />} />
                  </Routes>
                )}
              </div>
            </main>
            <Footer />
          </>
        ) : currentView === 'detail' ? (
          <BookDetail 
            book={selectedBook}
            onBackToLibrary={handleBackToLibrary}
            onReadBook={handleReadBook}
            onDownload={handleDownloadBook}
          />
        ) : (
          <EpubjsReader 
            book={selectedBook} 
            onBackToLibrary={handleBackToLibrary}
          />
        )}
      </div>
    </Router>
  )
}

export default App
