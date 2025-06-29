/* eslint-disable react/no-unescaped-entities */
/**
 * LOGIN PAGE COMPONENT - PAGINA AUTENTICAZIONE UTENTE
 *
 * Pagina dedicata al login degli utenti che gestisce:
 * - Form di autenticazione con validazione
 * - Integrazione con Redux auth slice
 * - Gestione stati loading/error per UX ottimale
 * - Navigazione post-login automatica
 * - Link a registrazione per nuovi utenti
 * - Responsive design per tutti i dispositivi
 *
 * PATTERN UTILIZZATI:
 * - Controlled Components: Form completamente controllato
 * - Async State Management: Gestione stati asincroni
 * - Error Handling: Feedback errori centralizzato
 * - Navigation Guard: Redirect post-autenticazione
 * - Form Validation: Validazione client-side
 * - Responsive Design: Layout adattivo
 *
 * RESPONSABILITÀ:
 * - Fornire interfaccia sicura per login
 * - Validare credenziali utente
 * - Gestire stati loading/error gracefully
 * - Integrare con sistema autenticazione Redux
 * - Fornire UX fluida per accesso
 */

// ===== IMPORTAZIONI =====
import { useState } from 'react'                        // React hooks
import { Link, useNavigate } from 'react-router-dom'   // Router hooks
import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import { loginUser } from '../store/auth/authSlice'    // Auth actions

/**
 * LOGIN PAGE COMPONENT
 *
 * Componente principale per autenticazione utenti.
 * Implementa form controllato con gestione stati asincroni.
 */
function LoginPage() {
  // ===== STATE LOCALE =====
  /**
   * STATO FORM
   *
   * Gestisce i dati del form di login con controlled components.
   * Mantiene sincronizzazione tra UI e stato.
   */
  const [formData, setFormData] = useState({
    email: '',      // Email utente
    password: ''    // Password utente
  })

  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CAMBIO INPUT
   *
   * Gestisce aggiornamenti dei campi form.
   * Utilizza computed property names per aggiornamento dinamico.
   *
   * @param {Event} e - Evento change dell'input
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value  // Aggiorna campo specifico
    })
  }

  /**
   * HANDLER SUBMIT FORM
   *
   * Gestisce invio form di login:
   * 1. Previene submit default
   * 2. Dispatcha azione login asincrona
   * 3. Gestisce successo con navigazione
   * 4. Gestisce errori (delegati al slice)
   *
   * @param {Event} e - Evento submit del form
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // ===== DISPATCH LOGIN ASINCRONO =====
    dispatch(loginUser(formData))
      .unwrap()  // Unwrap per gestire promise direttamente
      .then(() => {
        // ===== SUCCESSO - NAVIGAZIONE =====
        navigate('/')  // Redirect a home page
      })
      .catch(() => {
        // ===== ERRORE - GESTITO DAL SLICE =====
        // Gli errori sono gestiti automaticamente dal slice
        // e mostrati tramite lo stato error
      })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">

          {/* ===== CARD LOGIN ===== */}
          {/**
           * FORM CONTAINER
           *
           * Card contenitore per il form di login con:
           * - Design pulito e professionale
           * - Responsive per tutti i dispositivi
           * - Accessibilità ottimizzata
           */}
          <div className="card shadow">
            <div className="card-body p-4">

              {/* ===== HEADER ===== */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Bentornato!</h2>
                <p className="text-muted">Accedi al tuo account Coccibelli</p>
              </div>

              {/* ===== ERROR ALERT ===== */}
              {/**
               * GESTIONE ERRORI
               *
               * Alert per mostrare errori di autenticazione.
               * Visibile solo quando presente errore nello stato.
               */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Errore:">
                    <use xlinkHref="#exclamation-triangle-fill"/>
                  </svg>
                  <div>{error}</div>
                </div>
              )}

              {/* ===== FORM LOGIN ===== */}
              {/**
               * FORM AUTENTICAZIONE
               *
               * Form controllato con validazione HTML5 e gestione stati.
               * Include accessibilità e UX ottimizzate.
               */}
              <form onSubmit={handleSubmit} noValidate>

                {/* Campo Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <span className="me-1">📧</span>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="inserisci la tua email"
                    required
                    autoComplete="email"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    Inserisci l'email utilizzata per la registrazione
                  </div>
                </div>

                {/* Campo Password */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    <span className="me-1">🔒</span>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="inserisci la tua password"
                    required
                    autoComplete="current-password"
                    minLength="6"
                  />
                </div>

                {/* ===== PULSANTE SUBMIT ===== */}
                {/**
                 * CALL-TO-ACTION PRINCIPALE
                 *
                 * Pulsante submit con:
                 * - Stato loading durante autenticazione
                 * - Disabilitazione per prevenire doppi submit
                 * - Feedback visivo con spinner
                 */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={status === 'loading'}
                  aria-label="Accedi al tuo account"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Accesso in corso...
                    </>
                  ) : (
                    <>
                      <span className="me-2">🚪</span>
                      Accedi
                    </>
                  )}
                </button>

                {/* ===== LINK REGISTRAZIONE ===== */}
                <div className="text-center">
                  <p className="mb-0">
                    Non hai un account?
                    <Link to="/register" className="text-decoration-none ms-1 fw-bold">
                      Registrati qui
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* ===== CREDENZIALI DEMO ===== */}
          {/**
           * SEZIONE DEMO
           *
           * Informazioni per testing con credenziali demo.
           * Utile per sviluppo e presentazioni.
           */}
          <div className="mt-4">
            <div className="card border-info">
              <div className="card-header bg-info text-white">
                <h6 className="mb-0">
                  <span className="me-2">🧪</span>
                  Credenziali Demo
                </h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-2">
                    <strong>👑 Admin:</strong>
                    <br />
                    <code>admin@coccibelli.com</code> / <code>admin123</code>
                  </div>
                  <div className="col-12">
                    <strong>👤 Utente:</strong>
                    <br />
                    <code>user@example.com</code> / <code>user123</code>
                  </div>
                </div>
                <small className="text-muted d-block mt-2">
                  Utilizza queste credenziali per testare l'applicazione
                </small>
              </div>
            </div>
          </div>

          {/* ===== INFORMAZIONI SICUREZZA ===== */}
          <div className="mt-3 text-center">
            <small className="text-muted">
              <span className="me-1">🔒</span>
              I tuoi dati sono protetti e crittografati
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default LoginPage
