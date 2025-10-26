# Quick Reference Guide

## 🚀 Getting Started

### Running the Application
```bash
npm run dev
```
The app will be available at: http://localhost:5173

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📁 New File Structure

### Data Layer
```
src/data/books.js          ← All book data
src/services/bookService.js ← Data access methods
src/utils/formatters.js     ← Formatting utilities
```

### State Management
```
src/hooks/useAppState.js    ← Custom state management hook
```

---

## 🔧 How to Use the New Architecture

### 1. Adding New Books

Edit `src/data/books.js`:
```javascript
export const books = [
  {
    id: 17,                              // Unique ID
    title: 'عنوان الكتاب',               // Book title
    author: 'اسم المؤلف',                // Author name
    category: 'رواية',                   // Category
    cover: '/path/to/cover.svg',         // Cover image path
    rating: 4.5,                         // Rating (0-5)
    downloads: 1500,                     // Number of downloads
    description: 'وصف الكتاب...',        // Description
    filename: 'book-filename.epub',      // EPUB filename
    publishedDate: '2024-01-01',         // Publication date
    language: 'ar',                      // Language code
    fileSize: 2048000,                   // File size in bytes
    genre: 'رواية',                      // Genre
    tags: ['تاغ1', 'تاغ2']               // Tags for search
  },
  // ... more books
]
```

### 2. Using the Book Service

In any component:
```javascript
import bookService from '../services/bookService'

// Get all books
const allBooks = await bookService.getAllBooks()

// Search books
const results = await bookService.searchBooks('search query')

// Get books by category
const categoryBooks = await bookService.getBooksByCategory('رواية')

// Sort books
const sorted = bookService.sortBooks(books, 'rating')

// Get statistics
const stats = await bookService.getStatistics()
```

### 3. Using State Management

In App.jsx (already implemented):
```javascript
import { useAppState } from './hooks/useAppState'

function MyComponent() {
  const { state, actions } = useAppState()

  // Access state
  const { searchQuery, activeTab, selectedBook } = state

  // Dispatch actions
  actions.setSearchQuery('query')
  actions.selectBook(book)
  actions.setActiveTab('home')
  actions.backToLibrary()
}
```

### 4. Using Formatters

```javascript
import {
  formatDownloads,
  formatFileSize,
  formatDate,
  formatRatingStars,
  truncateText
} from '../utils/formatters'

// Format downloads: 1500 → "1.5k"
const downloads = formatDownloads(1500)

// Format file size: 2048000 → "2 ميجابايت"
const size = formatFileSize(2048000)

// Format date: "2024-01-01" → "١ يناير ٢٠٢٤"
const date = formatDate("2024-01-01")

// Format rating to stars
const stars = formatRatingStars(4.5)

// Truncate text
const short = truncateText("Long text...", 100)
```

---

## 🎨 Styling Guide

### Using CSS Variables

Available in `index.css`:
```css
/* Colors */
--primary-color: #1976d2;
--primary-light: #42a5f5;
--primary-dark: #1565c0;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
--spacing-xxl: 3rem;
```

Use in components:
```css
.my-component {
  padding: var(--spacing-lg);
  color: var(--primary-color);
}
```

---

## 🔌 Integrating with Real API

### Update bookService.js

Replace simulated methods with real API calls:

```javascript
// Before (simulated)
async getAllBooks() {
  return this.simulateAPICall(this.books)
}

// After (real API)
async getAllBooks() {
  try {
    const response = await fetch('https://api.example.com/books')
    if (!response.ok) throw new Error('Failed to fetch')
    return await response.json()
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}
```

### Add Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=your_api_key
```

Use in code:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL
```

---

## 🐛 Common Issues & Solutions

### Issue: Books not showing
**Solution:** Check browser console for errors. Ensure bookService is returning data.

### Issue: Search not working
**Solution:** Verify searchQuery is being set in state. Check SearchResults component.

### Issue: Styling looks broken
**Solution:** Ensure CSS files are imported. Check if Vite server is running.

### Issue: State not updating
**Solution:** Verify actions are being called correctly. Check useAppState hook.

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (min-width: 769px) { }
```

---

## ♿ Accessibility Checklist

When adding new components:
- ✅ Add ARIA labels to buttons
- ✅ Use semantic HTML (article, section, nav, main)
- ✅ Add role attributes where appropriate
- ✅ Ensure proper focus states
- ✅ Test with keyboard navigation
- ✅ Add alt text to images
- ✅ Use proper heading hierarchy

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Book details page displays
- [ ] Navigation tabs work
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

---

## 📊 Performance Tips

### Optimizing Images
```javascript
// Use lazy loading
<img loading="lazy" src={cover} alt={title} />
```

### Code Splitting
```javascript
// Lazy load components
const BookDetail = lazy(() => import('./components/BookDetail'))
```

### Memoization
```javascript
// Already implemented in SearchResults
const filtered = useMemo(() => {
  // expensive computation
}, [dependencies])
```

---

## 🔐 Security Notes

### DO NOT commit:
- API keys
- Credentials
- .env files

### Add to .gitignore:
```
.env
.env.local
.env.production
```

---

## 📞 Need Help?

### Check These Files:
1. `IMPROVEMENTS.md` - Detailed changelog
2. `README.md` - Project overview
3. Code comments in service files

### Common Tasks:

**Add a new category:**
1. Add to `src/data/books.js` categories array
2. Add translation to categoryLabels

**Change primary color:**
1. Edit `index.css` --primary-color variable
2. Update in BookDetail.css if needed

**Add new book field:**
1. Add to book objects in `src/data/books.js`
2. Update BookService if needed
3. Update BookCard/BookDetail display

---

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Count lines of code
wc -l src/**/*.{js,jsx,css}
```

---

**Version:** 2.0
**Last Updated:** October 26, 2025
**Status:** Production Ready ✅
