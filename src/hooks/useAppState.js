import { useReducer } from 'react'

/**
 * State management hook for the application
 * Uses useReducer for better state management
 */

// Action types
export const ACTIONS = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SHOW_SEARCH_RESULTS: 'SHOW_SEARCH_RESULTS',
  HIDE_SEARCH_RESULTS: 'HIDE_SEARCH_RESULTS',
  SELECT_BOOK: 'SELECT_BOOK',
  SET_VIEW: 'SET_VIEW',
  BACK_TO_LIBRARY: 'BACK_TO_LIBRARY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Initial state
const initialState = {
  searchQuery: '',
  activeTab: 'home',
  showSearchResults: false,
  currentView: 'library', // 'library', 'detail', 'reader'
  selectedBook: null,
  loading: false,
  error: null
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        showSearchResults: true,
        activeTab: 'search'
      }

    case ACTIONS.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
        showSearchResults: action.payload === 'search' ? state.showSearchResults : false
      }

    case ACTIONS.SHOW_SEARCH_RESULTS:
      return {
        ...state,
        showSearchResults: true
      }

    case ACTIONS.HIDE_SEARCH_RESULTS:
      return {
        ...state,
        showSearchResults: false,
        searchQuery: ''
      }

    case ACTIONS.SELECT_BOOK:
      return {
        ...state,
        selectedBook: action.payload,
        currentView: 'detail'
      }

    case ACTIONS.SET_VIEW:
      return {
        ...state,
        currentView: action.payload
      }

    case ACTIONS.BACK_TO_LIBRARY:
      return {
        ...state,
        currentView: 'library',
        selectedBook: null
      }

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

/**
 * Custom hook for application state management
 * @returns {Object} State and dispatch functions
 */
export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Action creators
  const actions = {
    setSearchQuery: (query) => {
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query })
    },

    setActiveTab: (tab) => {
      dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab })
    },

    showSearchResults: () => {
      dispatch({ type: ACTIONS.SHOW_SEARCH_RESULTS })
    },

    hideSearchResults: () => {
      dispatch({ type: ACTIONS.HIDE_SEARCH_RESULTS })
    },

    selectBook: (book) => {
      // Normalize book data
      const normalizedBook = {
        id: book.id || Date.now(),
        title: book.title,
        author: book.author,
        filename: book.filename || `${book.title.replace(/\s+/g, '-').toLowerCase()}.epub`,
        description: book.description,
        cover: book.cover,
        category: book.category,
        rating: book.rating || 0,
        publishedDate: book.publishedDate,
        language: book.language || 'ar',
        fileSize: book.fileSize,
        downloads: book.downloads || 0,
        genre: book.genre,
        tags: book.tags || []
      }
      dispatch({ type: ACTIONS.SELECT_BOOK, payload: normalizedBook })
    },

    setView: (view) => {
      dispatch({ type: ACTIONS.SET_VIEW, payload: view })
    },

    backToLibrary: () => {
      dispatch({ type: ACTIONS.BACK_TO_LIBRARY })
    },

    setLoading: (loading) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: loading })
    },

    setError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error })
    }
  }

  return { state, actions }
}
