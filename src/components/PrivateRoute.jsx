/**
 * PRIVATE ROUTE COMPONENT - PROTEZIONE ROUTE AUTENTICAZIONE
 *
 * Higher-Order Component che protegge le route private dell'applicazione.
 * Verifica se l'utente è autenticato prima di permettere l'accesso.
 *
 * PATTERN UTILIZZATO:
 * - Route Guard Pattern: Controllo accesso a livello di routing
 * - HOC (Higher-Order Component): Wrapper che aggiunge funzionalità
 * - Conditional Rendering: Render condizionale basato su stato
 *
 * UTILIZZO:
 * <Route path="/profile" element={
 *   <PrivateRoute>
 *     <ProfilePage />
 *   </PrivateRoute>
 * } />
 */

// ===== IMPORTAZIONI =====
import { Navigate } from 'react-router-dom'  // Componente per redirect
import { useSelector } from 'react-redux'    // Hook per accesso stato Redux

/**
 * PRIVATE ROUTE COMPONENT
 *
 * Componente che implementa la protezione delle route private.
 * Se l'utente non è autenticato, reindirizza alla pagina di login.
 *
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componenti figli da proteggere
 * @returns {React.ReactElement} - Componente figlio o redirect
 */
// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  // ===== ACCESSO STATO AUTENTICAZIONE =====
  // Estrae i dati utente dallo stato Redux
  const { user } = useSelector((state) => state.auth)

  // ===== CONTROLLO AUTENTICAZIONE =====
  /**
   * Se l'utente non è autenticato (user === null):
   * - Reindirizza alla pagina di login
   * - React Router gestisce automaticamente il redirect
   * - L'URL corrente viene preservato per redirect post-login
   */
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ===== RENDER COMPONENTE PROTETTO =====
  /**
   * Se l'utente è autenticato:
   * - Renderizza i componenti figli normalmente
   * - L'accesso alla route è consentito
   */
  return children
}

// ===== EXPORT DEFAULT =====
export default PrivateRoute
