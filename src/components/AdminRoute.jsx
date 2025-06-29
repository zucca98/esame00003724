/**
 * ADMIN ROUTE COMPONENT - PROTEZIONE ROUTE AMMINISTRATORE
 *
 * Higher-Order Component che protegge le route amministrative dell'applicazione.
 * Implementa un controllo a due livelli:
 * 1. Verifica autenticazione utente
 * 2. Verifica ruolo amministratore
 *
 * PATTERN UTILIZZATO:
 * - Role-Based Access Control (RBAC): Controllo accesso basato su ruoli
 * - Guard Pattern: Doppio controllo di sicurezza
 * - HOC Pattern: Wrapper riutilizzabile per protezione
 *
 * UTILIZZO:
 * <Route path="/admin" element={
 *   <AdminRoute>
 *     <AdminDashboardPage />
 *   </AdminRoute>
 * } />
 */

// ===== IMPORTAZIONI =====
import { Navigate } from 'react-router-dom'  // Componente per redirect
import { useSelector } from 'react-redux'    // Hook per accesso stato Redux

/**
 * ADMIN ROUTE COMPONENT
 *
 * Componente che implementa la protezione delle route amministrative.
 * Applica controlli di sicurezza a cascata per garantire accesso autorizzato.
 *
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componenti figli da proteggere
 * @returns {React.ReactElement} - Componente figlio o redirect appropriato
 */
// eslint-disable-next-line react/prop-types
function AdminRoute({ children }) {
  // ===== ACCESSO STATO AUTENTICAZIONE =====
  // Estrae i dati utente dallo stato Redux
  const { user } = useSelector((state) => state.auth)

  // ===== PRIMO CONTROLLO: AUTENTICAZIONE =====
  /**
   * Verifica se l'utente è autenticato.
   * Se non autenticato, reindirizza al login.
   *
   * PRIORITÀ: L'autenticazione ha precedenza sul controllo ruolo
   */
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ===== SECONDO CONTROLLO: RUOLO AMMINISTRATORE =====
  /**
   * Verifica se l'utente autenticato ha ruolo 'admin'.
   * Se non è admin, reindirizza alla home page.
   *
   * SICUREZZA: Previene privilege escalation
   */
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // ===== RENDER COMPONENTE PROTETTO =====
  /**
   * Se tutti i controlli sono superati:
   * - Utente autenticato ✓
   * - Ruolo admin ✓
   * - Renderizza i componenti figli
   */
  return children
}

// ===== EXPORT DEFAULT =====
export default AdminRoute