/**
 * FOOTER COMPONENT - FOOTER DELL'APPLICAZIONE
 *
 * Componente footer che fornisce:
 * - Informazioni brand e value proposition
 * - Link di navigazione secondaria
 * - Categorie prodotti per SEO
 * - Informazioni di contatto
 * - Link social media
 * - Copyright e informazioni legali
 *
 * PATTERN UTILIZZATI:
 * - Presentational Component: Solo responsabilità di rendering
 * - Responsive Grid: Layout adattivo con Bootstrap
 * - SEO Optimization: Link interni per crawling
 * - Social Media Integration: Link esterni con sicurezza
 * - Dynamic Content: Anno corrente automatico
 *
 * RESPONSABILITÀ:
 * - Fornire navigazione secondaria
 * - Migliorare SEO con link interni
 * - Facilitare contatto e social engagement
 * - Completare l'esperienza utente
 * - Rispettare standard web (accessibilità, sicurezza)
 */

// ===== IMPORTAZIONI =====
import { Link } from 'react-router-dom'  // React Router per navigazione interna

/**
 * FOOTER COMPONENT
 *
 * Componente presentazionale che chiude ogni pagina dell'applicazione.
 * Implementa layout responsive e best practices per footer web.
 */
function Footer() {
  // ===== COMPUTED VALUES =====
  /**
   * ANNO CORRENTE DINAMICO
   *
   * Calcola automaticamente l'anno corrente per il copyright.
   * Evita di dover aggiornare manualmente ogni anno.
   */
  const currentYear = new Date().getFullYear()

  return (
    /**
     * FOOTER PRINCIPALE
     *
     * Struttura semantica con tag <footer> per accessibilità.
     * Classe 'footer' per styling CSS personalizzato.
     */
    <footer className="footer bg-dark text-light py-5">
      <div className="container">

        {/* ===== CONTENUTO PRINCIPALE FOOTER ===== */}
        {/**
         * GRID RESPONSIVE
         *
         * Layout a 4 colonne su desktop, adattivo su mobile:
         * - Brand + descrizione (col-md-4)
         * - Navigazione (col-md-2)
         * - Categorie (col-md-2)
         * - Contatti (col-md-4)
         *
         * g-4: Gap tra colonne per spacing uniforme
         */}
        <div className="row g-4">

          {/* ===== SEZIONE BRAND ===== */}
          {/**
           * BRAND IDENTITY E VALUE PROPOSITION
           *
           * Presenta il brand e la sua missione nel footer.
           * Importante per SEO e brand awareness.
           */}
          <div className="col-12 col-md-4 mb-4">
            <h3 className="fw-bold mb-3">Coccibelli</h3>
            <p className="text-light opacity-75">
              Bijoux artigianali realizzati con <strong>frammenti di porcellana</strong>,
              ogni pezzo è unico e racconta una storia di <em>sostenibilità</em> e <em>bellezza</em>.
            </p>

            {/* Highlights valori brand */}
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-primary">♻️ Sostenibile</span>
              <span className="badge bg-primary">✋ Artigianale</span>
              <span className="badge bg-primary">⭐ Unico</span>
            </div>
          </div>

          {/* ===== SEZIONE NAVIGAZIONE ===== */}
          {/**
           * LINK NAVIGAZIONE PRINCIPALI
           *
           * Duplica i link principali del menu per:
           * - Migliorare SEO con link interni
           * - Facilitare navigazione da qualsiasi pagina
           * - Seguire convenzioni UX standard
           * - Ridurre bounce rate
           */}
          <div className="col-6 col-md-2 mb-4">
            <h5 className="fw-bold mb-3">Navigazione</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Vai alla pagina Home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/about"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Scopri la nostra storia"
                >
                  Chi Siamo
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Esplora tutti i prodotti"
                >
                  Articoli
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/contact"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Contattaci per informazioni"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== SEZIONE CATEGORIE ===== */}
          {/**
           * LINK CATEGORIE PRODOTTI
           *
           * Link diretti alle categorie per:
           * - SEO: Crawling categorie specifiche
           * - UX: Accesso rapido a prodotti specifici
           * - Conversioni: Riduzione friction per acquisti
           * - Analytics: Tracking interesse per categoria
           */}
          <div className="col-6 col-md-2 mb-4">
            <h5 className="fw-bold mb-3">Categorie</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/shop?category=collane"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Esplora le nostre collane"
                >
                  📿 Collane
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop?category=anelli"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Scopri i nostri anelli"
                >
                  💍 Anelli
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop?category=orecchini"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Guarda i nostri orecchini"
                >
                  👂 Orecchini
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/shop?category=accessori"
                  className="footer-nav-link text-light opacity-75 text-decoration-none"
                  aria-label="Vedi tutti gli accessori"
                >
                  ✨ Accessori
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== SEZIONE CONTATTI ===== */}
          {/**
           * INFORMAZIONI DI CONTATTO
           *
           * Fornisce tutti i canali di comunicazione per:
           * - Customer service e supporto
           * - Engagement sui social media
           * - Trasparenza e fiducia del brand
           * - Local SEO (se presente indirizzo)
           */}
          <div className="col-12 col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contatti</h5>

            {/* Email di contatto */}
            <div className="footer-contact-info mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">📧</span>
                <strong>Email:</strong>
              </div>
              <a
                href="mailto:info@coccibelli.it"
                className="text-light opacity-75 text-decoration-none"
                aria-label="Invia email a info@coccibelli.it"
              >
                info@coccibelli.it
              </a>
            </div>

            {/* Instagram */}
            <div className="footer-contact-info mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">📷</span>
                <strong>Instagram:</strong>
              </div>
              <a
                href="https://www.instagram.com/cocci_belli?igsh=cm9icTBsYmw4amdv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none"
                aria-label="Seguici su Instagram @cocci_belli"
              >
                @cocci_belli
              </a>
            </div>

            {/* Facebook */}
            <div className="footer-contact-info mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2">👥</span>
                <strong>Facebook:</strong>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61575820801983"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 text-decoration-none"
                aria-label="Seguici su Facebook CocciBelli"
              >
                CocciBelli
              </a>
            </div>

            {/* Call-to-action contatto */}
            <div className="mt-4">
              <Link
                to="/contact"
                className="btn btn-outline-light btn-sm"
                aria-label="Vai alla pagina contatti"
              >
                Scrivici
              </Link>
            </div>
          </div>
        </div>

        {/* ===== FOOTER BOTTOM ===== */}
        {/**
         * SEZIONE COPYRIGHT E SOCIAL
         *
         * Barra inferiore del footer con:
         * - Copyright dinamico con anno corrente
         * - Link social media con icone SVG
         * - Layout responsive (stack su mobile)
         * - Sicurezza link esterni (rel="noopener noreferrer")
         */}
        <div className="footer-bottom border-top border-secondary pt-4 mt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">

            {/* Copyright */}
            <div className="mb-3 mb-md-0">
              <p className="mb-0 text-light opacity-75">
                © {currentYear} <strong>Coccibelli</strong>. Tutti i diritti riservati.
              </p>
              <small className="text-light opacity-50">
                Bijoux artigianali made in Italy
              </small>
            </div>

            {/* Social Links */}
            <div className="social-links d-flex gap-3">
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/cocci_belli?igsh=cm9icTBsYmw4amdv"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link text-light opacity-75 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
                aria-label="Seguici su Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-instagram"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>

              {/* Facebook Link */}
              <a
                href="https://www.facebook.com/profile.php?id=61575820801983"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link text-light opacity-75 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
                aria-label="Seguici su Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ===== EXPORT DEFAULT =====
export default Footer