/**
 * PROFILE PAGE COMPONENT - PAGINA PROFILO UTENTE
 *
 * Pagina dedicata alla gestione del profilo utente che gestisce:
 * - Visualizzazione e modifica dati personali
 * - Cronologia ordini utente
 * - Gestione ordini per amministratori
 * - Aggiornamento informazioni di spedizione
 * - Dashboard personalizzata per ruolo utente
 *
 * PATTERN UTILIZZATI:
 * - Role-based UI: Interfaccia diversa per admin/utente
 * - Form Management: Gestione form con stato locale
 * - Conditional Rendering: UI adattiva al ruolo
 * - State Management: Redux per ordini e autenticazione
 * - Data Visualization: Tabelle e card per ordini
 * - User Experience: Editing inline e feedback immediato
 *
 * RESPONSABILITÀ:
 * - Fornire interfaccia gestione profilo completa
 * - Mostrare cronologia ordini personalizzata
 * - Permettere aggiornamento dati utente
 * - Gestire ordini (admin) con cambio stato
 * - Mantenere sicurezza e autorizzazioni
 */

/* eslint-disable react/no-unescaped-entities */
// ===== IMPORTAZIONI =====
import { useState } from 'react'                        // React hooks
import { useSelector, useDispatch } from 'react-redux' // Redux hooks
import { toast } from 'react-toastify'                 // Toast notifications
import { selectUserOrders, selectAllOrders, updateOrderStatus } from '../store/orders/ordersSlice' // Orders selectors

/**
 * PROFILE PAGE COMPONENT
 *
 * Componente principale per gestione profilo utente.
 * Implementa interfaccia role-based con funzionalità specifiche.
 */
function ProfilePage() {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  /**
   * SELEZIONE ORDINI ROLE-BASED
   *
   * Seleziona ordini basandosi sul ruolo utente:
   * - Admin: Tutti gli ordini del sistema
   * - Utente: Solo i propri ordini
   *
   * PATTERN: Role-based Data Access
   */
  const orders = useSelector((state) =>
    user.role === 'admin' ? selectAllOrders(state) : selectUserOrders(state, user.id)
  )

  // ===== STATE LOCALE =====

  /**
   * STATO FORM PROFILO
   *
   * Gestisce dati del form per aggiornamento profilo utente.
   * Include informazioni personali e di spedizione.
   */
  const [formData, setFormData] = useState({
    name: user.name || '',        // Nome completo
    email: user.email || '',      // Email (readonly)
    address: '',                  // Indirizzo spedizione
    city: '',                     // Città
    postalCode: '',              // CAP
    phone: ''                    // Telefono
  })

  /**
   * STATO MODALITÀ EDITING
   *
   * Flag per abilitare/disabilitare editing del profilo.
   * Controlla visibilità form vs visualizzazione dati.
   */
  const [isEditing, setIsEditing] = useState(false)

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CAMBIO INPUT FORM
   *
   * Gestisce aggiornamenti campi form profilo.
   *
   * @param {Event} e - Evento change dell'input
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  /**
   * HANDLER SUBMIT FORM PROFILO
   *
   * Gestisce salvataggio modifiche profilo.
   * Attualmente simula aggiornamento con toast.
   *
   * TODO: Implementare aggiornamento reale con backend
   *
   * @param {Event} e - Evento submit del form
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // ===== PLACEHOLDER IMPLEMENTAZIONE =====
    // In produzione implementare:
    // 1. Validazione dati
    // 2. Chiamata API aggiornamento
    // 3. Aggiornamento stato Redux
    // 4. Gestione errori

    toast.success('Profilo aggiornato con successo')
    setIsEditing(false)
  }

  /**
   * HANDLER CAMBIO STATO ORDINE
   *
   * Gestisce aggiornamento stato ordine (solo admin).
   * Dispatcha azione Redux e mostra feedback.
   *
   * @param {string} orderId - ID dell'ordine da aggiornare
   * @param {string} newStatus - Nuovo stato ordine
   */
  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }))
    toast.success(`Stato dell'ordine aggiornato a: ${newStatus}`)
  }

  /**
   * HELPER CLASSE BADGE STATO
   *
   * Restituisce classe CSS Bootstrap per badge stato ordine.
   * Fornisce feedback visivo immediato per stato ordine.
   *
   * @param {string} status - Stato ordine
   * @returns {string} - Classe CSS Bootstrap
   */
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark'
      case 'processing':
        return 'bg-info'
      case 'shipped':
        return 'bg-primary'
      case 'delivered':
        return 'bg-success'
      case 'cancelled':
        return 'bg-danger'
      default:
        return 'bg-secondary'
    }
  }

  return (
    <div className="container py-5">

      {/* ===== HEADER PROFILO ===== */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-2">
                <span className="me-2">👤</span>
                Profilo di {user.name}
              </h1>
              <p className="text-muted mb-0">
                {user.role === 'admin' ? '👑 Amministratore' : '🛍️ Cliente'}
              </p>
            </div>
            <div>
              <span className="badge bg-primary fs-6">
                {orders.length} ordini
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">

        {/* ===== SEZIONE DATI PERSONALI ===== */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <span className="me-2">📋</span>
                Dati Personali
              </h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Informazioni Account</h5>
                {!isEditing && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <span className="me-1">✏️</span>
                    Modifica
                  </button>
                )}
              </div>

              {/* ===== CONDITIONAL RENDERING FORM/VIEW ===== */}
              {isEditing ? (
                /* ===== FORM EDITING ===== */
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-bold">
                      <span className="me-1">👤</span>
                      Nome completo
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Inserisci il tuo nome completo"
                      required
                    />
                  </div>

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
                      placeholder="La tua email di login"
                      disabled
                      title="L'email non può essere modificata"
                    />
                    <div className="form-text">
                      L'email non può essere modificata per motivi di sicurezza
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">
                      <span className="me-1">🏠</span>
                      Indirizzo di spedizione
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Via, numero civico"
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-8">
                      <label htmlFor="city" className="form-label fw-bold">
                        <span className="me-1">🏙️</span>
                        Città
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Nome della città"
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="postalCode" className="form-label fw-bold">
                        <span className="me-1">📮</span>
                        CAP
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="00000"
                        pattern="[0-9]{5}"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label fw-bold">
                      <span className="me-1">📱</span>
                      Telefono
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  {/* Pulsanti Azione */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <span className="me-2">💾</span>
                      Salva Modifiche
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg"
                      onClick={() => setIsEditing(false)}
                    >
                      <span className="me-2">❌</span>
                      Annulla
                    </button>
                  </div>
                </form>
              ) : (
                /* ===== VIEW MODE ===== */
                <div>
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Dettagli Personali</h5>
                    <div className="row">
                      <div className="col-sm-4 text-muted">Nome:</div>
                      <div className="col-sm-8 fw-bold">{formData.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-muted">Email:</div>
                      <div className="col-sm-8">{formData.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-muted">Ruolo:</div>
                      <div className="col-sm-8">
                        <span className={`badge ${user.role === 'admin' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                          {user.role === 'admin' ? '👑 Amministratore' : '🛍️ Cliente'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="mb-3">
                    <h5 className="fw-bold mb-3">Indirizzo di Spedizione</h5>
                    {formData.address ? (
                      <div className="bg-light p-3 rounded">
                        <div className="d-flex align-items-start">
                          <span className="me-2">🏠</span>
                          <div>
                            <div className="fw-bold">{formData.address}</div>
                            <div>{formData.city}, {formData.postalCode}</div>
                            {formData.phone && <div className="text-muted">📱 {formData.phone}</div>}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-light rounded">
                        <span style={{ fontSize: '2rem' }}>📍</span>
                        <p className="text-muted mb-0 mt-2">
                          Nessun indirizzo di spedizione salvato.<br />
                          Clicca "Modifica" per aggiungerne uno.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== SEZIONE ORDINI ===== */}
        <div className="col-lg-6">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <span className="me-2">📦</span>
                {user.role === 'admin' ? 'Tutti gli Ordini' : 'I Tuoi Ordini'}
              </h3>
            </div>
            <div className="card-body">

              {/* ===== LISTA ORDINI ===== */}
              {orders.length === 0 ? (
                /* ===== EMPTY STATE ===== */
                <div className="text-center py-5">
                  <span style={{ fontSize: '4rem' }}>📋</span>
                  <h5 className="text-muted mt-3">Nessun ordine presente</h5>
                  <p className="text-muted">
                    {user.role === 'admin'
                      ? 'Non ci sono ordini nel sistema'
                      : 'Non hai ancora effettuato ordini'
                    }
                  </p>
                </div>
              ) : (
                /* ===== LISTA ORDINI ===== */
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded p-3 mb-3">

                      {/* Header Ordine */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h6 className="mb-1 fw-bold">Ordine #{order.id}</h6>
                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleDateString('it-IT')}
                          </small>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                          <div className="fw-bold text-success mt-1">
                            {order.total.toFixed(2)} €
                          </div>
                        </div>
                      </div>

                      {/* Items Ordine */}
                      <div className="mb-3">
                        <small className="text-muted fw-bold">Prodotti:</small>
                        <div className="mt-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center py-1">
                              <span className="small">{item.name} x{item.quantity}</span>
                              <span className="small text-muted">{(item.price * item.quantity).toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Admin Controls */}
                      {user.role === 'admin' && (
                        <div className="border-top pt-3">
                          <small className="text-muted fw-bold d-block mb-2">Gestione Admin:</small>
                          <div className="d-flex gap-1 flex-wrap">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                className={`btn btn-sm ${order.status === status ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleStatusChange(order.id, status)}
                                disabled={order.status === status}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default ProfilePage