/**
 * ORDERS SLICE - GESTIONE ORDINI E-COMMERCE
 *
 * Questo slice gestisce tutto il sistema degli ordini:
 * - Creazione e gestione ordini utente
 * - Tracking stato ordini (pending, processing, shipped, delivered)
 * - Cronologia ordini per utenti e admin
 * - Integrazione con sistema di pagamento
 * - Analytics e reporting ordini
 *
 * PATTERN UTILIZZATI:
 * - State Management per ordini centralizzato
 * - Selectors per filtraggio dati per ruolo
 * - Immutable Updates con Immer
 * - Role-based Data Access
 * - Order Status State Machine
 *
 * RESPONSABILITÀ:
 * - Mantenere cronologia ordini completa
 * - Gestire stati ordini e transizioni
 * - Fornire dati per dashboard utente/admin
 * - Supportare analytics e reporting
 * - Integrare con sistemi di pagamento e spedizione
 */

// ===== IMPORTAZIONI =====
import { createSlice } from '@reduxjs/toolkit'

// ===== STATO INIZIALE =====
/**
 * INITIAL STATE DEGLI ORDINI
 *
 * Struttura stato per gestione completa ordini:
 * - Array ordini con metadati completi
 * - Stati asincroni per operazioni
 * - Error handling centralizzato
 */
const initialState = {
  // ===== DATI ORDINI =====
  orders: [],              // Array di tutti gli ordini del sistema

  // ===== STATO OPERAZIONI =====
  status: 'idle',          // 'idle' | 'loading' | 'succeeded' | 'failed'

  // ===== GESTIONE ERRORI =====
  error: null              // Messaggio errore per operazioni fallite
}

// ===== SLICE DEFINITION =====
/**
 * ORDERS SLICE - Definizione slice ordini
 *
 * Gestisce tutte le operazioni degli ordini con Redux Toolkit.
 * Implementa state machine per stati ordini e role-based access.
 */
const ordersSlice = createSlice({
  name: 'orders', // Nome slice (prefisso action types)
  initialState,

  // ===== REDUCERS =====
  reducers: {
    /**
     * ADD ORDER REDUCER
     *
     * Aggiunge un nuovo ordine al sistema.
     * Utilizzato dopo il completamento del checkout.
     *
     * @param {Object} state - Stato corrente ordini
     * @param {Object} action - Azione con payload ordine
     * @param {Object} action.payload - Dati completi ordine
     * @param {string} action.payload.id - ID univoco ordine
     * @param {number} action.payload.userId - ID utente che ha ordinato
     * @param {Array} action.payload.items - Items ordinati
     * @param {number} action.payload.total - Totale ordine
     * @param {string} action.payload.status - Stato iniziale ordine
     * @param {string} action.payload.createdAt - Timestamp creazione
     */
    addOrder: (state, action) => {
      // ===== VALIDAZIONE PAYLOAD =====
      const order = action.payload

      // Aggiunge timestamp se non presente
      if (!order.createdAt) {
        order.createdAt = new Date().toISOString()
      }

      // Stato di default se non specificato
      if (!order.status) {
        order.status = 'pending'
      }

      // ===== AGGIUNTA ORDINE =====
      state.orders.push(order)

      // ===== ORDINAMENTO CRONOLOGICO =====
      // Mantiene ordini ordinati per data (più recenti primi)
      state.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    },

    /**
     * UPDATE ORDER STATUS REDUCER
     *
     * Aggiorna lo stato di un ordine esistente.
     * Implementa state machine per transizioni valide.
     *
     * @param {Object} state - Stato corrente ordini
     * @param {Object} action - Azione con dati aggiornamento
     * @param {string} action.payload.orderId - ID ordine da aggiornare
     * @param {string} action.payload.status - Nuovo stato ordine
     */
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload

      // ===== TROVA ORDINE =====
      const order = state.orders.find(order => order.id === orderId)

      if (order) {
        // ===== VALIDAZIONE TRANSIZIONE STATO =====
        const validTransitions = {
          'pending': ['processing', 'cancelled'],
          'processing': ['shipped', 'cancelled'],
          'shipped': ['delivered'],
          'delivered': [], // Stato finale
          'cancelled': []  // Stato finale
        }

        const currentStatus = order.status
        const isValidTransition = validTransitions[currentStatus]?.includes(status)

        if (isValidTransition || !validTransitions[currentStatus]) {
          // ===== AGGIORNAMENTO STATO =====
          order.status = status
          order.updatedAt = new Date().toISOString()

          // ===== METADATI AGGIUNTIVI =====
          if (status === 'shipped') {
            order.shippedAt = new Date().toISOString()
          } else if (status === 'delivered') {
            order.deliveredAt = new Date().toISOString()
          }
        } else {
          console.warn(`Invalid status transition: ${currentStatus} → ${status}`)
        }
      } else {
        console.error(`Order not found: ${orderId}`)
      }
    },

    /**
     * CLEAR ORDERS REDUCER
     *
     * Pulisce tutti gli ordini dal sistema.
     * Utilizzato per reset o logout admin.
     *
     * ATTENZIONE: Operazione irreversibile in questo contesto
     */
    clearOrders: (state) => {
      state.orders = []
      state.status = 'idle'
      state.error = null
    }
  }
})

// ===== EXPORT ACTIONS E REDUCER =====

/**
 * EXPORT DELLE AZIONI
 *
 * Redux Toolkit genera automaticamente action creators per ogni reducer.
 */
export const {
  addOrder,          // Aggiunge nuovo ordine
  updateOrderStatus, // Aggiorna stato ordine
  clearOrders        // Pulisce tutti gli ordini
} = ordersSlice.actions

// ===== SELECTORS =====
/**
 * SELECTORS per accesso ottimizzato ai dati ordini.
 * Implementano role-based access control e filtering.
 */

/**
 * SELECT USER ORDERS
 *
 * Filtra gli ordini per un utente specifico.
 * Utilizzato nella pagina profilo utente per mostrare cronologia.
 *
 * @param {Object} state - Stato Redux completo
 * @param {number} userId - ID utente per cui filtrare
 * @returns {Array} - Array ordini dell'utente ordinati per data
 */
export const selectUserOrders = (state, userId) => {
  return state.orders.orders
    .filter(order => order.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

/**
 * SELECT ALL ORDERS
 *
 * Restituisce tutti gli ordini del sistema.
 * Utilizzato nella dashboard admin per gestione completa.
 *
 * @param {Object} state - Stato Redux completo
 * @returns {Array} - Array di tutti gli ordini
 */
export const selectAllOrders = (state) => state.orders.orders

/**
 * SELECT ORDERS BY STATUS
 *
 * Filtra ordini per stato specifico.
 * Utile per dashboard admin e analytics.
 *
 * @param {Object} state - Stato Redux completo
 * @param {string} status - Stato ordine da filtrare
 * @returns {Array} - Array ordini con stato specificato
 */
export const selectOrdersByStatus = (state, status) => {
  return state.orders.orders.filter(order => order.status === status)
}

/**
 * SELECT RECENT ORDERS
 *
 * Restituisce ordini recenti (ultimi N giorni).
 * Utilizzato per dashboard e notifiche.
 *
 * @param {Object} state - Stato Redux completo
 * @param {number} days - Numero giorni per "recente" (default: 7)
 * @returns {Array} - Array ordini recenti
 */
export const selectRecentOrders = (state, days = 7) => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return state.orders.orders.filter(order =>
    new Date(order.createdAt) >= cutoffDate
  )
}

/**
 * SELECT ORDER STATS
 *
 * Calcola statistiche aggregate degli ordini.
 * Utilizzato per dashboard analytics.
 *
 * @param {Object} state - Stato Redux completo
 * @returns {Object} - Oggetto con statistiche ordini
 */
export const selectOrderStats = (state) => {
  const orders = state.orders.orders

  return {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + (order.total || 0), 0)
  }
}

// ===== EXPORT DEFAULT REDUCER =====
export default ordersSlice.reducer
