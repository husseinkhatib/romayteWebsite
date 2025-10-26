import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Home from './components/Home'
import SearchResults from './components/SearchResults'
import Statistics from './components/Statistics'
import Footer from './components/Footer'
import BookDetail from './components/BookDetail'
import EpubjsReader from './components/EpubjsReader'
import { useAppState } from './hooks/useAppState'
import './App.css'

function App() {
  const { state, actions } = useAppState()
  const { searchQuery, activeTab, showSearchResults, currentView, selectedBook } = state

  const handleSearch = (query) => {
    actions.setSearchQuery(query)
  }

  const handleTabChange = (tab) => {
    actions.setActiveTab(tab)
  }

  const handleBookSelect = (book) => {
    actions.selectBook(book)
  }

  const handleReadBook = (book) => {
    actions.setView('reader')
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
    actions.backToLibrary()
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
