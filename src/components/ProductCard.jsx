/**
 * PRODUCT CARD COMPONENT - CARD PRODOTTO RIUTILIZZABILE
 *
 * Componente presentazionale che mostra le informazioni di un prodotto
 * in formato card. Utilizzato in HomePage, ShopPage e altre liste prodotti.
 *
 * PATTERN UTILIZZATO:
 * - Presentational Component: Solo responsabilità di rendering
 * - Props-driven: Riceve tutti i dati via props
 * - Reusable Component: Utilizzabile in contesti diversi
 * - Event Delegation: Gestione eventi ottimizzata
 *
 * CARATTERISTICHE:
 * - Design responsive con Bootstrap
 * - Integrazione Redux per azioni carrello
 * - Navigazione verso dettaglio prodotto
 * - Accessibilità e SEO friendly
 */

/* eslint-disable react/prop-types */
// ===== IMPORTAZIONI =====
import { Link } from 'react-router-dom'      // Navigazione React Router
import { useDispatch } from 'react-redux'    // Hook per dispatch azioni Redux
import { addToCart } from '../store/cart/cartSlice' // Azione aggiunta carrello

/**
 * PRODUCT CARD COMPONENT
 *
 * Renderizza una card prodotto con immagine, informazioni e azioni.
 * Implementa il pattern "Presentational Component" per massima riutilizzabilità.
 *
 * @param {Object} props - Props del componente
 * @param {Object} props.product - Oggetto prodotto da visualizzare
 * @param {number} props.product.id - ID univoco del prodotto
 * @param {string} props.product.name - Nome del prodotto
 * @param {string} props.product.description - Descrizione del prodotto
 * @param {number} props.product.price - Prezzo del prodotto
 * @param {string} props.product.category - Categoria del prodotto
 * @param {string} props.product.imageUrl - URL immagine del prodotto
 * @returns {React.ReactElement} - Card prodotto renderizzata
 */
function ProductCard({ product }) {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()

  // ===== EVENT HANDLERS =====
  /**
   * HANDLER AGGIUNTA AL CARRELLO
   *
   * Gestisce il click sul pulsante "Aggiungi al carrello".
   * Previene la navigazione del Link parent e dispatcha l'azione Redux.
   *
   * @param {Event} e - Evento click del pulsante
   */
  const handleAddToCart = (e) => {
    // ===== PREVENZIONE NAVIGAZIONE =====
    // Impedisce che il click attivi il Link parent
    e.preventDefault()
    e.stopPropagation()

    // ===== DISPATCH AZIONE REDUX =====
    // Aggiunge il prodotto al carrello tramite Redux
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1 // Quantità di default
    }))
  }

  return (
    /**
     * STRUTTURA CARD BOOTSTRAP
     *
     * Layout responsive con Bootstrap grid system:
     * - col: Colonna flessibile per grid responsive
     * - card h-100: Card con altezza uniforme
     * - slide-up: Animazione CSS custom
     */
    <div className="col">
      <div className="product-card card h-100 slide-up">

        {/* ===== IMMAGINE PRODOTTO ===== */}
        {/* Link navigabile verso pagina dettaglio */}
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <img
            src={product.imageUrl}
            className="card-img-top"
            alt={`Immagine di ${product.name}`} // Alt text descrittivo per accessibilità
            loading="lazy" // Lazy loading per performance
            style={{ height: '200px', objectFit: 'cover' }} // Dimensioni uniformi
          />
        </Link>

        {/* ===== CONTENUTO CARD ===== */}
        <div className="card-body d-flex flex-column">

          {/* Badge categoria con styling dinamico */}
          <span className={`badge mb-2 badge-${product.category} align-self-start`}>
            {product.category}
          </span>

          {/* Titolo prodotto */}
          <h5 className="card-title">{product.name}</h5>

          {/* Descrizione con troncamento per layout uniforme */}
          <p className="card-text text-truncate text-muted">
            {product.description}
          </p>

          {/* Prezzo formattato */}
          <p className="fw-bold text-primary fs-5 mt-auto">
            {product.price.toFixed(2)} €
          </p>
        </div>

        {/* ===== AZIONI CARD ===== */}
        <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between gap-2">

          {/* Pulsante dettagli */}
          <Link
            to={`/product/${product.id}`}
            className="btn btn-outline-primary btn-sm flex-fill"
            aria-label={`Visualizza dettagli di ${product.name}`}
          >
            Dettagli
          </Link>

          {/* Pulsante aggiungi al carrello */}
          <button
            className="btn btn-primary btn-sm flex-fill"
            onClick={handleAddToCart}
            aria-label={`Aggiungi ${product.name} al carrello`}
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default ProductCard
