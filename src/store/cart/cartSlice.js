/**
 * CART SLICE - GESTIONE CARRELLO E-COMMERCE
 *
 * Questo slice gestisce tutto il sistema del carrello acquisti:
 * - Aggiunta e rimozione prodotti
 * - Gestione quantità e calcolo totali
 * - Persistenza con localStorage
 * - Feedback utente con notifiche
 * - Sincronizzazione stato Redux <-> localStorage
 *
 * PATTERN IMPLEMENTATI:
 * - State Persistence: Carrello salvato in localStorage
 * - Computed Values: Totali calcolati automaticamente
 * - Optimistic Updates: UI aggiornata immediatamente
 * - User Feedback: Toast notifications per ogni azione
 */

// ===== IMPORTAZIONI =====
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// ===== STATO INIZIALE =====
/**
 * INITIAL STATE con persistenza localStorage
 *
 * Il carrello viene caricato da localStorage all'inizializzazione
 * per mantenere i prodotti tra sessioni del browser.
 */
const initialState = {
  // ===== ITEMS CARRELLO =====
  // Carica items da localStorage o array vuoto se non presente
  items: JSON.parse(localStorage.getItem('cart')) || [],

  // ===== TOTALE CARRELLO =====
  // Calcolato dinamicamente ad ogni modifica
  total: 0
}

// ===== UTILITY FUNCTIONS =====

/**
 * CALCOLA TOTALE CARRELLO
 *
 * Funzione pura che calcola il totale del carrello
 * sommando prezzo * quantità per ogni item.
 *
 * @param {Array} items - Array di items del carrello
 * @returns {number} - Totale del carrello
 */
const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
}

/**
 * SALVA CARRELLO IN LOCALSTORAGE
 *
 * Persiste lo stato del carrello in localStorage
 * per mantenerlo tra sessioni del browser.
 *
 * @param {Array} items - Items del carrello da salvare
 */
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (error) {
    console.error('Errore salvataggio carrello in localStorage:', error)
    // In caso di errore (storage pieno, etc.) mostra notifica
    toast.error('Errore nel salvataggio del carrello')
  }
}

// ===== SLICE DEFINITION =====
/**
 * CART SLICE - Definizione slice carrello
 *
 * Gestisce tutte le operazioni del carrello con Redux Toolkit.
 * Ogni reducer modifica lo stato e sincronizza con localStorage.
 */
const cartSlice = createSlice({
  name: 'cart', // Nome slice (prefisso action types)
  initialState,

  // ===== REDUCERS =====
  reducers: {
    /**
     * ADD TO CART REDUCER
     *
     * Aggiunge un prodotto al carrello o incrementa la quantità se già presente.
     * Implementa logica di merge intelligente per evitare duplicati.
     *
     * @param {Object} state - Stato corrente del carrello
     * @param {Object} action - Azione con payload del prodotto
     */
    addToCart: (state, action) => {
      // ===== DESTRUCTURING PAYLOAD =====
      const { id, name, price, imageUrl } = action.payload
      const quantity = action.payload.quantity || 1 // Default quantità = 1

      // ===== CONTROLLO ESISTENZA PRODOTTO =====
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        // ===== AGGIORNAMENTO QUANTITÀ ESISTENTE =====
        existingItem.quantity += quantity
        toast.info(`Quantità aggiornata: ${name} (${existingItem.quantity})`)
      } else {
        // ===== AGGIUNTA NUOVO PRODOTTO =====
        state.items.push({
          id,
          name,
          price,
          quantity,
          imageUrl,
          addedAt: new Date().toISOString() // Timestamp aggiunta
        })
        toast.success(`Aggiunto al carrello: ${name}`)
      }

      // ===== RICALCOLO TOTALE E PERSISTENZA =====
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },

    /**
     * REMOVE FROM CART REDUCER
     *
     * Rimuove completamente un prodotto dal carrello.
     * Trova l'item per ID e lo elimina dall'array.
     *
     * @param {Object} state - Stato corrente del carrello
     * @param {Object} action - Azione con ID del prodotto da rimuovere
     */
    removeFromCart: (state, action) => {
      const id = action.payload

      // ===== TROVA ITEM DA RIMUOVERE =====
      const itemToRemove = state.items.find(item => item.id === id)

      if (itemToRemove) {
        // ===== RIMOZIONE ITEM =====
        state.items = state.items.filter(item => item.id !== id)
        toast.info(`Rimosso dal carrello: ${itemToRemove.name}`)
      } else {
        // ===== GESTIONE ERRORE =====
        toast.error('Prodotto non trovato nel carrello')
      }

      // ===== RICALCOLO E PERSISTENZA =====
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },

    /**
     * UPDATE QUANTITY REDUCER
     *
     * Aggiorna la quantità di un prodotto specifico nel carrello.
     * Se quantità <= 0, rimuove il prodotto completamente.
     *
     * @param {Object} state - Stato corrente del carrello
     * @param {Object} action - Azione con id e nuova quantità
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload

      // ===== VALIDAZIONE QUANTITÀ =====
      if (quantity <= 0) {
        // ===== RIMOZIONE SE QUANTITÀ ZERO =====
        const itemToRemove = state.items.find(item => item.id === id)
        state.items = state.items.filter(item => item.id !== id)
        toast.info(`Articolo rimosso dal carrello: ${itemToRemove?.name || 'Prodotto'}`)
      } else {
        // ===== AGGIORNAMENTO QUANTITÀ =====
        const item = state.items.find(item => item.id === id)
        if (item) {
          const oldQuantity = item.quantity
          item.quantity = quantity
          toast.info(`Quantità aggiornata: ${item.name} (${oldQuantity} → ${quantity})`)
        } else {
          toast.error('Prodotto non trovato nel carrello')
        }
      }

      // ===== RICALCOLO E PERSISTENZA =====
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },

    /**
     * CLEAR CART REDUCER
     *
     * Svuota completamente il carrello.
     * Utilizzato dopo il checkout o per reset manuale.
     */
    clearCart: (state) => {
      const itemCount = state.items.length

      // ===== RESET COMPLETO STATO =====
      state.items = []
      state.total = 0

      // ===== PULIZIA PERSISTENZA =====
      saveCartToStorage([])

      // ===== FEEDBACK UTENTE =====
      if (itemCount > 0) {
        toast.info(`Carrello svuotato (${itemCount} articoli rimossi)`)
      }
    }
  }
})

// ===== EXPORT ACTIONS E REDUCER =====

/**
 * EXPORT DELLE AZIONI
 *
 * Redux Toolkit genera automaticamente action creators per ogni reducer.
 * Queste azioni possono essere dispatched dai componenti.
 */
export const {
  addToCart,      // Aggiunge prodotto al carrello
  removeFromCart, // Rimuove prodotto dal carrello
  updateQuantity, // Aggiorna quantità prodotto
  clearCart       // Svuota carrello completamente
} = cartSlice.actions

/**
 * EXPORT DEL REDUCER
 *
 * Il reducer viene utilizzato nella configurazione dello store.
 */
export default cartSlice.reducer
