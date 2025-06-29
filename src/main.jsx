/**
 * MAIN.JSX - PUNTO DI INGRESSO DELL'APPLICAZIONE COCCIBELLI
 *
 * Questo file è il bootstrap principale dell'applicazione React.
 * Configura tutti i provider necessari e inizializza l'app.
 *
 * ARCHITETTURA:
 * - React 18 con createRoot API per Concurrent Features
 * - Redux Toolkit per state management centralizzato
 * - React Router per navigazione SPA
 * - React Toastify per notifiche user-friendly
 * - Bootstrap per styling responsive
 */

// ===== IMPORTAZIONI REACT CORE =====
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ===== PROVIDERS E ROUTING =====
import { BrowserRouter } from 'react-router-dom'  // Router per Single Page Application
import { Provider } from 'react-redux'            // Provider Redux per stato globale
import { ToastContainer } from 'react-toastify'   // Container per notifiche toast

// ===== COMPONENTI APPLICAZIONE =====
import App from './App.jsx'                       // Componente root dell'applicazione
import { store } from './store/store.js'          // Store Redux configurato

// ===== IMPORTAZIONI CSS =====
import 'bootstrap/dist/css/bootstrap.min.css'     // Framework CSS Bootstrap
import 'react-toastify/dist/ReactToastify.css'    // Stili per notifiche toast
import './index.css'                              // Stili custom dell'applicazione

/**
 * BOOTSTRAP DELL'APPLICAZIONE
 *
 * Gerarchia dei Provider (dall'esterno verso l'interno):
 * 1. StrictMode: Abilita controlli aggiuntivi in sviluppo
 * 2. Redux Provider: Rende lo store disponibile a tutti i componenti
 * 3. BrowserRouter: Abilita il routing client-side
 * 4. App: Componente principale dell'applicazione
 * 5. ToastContainer: Sistema di notifiche globale
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      REDUX PROVIDER
      Rende lo store Redux disponibile a tutti i componenti figli
      tramite il Context API di React
    */}
    <Provider store={store}>
      {/*
        BROWSER ROUTER
        Abilita il routing client-side per Single Page Application.
        Gestisce la sincronizzazione tra URL del browser e componenti React
      */}
      <BrowserRouter>
        {/* COMPONENTE PRINCIPALE DELL'APPLICAZIONE */}
        <App />

        {/*
          TOAST CONTAINER
          Sistema di notifiche globale posizionato in basso a destra.
          Mostra feedback immediato per azioni utente (successo, errori, info)
        */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)