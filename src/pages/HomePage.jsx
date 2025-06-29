/**
 * HOME PAGE COMPONENT - LANDING PAGE DELL'APPLICAZIONE
 *
 * Pagina principale dell'e-commerce Coccibelli che presenta:
 * - Hero section con brand identity
 * - Sezione prodotti in evidenza
 * - Anteprima "Chi Siamo"
 * - Sezione categorie prodotti
 *
 * PATTERN UTILIZZATI:
 * - Container Component: Gestisce data fetching e stato
 * - Composition Pattern: Compone sezioni diverse
 * - Loading States: Gestione stati asincroni
 * - Responsive Design: Layout adattivo mobile-first
 *
 * RESPONSABILITÀ:
 * - Caricamento prodotti dal backend
 * - Presentazione brand e value proposition
 * - Navigazione verso altre sezioni
 * - Ottimizzazione SEO e performance
 */

// ===== IMPORTAZIONI =====
import { useEffect } from 'react'                    // Hook per side effects
import { Link } from 'react-router-dom'              // Navigazione React Router
import { useDispatch, useSelector } from 'react-redux' // Redux hooks
import { fetchProducts } from '../store/products/productsSlice' // Async thunk
import ProductCard from '../components/ProductCard'   // Componente card prodotto

/**
 * HOME PAGE COMPONENT
 *
 * Componente principale della landing page.
 * Implementa il pattern Container Component per gestire data e stato.
 */
function HomePage() {
  // ===== REDUX HOOKS =====
  const dispatch = useDispatch()

  // Estrae stato prodotti da Redux store
  const { products, status, error } = useSelector((state) => state.products)

  // ===== SIDE EFFECTS =====
  /**
   * DATA FETCHING AL MOUNT
   *
   * Carica i prodotti solo se lo stato è 'idle' per evitare
   * chiamate API duplicate e ottimizzare le performance.
   */
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  // ===== COMPUTED VALUES =====
  /**
   * PRODOTTI IN EVIDENZA
   *
   * Seleziona i primi 3 prodotti per la sezione featured.
   * In una versione più avanzata potrebbe essere basato su:
   * - Flag "featured" nel database
   * - Algoritmo di raccomandazione
   * - Prodotti più venduti
   */
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      {/**
       * SEZIONE HERO
       *
       * Prima impressione dell'utente con:
       * - Brand identity forte
       * - Value proposition chiara
       * - Background visivo d'impatto
       * - Call-to-action implicita
       */}
      <section
        className="hero d-flex align-items-center justify-content-center text-white position-relative"
        style={{
          // Gradient overlay per leggibilità testo
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.etsystatic.com/6084487/r/il/daf48b/2033134345/il_570xN.2033134345_f5m4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Effetto parallax
          minHeight: '70vh' // Altezza responsive
        }}
      >
        <div className="container text-center">
          {/* Brand name con tipografia d'impatto */}
          <h1 className="display-2 fw-bold mb-4" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            fontFamily: "'Cormorant Garamond', serif"
          }}>
            Coccibelli
          </h1>

          {/* Sottotitolo elegante */}
          <h2 className="h4 mb-4 text-light opacity-90" style={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            fontWeight: '300',
            letterSpacing: '1px'
          }}>
            Gioielli Artigianali da Frammenti di Storia
          </h2>

          {/* Value proposition concisa e impattante */}
          <p className="lead mb-5 fs-5 mx-auto" style={{
            maxWidth: '600px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            lineHeight: '1.6'
          }}>
            Trasformiamo <strong>frammenti di porcellana vintage</strong> in gioielli unici.<br />
            <em>Ogni pezzo racconta una storia, la tua storia.</em>
          </p>

          {/* Call-to-action buttons ottimizzati */}
          <div className="d-flex gap-3 justify-content-center flex-column flex-sm-row">
            <Link
              to="/shop"
              className="btn btn-primary btn-lg px-5 py-3"
              style={{
                borderRadius: '50px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            >
              <span className="me-2">✨</span>
              Scopri i Prodotti
            </Link>
            <Link
              to="/about"
              className="btn btn-outline-light btn-lg px-5 py-3"
              style={{
                borderRadius: '50px',
                fontWeight: '500',
                borderWidth: '2px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }}
            >
              <span className="me-2">📖</span>
              La Nostra Storia
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      {/**
       * SEZIONE PRODOTTI IN EVIDENZA
       *
       * Mostra una selezione curata di prodotti per:
       * - Dare un'anteprima del catalogo
       * - Invogliare all'esplorazione
       * - Dimostrare la qualità dei prodotti
       * - Guidare verso la pagina shop
       */}
      <section className="py-6 bg-light" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container">

          {/* Header sezione */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="display-6 fw-bold mb-3">Le Nostre Creazioni</h2>
              <p className="text-muted fs-5">
                Scopri alcune delle nostre creazioni più recenti,
                realizzate con passione e maestria artigianale
              </p>
            </div>
          </div>

          {/* Grid prodotti con gestione stati asincroni */}
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
                  <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill"/>
                  </svg>
                  <div>
                    <strong>Errore nel caricamento:</strong> {error}
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

            /* ===== SUCCESS STATE ===== */
            featuredProducts.length > 0 ? (
              // Render prodotti in evidenza
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              // Stato vuoto (nessun prodotto)
              <div className="col-12 text-center py-5">
                <h4 className="text-muted">Nessun prodotto disponibile</h4>
                <p className="text-muted">I nostri artigiani stanno lavorando a nuove creazioni!</p>
              </div>
            )}
          </div>

          {/* Call-to-action verso shop completo */}
          {featuredProducts.length > 0 && (
            <div className="text-center mt-5">
              <Link
                to="/shop"
                className="btn btn-primary btn-lg"
                aria-label="Visualizza tutti i prodotti nel negozio"
              >
                Vedi Tutti i Prodotti
                <svg className="ms-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== ABOUT US PREVIEW SECTION ===== */}
      {/**
       * ANTEPRIMA "CHI SIAMO"
       *
       * Sezione che introduce la filosofia del brand:
       * - Storytelling emotivo
       * - Processo artigianale
       * - Valori sostenibilità
       * - Call-to-action verso pagina about
       */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Immagine processo creativo */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.pexels.com/photos/7605954/pexels-photo-7605954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Processo creativo di lavorazione della ceramica vintage"
                className="img-fluid rounded shadow-lg"
                loading="lazy" // Lazy loading per performance
              />
            </div>

            {/* Contenuto testuale */}
            <div className="col-md-6">
              <h2 className="display-6 fw-bold mb-4">Frammenti di Storie</h2>

              <p className="fs-5 mb-4">
                Ogni bijoux nasce da un <strong>frammento di ceramica</strong> selezionato con cura
                nei mercatini vintage, lavorato a mano per dargli nuova vita e trasformarlo
                in un gioiello unico.
              </p>

              <p className="text-muted mb-4">
                La nostra filosofia è quella di <em>ridare bellezza a ciò che è considerato rotto</em>,
                creando pezzi che portano con sé storie e ricordi del passato.
              </p>

              {/* Highlights dei valori */}
              <div className="row mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">♻️</span>
                    <small className="fw-bold">Sostenibile</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">✋</span>
                    <small className="fw-bold">Artigianale</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">⭐</span>
                    <small className="fw-bold">Unico</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-2">
                    <span className="badge bg-primary me-2">📖</span>
                    <small className="fw-bold">Con Storia</small>
                  </div>
                </div>
              </div>

              {/* Call-to-action */}
              <Link
                to="/about"
                className="btn btn-outline-primary btn-lg"
                aria-label="Scopri di più sulla nostra storia e filosofia"
              >
                Scopri di Più
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      {/**
       * SEZIONE CATEGORIE
       *
       * Grid di categorie prodotti per:
       * - Facilitare la navigazione
       * - Mostrare range di prezzo
       * - Guidare l'esplorazione
       * - Migliorare UX di ricerca
       */}
      <section className="py-5 bg-light">
        <div className="container">

          {/* Header sezione */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="display-6 fw-bold mb-3">Categorie</h2>
              <p className="text-muted fs-5">
                Esplora le diverse categorie di bijoux che realizziamo con passione
              </p>
            </div>
          </div>

          {/* Grid categorie responsive */}
          <div className="row g-4">

            {/* Categoria Collane */}
            <div className="col-6 col-md-3">
              <Link
                to="/shop?category=collane"
                className="text-decoration-none category-card"
                aria-label="Esplora la categoria Collane"
              >
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    {/* Icona categoria */}
                    <div className="category-icon mb-3">
                      <span className="fs-1">📿</span>
                    </div>
                    <h3 className="h5 fw-bold mb-2">Collane</h3>
                    <p className="text-muted small mb-0">23–30 €</p>
                    <small className="text-primary">Scopri →</small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Categoria Anelli */}
            <div className="col-6 col-md-3">
              <Link
                to="/shop?category=anelli"
                className="text-decoration-none category-card"
                aria-label="Esplora la categoria Anelli"
              >
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="category-icon mb-3">
                      <span className="fs-1">💍</span>
                    </div>
                    <h3 className="h5 fw-bold mb-2">Anelli</h3>
                    <p className="text-muted small mb-0">15–18 €</p>
                    <small className="text-primary">Scopri →</small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Categoria Orecchini */}
            <div className="col-6 col-md-3">
              <Link
                to="/shop?category=orecchini"
                className="text-decoration-none category-card"
                aria-label="Esplora la categoria Orecchini"
              >
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="category-icon mb-3">
                      <span className="fs-1">👂</span>
                    </div>
                    <h3 className="h5 fw-bold mb-2">Orecchini</h3>
                    <p className="text-muted small mb-0">17–20 €</p>
                    <small className="text-primary">Scopri →</small>
                  </div>
                </div>
              </Link>
            </div>

            {/* Categoria Accessori */}
            <div className="col-6 col-md-3">
              <Link
                to="/shop?category=accessori"
                className="text-decoration-none category-card"
                aria-label="Esplora la categoria Accessori"
              >
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="category-icon mb-3">
                      <span className="fs-1">✨</span>
                    </div>
                    <h3 className="h5 fw-bold mb-2">Accessori</h3>
                    <p className="text-muted small mb-0">13–18 €</p>
                    <small className="text-primary">Scopri →</small>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Call-to-action generale */}
          <div className="text-center mt-5">
            <p className="text-muted mb-3">Non trovi quello che cerchi?</p>
            <Link
              to="/contact"
              className="btn btn-outline-secondary"
              aria-label="Contattaci per richieste personalizzate"
            >
              Contattaci per Creazioni Personalizzate
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default HomePage
