/**
 * ADMIN DASHBOARD PAGE - PANNELLO AMMINISTRATIVO
 *
 * Pagina dedicata alla gestione amministrativa dell'e-commerce che gestisce:
 * - CRUD completo prodotti (Create, Read, Update, Delete)
 * - Form per aggiunta/modifica prodotti
 * - Tabella gestione inventario con azioni
 * - Validazione dati prodotti
 * - Gestione stati loading/error per operazioni
 * - Dashboard analytics e statistiche
 *
 * PATTERN UTILIZZATI:
 * - Container Component: Gestisce logica business e stato
 * - CRUD Operations: Operazioni complete su entità prodotti
 * - Form Management: Gestione form con validazione
 * - State Management: Redux per sincronizzazione dati
 * - Error Handling: Gestione errori con feedback utente
 * - Admin Authorization: Accesso limitato a utenti admin
 *
 * RESPONSABILITÀ:
 * - Fornire interfaccia completa gestione prodotti
 * - Validare e processare operazioni CRUD
 * - Mantenere sincronizzazione con backend
 * - Fornire feedback immediato per operazioni
 * - Garantire sicurezza e autorizzazione admin
 */

// ===== IMPORTAZIONI =====
import { useEffect, useState } from 'react'                    // React hooks
import { useDispatch, useSelector } from 'react-redux'        // Redux hooks
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/products/productsSlice' // Product actions
import { toast } from 'react-toastify'                        // Toast notifications

/**
 * ADMIN DASHBOARD PAGE COMPONENT
 *
 * Componente principale per gestione amministrativa prodotti.
 * Implementa interfaccia completa CRUD con validazione e feedback.
 */
function AdminDashboardPage() {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)

  // ===== STATE LOCALE =====

  /**
   * STATO FORM PRODOTTO
   *
   * Gestisce tutti i dati del form per creazione/modifica prodotti.
   * Utilizzato sia per nuovo prodotto che per editing esistente.
   */
  const [formData, setFormData] = useState({
    id: '',                    // ID prodotto (solo per editing)
    name: '',                  // Nome prodotto
    description: '',           // Descrizione dettagliata
    price: '',                 // Prezzo in euro
    category: 'collane',       // Categoria (default: collane)
    imageUrl: '',              // URL immagine prodotto
    stock: ''                  // Quantità disponibile
  })

  /**
   * STATO MODALITÀ EDITING
   *
   * Flag per distinguere tra creazione nuovo prodotto e modifica esistente.
   * Influenza comportamento form e pulsanti.
   */
  const [isEditing, setIsEditing] = useState(false)

  // ===== SIDE EFFECTS =====

  /**
   * DATA FETCHING AL MOUNT
   *
   * Carica tutti i prodotti all'inizializzazione del componente
   * per popolare la tabella di gestione.
   */
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CAMBIO INPUT FORM
   *
   * Gestisce aggiornamenti campi form con parsing automatico
   * per campi numerici (price, stock).
   *
   * @param {Event} e - Evento change dell'input
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ?
        (value === '' ? '' : parseFloat(value)) :  // Parse numerico per price/stock
        value                                       // Stringa per altri campi
    })
  }

  /**
   * FUNZIONE VALIDAZIONE FORM
   *
   * Valida tutti i campi obbligatori del form prodotto.
   * Mostra toast di errore per ogni campo non valido.
   *
   * @returns {boolean} - true se form valido, false altrimenti
   */
  const validateForm = () => {
    // ===== VALIDAZIONE NOME =====
    if (!formData.name.trim()) {
      toast.error('Il nome è obbligatorio')
      return false
    }

    // ===== VALIDAZIONE DESCRIZIONE =====
    if (!formData.description.trim()) {
      toast.error('La descrizione è obbligatoria')
      return false
    }

    // ===== VALIDAZIONE PREZZO =====
    if (!formData.price || formData.price <= 0) {
      toast.error('Il prezzo deve essere maggiore di 0')
      return false
    }

    // ===== VALIDAZIONE URL IMMAGINE =====
    if (!formData.imageUrl.trim()) {
      toast.error('L\'URL dell\'immagine è obbligatorio')
      return false
    }

    // ===== VALIDAZIONE STOCK =====
    if (!formData.stock || formData.stock < 0) {
      toast.error('La disponibilità deve essere almeno 0')
      return false
    }

    return true
  }

  /**
   * HANDLER SUBMIT FORM
   *
   * Gestisce invio form per creazione o aggiornamento prodotto.
   * Distingue tra modalità editing e creazione nuovo prodotto.
   *
   * @param {Event} e - Evento submit del form
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // ===== VALIDAZIONE FORM =====
    if (!validateForm()) return

    if (isEditing) {
      // ===== AGGIORNAMENTO PRODOTTO ESISTENTE =====
      dispatch(updateProduct({
        id: formData.id,
        productData: formData
      }))
      .unwrap()
      .then(() => {
        toast.success('Prodotto aggiornato con successo')
        resetForm()
      })
      .catch((error) => {
        toast.error(`Errore aggiornamento: ${error}`)
      })
    } else {
      // ===== CREAZIONE NUOVO PRODOTTO =====
      dispatch(createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success('Prodotto creato con successo')
        resetForm()
      })
      .catch((error) => {
        toast.error(`Errore creazione: ${error}`)
      })
    }
  }

  /**
   * HANDLER MODIFICA PRODOTTO
   *
   * Prepara il form per la modifica di un prodotto esistente.
   * Popola tutti i campi con i dati del prodotto selezionato.
   *
   * @param {Object} product - Prodotto da modificare
   */
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock
    })
    setIsEditing(true)

    // ===== SCROLL TO FORM =====
    // Porta l'utente al form per facilitare la modifica
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * HANDLER ELIMINAZIONE PRODOTTO
   *
   * Gestisce eliminazione prodotto con conferma utente.
   * Include feedback di successo/errore.
   *
   * @param {number|string} id - ID del prodotto da eliminare
   */
  const handleDelete = (id) => {
    // ===== CONFERMA ELIMINAZIONE =====
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto? Questa azione non può essere annullata.')) {
      dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast.success('Prodotto eliminato con successo')
      })
      .catch((error) => {
        toast.error(`Errore eliminazione: ${error}`)
      })
    }
  }

  /**
   * FUNZIONE RESET FORM
   *
   * Resetta il form ai valori iniziali e disabilita modalità editing.
   * Utilizzata dopo operazioni successful o per cancellare modifiche.
   */
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'collane',      // Default category
      imageUrl: '',
      stock: ''
    })
    setIsEditing(false)
  }

  return (
    <div className="container py-5">

      {/* ===== HEADER DASHBOARD ===== */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="mb-2">Dashboard Admin</h1>
          <p className="text-muted mb-0">Gestione prodotti e inventario</p>
        </div>
        <div className="d-flex gap-2">
          <span className="badge bg-primary fs-6">
            {products.length} prodotti totali
          </span>
          <span className="badge bg-success fs-6">
            {products.filter(p => p.stock > 0).length} disponibili
          </span>
        </div>
      </div>

      {/* ===== FORM GESTIONE PRODOTTI ===== */}
      {/**
       * FORM CRUD PRODOTTI
       *
       * Form unificato per creazione e modifica prodotti con:
       * - Campi validati per tutti i dati prodotto
       * - Modalità editing/creazione dinamica
       * - Layout responsive a due colonne
       * - Feedback visivo per operazioni
       */}
      <div className="card shadow mb-5">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">
            <span className="me-2">{isEditing ? '✏️' : '➕'}</span>
            {isEditing ? 'Modifica Prodotto' : 'Aggiungi Nuovo Prodotto'}
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* Prima riga: Nome e Categoria */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label fw-bold">
                  <span className="me-1">🏷️</span>
                  Nome Prodotto
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Inserisci il nome del prodotto"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="form-label fw-bold">
                  <span className="me-1">📂</span>
                  Categoria
                </label>
                <select
                  className="form-select form-select-lg"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="collane">📿 Collane</option>
                  <option value="anelli">💍 Anelli</option>
                  <option value="orecchini">👂 Orecchini</option>
                  <option value="accessori">✨ Accessori</option>
                </select>
              </div>
            </div>

            {/* Seconda riga: Descrizione */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-bold">
                <span className="me-1">📝</span>
                Descrizione
              </label>
              <textarea
                className="form-control form-control-lg"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descrivi il prodotto in dettaglio"
                required
              ></textarea>
            </div>

            {/* Terza riga: Prezzo, Stock e URL Immagine */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="price" className="form-label fw-bold">
                  <span className="me-1">💰</span>
                  Prezzo (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="form-control form-control-lg"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="stock" className="form-label fw-bold">
                  <span className="me-1">📦</span>
                  Disponibilità
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control form-control-lg"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Quantità disponibile"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="imageUrl" className="form-label fw-bold">
                  <span className="me-1">🖼️</span>
                  URL Immagine
                </label>
                <input
                  type="url"
                  className="form-control form-control-lg"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://esempio.com/immagine.jpg"
                  required
                />
              </div>
            </div>

            {/* Pulsanti Azione */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditing ? 'Aggiornamento...' : 'Creazione...'}
                  </>
                ) : (
                  <>
                    <span className="me-2">{isEditing ? '💾' : '➕'}</span>
                    {isEditing ? 'Aggiorna Prodotto' : 'Crea Prodotto'}
                  </>
                )}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={resetForm}
                >
                  <span className="me-2">❌</span>
                  Annulla
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ===== TABELLA GESTIONE PRODOTTI ===== */}
      {/**
       * TABELLA PRODOTTI AMMINISTRATIVA
       *
       * Tabella completa per gestione inventario con:
       * - Visualizzazione dati prodotto essenziali
       * - Azioni CRUD per ogni prodotto
       * - Layout responsive con scroll orizzontale
       * - Stati loading/error gestiti
       */}
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">
            <span className="me-2">📋</span>
            Gestione Prodotti ({products.length})
          </h3>
        </div>
        <div className="card-body p-0">

          {/* ===== STATI LOADING/ERROR ===== */}
          {status === 'loading' ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Caricamento prodotti...</span>
              </div>
              <p className="mt-3 text-muted">Caricamento prodotti...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3" role="alert">
              <h4 className="alert-heading">Errore caricamento prodotti</h4>
              <p className="mb-0">{error}</p>
            </div>
          ) : products.length === 0 ? (
            /* ===== EMPTY STATE ===== */
            <div className="text-center py-5">
              <span style={{ fontSize: '4rem' }}>📦</span>
              <h4 className="text-muted mt-3">Nessun prodotto presente</h4>
              <p className="text-muted">Aggiungi il primo prodotto utilizzando il form sopra</p>
            </div>
          ) : (
            /* ===== TABELLA PRODOTTI ===== */
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Immagine</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Stato</th>
                    <th scope="col">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className={product.stock === 0 ? 'table-warning' : ''}>
                      <td className="fw-bold">#{product.id}</td>
                      <td>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          width="60"
                          height="60"
                          className="rounded object-fit-cover"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td>
                        <div>
                          <div className="fw-bold">{product.name}</div>
                          <small className="text-muted">{product.description.substring(0, 50)}...</small>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-primary text-capitalize`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="fw-bold text-success">{product.price.toFixed(2)} €</td>
                      <td>
                        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {product.stock} pz
                        </span>
                      </td>
                      <td>
                        {product.stock > 0 ? (
                          <span className="badge bg-success">Disponibile</span>
                        ) : (
                          <span className="badge bg-danger">Esaurito</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => handleEdit(product)}
                            title="Modifica prodotto"
                          >
                            <span aria-hidden="true">✏️</span>
                            <span className="d-none d-md-inline ms-1">Modifica</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(product.id)}
                            title="Elimina prodotto"
                          >
                            <span aria-hidden="true">🗑️</span>
                            <span className="d-none d-md-inline ms-1">Elimina</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default AdminDashboardPage
