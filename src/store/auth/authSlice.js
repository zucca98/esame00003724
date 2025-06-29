/**
 * AUTH SLICE - GESTIONE AUTENTICAZIONE CENTRALIZZATA
 *
 * Questo slice gestisce tutto il sistema di autenticazione dell'applicazione:
 * - Login e logout utenti
 * - Registrazione nuovi utenti
 * - Persistenza stato autenticazione con localStorage
 * - Gestione token e sessioni
 * - Controllo ruoli e permessi (user/admin)
 *
 * PATTERN UTILIZZATI:
 * - Async Thunks per operazioni API asincrone
 * - State persistence con localStorage
 * - Error handling centralizzato
 * - User feedback con toast notifications
 * - Security best practices (password sanitization)
 */

// ===== IMPORTAZIONI =====
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// ===== CONFIGURAZIONE API =====
/**
 * URL base per le chiamate API
 * In produzione questo dovrebbe essere configurato tramite variabili d'ambiente
 */
const API_URL = 'http://localhost:3001'

// ===== ASYNC THUNKS =====
/**
 * Gli Async Thunks gestiscono operazioni asincrone (API calls) e generano
 * automaticamente azioni pending/fulfilled/rejected per gestire gli stati di loading
 */

/**
 * LOGIN USER THUNK
 *
 * Gestisce il processo di autenticazione utente:
 * 1. Valida le credenziali contro il database
 * 2. Genera un token di sessione
 * 3. Sanitizza i dati utente (rimuove password)
 * 4. Restituisce user + token per il frontend
 *
 * @param {Object} credentials - Email e password dell'utente
 * @param {string} credentials.email - Email utente
 * @param {string} credentials.password - Password utente
 * @returns {Object} - Oggetto con user e token se successo
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser', // Prefisso per le azioni generate automaticamente
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // ===== STEP 1: CHIAMATA API PER VERIFICA EMAIL =====
      const response = await fetch(`${API_URL}/users?email=${email}`)

      // Controllo status HTTP della risposta
      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      // ===== STEP 2: PARSING E VALIDAZIONE CREDENZIALI =====
      const users = await response.json()
      // Trova utente con email e password corrispondenti
      // NOTA: In produzione la password dovrebbe essere hashata
      const user = users.find(u => u.email === email && u.password === password)

      if (!user) {
        throw new Error('Email o password non validi')
      }

      // ===== STEP 3: SANITIZZAZIONE DATI UTENTE =====
      // Rimuove la password dall'oggetto utente per sicurezza
      const authenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
        // IMPORTANTE: password esclusa per sicurezza
      }

      // ===== STEP 4: GENERAZIONE TOKEN =====
      // In produzione questo sarebbe un JWT reale generato dal backend
      return {
        user: authenticatedUser,
        token: `fake-jwt-token-${Math.random().toString(36).substring(2)}`
      }
    } catch (error) {
      // ===== GESTIONE ERRORI =====
      // rejectWithValue permette di passare un payload personalizzato all'azione rejected
      return rejectWithValue(error.message)
    }
  }
)

/**
 * REGISTER USER THUNK
 *
 * Gestisce la registrazione di nuovi utenti:
 * 1. Verifica che l'email non sia già in uso
 * 2. Aggiunge ruolo di default 'user'
 * 3. Crea il nuovo utente nel database
 * 4. Restituisce user + token per login automatico
 *
 * @param {Object} userData - Dati del nuovo utente
 * @param {string} userData.email - Email utente
 * @param {string} userData.password - Password utente
 * @param {string} userData.name - Nome utente
 * @returns {Object} - Oggetto con user e token se successo
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // ===== STEP 1: CONTROLLO EMAIL ESISTENTE =====
      const checkResponse = await fetch(`${API_URL}/users?email=${userData.email}`)
      const existingUsers = await checkResponse.json()

      // Verifica unicità email
      if (existingUsers.length > 0) {
        throw new Error('Questa email è già registrata')
      }

      // ===== STEP 2: PREPARAZIONE DATI UTENTE =====
      // Aggiunge ruolo di default e metadati di sistema
      const newUser = {
        ...userData,
        role: 'user', // Ruolo di default per nuovi utenti
        createdAt: new Date().toISOString(), // Timestamp creazione
        // In produzione: hash della password, validazione email, etc.
      }

      // ===== STEP 3: CREAZIONE UTENTE =====
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Header necessario per JSON
        },
        body: JSON.stringify(newUser), // Serializzazione dati
      })

      if (!response.ok) {
        throw new Error('Registrazione fallita')
      }

      const user = await response.json()

      // ===== STEP 4: SANITIZZAZIONE E RISPOSTA =====
      // Rimuove password dall'oggetto di risposta
      const registeredUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
        // IMPORTANTE: password esclusa per sicurezza
      }

      // Restituisce user + token per login automatico post-registrazione
      return {
        user: registeredUser,
        token: `fake-jwt-token-${Math.random().toString(36).substring(2)}`
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ===== STATO INIZIALE =====
/**
 * INITIAL STATE DELL'AUTENTICAZIONE
 *
 * Definisce la struttura dello stato auth e implementa la persistenza
 * con localStorage per mantenere la sessione tra refresh della pagina.
 *
 * PATTERN IMPLEMENTATO:
 * - State Hydration: Caricamento dati da localStorage all'inizializzazione
 * - Finite State Machine: Status per gestire stati asincroni
 * - Error Handling: Campo error per gestione errori centralizzata
 */
const initialState = {
  // ===== DATI UTENTE =====
  user: null, // Oggetto utente autenticato o null se non loggato

  // ===== TOKEN DI SESSIONE =====
  // Carica token da localStorage se presente (persistenza sessione)
  token: localStorage.getItem('token') || null,

  // ===== STATO OPERAZIONI ASINCRONE =====
  // Finite State Machine per gestire stati di loading
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'

  // ===== GESTIONE ERRORI =====
  error: null, // Messaggio di errore per operazioni fallite
}

// ===== SLICE DEFINITION =====
/**
 * AUTH SLICE - Definizione slice con Redux Toolkit
 *
 * createSlice() combina actions, action creators e reducers in un'unica definizione.
 * Utilizza Immer sotto il cofano per permettere mutazioni "sicure" dello stato.
 */
const authSlice = createSlice({
  name: 'auth', // Nome del slice (prefisso per action types)
  initialState,

  // ===== REDUCERS SINCRONI =====
  // Gestiscono azioni sincrone che modificano direttamente lo stato
  reducers: {
    /**
     * CHECK AUTH REDUCER
     *
     * Ripristina lo stato di autenticazione da localStorage.
     * Chiamato all'inizializzazione dell'app per mantenere la sessione.
     *
     * PATTERN: State Hydration
     */
    checkAuth: (state) => {
      // Legge token e dati utente da localStorage
      const token = localStorage.getItem('token')
      const userString = localStorage.getItem('user')

      try {
        const user = userString ? JSON.parse(userString) : null

        // Ripristina stato solo se entrambi i dati sono presenti
        if (token && user) {
          state.token = token
          state.user = user
          // Non mostra toast per evitare spam all'avvio
        }
      } catch (error) {
        // Se parsing fallisce, pulisce localStorage corrotto
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        console.error('Errore parsing dati utente da localStorage:', error)
      }
    },

    /**
     * LOGOUT USER REDUCER
     *
     * Esegue logout completo dell'utente:
     * - Reset completo dello stato auth
     * - Pulizia localStorage
     * - Feedback utente con toast
     *
     * PATTERN: Complete State Reset
     */
    logoutUser: (state) => {
      // ===== RESET STATO REDUX =====
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null

      // ===== PULIZIA PERSISTENZA =====
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // ===== FEEDBACK UTENTE =====
      toast.info('Logout effettuato con successo')
    }
  },
  // ===== EXTRA REDUCERS =====
  /**
   * Gli extraReducers gestiscono azioni generate da async thunks.
   * Ogni thunk genera automaticamente 3 azioni: pending, fulfilled, rejected
   *
   * PATTERN: Async State Management
   */
  extraReducers: (builder) => {
    builder
      // ===== GESTIONE LOGIN USER =====

      /**
       * LOGIN PENDING
       * Stato di caricamento durante la chiamata API
       */
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading' // Abilita spinner/loading UI
        state.error = null       // Reset errori precedenti
      })

      /**
       * LOGIN FULFILLED
       * Login completato con successo
       */
      .addCase(loginUser.fulfilled, (state, action) => {
        // ===== AGGIORNAMENTO STATO REDUX =====
        state.status = 'succeeded'
        state.user = action.payload.user     // Dati utente dal thunk
        state.token = action.payload.token   // Token di sessione

        // ===== PERSISTENZA DATI =====
        // Salva in localStorage per mantenere sessione
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))

        // ===== FEEDBACK UTENTE =====
        toast.success('Login effettuato con successo')
      })

      /**
       * LOGIN REJECTED
       * Login fallito (credenziali errate, errore rete, etc.)
       */
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload // Messaggio errore dal thunk

        // ===== FEEDBACK ERRORE =====
        toast.error(action.payload || 'Errore durante il login')
      })

      // ===== GESTIONE REGISTER USER =====

      /**
       * REGISTER PENDING
       * Stato di caricamento durante registrazione
       */
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })

      /**
       * REGISTER FULFILLED
       * Registrazione completata con successo
       * Comportamento identico al login (auto-login post registrazione)
       */
      .addCase(registerUser.fulfilled, (state, action) => {
        // ===== AGGIORNAMENTO STATO =====
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token

        // ===== PERSISTENZA =====
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))

        // ===== FEEDBACK =====
        toast.success('Registrazione effettuata con successo! Benvenuto!')
      })

      /**
       * REGISTER REJECTED
       * Registrazione fallita (email già esistente, errore validazione, etc.)
       */
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload

        // ===== FEEDBACK ERRORE =====
        toast.error(action.payload || 'Errore durante la registrazione')
      })
  },
})

// ===== EXPORT ACTIONS E REDUCER =====

/**
 * EXPORT DELLE AZIONI
 *
 * Redux Toolkit genera automaticamente action creators per ogni reducer.
 * Queste azioni possono essere importate e utilizzate nei componenti.
 */
export const { checkAuth, logoutUser } = authSlice.actions

/**
 * EXPORT DEL REDUCER
 *
 * Il reducer viene esportato come default per essere utilizzato
 * nella configurazione dello store Redux.
 */
export default authSlice.reducer
