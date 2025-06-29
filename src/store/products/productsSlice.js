/**
 * PRODUCTS SLICE - GESTIONE CATALOGO PRODOTTI
 *
 * Questo slice gestisce tutto il sistema del catalogo prodotti:
 * - Operazioni CRUD complete (Create, Read, Update, Delete)
 * - Fetch lista prodotti e singolo prodotto
 * - Gestione cache e stato loading
 * - Error handling centralizzato
 * - Integrazione con dashboard admin
 *
 * PATTERN UTILIZZATI:
 * - Async Thunks per operazioni API asincrone
 * - Normalized State per performance ottimali
 * - Error Handling centralizzato
 * - Loading States per UX fluida
 * - CRUD Operations per gestione completa dati
 *
 * RESPONSABILITÀ:
 * - Fornire dati prodotti a tutta l'applicazione
 * - Gestire operazioni admin (create, update, delete)
 * - Mantenere cache prodotti per performance
 * - Sincronizzare stato locale con backend
 */

// ===== IMPORTAZIONI =====
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ===== CONFIGURAZIONE API =====
/**
 * URL base per le chiamate API prodotti
 * In produzione dovrebbe essere configurato tramite variabili d'ambiente
 */
const API_URL = 'http://localhost:3001'

// ===== ASYNC THUNKS =====
/**
 * Gli Async Thunks gestiscono operazioni asincrone e generano automaticamente
 * azioni pending/fulfilled/rejected per ogni operazione
 */

/**
 * FETCH ALL PRODUCTS THUNK
 *
 * Recupera tutti i prodotti dal backend per:
 * - Popolare il catalogo nella ShopPage
 * - Mostrare prodotti featured nella HomePage
 * - Fornire dati per filtri e ricerche
 * - Cache centralizzata per performance
 *
 * @returns {Array} - Array di tutti i prodotti
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Action type prefix
  async (_, { rejectWithValue }) => {
    try {
      // ===== CHIAMATA API =====
      const response = await fetch(`${API_URL}/products`)

      // ===== CONTROLLO RISPOSTA =====
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
      }

      // ===== PARSING E RITORNO DATI =====
      const products = await response.json()

      // Validazione base dei dati ricevuti
      if (!Array.isArray(products)) {
        throw new Error('Invalid data format: expected array of products')
      }

      return products
    } catch (error) {
      // ===== ERROR HANDLING =====
      console.error('Fetch products error:', error)
      return rejectWithValue(error.message)
    }
  }
)

/**
 * FETCH PRODUCT BY ID THUNK
 *
 * Recupera un singolo prodotto per ID per:
 * - Mostrare dettagli nella ProductDetailPage
 * - Editing nel dashboard admin
 * - Validazione esistenza prodotto
 * - Cache singolo prodotto
 *
 * @param {number|string} id - ID del prodotto da recuperare
 * @returns {Object} - Oggetto prodotto completo
 */
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      // ===== VALIDAZIONE INPUT =====
      if (!id) {
        throw new Error('Product ID is required')
      }

      // ===== CHIAMATA API =====
      const response = await fetch(`${API_URL}/products/${id}`)

      // ===== CONTROLLO RISPOSTA =====
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Prodotto non trovato')
        }
        throw new Error(`Errore nel caricamento del prodotto: ${response.status}`)
      }

      // ===== PARSING E VALIDAZIONE =====
      const product = await response.json()

      // Validazione struttura prodotto
      if (!product.id || !product.name) {
        throw new Error('Invalid product data received')
      }

      return product
    } catch (error) {
      console.error('Fetch product by ID error:', error)
      return rejectWithValue(error.message)
    }
  }
)

/**
 * CREATE PRODUCT THUNK
 *
 * Crea un nuovo prodotto nel sistema per:
 * - Aggiunta prodotti da dashboard admin
 * - Espansione catalogo
 * - Gestione inventario
 * - Sincronizzazione con backend
 *
 * @param {Object} productData - Dati del nuovo prodotto
 * @param {string} productData.name - Nome del prodotto
 * @param {string} productData.description - Descrizione
 * @param {number} productData.price - Prezzo
 * @param {string} productData.category - Categoria
 * @param {string} productData.imageUrl - URL immagine
 * @param {number} productData.stock - Quantità disponibile
 * @returns {Object} - Prodotto creato con ID assegnato
 */
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // ===== VALIDAZIONE DATI INPUT =====
      const requiredFields = ['name', 'price', 'category']
      const missingFields = requiredFields.filter(field => !productData[field])

      if (missingFields.length > 0) {
        throw new Error(`Campi obbligatori mancanti: ${missingFields.join(', ')}`)
      }

      // ===== PREPARAZIONE DATI =====
      const productToCreate = {
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Valori di default se non specificati
        stock: productData.stock || 1,
        imageUrl: productData.imageUrl || 'https://placehold.co/400x300?text=Prodotto'
      }

      // ===== CHIAMATA API =====
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToCreate),
      })

      // ===== CONTROLLO RISPOSTA =====
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`Errore creazione prodotto: ${response.status} - ${errorData}`)
      }

      // ===== PARSING E RITORNO =====
      const newProduct = await response.json()
      return newProduct
    } catch (error) {
      console.error('Create product error:', error)
      return rejectWithValue(error.message)
    }
  }
)

/**
 * UPDATE PRODUCT THUNK
 *
 * Aggiorna un prodotto esistente per:
 * - Modifica dati da dashboard admin
 * - Correzione informazioni prodotto
 * - Aggiornamento prezzi e stock
 * - Sincronizzazione con backend
 *
 * @param {Object} params - Parametri per l'aggiornamento
 * @param {number|string} params.id - ID del prodotto da aggiornare
 * @param {Object} params.productData - Dati da aggiornare
 * @returns {Object} - Prodotto aggiornato
 */
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      // ===== VALIDAZIONE INPUT =====
      if (!id) {
        throw new Error('Product ID is required for update')
      }

      if (!productData || Object.keys(productData).length === 0) {
        throw new Error('Product data is required for update')
      }

      // ===== PREPARAZIONE DATI =====
      const dataToUpdate = {
        ...productData,
        updatedAt: new Date().toISOString() // Timestamp aggiornamento
      }

      // ===== CHIAMATA API =====
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH', // PATCH per aggiornamenti parziali
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      })

      // ===== CONTROLLO RISPOSTA =====
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Prodotto non trovato')
        }
        throw new Error(`Errore aggiornamento prodotto: ${response.status}`)
      }

      // ===== PARSING E RITORNO =====
      const updatedProduct = await response.json()
      return updatedProduct
    } catch (error) {
      console.error('Update product error:', error)
      return rejectWithValue(error.message)
    }
  }
)

/**
 * DELETE PRODUCT THUNK
 *
 * Elimina un prodotto dal sistema per:
 * - Rimozione prodotti obsoleti
 * - Gestione inventario da dashboard admin
 * - Pulizia catalogo
 * - Sincronizzazione con backend
 *
 * @param {number|string} id - ID del prodotto da eliminare
 * @returns {number|string} - ID del prodotto eliminato
 */
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      // ===== VALIDAZIONE INPUT =====
      if (!id) {
        throw new Error('Product ID is required for deletion')
      }

      // ===== CHIAMATA API =====
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      })

      // ===== CONTROLLO RISPOSTA =====
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Prodotto non trovato')
        }
        throw new Error(`Errore eliminazione prodotto: ${response.status}`)
      }

      // ===== RITORNO ID PER RIMOZIONE DALLO STATO =====
      // Ritorniamo l'ID per permettere al reducer di rimuovere
      // il prodotto dall'array nello stato locale
      return id
    } catch (error) {
      console.error('Delete product error:', error)
      return rejectWithValue(error.message)
    }
  }
)

// ===== STATO INIZIALE =====
/**
 * INITIAL STATE DEL CATALOGO PRODOTTI
 *
 * Definisce la struttura dello stato products per gestire:
 * - Lista completa prodotti (cache)
 * - Prodotto correntemente visualizzato
 * - Stati asincroni per UX fluida
 * - Gestione errori centralizzata
 *
 * PATTERN: Normalized State Structure per performance
 */
const initialState = {
  // ===== DATI PRODOTTI =====
  products: [],           // Array di tutti i prodotti caricati
  currentProduct: null,   // Prodotto attualmente visualizzato (dettaglio)

  // ===== STATO OPERAZIONI ASINCRONE =====
  // Finite State Machine per gestire stati di loading
  status: 'idle',         // 'idle' | 'loading' | 'succeeded' | 'failed'

  // ===== GESTIONE ERRORI =====
  error: null,            // Messaggio di errore per operazioni fallite
}

// ===== SLICE DEFINITION =====
/**
 * PRODUCTS SLICE - Definizione slice prodotti
 *
 * Gestisce tutte le operazioni del catalogo prodotti con Redux Toolkit.
 * Combina reducers sincroni e async thunks per gestione completa.
 */
const productsSlice = createSlice({
  name: 'products', // Nome slice (prefisso action types)
  initialState,

  // ===== REDUCERS SINCRONI =====
  // Gestiscono azioni sincrone che modificano direttamente lo stato
  reducers: {
    /**
     * CLEAR CURRENT PRODUCT REDUCER
     *
     * Pulisce il prodotto correntemente visualizzato.
     * Utilizzato quando si esce dalla pagina dettaglio prodotto
     * per evitare di mostrare dati obsoleti.
     */
    clearCurrentProduct: (state) => {
      state.currentProduct = null
      // Reset anche eventuali errori specifici del prodotto
      if (state.error && state.error.includes('Prodotto non trovato')) {
        state.error = null
      }
    },
  },
  // ===== EXTRA REDUCERS =====
  /**
   * Gli extraReducers gestiscono azioni generate da async thunks.
   * Ogni thunk genera automaticamente 3 azioni: pending, fulfilled, rejected
   *
   * PATTERN: Async State Management con loading states
   */
  extraReducers: (builder) => {
    builder
      // ===== GESTIONE FETCH ALL PRODUCTS =====

      /**
       * FETCH PRODUCTS PENDING
       * Stato di caricamento durante il fetch della lista prodotti
       */
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null // Reset errori precedenti
      })

      /**
       * FETCH PRODUCTS FULFILLED
       * Lista prodotti caricata con successo
       */
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload // Sostituisce array prodotti
        state.error = null
      })

      /**
       * FETCH PRODUCTS REJECTED
       * Errore nel caricamento lista prodotti
       */
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        // Mantiene prodotti esistenti in caso di errore refresh
      })

      // ===== GESTIONE FETCH SINGLE PRODUCT =====

      /**
       * FETCH PRODUCT BY ID PENDING
       * Stato di caricamento durante il fetch singolo prodotto
       */
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
        state.error = null
        // Non pulisce currentProduct per evitare flash di contenuto
      })

      /**
       * FETCH PRODUCT BY ID FULFILLED
       * Singolo prodotto caricato con successo
       */
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentProduct = action.payload
        state.error = null

        // ===== SINCRONIZZAZIONE CACHE =====
        // Aggiorna anche l'array products se il prodotto è già presente
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })

      /**
       * FETCH PRODUCT BY ID REJECTED
       * Errore nel caricamento singolo prodotto
       */
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        state.currentProduct = null // Pulisce prodotto non trovato
      })

      // ===== GESTIONE CREATE PRODUCT =====

      /**
       * CREATE PRODUCT FULFILLED
       * Nuovo prodotto creato con successo
       *
       * PATTERN: Optimistic Update - aggiunge immediatamente alla lista
       */
      .addCase(createProduct.fulfilled, (state, action) => {
        // ===== AGGIUNTA ALLA LISTA =====
        state.products.push(action.payload)

        // ===== ORDINAMENTO OPZIONALE =====
        // Mantiene lista ordinata per nome (opzionale)
        state.products.sort((a, b) => a.name.localeCompare(b.name))

        // ===== RESET STATO =====
        state.status = 'succeeded'
        state.error = null
      })

      // ===== GESTIONE UPDATE PRODUCT =====

      /**
       * UPDATE PRODUCT FULFILLED
       * Prodotto aggiornato con successo
       *
       * PATTERN: Sync Update - aggiorna sia lista che currentProduct
       */
      .addCase(updateProduct.fulfilled, (state, action) => {
        // ===== AGGIORNAMENTO NELLA LISTA =====
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        )
        if (index !== -1) {
          state.products[index] = action.payload
        }

        // ===== AGGIORNAMENTO CURRENT PRODUCT =====
        // Se il prodotto aggiornato è quello attualmente visualizzato
        if (state.currentProduct?.id === action.payload.id) {
          state.currentProduct = action.payload
        }

        // ===== RESET STATO =====
        state.status = 'succeeded'
        state.error = null
      })

      // ===== GESTIONE DELETE PRODUCT =====

      /**
       * DELETE PRODUCT FULFILLED
       * Prodotto eliminato con successo
       *
       * PATTERN: Cascade Delete - rimuove da lista e currentProduct
       */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // ===== RIMOZIONE DALLA LISTA =====
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        )

        // ===== PULIZIA CURRENT PRODUCT =====
        // Se il prodotto eliminato era quello visualizzato
        if (state.currentProduct?.id === action.payload) {
          state.currentProduct = null
        }

        // ===== RESET STATO =====
        state.status = 'succeeded'
        state.error = null
      })
  },
})

// ===== EXPORT ACTIONS E REDUCER =====

/**
 * EXPORT DELLE AZIONI
 *
 * Redux Toolkit genera automaticamente action creators per ogni reducer.
 */
export const { clearCurrentProduct } = productsSlice.actions

/**
 * EXPORT DEL REDUCER
 *
 * Il reducer viene utilizzato nella configurazione dello store.
 */
export default productsSlice.reducer
