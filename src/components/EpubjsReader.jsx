import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import ePub from 'epubjs';
import { ChevronLeft, ChevronRight, Search, ArrowLeft, BookOpen, Menu } from 'lucide-react';
import './EpubjsReader.css';

const EpubjsReader = ({ book, onBackToLibrary }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookInstance, setBookInstance] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [toc, setToc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showToc, setShowToc] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const [containerMounted, setContainerMounted] = useState(false);
  const viewerRef = useRef(null);
  


  const loadEpubBook = useCallback(async () => {
    
    // Immediate container validation - no delays
    const getContainer = () => {
      const container = viewerRef.current;
      return container;
    };
    
    let container = getContainer();
    if (!container) {
      setError('Viewer container not available - DOM element not found');
      return;
    }
    
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError('EPUB loading failed - trying alternative approach');
      if (viewerRef.current) {
        viewerRef.current.innerHTML = `
          <div style="width: 100%; height: 600px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; border: 2px dashed #ccc;">
            <div style="text-align: center;">
              <p style="margin-bottom: 10px;">EPUB content not displayable in browser</p>
              <a href="/books/${book.filename}" download style="color: blue; text-decoration: underline;">Download EPUB file</a>
            </div>
          </div>
        `;
      }
    }, 5000);
    
    try {
      setLoading(true);
      setError(null);
      
      const bookPath = `/books/${book.filename}`;
      
      // Try to fetch the file first to check if it's accessible
      try {
        const response = await fetch(bookPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch EPUB file: ${response.status} ${response.statusText}`);
        }
      } catch (fetchError) {
        throw fetchError;
      }
      
      const bookInstance = ePub(bookPath);
      setBookInstance(bookInstance);
      
      await Promise.race([
        bookInstance.ready,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Book initialization failed')), 5000)
        )
      ]);
      
      // Re-validate container before rendition creation
      container = getContainer();
      if (!container || !container.isConnected) {
        throw new Error('Viewer container is not available for rendition creation');
      }
      
      const rendition = bookInstance.renderTo(container, {
        width: '100%',
        height: '600px',
        spread: 'none',
        allowScriptedContent: true
      });
      
      setRendition(rendition);
      
      try {
        await Promise.race([
          rendition.display(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Display failed - timeout after 10 seconds')), 10000)
          )
        ]);
      } catch (displayError) {
        throw displayError;
      }
      
      clearTimeout(timeoutId);
      setLoading(false);
      
      const navigation = await bookInstance.loaded.navigation;
      setToc(navigation.toc || []);
      
      rendition.on('relocated', (location) => {
        setCurrentLocation(location);
      });
      
      rendition.on('keyup', (event) => {
        if (event.key === 'ArrowLeft') {
          rendition.prev();
        } else if (event.key === 'ArrowRight') {
          rendition.next();
        }
      });
      
    } catch (err) {
      clearTimeout(timeoutId);
      setError(`Failed to load EPUB: ${err.message}`);
      setLoading(false);
    }
  }, [book]);

  // Robust initialization with container persistence guarantee
  useLayoutEffect(() => {
    if (book && !loading && !bookInstance && containerReady && containerMounted) {
      // Use requestAnimationFrame to ensure DOM is fully settled
      const initializeWithRAF = () => {
        requestAnimationFrame(() => {
          // Triple-check container availability at execution time
          if (viewerRef.current && viewerRef.current.isConnected && document.contains(viewerRef.current)) {
            loadEpubBook();
          } else {
            // Retry once more after a short delay
            setTimeout(() => {
              if (viewerRef.current && viewerRef.current.isConnected && document.contains(viewerRef.current)) {
                loadEpubBook();
              }
            }, 100);
          }
        });
      };
      
      initializeWithRAF();
    }
  }, [book, loading, bookInstance, containerReady, containerMounted, loadEpubBook]);

  useEffect(() => {
    return () => {
      if (rendition) {
        rendition.destroy();
      }
      setContainerReady(false);
    };
  }, [rendition]);

  const goToNext = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const goToPrev = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  const goToChapter = (href) => {
    if (rendition) {
      rendition.display(href);
      setShowToc(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim() || !bookInstance) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await bookInstance.search(searchTerm);
      setSearchResults(results || []);
    } catch (err) {
      setSearchResults([]);
    }
  };

  const goToSearchResult = (result) => {
    if (rendition && result.cfi) {
      rendition.display(result.cfi);
      setSearchResults([]);
      setSearchTerm('');
    }
  };

  // Remove early return for loading - let container render always

  // Remove early return for error - let container render always

  return (
    <div className="epub-reader">
      <div className="epub-reader-header">
        <div className="epub-reader-header-content">
          <button
            onClick={onBackToLibrary}
            className="epub-back-button"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>العودة للمكتبة</span>
          </button>
          
          <div className="epub-book-info">
            <h1>{book?.title}</h1>
            <p className="author">بقلم {book?.author}</p>
            {currentLocation && (
              <p className="progress">
                التقدم: {Math.round(currentLocation.start.percentage * 100)}%
              </p>
            )}
          </div>
            
          <div className="epub-controls">
            <button
              onClick={() => setShowToc(!showToc)}
              className="epub-toc-button"
            >
              <Menu className="h-4 w-4" />
              <span>المحتويات</span>
            </button>
            
            <div className="epub-search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="البحث في الكتاب..."
                className="epub-search-input"
              />
              <button
                onClick={handleSearch}
                className="epub-search-button"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="epub-main-content">
        {showToc && toc.length > 0 && (
          <div className="epub-toc-panel">
            <h3 className="epub-toc-title">فهرس المحتويات</h3>
            <div className="epub-toc-list">
              {toc.map((item, index) => (
                <button
                  key={index}
                  onClick={() => goToChapter(item.href)}
                  className="epub-toc-item"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {searchResults.length > 0 && (
          <div className="epub-search-results">
            <h3 className="epub-search-results-title">نتائج البحث ({searchResults.length})</h3>
            <div>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => goToSearchResult(result)}
                  className="epub-search-result"
                >
                  <p>{result.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="epub-reader-container">
          <div 
             ref={(el) => {
               viewerRef.current = el;
               setContainerReady(!!el);
               setContainerMounted(!!el && el.isConnected);
             }}
             className="epub-viewer"
           >
             {loading && (
               <div className="epub-loading">
                 <div className="epub-loading-spinner"></div>
                 <h3>جاري تحميل {book?.title}...</h3>
                 <p>الملف: /books/{book?.filename}</p>
                 <button 
                   onClick={() => {
                     setLoading(false);
                     setError('تم إلغاء التحميل من قبل المستخدم');
                   }}
                   className="epub-cancel-button"
                 >
                   إلغاء التحميل
                 </button>
               </div>
             )}
             {error && (
               <div className="epub-error">
                 <div className="epub-error-icon">⚠️</div>
                 <h2>خطأ في تحميل الكتاب الإلكتروني</h2>
                 <p>{error}</p>
                 <div className="epub-error-details">
                   <p>الكتاب: {book?.title}</p>
                   <p>الملف: /books/{book?.filename}</p>
                 </div>
                 <div className="epub-error-actions">
                   <button 
                     onClick={() => {
                       setError(null);
                       loadEpubBook();
                     }}
                     className="epub-retry-button"
                   >
                     إعادة المحاولة
                   </button>
                   <button 
                     onClick={() => {
                       window.open(`/books/${book?.filename}`, '_blank');
                     }}
                     className="epub-direct-button"
                   >
                     فتح الملف مباشرة
                   </button>
                 </div>
               </div>
             )}
             {!loading && !error && !rendition && (
               <div className="epub-loading">
                 <p>قارئ الكتب الإلكترونية جاهز - في انتظار المحتوى...</p>
               </div>
             )}
           </div>
          
          <button
            onClick={goToPrev}
            className="epub-nav-button epub-nav-prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="epub-nav-button epub-nav-next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EpubjsReader;