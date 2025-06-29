/* eslint-disable react/no-unescaped-entities */
/**
 * REGISTER PAGE COMPONENT - PAGINA REGISTRAZIONE UTENTE
 *
 * Pagina dedicata alla registrazione di nuovi utenti che gestisce:
 * - Form di registrazione con validazione completa
 * - Validazione client-side real-time
 * - Conferma password con controllo match
 * - Integrazione con Redux auth slice
 * - Gestione stati loading/error per UX ottimale
 * - Navigazione post-registrazione automatica
 *
 * PATTERN UTILIZZATI:
 * - Controlled Components: Form completamente controllato
 * - Real-time Validation: Validazione durante digitazione
 * - Error State Management: Gestione errori granulare
 * - Async State Management: Gestione stati asincroni
 * - Form Security: Validazione robusta lato client
 * - Responsive Design: Layout adattivo
 *
 * RESPONSABILITÀ:
 * - Fornire interfaccia sicura per registrazione
 * - Validare dati utente in tempo reale
 * - Gestire conferma password
 * - Integrare con sistema autenticazione Redux
 * - Fornire feedback immediato per errori
 */

// ===== IMPORTAZIONI =====
import { useState } from 'react'                        // React hooks
import { Link, useNavigate } from 'react-router-dom'   // Router hooks
import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import { registerUser } from '../store/auth/authSlice' // Auth actions

/**
 * REGISTER PAGE COMPONENT
 *
 * Componente principale per registrazione nuovi utenti.
 * Implementa form controllato con validazione real-time.
 */
function RegisterPage() {
  // ===== STATE LOCALE =====

  /**
   * STATO FORM
   *
   * Gestisce tutti i dati del form di registrazione.
   * Utilizza controlled components per sincronizzazione UI-stato.
   */
  const [formData, setFormData] = useState({
    name: '',            // Nome completo utente
    email: '',           // Email per login
    password: '',        // Password scelta
    confirmPassword: ''  // Conferma password
  })

  /**
   * STATO ERRORI FORM
   *
   * Gestisce errori di validazione per ogni campo.
   * Permette feedback granulare e real-time.
   */
  const [formErrors, setFormErrors] = useState({})

  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CAMBIO INPUT
   *
   * Gestisce aggiornamenti dei campi form con:
   * - Aggiornamento stato form
   * - Pulizia errori per campo modificato
   * - Validazione real-time (opzionale)
   *
   * @param {Event} e - Evento change dell'input
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    // ===== AGGIORNAMENTO STATO FORM =====
    setFormData({
      ...formData,
      [name]: value
    })

    // ===== PULIZIA ERRORI =====
    // Rimuove errore per il campo che sta cambiando
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    }
  }

  /**
   * FUNZIONE VALIDAZIONE FORM
   *
   * Valida tutti i campi del form e restituisce oggetto errori.
   * Implementa regole di business per registrazione sicura.
   *
   * @returns {Object} - Oggetto con errori per ogni campo
   */
  const validateForm = () => {
    const errors = {}

    // ===== VALIDAZIONE NOME =====
    if (!formData.name.trim()) {
      errors.name = 'Il nome è obbligatorio'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Il nome deve essere di almeno 2 caratteri'
    }

    // ===== VALIDAZIONE EMAIL =====
    if (!formData.email.trim()) {
      errors.email = 'L\'email è obbligatoria'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Formato email non valido'
    }

    // ===== VALIDAZIONE PASSWORD =====
    if (!formData.password) {
      errors.password = 'La password è obbligatoria'
    } else if (formData.password.length < 6) {
      errors.password = 'La password deve essere di almeno 6 caratteri'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'La password deve contenere almeno una lettera minuscola, una maiuscola e un numero'
    }

    // ===== VALIDAZIONE CONFERMA PASSWORD =====
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'La conferma password è obbligatoria'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Le password non corrispondono'
    }

    // ===== AGGIORNAMENTO STATO ERRORI =====
    setFormErrors(errors)

    // ===== RITORNO VALIDITÀ =====
    return Object.keys(errors).length === 0
  }

  /**
   * HANDLER SUBMIT FORM
   *
   * Gestisce invio form di registrazione:
   * 1. Previene submit default
   * 2. Valida form completo
   * 3. Prepara dati utente (esclude confirmPassword)
   * 4. Dispatcha azione registrazione asincrona
   * 5. Gestisce successo con navigazione
   * 6. Gestisce errori (delegati al slice)
   *
   * @param {Event} e - Evento submit del form
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // ===== VALIDAZIONE FORM =====
    if (!validateForm()) {
      return // Interrompe se validazione fallisce
    }

    // ===== PREPARAZIONE DATI =====
    // Esclude confirmPassword dai dati inviati
    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password
    }

    // ===== DISPATCH REGISTRAZIONE ASINCRONA =====
    dispatch(registerUser(userData))
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
        <div className="col-md-6 col-lg-5">

          {/* ===== CARD REGISTRAZIONE ===== */}
          {/**
           * FORM CONTAINER
           *
           * Card contenitore per il form di registrazione con:
           * - Design coerente con LoginPage
           * - Responsive per tutti i dispositivi
           * - Accessibilità ottimizzata
           */}
          <div className="card shadow">
            <div className="card-body p-4">

              {/* ===== HEADER ===== */}
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Unisciti a Coccibelli!</h2>
                <p className="text-muted">Crea il tuo account per iniziare</p>
              </div>

              {/* ===== ERROR ALERT ===== */}
              {/**
               * GESTIONE ERRORI GLOBALI
               *
               * Alert per errori di registrazione dal server.
               * Complementa gli errori di validazione client-side.
               */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Errore:">
                    <use xlinkHref="#exclamation-triangle-fill"/>
                  </svg>
                  <div>{error}</div>
                </div>
              )}

              {/* ===== FORM REGISTRAZIONE ===== */}
              {/**
               * FORM CONTROLLATO CON VALIDAZIONE
               *
               * Form con validazione real-time e feedback immediato.
               * Include tutti i campi necessari per registrazione completa.
               */}
              <form onSubmit={handleSubmit} noValidate>

                {/* ===== CAMPO NOME ===== */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    <span className="me-1">👤</span>
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${formErrors.name ? 'is-invalid' : formData.name ? 'is-valid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Inserisci il tuo nome completo"
                    required
                    autoComplete="name"
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>

                {/* ===== CAMPO EMAIL ===== */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    <span className="me-1">📧</span>
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="inserisci la tua email"
                    required
                    autoComplete="email"
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                  <div className="form-text">
                    Utilizzeremo questa email per il tuo login
                  </div>
                </div>

                {/* ===== CAMPO PASSWORD ===== */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    <span className="me-1">🔒</span>
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-lg ${formErrors.password ? 'is-invalid' : formData.password && formData.password.length >= 6 ? 'is-valid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Crea una password sicura"
                    required
                    autoComplete="new-password"
                    minLength="6"
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">{formErrors.password}</div>
                  )}
                  <div className="form-text">
                    Minimo 6 caratteri con lettere maiuscole, minuscole e numeri
                  </div>
                </div>

                {/* ===== CAMPO CONFERMA PASSWORD ===== */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label fw-bold">
                    <span className="me-1">🔐</span>
                    Conferma Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-lg ${formErrors.confirmPassword ? 'is-invalid' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'is-valid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ripeti la password"
                    required
                    autoComplete="new-password"
                  />
                  {formErrors.confirmPassword && (
                    <div className="invalid-feedback">{formErrors.confirmPassword}</div>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="valid-feedback">Le password corrispondono!</div>
                  )}
                </div>

                {/* ===== PULSANTE SUBMIT ===== */}
                {/**
                 * CALL-TO-ACTION PRINCIPALE
                 *
                 * Pulsante submit con:
                 * - Stato loading durante registrazione
                 * - Disabilitazione per prevenire doppi submit
                 * - Feedback visivo con spinner
                 */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={status === 'loading'}
                  aria-label="Registra il tuo account"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registrazione in corso...
                    </>
                  ) : (
                    <>
                      <span className="me-2">✨</span>
                      Crea Account
                    </>
                  )}
                </button>

                {/* ===== LINK LOGIN ===== */}
                <div className="text-center">
                  <p className="mb-0">
                    Hai già un account?
                    <Link to="/login" className="text-decoration-none ms-1 fw-bold">
                      Accedi qui
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* ===== INFORMAZIONI PRIVACY ===== */}
          <div className="mt-4">
            <div className="card border-success">
              <div className="card-body text-center">
                <small className="text-muted">
                  <span className="me-1">🔒</span>
                  Registrandoti accetti i nostri{' '}
                  <Link to="/terms" className="text-decoration-none">Termini di Servizio</Link>
                  {' '}e la{' '}
                  <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                </small>
              </div>
            </div>
          </div>

          {/* ===== VANTAGGI REGISTRAZIONE ===== */}
          <div className="mt-3">
            <div className="card border-info">
              <div className="card-header bg-info text-white text-center">
                <h6 className="mb-0">
                  <span className="me-2">🎁</span>
                  Vantaggi dell'account
                </h6>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-4">
                    <span className="d-block fs-4 mb-1">🛒</span>
                    <small>Carrello salvato</small>
                  </div>
                  <div className="col-4">
                    <span className="d-block fs-4 mb-1">📦</span>
                    <small>Tracking ordini</small>
                  </div>
                  <div className="col-4">
                    <span className="d-block fs-4 mb-1">⭐</span>
                    <small>Offerte esclusive</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default RegisterPage
