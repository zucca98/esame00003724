/**
 * APP.JSX - COMPONENTE ROOT E CONFIGURAZIONE ROUTING
 *
 * Questo componente è il cuore dell'applicazione e gestisce:
 * - Layout principale dell'applicazione (Navbar, Main, Footer)
 * - Configurazione di tutte le route dell'applicazione
 * - Inizializzazione dello stato di autenticazione
 * - Protezione delle route private e admin
 *
 * PATTERN UTILIZZATI:
 * - Layout Component Pattern per struttura persistente
 * - Route Protection con Higher-Order Components
 * - Lazy Loading per ottimizzazione performance (futuro)
 */

// ===== IMPORTAZIONI REACT E HOOKS =====
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// ===== COMPONENTI LAYOUT =====
import Navbar from './components/Navbar'           // Navigazione principale
import Footer from './components/Footer'           // Footer dell'applicazione

// ===== COMPONENTI PAGINA =====
import HomePage from './pages/HomePage'             // Landing page
import AboutPage from './pages/AboutPage'           // Pagina chi siamo
import ShopPage from './pages/ShopPage'             // Catalogo prodotti
import ProductDetailPage from './pages/ProductDetailPage' // Dettaglio prodotto
import CartPage from './pages/CartPage'             // Carrello acquisti
import AdminDashboardPage from './pages/AdminDashboardPage' // Dashboard admin
import ProfilePage from './pages/ProfilePage'       // Profilo utente
import NotFoundPage from './pages/NotFoundPage'     // Pagina 404
import LoginPage from './pages/LoginPage'           // Pagina login
import RegisterPage from './pages/RegisterPage'     // Pagina registrazione
import ContactPage from './pages/ContactPage'       // Pagina contatti

// ===== COMPONENTI DI PROTEZIONE ROUTE =====
import PrivateRoute from './components/PrivateRoute' // HOC per route private
import AdminRoute from './components/AdminRoute'     // HOC per route admin

// ===== REDUX ACTIONS =====
import { checkAuth } from './store/auth/authSlice'   // Action per controllo autenticazione

// ===== STILI =====
import './App.css'

/**
 * COMPONENTE APP PRINCIPALE
 *
 * Gestisce il layout principale e la configurazione delle route.
 * Implementa il pattern "Layout Component" con header, main e footer fissi.
 */
function App() {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()

  /**
   * INIZIALIZZAZIONE AUTENTICAZIONE
   *
   * Al mount del componente, controlla se l'utente è già autenticato
   * leggendo i dati da localStorage (token e informazioni utente).
   * Questo permette di mantenere la sessione attiva anche dopo il refresh.
   */
  useEffect(() => {
    dispatch(checkAuth()) // Ripristina stato auth da localStorage
  }, [dispatch])

  return (
    /**
     * LAYOUT PRINCIPALE
     *
     * Struttura:
     * ┌─────────────────┐
     * │     Navbar      │ ← Sempre visibile
     * ├─────────────────┤
     * │                 │
     * │   Route Content │ ← Cambia in base alla route
     * │   (flex-grow-1) │
     * │                 │
     * ├─────────────────┤
     * │     Footer      │ ← Sempre visibile
     * └─────────────────┘
     *
     * Classes Bootstrap utilizzate:
     * - d-flex flex-column: Layout verticale
     * - min-vh-100: Altezza minima 100% viewport
     * - flex-grow-1: Main content espandibile
     */
    <div className="app-container d-flex flex-column min-vh-100">
      {/* NAVIGAZIONE PRINCIPALE - Sempre visibile */}
      <Navbar />

      {/* CONTENUTO PRINCIPALE - Cambia in base alla route */}
      <main className="flex-grow-1">
        <Routes>
          {/* ===== ROUTE PUBBLICHE ===== */}
          {/* Accessibili a tutti gli utenti senza autenticazione */}

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ===== ROUTE PROTETTE ADMIN ===== */}
          {/* Accessibili solo agli utenti con ruolo 'admin' */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                {/* AdminRoute verifica: user.role === 'admin' */}
                <AdminDashboardPage />
              </AdminRoute>
            }
          />

          {/* ===== ROUTE PROTETTE UTENTE ===== */}
          {/* Accessibili solo agli utenti autenticati */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                {/* PrivateRoute verifica: user !== null */}
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* ===== ROUTE FALLBACK ===== */}
          {/* Cattura tutte le route non definite (404) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* FOOTER - Sempre visibile */}
      <Footer />
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default App