# مساحة حرة - Arabic Book Discovery Website

![مساحة حرة](public/assets/svg/logo.svg)

A modern, responsive Arabic book discovery website built with React.js and Vite. This project provides an elegant platform for browsing, searching, and discovering Arabic books with a beautiful RTL (Right-to-Left) interface.

## 🎉 Recent Improvements (v2.0)

This project has undergone major improvements including:
- ✅ **Centralized data management** with service layer architecture
- ✅ **Modern state management** using useReducer pattern
- ✅ **36% CSS reduction** (839 → 533 lines) with cleaner design
- ✅ **Enhanced accessibility** with ARIA landmarks and semantic HTML
- ✅ **Reusable utility functions** for formatting and data manipulation
- ✅ **Better code organization** with separation of concerns

📖 See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed changelog
📚 See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for usage guide

## ✨ Features

- **🔍 Advanced Search**: Powerful search functionality with filtering and sorting options
- **📚 Book Categories**: Browse books by categories, authors, and popularity
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **🌐 RTL Support**: Full Arabic language support with proper RTL layout
- **📱 Mobile Responsive**: Optimized for all device sizes
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎯 Accessibility**: WCAG compliant with proper focus management

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd masaha-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Project Structure

```
masaha-react/
├── public/
│   ├── assets/
│   │   └── svg/
│   │       └── logo.svg
│   ├── IRANSansWeb_Medium.woff2
│   ├── droidkufi.woff2
│   └── vite.svg
├── src/
│   ├── components/           # UI Components
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── BookCard.jsx
│   │   ├── BookCard.css
│   │   ├── SearchResults.jsx
│   │   ├── SearchResults.css
│   │   ├── BookDetail.jsx
│   │   ├── BookDetail.css
│   │   ├── Statistics.jsx
│   │   ├── Statistics.css
│   │   ├── Footer.jsx
│   │   ├── Footer.css
│   │   ├── EpubjsReader.jsx
│   │   └── EpubjsReader.css
│   ├── data/                 # Data Layer (NEW)
│   │   └── books.js          # Centralized book data
│   ├── services/             # Service Layer (NEW)
│   │   └── bookService.js    # Data access methods
│   ├── hooks/                # Custom Hooks (NEW)
│   │   └── useAppState.js    # State management
│   ├── utils/                # Utilities (NEW)
│   │   └── formatters.js     # Formatting functions
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── IMPROVEMENTS.md           # Detailed changelog (NEW)
└── QUICK_REFERENCE.md        # Usage guide (NEW)
```

## 🎨 Design System

### Colors
- **Primary**: `#1976d2` (Blue)
- **Primary Light**: `#42a5f5`
- **Primary Dark**: `#1565c0`
- **Secondary**: `#f8f9fa` (Light Gray)
- **Accent**: `#ff4757` (Red)

### Typography
- **Primary Font**: IRANSansWeb
- **Heading Font**: DroidKufi
- **Fallback**: Tahoma, sans-serif

### Spacing
- **XS**: 0.25rem
- **SM**: 0.5rem
- **MD**: 1rem
- **LG**: 1.5rem
- **XL**: 2rem
- **XXL**: 3rem

## 🧩 Components

### Core Components

1. **App.jsx** - Main application component with routing
2. **Header.jsx** - Navigation header with search functionality
3. **Navigation.jsx** - Tab-based navigation component
4. **Home.jsx** - Main content area with book listings
5. **BookCard.jsx** - Individual book display component
6. **SearchResults.jsx** - Search results with filtering
7. **Statistics.jsx** - Book statistics display
8. **Footer.jsx** - Site footer with links and information

### Component Features

- **Responsive Design**: All components adapt to different screen sizes
- **RTL Support**: Proper Arabic text direction and layout
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and state management

## 🔧 Configuration

### Vite Configuration

The project uses Vite with React plugin for fast development and building:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### ESLint Configuration

Code quality is maintained with ESLint and React-specific rules.

## 🌐 Internationalization

- **Language**: Arabic (ar)
- **Direction**: RTL (Right-to-Left)
- **Font Support**: Arabic web fonts included
- **Text Alignment**: Right-aligned by default

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px
- **Large Desktop**: > 1200px

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Static Hosting

The built files in the `dist` folder can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3

## 🔍 Features in Detail

### Search Functionality
- Real-time search as you type
- Filter by categories
- Sort by relevance, title, author, rating, or downloads
- Search results highlighting

### Book Display
- Beautiful card-based layout
- Book cover placeholders
- Rating system with stars
- Download statistics
- Category tags
- Author information

### Navigation
- Tab-based navigation
- Active state indicators
- Smooth transitions
- Mobile-friendly hamburger menu

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized typography scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **IRANSansWeb** - Arabic font
- **DroidKufi** - Arabic heading font

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

**مساحة حرة** - Discover the world of Arabic literature 📚✨
