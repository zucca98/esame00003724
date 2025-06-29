/**
 * PRODUCT DETAIL PAGE - PAGINA DETTAGLIO PRODOTTO
 *
 * Pagina dedicata alla visualizzazione dettagliata di un singolo prodotto che gestisce:
 * - Caricamento dati prodotto tramite ID da URL
 * - Visualizzazione completa informazioni prodotto
 * - Selezione quantità con controlli validazione
 * - Aggiunta al carrello con quantità personalizzata
 * - Gestione stati loading/error per UX ottimale
 * - Cleanup automatico al dismount
 *
 * PATTERN UTILIZZATI:
 * - Container Component: Gestisce data fetching e stato
 * - URL Parameters: ID prodotto da route params
 * - Controlled Components: Input quantità controllato
 * - Cleanup Pattern: Pulizia stato al dismount
 * - Error Boundaries: Gestione errori graceful
 * - Responsive Design: Layout adattivo per tutti i dispositivi
 *
 * RESPONSABILITÀ:
 * - Caricare e mostrare dettagli prodotto specifico
 * - Fornire interfaccia per selezione quantità
 * - Gestire aggiunta al carrello con validazione
 * - Mantenere stato pulito durante navigazione
 * - Ottimizzare SEO con contenuto ricco
 */

/* eslint-disable react/no-unescaped-entities */
// ===== IMPORTAZIONI =====
import { useEffect, useState } from 'react'              // React hooks
import { useParams, useNavigate } from 'react-router-dom' // Router hooks
import { useDispatch, useSelector } from 'react-redux'   // Redux hooks
import { fetchProductById, clearCurrentProduct } from '../store/products/productsSlice' // Product actions
import { addToCart } from '../store/cart/cartSlice'      // Cart actions

/**
 * PRODUCT DETAIL PAGE COMPONENT
 *
 * Componente principale per visualizzazione dettagli prodotto.
 * Implementa pattern container con gestione completa del ciclo di vita.
 */
function ProductDetailPage() {
  // ===== ROUTER HOOKS =====
  const { id } = useParams()    // Estrae ID prodotto dall'URL
  const navigate = useNavigate() // Per navigazione programmatica

  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const { currentProduct, status, error } = useSelector((state) => state.products)

  // ===== STATE LOCALE =====
  /**
   * STATO QUANTITÀ
   *
   * Gestisce la quantità selezionata dall'utente per l'aggiunta al carrello.
   * Validata contro stock disponibile del prodotto.
   */
  const [quantity, setQuantity] = useState(1)

  // ===== SIDE EFFECTS =====

  /**
   * DATA FETCHING E CLEANUP
   *
   * Effetto che gestisce:
   * 1. Caricamento prodotto al mount/cambio ID
   * 2. Cleanup stato al dismount per evitare memory leaks
   *
   * PATTERN: Cleanup Function per gestione memoria
   */
  useEffect(() => {
    // ===== FETCH PRODOTTO =====
    // Converte ID a numero per compatibilità database
    dispatch(fetchProductById(Number(id)))

    // ===== CLEANUP FUNCTION =====
    // Pulisce currentProduct quando il componente viene smontato
    // per evitare di mostrare dati obsoleti in navigazioni successive
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, id])

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CAMBIO QUANTITÀ
   *
   * Gestisce input diretto nel campo quantità con validazione:
   * - Valore minimo: 1
   * - Valore massimo: stock disponibile
   * - Solo numeri interi positivi
   *
   * @param {Event} e - Evento change dell'input
   */
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)

    // ===== VALIDAZIONE INPUT =====
    if (value > 0 && value <= (currentProduct?.stock || 1)) {
      setQuantity(value)
    }
    // Se valore non valido, mantiene quantità precedente
  }

  /**
   * HANDLER INCREMENTO QUANTITÀ
   *
   * Incrementa quantità di 1 se non supera stock disponibile.
   * Utilizzato dal pulsante "+" nell'interfaccia.
   */
  const handleIncrement = () => {
    if (quantity < (currentProduct?.stock || 1)) {
      setQuantity(quantity + 1)
    }
  }

  /**
   * HANDLER DECREMENTO QUANTITÀ
   *
   * Decrementa quantità di 1 se maggiore di 1.
   * Utilizzato dal pulsante "-" nell'interfaccia.
   */
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  /**
   * HANDLER AGGIUNTA AL CARRELLO
   *
   * Aggiunge il prodotto corrente al carrello con la quantità selezionata.
   * Include validazione esistenza prodotto prima dell'aggiunta.
   */
  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({
        ...currentProduct,  // Spread tutti i dati prodotto
        quantity           // Sovrascrive con quantità selezionata
      }))

      // Opzionale: Reset quantità dopo aggiunta
      // setQuantity(1)
    }
  }

  // ===== EARLY RETURNS PER STATI SPECIALI =====

  /**
   * LOADING STATE
   *
   * Mostra spinner durante il caricamento del prodotto.
   * Centrato nella pagina per feedback visivo immediato.
   */
  if (status === 'loading') {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Caricamento prodotto...</span>
        </div>
        <p className="mt-3 text-muted">Caricamento dettagli prodotto...</p>
      </div>
    )
  }

  /**
   * ERROR STATE
   *
   * Gestisce errori di caricamento o prodotto non trovato.
   * Fornisce azione di recovery per tornare al catalogo.
   */
  if (error || !currentProduct) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="mb-4">
              <span style={{ fontSize: '4rem' }}>😞</span>
            </div>
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Prodotto non trovato</h4>
              <p className="mb-0">
                {error || 'Il prodotto che stai cercando non esiste o non è più disponibile.'}
              </p>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <button
                className="btn btn-primary"
                onClick={() => navigate('/shop')}
              >
                Torna al negozio
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Indietro
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== MAIN RENDER =====
  /**
   * LAYOUT PRINCIPALE PRODOTTO
   *
   * Layout responsive a due colonne:
   * - Sinistra: Immagine prodotto
   * - Destra: Informazioni e controlli
   */
  return (
    <div className="container py-5">

      {/* ===== BREADCRUMB NAVIGATION ===== */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </li>
          <li className="breadcrumb-item">
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => navigate('/shop')}
            >
              Articoli
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentProduct.name}
          </li>
        </ol>
      </nav>

      {/* ===== LAYOUT PRINCIPALE ===== */}
      <div className="row">

        {/* ===== SEZIONE IMMAGINE ===== */}
        {/**
         * IMMAGINE PRODOTTO
         *
         * Immagine principale del prodotto con:
         * - Responsive design (img-fluid)
         * - Alt text per accessibilità
         * - Styling custom per dettaglio
         */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="position-relative">
            <img
              src={currentProduct.imageUrl}
              alt={`${currentProduct.name} - Bijoux artigianale Coccibelli`}
              className="product-detail-img img-fluid rounded shadow-lg"
              loading="lazy"
            />

            {/* Badge stock status */}
            {currentProduct.stock === 0 && (
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-danger fs-6">Esaurito</span>
              </div>
            )}
          </div>
        </div>

        {/* ===== SEZIONE INFORMAZIONI ===== */}
        {/**
         * DETTAGLI E CONTROLLI PRODOTTO
         *
         * Pannello destro con tutte le informazioni e controlli:
         * - Metadati prodotto (categoria, nome, prezzo)
         * - Descrizione dettagliata
         * - Controlli quantità
         * - Pulsante aggiunta carrello
         */}
        <div className="col-md-6">

          {/* Badge Categoria */}
          <span className={`badge mb-3 badge-${currentProduct.category} fs-6`}>
            {currentProduct.category}
          </span>

          {/* Nome Prodotto */}
          <h1 className="mb-3 fw-bold">{currentProduct.name}</h1>

          {/* Prezzo */}
          <p className="fs-3 fw-bold text-primary mb-4">
            {currentProduct.price.toFixed(2)} €
          </p>

          {/* Descrizione */}
          <div className="mb-4">
            <h5 className="fw-bold mb-2">Descrizione</h5>
            <p className="text-muted">{currentProduct.description}</p>
          </div>

          {/* Caratteristiche Prodotto */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2">Caratteristiche</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <span className="me-2">✋</span>
                <strong>Fatto a mano</strong> - Lavorazione artigianale
              </li>
              <li className="mb-1">
                <span className="me-2">♻️</span>
                <strong>Sostenibile</strong> - Materiali vintage recuperati
              </li>
              <li className="mb-1">
                <span className="me-2">⭐</span>
                <strong>Unico</strong> - Pezzo irripetibile
              </li>
            </ul>
          </div>

          {/* ===== CONTROLLI QUANTITÀ ===== */}
          {/**
           * SELETTORE QUANTITÀ
           *
           * Input group con controlli per quantità:
           * - Pulsanti +/- per incremento/decremento
           * - Input numerico per inserimento diretto
           * - Validazione contro stock disponibile
           * - Feedback visivo per limiti
           */}
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label fw-bold">Quantità</label>
            <div className="input-group" style={{ width: '150px' }}>

              {/* Pulsante Decremento */}
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Diminuisci quantità"
              >
                <span aria-hidden="true">−</span>
              </button>

              {/* Input Quantità */}
              <input
                type="number"
                className="form-control text-center"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={currentProduct.stock}
                aria-label="Quantità prodotto"
              />

              {/* Pulsante Incremento */}
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleIncrement}
                disabled={quantity >= currentProduct.stock}
                aria-label="Aumenta quantità"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>

            {/* Indicatore Stock */}
            <small className="text-muted d-block mt-1">
              {currentProduct.stock > 0 ? (
                <>
                  <span className="text-success">✓</span> Disponibilità: {currentProduct.stock} pezzi
                </>
              ) : (
                <>
                  <span className="text-danger">✗</span> Prodotto esaurito
                </>
              )}
            </small>
          </div>

          {/* ===== PULSANTE AGGIUNTA CARRELLO ===== */}
          {/**
           * CALL-TO-ACTION PRINCIPALE
           *
           * Pulsante per aggiungere prodotto al carrello con:
           * - Stato disabilitato se stock = 0
           * - Styling prominente per conversioni
           * - Feedback accessibilità
           */}
          <button
            className="btn btn-primary btn-lg w-100 mb-3"
            onClick={handleAddToCart}
            disabled={currentProduct.stock === 0}
            aria-label={`Aggiungi ${quantity} ${currentProduct.name} al carrello`}
          >
            {currentProduct.stock === 0 ? (
              <>
                <span className="me-2">😞</span>
                Prodotto Esaurito
              </>
            ) : (
              <>
                <span className="me-2">🛒</span>
                Aggiungi al Carrello
              </>
            )}
          </button>

          {/* ===== PULSANTE NAVIGAZIONE ===== */}
          {/**
           * SECONDARY ACTION
           *
           * Pulsante secondario per tornare al catalogo.
           * Fornisce via di fuga se prodotto non interessante.
           */}
          <button
            className="btn btn-outline-secondary w-100 mb-4"
            onClick={() => navigate('/shop')}
            aria-label="Torna al catalogo prodotti"
          >
            <span className="me-2">←</span>
            Torna al Negozio
          </button>

          {/* ===== SEPARATORE ===== */}
          <hr className="my-4" />

          {/* ===== DETTAGLI TECNICI ===== */}
          {/**
           * INFORMAZIONI DETTAGLIATE
           *
           * Sezione con specifiche tecniche e informazioni aggiuntive:
           * - Materiali utilizzati
           * - Processo di lavorazione
           * - Caratteristiche uniche
           * - Disclaimer variazioni artigianali
           */}
          <div>
            <h5 className="fw-bold mb-3">Dettagli Tecnici</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Categoria:</strong>
                <span className="ms-2 text-capitalize">{currentProduct.category}</span>
              </li>
              <li className="mb-2">
                <strong>Materiali:</strong>
                <span className="ms-2">Frammento di porcellana vintage, metallo anallergico</span>
              </li>
              <li className="mb-2">
                <strong>Lavorazione:</strong>
                <span className="ms-2">Completamente artigianale</span>
              </li>
              <li className="mb-2">
                <strong>Unicità:</strong>
                <span className="ms-2">Pezzo unico e irripetibile</span>
              </li>
              <li className="mb-2">
                <strong>Origine:</strong>
                <span className="ms-2">Made in Italy</span>
              </li>
            </ul>

            {/* ===== DISCLAIMER ARTIGIANALE ===== */}
            {/**
             * NOTA IMPORTANTE
             *
             * Disclaimer che spiega la natura artigianale e le possibili
             * variazioni rispetto all'immagine mostrata.
             */}
            <div className="alert alert-info mt-4" role="note">
              <h6 className="alert-heading">
                <span className="me-2">ℹ️</span>
                Nota importante
              </h6>
              <p className="mb-0 fst-italic">
                Ogni bijoux è un <strong>pezzo unico</strong> realizzato a mano con frammenti
                di porcellana vintage. Potrebbero esserci piccole differenze di colore,
                forma o decorazione rispetto all'immagine mostrata, rendendo il tuo acquisto
                ancora più speciale e irripetibile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SEZIONE INFORMAZIONI AGGIUNTIVE ===== */}
      {/**
       * FOOTER INFORMATIVO
       *
       * Sezione finale con informazioni su spedizione,
       * garanzie e politiche del negozio.
       */}
      <div className="row mt-5 pt-4 border-top">
        <div className="col-12">
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <span className="fs-1 mb-2 d-block">🚚</span>
              <h6 className="fw-bold">Spedizione Gratuita</h6>
              <small className="text-muted">Su ordini superiori a 50€</small>
            </div>
            <div className="col-md-4 mb-3">
              <span className="fs-1 mb-2 d-block">🔒</span>
              <h6 className="fw-bold">Pagamenti Sicuri</h6>
              <small className="text-muted">Transazioni protette e crittografate</small>
            </div>
            <div className="col-md-4 mb-3">
              <span className="fs-1 mb-2 d-block">💬</span>
              <h6 className="fw-bold">Supporto Clienti</h6>
              <small className="text-muted">Assistenza dedicata per ogni acquisto</small>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Sezione prodotti correlati */}
      {/* <RelatedProductsSection category={currentProduct.category} currentId={currentProduct.id} /> */}
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default ProductDetailPage
