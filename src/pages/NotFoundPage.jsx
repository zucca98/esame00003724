/* eslint-disable react/no-unescaped-entities */
/**
 * NOT FOUND PAGE COMPONENT - PAGINA ERRORE 404
 *
 * Pagina di errore per URL non trovati che gestisce:
 * - Visualizzazione errore 404 user-friendly
 * - Navigazione di recovery verso pagine principali
 * - Design coerente con il brand
 * - Suggerimenti per aiutare l'utente
 * - SEO ottimizzato per errori 404
 *
 * PATTERN UTILIZZATI:
 * - Error Page Pattern: Gestione errori graceful
 * - Recovery Navigation: Link per tornare al sito
 * - User-Friendly Messaging: Messaggi chiari e utili
 * - Brand Consistency: Design coerente con il sito
 * - Responsive Design: Layout adattivo
 *
 * RESPONSABILITÀ:
 * - Informare l'utente dell'errore in modo chiaro
 * - Fornire opzioni di navigazione alternative
 * - Mantenere l'utente nel sito (ridurre bounce rate)
 * - Offrire esperienza positiva anche negli errori
 * - Supportare SEO con gestione corretta 404
 */

// ===== IMPORTAZIONI =====
import { Link } from 'react-router-dom' // React Router per navigazione

/**
 * NOT FOUND PAGE COMPONENT
 *
 * Componente per gestione errori 404 con design user-friendly
 * e opzioni di recovery per mantenere l'utente nel sito.
 */
function NotFoundPage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">

          {/* ===== SEZIONE ERRORE PRINCIPALE ===== */}
          <div className="py-5">

            {/* Numero Errore */}
            <div className="mb-4">
              <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '8rem' }}>
                404
              </h1>
            </div>

            {/* Emoji e Titolo */}
            <div className="mb-4">
              <span style={{ fontSize: '4rem' }}>🔍</span>
              <h2 className="mt-3 mb-4 fw-bold">Oops! Pagina Non Trovata</h2>
            </div>

            {/* Descrizione Errore */}
            <div className="mb-5">
              <p className="lead text-muted mb-4">
                La pagina che stai cercando non esiste, è stata spostata o
                l'URL potrebbe essere stato digitato incorrettamente.
              </p>
              <p className="text-muted">
                Non preoccuparti! Puoi tornare alla home page o esplorare
                le nostre bellissime creazioni artigianali.
              </p>
            </div>

            {/* ===== AZIONI DI RECOVERY ===== */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">

              {/* Pulsante Home */}
              <Link to="/" className="btn btn-primary btn-lg">
                <span className="me-2">🏠</span>
                Torna alla Home
              </Link>

              {/* Pulsante Shop */}
              <Link to="/shop" className="btn btn-outline-primary btn-lg">
                <span className="me-2">🛍️</span>
                Esplora i Prodotti
              </Link>

              {/* Pulsante Contatti */}
              <Link to="/contact" className="btn btn-outline-secondary btn-lg">
                <span className="me-2">💬</span>
                Contattaci
              </Link>
            </div>
          </div>

          {/* ===== SEZIONE SUGGERIMENTI ===== */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-light">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    <span className="me-2">💡</span>
                    Cosa puoi fare?
                  </h5>
                  <div className="row text-start">
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="me-2 text-primary">🔍</span>
                        <div>
                          <h6 className="fw-bold">Cerca i nostri prodotti</h6>
                          <small className="text-muted">
                            Esplora la nostra collezione di bijoux artigianali
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="me-2 text-primary">📖</span>
                        <div>
                          <h6 className="fw-bold">Scopri la nostra storia</h6>
                          <small className="text-muted">
                            Leggi di più sulla nostra missione sostenibile
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <div className="d-flex align-items-start">
                        <span className="me-2 text-primary">💌</span>
                        <div>
                          <h6 className="fw-bold">Contatta il supporto</h6>
                          <small className="text-muted">
                            Il nostro team è qui per aiutarti
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SEZIONE BRAND ===== */}
          <div className="mt-5 pt-4 border-top">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">♻️</span>
                <h6 className="fw-bold">Sostenibilità</h6>
                <small className="text-muted">Diamo nuova vita a materiali vintage</small>
              </div>
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">✋</span>
                <h6 className="fw-bold">Artigianalità</h6>
                <small className="text-muted">Ogni pezzo è lavorato a mano con cura</small>
              </div>
              <div className="col-md-4 mb-3">
                <span className="fs-1 mb-2 d-block">⭐</span>
                <h6 className="fw-bold">Unicità</h6>
                <small className="text-muted">Nessun gioiello è uguale a un altro</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== EXPORT DEFAULT =====
export default NotFoundPage
