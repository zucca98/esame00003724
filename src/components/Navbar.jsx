/**
 * NAVBAR COMPONENT - NAVIGAZIONE PRINCIPALE DELL'APPLICAZIONE
 *
 * Componente di navigazione principale che gestisce:
 * - Menu responsive con Bootstrap
 * - Navigazione tra le pagine dell'app
 * - Stato di autenticazione utente
 * - Badge carrello con conteggio items
 * - Menu admin condizionale
 * - Logout e gestione sessione
 *
 * PATTERN UTILIZZATI:
 * - Conditional Rendering: Menu diverso per utenti autenticati/non autenticati
 * - State Locale: Gestione collapse menu mobile
 * - Redux Integration: Accesso a stato auth e cart
 * - Responsive Design: Menu collassabile su mobile
 * - Active Link Highlighting: Evidenziazione pagina corrente
 *
 * RESPONSABILITÀ:
 * - Fornire navigazione consistente in tutta l'app
 * - Mostrare stato autenticazione e ruolo utente
 * - Indicare numero items nel carrello
 * - Gestire logout e redirect
 * - Ottimizzare UX mobile con menu collassabile
 */

// ===== IMPORTAZIONI =====
import { useState } from 'react'                    // Hook per stato locale
import { Link, useNavigate, useLocation } from 'react-router-dom' // React Router hooks
import { useSelector, useDispatch } from 'react-redux' // Redux hooks
import { logoutUser } from '../store/auth/authSlice'   // Action logout

/**
 * NAVBAR COMPONENT
 *
 * Componente di navigazione principale che si adatta al contesto utente.
 * Implementa pattern responsive e conditional rendering per UX ottimale.
 */
function Navbar() {
  // ===== STATE LOCALE =====
  /**
   * STATO COLLAPSE MENU
   *
   * Gestisce la visibilità del menu su dispositivi mobile.
   * true = menu chiuso, false = menu aperto
   */
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)

  // ===== REDUX STATE =====
  /**
   * ACCESSO STATO GLOBALE
   *
   * Estrae dati necessari dallo stato Redux:
   * - user: informazioni utente autenticato
   * - items: items nel carrello per badge count
   */
  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // ===== REACT ROUTER HOOKS =====
  const navigate = useNavigate()  // Navigazione programmatica
  const location = useLocation()  // Informazioni route corrente

  // ===== EVENT HANDLERS =====

  /**
   * TOGGLE MENU MOBILE
   *
   * Gestisce apertura/chiusura del menu su dispositivi mobile.
   * Inverte lo stato di collapse del menu.
   */
  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  /**
   * HANDLER LOGOUT
   *
   * Gestisce il processo di logout:
   * 1. Dispatcha azione logout Redux
   * 2. Naviga alla home page
   * 3. Chiude menu mobile se aperto
   */
  const handleLogout = () => {
    dispatch(logoutUser())  // Pulisce stato auth e localStorage
    navigate('/')           // Redirect a home page
  }

  // ===== COMPUTED VALUES =====

  /**
   * CONTEGGIO ITEMS CARRELLO
   *
   * Calcola il numero totale di items nel carrello
   * sommando le quantità di tutti i prodotti.
   */
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  /**
   * HELPER ACTIVE LINK
   *
   * Determina se un link è attivo confrontando con la route corrente.
   * Restituisce classe CSS 'active' per evidenziare la pagina corrente.
   *
   * @param {string} path - Path da confrontare con location corrente
   * @returns {string} - Classe CSS 'active' o stringa vuota
   */
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    /**
     * NAVBAR BOOTSTRAP RESPONSIVE
     *
     * Struttura navbar Bootstrap con:
     * - sticky-top: Navbar fissa in alto durante scroll
     * - navbar-expand-lg: Espansione su schermi large+
     * - container: Contenitore responsive centrato
     */
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">

        {/* ===== BRAND LOGO ===== */}
        {/**
         * BRAND LINK
         *
         * Logo/nome del brand che funge anche da link alla home.
         * Sempre visibile su tutti i dispositivi.
         */}
        <Link className="navbar-brand fw-bold" to="/">
          Coccibelli
        </Link>

        {/* ===== TOGGLE BUTTON MOBILE ===== */}
        {/**
         * HAMBURGER MENU BUTTON
         *
         * Pulsante per aprire/chiudere menu su dispositivi mobile.
         * Visibile solo su schermi piccoli (< lg breakpoint).
         *
         * ACCESSIBILITÀ:
         * - aria-expanded: Indica stato aperto/chiuso per screen reader
         * - aria-label: Descrizione funzione per screen reader
         */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ===== MENU PRINCIPALE ===== */}
        {/**
         * COLLAPSIBLE MENU
         *
         * Menu principale che si nasconde su mobile e si mostra su desktop.
         * La classe 'show' viene aggiunta dinamicamente per aprire il menu mobile.
         *
         * LAYOUT:
         * - ms-auto: Allinea menu a destra
         * - align-items-center: Allineamento verticale centrato
         */}
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {/* ===== MENU ITEMS PUBBLICI ===== */}
            {/**
             * LINK NAVIGAZIONE PRINCIPALI
             *
             * Menu items accessibili a tutti gli utenti.
             * Ogni link include:
             * - Classe active dinamica per evidenziare pagina corrente
             * - onClick per chiudere menu mobile dopo navigazione
             * - Struttura semantica con nav-item/nav-link
             */}

            {/* Link Home */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/')}`}
                to="/"
                onClick={() => setIsNavCollapsed(true)}
                aria-label="Vai alla pagina Home"
              >
                Home
              </Link>
            </li>

            {/* Link Chi Siamo */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/about')}`}
                to="/about"
                onClick={() => setIsNavCollapsed(true)}
                aria-label="Scopri la nostra storia"
              >
                Chi Siamo
              </Link>
            </li>

            {/* Link Catalogo Prodotti */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/shop')}`}
                to="/shop"
                onClick={() => setIsNavCollapsed(true)}
                aria-label="Esplora i nostri prodotti"
              >
                Articoli
              </Link>
            </li>

            {/* Link Contatti */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contact')}`}
                to="/contact"
                onClick={() => setIsNavCollapsed(true)}
                aria-label="Contattaci per informazioni"
              >
                Contatti
              </Link>
            </li>

            {/* ===== MENU ADMIN CONDIZIONALE ===== */}
            {/**
             * LINK DASHBOARD ADMIN
             *
             * Visibile solo se:
             * - Utente è autenticato (user !== null)
             * - Utente ha ruolo 'admin'
             *
             * PATTERN: Conditional Rendering per controllo accessi
             */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link
                  className={`nav-link text-warning ${isActive('/admin')}`}
                  to="/admin"
                  onClick={() => setIsNavCollapsed(true)}
                  aria-label="Accedi alla dashboard amministrativa"
                >
                  <span className="me-1">⚙️</span>
                  Admin
                </Link>
              </li>
            )}

            {/* ===== MENU AUTENTICAZIONE ===== */}
            {/**
             * CONDITIONAL RENDERING AUTENTICAZIONE
             *
             * Mostra menu diverso basato su stato autenticazione:
             * - Se autenticato: Profilo + Logout
             * - Se non autenticato: Link Accedi
             *
             * PATTERN: Ternary operator per UI condizionale
             */}
            {user ? (
              /* ===== MENU UTENTE AUTENTICATO ===== */
              <>
                {/* Link Profilo Utente */}
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/profile')}`}
                    to="/profile"
                    onClick={() => setIsNavCollapsed(true)}
                    aria-label="Vai al tuo profilo"
                  >
                    <span className="me-1">👤</span>
                    Profilo
                  </Link>
                </li>

                {/* Pulsante Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-danger"
                    onClick={() => {
                      handleLogout()
                      setIsNavCollapsed(true)
                    }}
                    aria-label="Esci dal tuo account"
                  >
                    <span className="me-1">🚪</span>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              /* ===== MENU UTENTE NON AUTENTICATO ===== */
              <li className="nav-item">
                <Link
                  className={`nav-link text-primary ${isActive('/login')}`}
                  to="/login"
                  onClick={() => setIsNavCollapsed(true)}
                  aria-label="Accedi al tuo account"
                >
                  <span className="me-1">🔑</span>
                  Accedi
                </Link>
              </li>
            )}

            {/* ===== LINK CARRELLO ===== */}
            {/**
             * CARRELLO CON BADGE CONTATORE
             *
             * Link al carrello che include:
             * - Icona SVG carrello
             * - Badge con numero items (se > 0)
             * - Styling custom per evidenziare
             * - Sempre visibile per facile accesso
             *
             * PATTERN: Badge dinamico per feedback immediato
             */}
            <li className="nav-item">
              <Link
                className="cart-link nav-link position-relative"
                to="/cart"
                onClick={() => setIsNavCollapsed(true)}
                aria-label={`Carrello con ${cartItemCount} articoli`}
              >
                {/* Icona Carrello SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>

                {/* Badge Contatore Items */}
                {/**
                 * BADGE DINAMICO
                 *
                 * Mostra il numero di items nel carrello solo se > 0.
                 * Posizionamento assoluto per sovrapposizione all'icona.
                 *
                 * CONDITIONAL RENDERING: Badge visibile solo con items
                 */}
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {cartItemCount}
                    <span className="visually-hidden">articoli nel carrello</span>
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

// ===== EXPORT DEFAULT =====
export default Navbar
