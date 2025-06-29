/**
 * STORE.JS - CONFIGURAZIONE REDUX STORE CENTRALIZZATO
 *
 * Questo file configura lo store Redux utilizzando Redux Toolkit.
 * Lo store è il contenitore centralizzato per tutto lo stato dell'applicazione.
 *
 * ARCHITETTURA DELLO STATO:
 * - Feature-based slices: Ogni feature ha il proprio slice
 * - State normalization: Dati strutturati per performance
 * - Immutability: Gestita automaticamente da Immer
 * - DevTools: Integrazione automatica per debug
 *
 * VANTAGGI REDUX TOOLKIT:
 * - Boilerplate ridotto del 70% rispetto a Redux vanilla
 * - Immer integrato per mutazioni "sicure"
 * - DevTools configurati automaticamente
 * - Best practices applicate by default
 */

// ===== IMPORTAZIONI REDUX TOOLKIT =====
import { configureStore } from '@reduxjs/toolkit'

// ===== IMPORTAZIONI SLICE REDUCERS =====
import productsReducer from './products/productsSlice'  // Gestione catalogo prodotti
import cartReducer from './cart/cartSlice'              // Gestione carrello acquisti
import authReducer from './auth/authSlice'              // Gestione autenticazione
import ordersReducer from './orders/ordersSlice'        // Gestione ordini

/**
 * CONFIGURAZIONE STORE REDUX
 *
 * configureStore() è la funzione principale di Redux Toolkit che:
 * - Combina automaticamente i reducers
 * - Configura Redux DevTools
 * - Aggiunge middleware di default (thunk, serializable check, etc.)
 * - Abilita controlli di sviluppo per immutabilità
 *
 * STRUTTURA STATO GLOBALE:
 * {
 *   products: { products: [], currentProduct: null, status: 'idle', error: null },
 *   cart: { items: [], total: 0 },
 *   auth: { user: null, token: null, status: 'idle', error: null },
 *   orders: { orders: [], currentOrder: null, status: 'idle', error: null }
 * }
 */
export const store = configureStore({
  reducer: {
    // ===== SLICE PRODOTTI =====
    // Gestisce: catalogo, dettagli prodotto, operazioni CRUD admin
    products: productsReducer,

    // ===== SLICE CARRELLO =====
    // Gestisce: items carrello, quantità, totali, persistenza localStorage
    cart: cartReducer,

    // ===== SLICE AUTENTICAZIONE =====
    // Gestisce: login, logout, registrazione, controllo sessioni
    auth: authReducer,

    // ===== SLICE ORDINI =====
    // Gestisce: cronologia ordini, stato ordini, tracking
    orders: ordersReducer
  },
})