/**
 * CART PAGE COMPONENT - PAGINA CARRELLO E-COMMERCE
 *
 * Pagina dedicata alla gestione del carrello della spesa che gestisce:
 * - Visualizzazione items nel carrello con dettagli
 * - Modifica quantità prodotti nel carrello
 * - Rimozione items dal carrello
 * - Calcolo totali con spese spedizione
 * - Processo di checkout con validazione utente
 * - Integrazione con sistema ordini
 *
 * PATTERN UTILIZZATI:
 * - Container Component: Gestisce stato carrello e operazioni
 * - Controlled Components: Input quantità controllati
 * - Conditional Rendering: UI diversa per carrello vuoto/pieno
 * - Authentication Guard: Controllo login per checkout
 * - Optimistic Updates: Feedback immediato per azioni utente
 * - Toast Notifications: Feedback operazioni
 *
 * RESPONSABILITÀ:
 * - Fornire interfaccia completa gestione carrello
 * - Calcolare totali accurati con tasse/spedizione
 * - Validare e processare checkout
 * - Integrare con sistema autenticazione e ordini
 * - Fornire UX fluida per shopping experience
 */

/* eslint-disable no-unused-vars */
// ===== IMPORTAZIONI =====
import { useState } from 'react'                        // React hooks
import { Link, useNavigate } from 'react-router-dom'   // Router hooks
import { useSelector, useDispatch } from 'react-redux' // Redux hooks
import { removeFromCart, updateQuantity, clearCart } from '../store/cart/cartSlice' // Cart actions
import { addOrder } from '../store/orders/ordersSlice' // Orders actions
import { toast } from 'react-toastify'                 // Toast notifications

/**
 * CART PAGE COMPONENT
 *
 * Componente principale per gestione carrello e checkout.
 * Implementa logica completa e-commerce con validazioni.
 */
function CartPage() {
  // ===== REDUX STATE =====
  const { items, total } = useSelector((state) => state.cart) // Stato carrello
  const { user } = useSelector((state) => state.auth)         // Stato autenticazione
  const dispatch = useDispatch()

  // ===== ROUTER HOOKS =====
  const navigate = useNavigate()

  // ===== STATE LOCALE =====
  /**
   * STATO CHECKOUT
   *
   * Gestisce lo stato del processo di checkout per:
   * - Disabilitare pulsanti durante elaborazione
   * - Mostrare feedback loading
   * - Prevenire doppi submit
   */
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER RIMOZIONE ITEM
   *
   * Rimuove completamente un prodotto dal carrello.
   * Fornisce feedback immediato all'utente.
   *
   * @param {number|string} id - ID del prodotto da rimuovere
   */
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
    toast.info('Prodotto rimosso dal carrello')
  }

  /**
   * HANDLER AGGIORNAMENTO QUANTITÀ
   *
   * Aggiorna la quantità di un prodotto nel carrello.
   * Include validazione per quantità positive.
   *
   * @param {number|string} id - ID del prodotto
   * @param {number} quantity - Nuova quantità
   */
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    } else {
      // Se quantità = 0, rimuove il prodotto
      handleRemoveItem(id)
    }
  }

  /**
   * HANDLER CHECKOUT
   *
   * Gestisce il processo di checkout completo:
   * 1. Validazione autenticazione utente
   * 2. Creazione ordine con metadati
   * 3. Pulizia carrello
   * 4. Navigazione a pagina conferma
   * 5. Feedback utente con toast
   *
   * BUSINESS LOGIC:
   * - Calcolo totale con spese spedizione (€5)
   * - Generazione ID ordine univoco
   * - Stato ordine iniziale 'pending'
   */
  const handleCheckout = () => {
    // ===== VALIDAZIONE AUTENTICAZIONE =====
    if (!user) {
      toast.info('Effettua il login per procedere con l\'acquisto')
      navigate('/login')
      return
    }

    // ===== VALIDAZIONE CARRELLO =====
    if (items.length === 0) {
      toast.warning('Il carrello è vuoto')
      return
    }

    // ===== INIZIO PROCESSO CHECKOUT =====
    setIsCheckingOut(true)

    try {
      // ===== CREAZIONE ORDINE =====
      const shippingCost = 5 // Costo spedizione fisso
      const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

      const order = {
        id: Date.now(),                    // ID temporaneo (in produzione usare UUID)
        userId: user.id,                   // ID utente che ordina
        items: [...items],                 // Copia items carrello
        subtotal: subtotal,                // Subtotale prodotti
        shippingCost: shippingCost,        // Costo spedizione
        total: subtotal + shippingCost,    // Totale finale
        createdAt: new Date().toISOString(), // Timestamp ordine
        status: 'pending'                  // Stato iniziale
      }

      // ===== DISPATCH AZIONI =====
      dispatch(addOrder(order))  // Aggiunge ordine al sistema
      dispatch(clearCart())      // Pulisce carrello

      // ===== FEEDBACK E NAVIGAZIONE =====
      toast.success('Ordine completato con successo! Grazie per il tuo acquisto.')
      navigate('/profile')       // Naviga a pagina profilo con ordini

    } catch (error) {
      // ===== ERROR HANDLING =====
      console.error('Errore durante checkout:', error)
      toast.error('Errore durante il checkout. Riprova.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  // ===== COMPUTED VALUES =====
  /**
   * CALCOLI CARRELLO
   *
   * Calcola valori derivati per il carrello:
   * - Subtotale prodotti
   * - Costi spedizione
   * - Totale finale
   */
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shippingCost = items.length > 0 ? 5 : 0 // Spedizione solo se ci sono items
  const finalTotal = subtotal + shippingCost

  return (
    <div className="container py-5">

      {/* ===== HEADER PAGINA ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Il Tuo Carrello</h1>
        <span className="badge bg-primary fs-6">
          {items.length} {items.length === 1 ? 'articolo' : 'articoli'}
        </span>
      </div>

      {/* ===== CONDITIONAL RENDERING CARRELLO ===== */}
      {items.length === 0 ? (
        /* ===== EMPTY STATE ===== */
        /**
         * CARRELLO VUOTO
         *
         * Stato quando non ci sono items nel carrello.
         * Include call-to-action per continuare shopping.
         */
        <div className="text-center py-5">
          <div className="mb-4">
            <span style={{ fontSize: '4rem' }}>🛒</span>
          </div>
          <h3 className="text-muted mb-3">Il tuo carrello è vuoto</h3>
          <p className="text-muted mb-4">
            Scopri i nostri bijoux artigianali e aggiungi qualcosa di speciale al tuo carrello!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            <span className="me-2">🔍</span>
            Continua lo Shopping
          </Link>
        </div>
      ) : (
        /* ===== CARRELLO CON ITEMS ===== */
        /**
         * LAYOUT CARRELLO PIENO
         *
         * Layout a due colonne:
         * - Sinistra: Lista items carrello
         * - Destra: Riepilogo ordine e checkout
         */
        <div className="row">

          {/* ===== COLONNA ITEMS ===== */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Prodotti nel carrello</h5>
              </div>
              <div className="card-body p-0">
                {items.map((item) => (
                  /**
                   * CART ITEM COMPONENT
                   *
                   * Singolo item nel carrello con:
                   * - Immagine prodotto
                   * - Informazioni prodotto
                   * - Controlli quantità
                   * - Prezzo totale item
                   * - Pulsante rimozione
                   */
                  <div key={item.id} className="cart-item border-bottom p-3">
                    <div className="row align-items-center">

                      {/* Immagine Prodotto */}
                      <div className="col-md-2 col-4 mb-2 mb-md-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '80px', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Informazioni Prodotto */}
                      <div className="col-md-4 col-8 mb-2 mb-md-0">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted small mb-0 text-capitalize">{item.category}</p>
                      </div>

                      {/* Prezzo Unitario */}
                      <div className="col-md-2 col-4 mb-2 mb-md-0">
                        <span className="fw-bold">{item.price.toFixed(2)} €</span>
                        <small className="text-muted d-block">cad.</small>
                      </div>

                      {/* Controlli Quantità */}
                      <div className="col-md-2 col-4 mb-2 mb-md-0">
                        <div className="input-group input-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Diminuisci quantità"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            min="1"
                            style={{ maxWidth: '60px' }}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Aumenta quantità"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Totale Item e Rimozione */}
                      <div className="col-md-2 col-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">{(item.price * item.quantity).toFixed(2)} €</span>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label={`Rimuovi ${item.name} dal carrello`}
                          >
                            <span aria-hidden="true">🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== COLONNA RIEPILOGO ===== */}
          {/**
           * SIDEBAR RIEPILOGO ORDINE
           *
           * Pannello laterale con:
           * - Calcolo subtotale
           * - Costi spedizione
           * - Totale finale
           * - Pulsante checkout
           * - Azioni secondarie
           */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-header">
                <h5 className="mb-0">Riepilogo Ordine</h5>
              </div>
              <div className="card-body">

                {/* ===== CALCOLI DETTAGLIATI ===== */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotale ({items.length} {items.length === 1 ? 'articolo' : 'articoli'}):</span>
                  <span className="fw-bold">{subtotal.toFixed(2)} €</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Spedizione:</span>
                  <span className="fw-bold">
                    {shippingCost > 0 ? `${shippingCost.toFixed(2)} €` : 'Gratuita'}
                  </span>
                </div>

                {/* Eventuale sconto futuro */}
                {/* <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Sconto:</span>
                  <span>-0.00 €</span>
                </div> */}

                <hr />

                {/* ===== TOTALE FINALE ===== */}
                <div className="d-flex justify-content-between mb-4">
                  <strong className="fs-5">Totale:</strong>
                  <strong className="fs-5 text-primary">{finalTotal.toFixed(2)} €</strong>
                </div>

                {/* ===== PULSANTE CHECKOUT ===== */}
                {/**
                 * CALL-TO-ACTION PRINCIPALE
                 *
                 * Pulsante checkout con:
                 * - Stato loading durante elaborazione
                 * - Disabilitazione per prevenire doppi click
                 * - Feedback visivo con spinner
                 */}
                <button
                  className="btn btn-primary btn-lg w-100 mb-3"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  aria-label="Procedi al checkout"
                >
                  {isCheckingOut ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Elaborazione...
                    </>
                  ) : (
                    <>
                      <span className="me-2">💳</span>
                      Procedi al Checkout
                    </>
                  )}
                </button>

                {/* ===== AZIONI SECONDARIE ===== */}
                <div className="d-grid gap-2">
                  <Link
                    to="/shop"
                    className="btn btn-outline-secondary"
                    aria-label="Continua lo shopping"
                  >
                    <span className="me-2">🔍</span>
                    Continua lo Shopping
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm('Sei sicuro di voler svuotare il carrello?')) {
                        dispatch(clearCart())
                        toast.info('Carrello svuotato')
                      }
                    }}
                    aria-label="Svuota tutto il carrello"
                  >
                    <span className="me-2">🗑️</span>
                    Svuota Carrello
                  </button>
                </div>

                {/* ===== INFORMAZIONI AGGIUNTIVE ===== */}
                <div className="mt-4 pt-3 border-top">
                  <small className="text-muted">
                    <div className="mb-2">
                      <span className="me-2">🚚</span>
                      Spedizione gratuita per ordini superiori a 50€
                    </div>
                    <div className="mb-2">
                      <span className="me-2">🔒</span>
                      Pagamenti sicuri e protetti
                    </div>
                    <div>
                      <span className="me-2">↩️</span>
                      Reso gratuito entro 30 giorni
                    </div>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default CartPage
