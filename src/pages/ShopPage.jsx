/**
 * SHOP PAGE COMPONENT - CATALOGO PRODOTTI COMPLETO
 *
 * Pagina principale del catalogo e-commerce che gestisce:
 * - Visualizzazione completa catalogo prodotti
 * - Filtri per categoria con URL sync
 * - Stati di loading e error handling
 * - Layout responsive con grid Bootstrap
 * - Integrazione con Redux per dati prodotti
 *
 * PATTERN UTILIZZATI:
 * - Container Component: Gestisce data fetching e stato
 * - URL State Sync: Filtri sincronizzati con query parameters
 * - Derived State: Prodotti filtrati calcolati da stato
 * - Loading States: UX fluida durante operazioni async
 * - Responsive Grid: Layout adattivo per tutti i dispositivi
 *
 * RESPONSABILITÀ:
 * - Caricare e mostrare tutti i prodotti disponibili
 * - Fornire filtri categoria funzionali
 * - Gestire stati loading/error per UX ottimale
 * - Mantenere sincronizzazione URL per deep linking
 * - Ottimizzare performance con filtering efficiente
 */

// ===== IMPORTAZIONI =====
import { useEffect, useState } from 'react'           // React hooks
import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import { useSearchParams } from 'react-router-dom'     // URL query params
import { fetchProducts } from '../store/products/productsSlice' // Async thunk
import ProductCard from '../components/ProductCard'    // Componente card prodotto

/**
 * SHOP PAGE COMPONENT
 *
 * Componente principale del catalogo che implementa filtering
 * e sincronizzazione URL per esperienza utente ottimale.
 */
function ShopPage() {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)

  // ===== ROUTER HOOKS =====
  const [searchParams] = useSearchParams() // Per leggere query parameters

  // ===== STATE LOCALE =====
  /**
   * STATO FILTRI E PRODOTTI
   *
   * - filteredProducts: Array prodotti dopo applicazione filtri
   * - activeCategory: Categoria attualmente selezionata
   */
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  // ===== COMPUTED VALUES =====
  /**
   * CATEGORIA DA URL
   *
   * Legge parametro 'category' dall'URL per deep linking.
   * Esempio: /shop?category=anelli
   */
  const categoryParam = searchParams.get('category')

  // ===== SIDE EFFECTS =====

  /**
   * DATA FETCHING AL MOUNT
   *
   * Carica prodotti solo se stato è 'idle' per evitare
   * chiamate API duplicate e ottimizzare performance.
   */
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  /**
   * SINCRONIZZAZIONE URL → STATE
   *
   * Aggiorna categoria attiva quando cambia il parametro URL.
   * Permette deep linking e navigazione con browser back/forward.
   */
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory('all') // Default se nessun parametro
    }
  }, [categoryParam])

  /**
   * FILTERING PRODOTTI
   *
   * Ricalcola prodotti filtrati quando cambiano:
   * - Lista prodotti (dopo fetch)
   * - Categoria attiva (dopo selezione filtro)
   *
   * PATTERN: Derived State per performance ottimale
   */
  useEffect(() => {
    if (products.length > 0) {
      if (activeCategory === 'all') {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(
          products.filter(product => product.category === activeCategory)
        )
      }
    }
  }, [products, activeCategory])

  // ===== EVENT HANDLERS =====

  /**
   * HANDLER CLICK CATEGORIA
   *
   * Gestisce selezione categoria dai filtri.
   * Aggiorna solo stato locale; URL viene gestito dai link.
   *
   * @param {string} category - Categoria selezionata
   */
  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }
  
  return (
    <div className="container py-5">

      {/* ===== HEADER SEZIONE ===== */}
      {/**
       * INTESTAZIONE CATALOGO
       *
       * Header della pagina con titolo e descrizione.
       * Ottimizzato per SEO e user engagement.
       */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-5 mb-4 fw-bold">I Nostri Articoli</h1>
          <p className="lead text-muted fs-5">
            Scopri le nostre <strong>creazioni artigianali</strong> realizzate con
            frammenti di porcellana vintage. Ogni pezzo è <em>unico e irripetibile</em>.
          </p>

          {/* Badge informativo */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            <span className="badge bg-primary fs-6">♻️ Sostenibile</span>
            <span className="badge bg-primary fs-6">✋ Fatto a mano</span>
            <span className="badge bg-primary fs-6">⭐ Pezzi unici</span>
          </div>
        </div>
      </div>

      {/* ===== FILTRI CATEGORIA ===== */}
      {/**
       * SISTEMA FILTRI CATEGORIA
       *
       * Filtri interattivi per categoria prodotti con:
       * - Stato attivo visuale
       * - Accessibilità (ARIA labels)
       * - Layout responsive
       * - Feedback immediato
       */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center gap-2" role="group" aria-label="Filtri categoria prodotti">

            {/* Filtro "Tutti" */}
            <button
              type="button"
              className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryClick('all')}
              aria-pressed={activeCategory === 'all'}
              aria-label="Mostra tutti i prodotti"
            >
              <span className="me-1">🔍</span>
              Tutti ({products.length})
            </button>

            {/* Filtro Collane */}
            <button
              type="button"
              className={`btn ${activeCategory === 'collane' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryClick('collane')}
              aria-pressed={activeCategory === 'collane'}
              aria-label="Filtra per collane"
            >
              <span className="me-1">📿</span>
              Collane ({products.filter(p => p.category === 'collane').length})
            </button>

            {/* Filtro Anelli */}
            <button
              type="button"
              className={`btn ${activeCategory === 'anelli' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryClick('anelli')}
              aria-pressed={activeCategory === 'anelli'}
              aria-label="Filtra per anelli"
            >
              <span className="me-1">💍</span>
              Anelli ({products.filter(p => p.category === 'anelli').length})
            </button>

            {/* Filtro Orecchini */}
            <button
              type="button"
              className={`btn ${activeCategory === 'orecchini' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryClick('orecchini')}
              aria-pressed={activeCategory === 'orecchini'}
              aria-label="Filtra per orecchini"
            >
              <span className="me-1">👂</span>
              Orecchini ({products.filter(p => p.category === 'orecchini').length})
            </button>

            {/* Filtro Accessori */}
            <button
              type="button"
              className={`btn ${activeCategory === 'accessori' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryClick('accessori')}
              aria-pressed={activeCategory === 'accessori'}
              aria-label="Filtra per accessori"
            >
              <span className="me-1">✨</span>
              Accessori ({products.filter(p => p.category === 'accessori').length})
            </button>
          </div>

          {/* Indicatore categoria attiva */}
          {activeCategory !== 'all' && (
            <div className="text-center mt-3">
              <small className="text-muted">
                Mostrando prodotti della categoria: <strong className="text-primary">{activeCategory}</strong>
              </small>
            </div>
          )}
        </div>
      </div>

      {/* ===== GRID PRODOTTI ===== */}
      {/**
       * GRIGLIA PRODOTTI RESPONSIVE
       *
       * Layout grid Bootstrap che si adatta a tutti i dispositivi:
       * - Mobile: 1 colonna (row-cols-1)
       * - Tablet: 2 colonne (row-cols-md-2)
       * - Desktop: 3 colonne (row-cols-lg-3)
       * - Gap uniforme tra elementi (g-4)
       *
       * GESTIONE STATI:
       * - Loading: Spinner centrato
       * - Error: Alert con messaggio errore
       * - Empty: Messaggio nessun prodotto
       * - Success: Grid con ProductCard
       */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

        {/* ===== LOADING STATE ===== */}
        {status === 'loading' ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Caricamento prodotti...</span>
            </div>
            <p className="mt-3 text-muted">Caricamento prodotti in corso...</p>
          </div>
        ) :

        /* ===== ERROR STATE ===== */
        error ? (
          <div className="col-12">
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Errore:">
                <use xlinkHref="#exclamation-triangle-fill"/>
              </svg>
              <div>
                <strong>Errore nel caricamento prodotti:</strong> {error}
                <br />
                <button
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={() => dispatch(fetchProducts())}
                >
                  Riprova
                </button>
              </div>
            </div>
          </div>
        ) :

        /* ===== EMPTY STATE ===== */
        filteredProducts.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="mb-4">
              <span style={{ fontSize: '4rem' }}>🔍</span>
            </div>
            <h4 className="text-muted mb-3">Nessun prodotto trovato</h4>
            <p className="text-muted mb-4">
              {activeCategory === 'all'
                ? 'Non ci sono prodotti disponibili al momento.'
                : `Non ci sono prodotti nella categoria "${activeCategory}".`
              }
            </p>
            {activeCategory !== 'all' && (
              <button
                className="btn btn-primary"
                onClick={() => handleCategoryClick('all')}
              >
                Mostra tutti i prodotti
              </button>
            )}
          </div>
        ) :

        /* ===== SUCCESS STATE - PRODOTTI ===== */
        (
          /**
           * RENDER PRODOTTI
           *
           * Mappa ogni prodotto filtrato a un componente ProductCard.
           * Key univoca per ottimizzazione React rendering.
           */
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>

      {/* ===== FOOTER INFORMATIVO ===== */}
      {/**
       * SEZIONE INFORMATIVA FINALE
       *
       * Informazioni aggiuntive per migliorare conversioni e SEO.
       */}
      {filteredProducts.length > 0 && (
        <div className="row mt-5 pt-4 border-top">
          <div className="col-12 text-center">
            <h5 className="mb-3">Perché scegliere Coccibelli?</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">♻️</span>
                <h6>Sostenibilità</h6>
                <small className="text-muted">Diamo nuova vita a materiali vintage</small>
              </div>
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">✋</span>
                <h6>Artigianalità</h6>
                <small className="text-muted">Ogni pezzo è lavorato a mano con cura</small>
              </div>
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">⭐</span>
                <h6>Unicità</h6>
                <small className="text-muted">Nessun gioiello è uguale a un altro</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default ShopPage
