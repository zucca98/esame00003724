/**
 * CONTACT PAGE COMPONENT - PAGINA CONTATTI
 * 
 * Pagina dedicata al contatto con l'azienda che gestisce:
 * - Form di contatto per richieste generali
 * - Informazioni di contatto complete
 * - Canali social media per engagement
 * - FAQ per domande frequenti
 * - Informazioni utili per clienti
 * 
 * PATTERN UTILIZZATI:
 * - Presentational Component: Focus su UI e UX
 * - Form Handling: Gestione invio messaggi
 * - Responsive Design: Layout adattivo per tutti i dispositivi
 * - Contact Information Display: Informazioni strutturate
 * - Social Media Integration: Link ai canali social
 * - Accessibility: Ottimizzazione per screen reader
 * 
 * RESPONSABILITÀ:
 * - Fornire interfaccia per contattare l'azienda
 * - Mostrare tutte le informazioni di contatto
 * - Gestire invio form di contatto
 * - Facilitare engagement sui social media
 * - Fornire informazioni utili per clienti
 */

// ===== IMPORTAZIONI =====
import { toast } from 'react-toastify' // Toast notifications

/**
 * CONTACT PAGE COMPONENT
 * 
 * Componente principale per la pagina contatti.
 * Implementa form di contatto e informazioni aziendali complete.
 */
function ContactPage() {
  // ===== EVENT HANDLERS =====
  
  /**
   * HANDLER SUBMIT FORM
   * 
   * Gestisce invio del form di contatto.
   * Attualmente mostra messaggio di sviluppo in corso.
   * 
   * TODO: Implementare invio email o integrazione con servizio di contatto
   * 
   * @param {Event} e - Evento submit del form
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // ===== PLACEHOLDER IMPLEMENTAZIONE =====
    // In produzione, qui andrebbe implementata la logica per:
    // 1. Raccogliere dati form
    // 2. Validare input
    // 3. Inviare email o salvare messaggio
    // 4. Fornire feedback all'utente
    
    toast.info('Funzionalità in fase di sviluppo. Riprova più tardi.')
  }

  return (
    <div className="container py-5">
      
      {/* ===== HEADER PAGINA ===== */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-5 fw-bold mb-3">Contattaci</h1>
          <p className="lead text-muted">
            Siamo qui per aiutarti! Scrivici per qualsiasi domanda sui nostri bijoux artigianali.
          </p>
        </div>
      </div>
      
      <div className="row">
        
        {/* ===== COLONNA FORM CONTATTO ===== */}
        <div className="col-lg-8 mb-5">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <span className="me-2">💌</span>
                Invia un Messaggio
              </h3>
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-4">
                Hai domande sui nostri prodotti, vuoi richiedere un pezzo personalizzato 
                o semplicemente conoscere meglio la nostra storia? Compila il form e ti 
                risponderemo al più presto!
              </p>

              {/* ===== FORM CONTATTO ===== */}
              <form onSubmit={handleSubmit}>
                
                {/* Campo Nome */}
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
                    placeholder="Inserisci il tuo nome completo"
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Campo Email */}
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
                    placeholder="inserisci la tua email"
                    required
                    autoComplete="email"
                  />
                  <div className="form-text">
                    Ti risponderemo a questo indirizzo email
                  </div>
                </div>

                {/* Campo Oggetto */}
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-bold">
                    <span className="me-1">📝</span>
                    Oggetto
                  </label>
                  <select
                    className="form-select form-select-lg"
                    id="subject"
                    name="subject"
                    required
                  >
                    <option value="">Seleziona l&apos;argomento</option>
                    <option value="info-prodotti">Informazioni sui prodotti</option>
                    <option value="ordine-personalizzato">Ordine personalizzato</option>
                    <option value="spedizione">Spedizione e consegna</option>
                    <option value="assistenza">Assistenza post-vendita</option>
                    <option value="collaborazione">Collaborazioni</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                {/* Campo Messaggio */}
                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-bold">
                    <span className="me-1">💬</span>
                    Messaggio
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Scrivi qui il tuo messaggio dettagliato..."
                    required
                    style={{ resize: 'vertical' }}
                  ></textarea>
                  <div className="form-text">
                    Descrivi nel dettaglio la tua richiesta per aiutarci a risponderti meglio
                  </div>
                </div>

                {/* Pulsante Submit */}
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100"
                  aria-label="Invia il messaggio di contatto"
                >
                  <span className="me-2">📤</span>
                  Invia Messaggio
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* ===== COLONNA INFORMAZIONI CONTATTO ===== */}
        <div className="col-lg-4">
          
          {/* ===== CARD CONTATTI DIRETTI ===== */}
          <div className="card shadow border-0 mb-4">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                <span className="me-2">📞</span>
                Contatti Diretti
              </h4>
            </div>
            <div className="card-body">
              
              {/* Email */}
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope text-primary" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Email</h6>
                  <a href="mailto:info@coccibelli.it" className="text-decoration-none">
                    info@coccibelli.it
                  </a>
                  <p className="mb-0 text-muted small">Risposta entro 24h</p>
                </div>
              </div>
              
              {/* Instagram */}
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram text-primary" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Instagram</h6>
                  <a 
                    href="https://www.instagram.com/cocci_belli?igsh=cm9icTBsYmw4amdv" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-decoration-none"
                  >
                    @cocci_belli
                  </a>
                  <p className="mb-0 text-muted small">Seguici per novità</p>
                </div>
              </div>
              
              {/* Facebook */}
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook text-primary" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Facebook</h6>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61575820801983" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-decoration-none"
                  >
                    CocciBelli
                  </a>
                  <p className="mb-0 text-muted small">Community e aggiornamenti</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== CARD INFORMAZIONI UTILI ===== */}
          <div className="card shadow border-0">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">
                <span className="me-2">🕒</span>
                Informazioni Utili
              </h4>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Tempi di Risposta</h6>
                <p className="text-muted small mb-0">
                  📧 Email: entro 24 ore<br />
                  📱 Social: entro 12 ore<br />
                  📞 Telefono: su appuntamento
                </p>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold mb-2">Specializzazioni</h6>
                <div className="d-flex flex-wrap gap-1">
                  <span className="badge bg-primary">Bijoux personalizzati</span>
                  <span className="badge bg-primary">Riparazioni</span>
                  <span className="badge bg-primary">Consulenze</span>
                  <span className="badge bg-primary">Workshop</span>
                </div>
              </div>

              <div>
                <h6 className="fw-bold mb-2">Lingue Supportate</h6>
                <p className="text-muted small mb-0">
                  🇮🇹 Italiano<br />
                  🇬🇧 English<br />
                  🇫🇷 Français
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SEZIONE FAQ ===== */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow border-0">
            <div className="card-header bg-warning text-dark">
              <h3 className="mb-0">
                <span className="me-2">❓</span>
                Domande Frequenti
              </h3>
            </div>
            <div className="card-body">
              <div className="accordion" id="faqAccordion">

                {/* FAQ 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq1">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                      Come vengono realizzati i vostri bijoux?
                    </button>
                  </h2>
                  <div id="collapse1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Ogni bijoux è realizzato a mano utilizzando frammenti di porcellana vintage
                      accuratamente selezionati. Il processo include levigatura, rifinitura e
                      montaggio su supporti in metallo anallergico.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq2">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                      Posso richiedere un pezzo personalizzato?
                    </button>
                  </h2>
                  <div id="collapse2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Assolutamente sì! Realizziamo bijoux personalizzati su richiesta.
                      Contattaci descrivendo la tua idea e ti forniremo un preventivo
                      personalizzato con tempi di realizzazione.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="faq3">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                      Quali sono i tempi di spedizione?
                    </button>
                  </h2>
                  <div id="collapse3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Per i prodotti disponibili: 2-3 giorni lavorativi in Italia.
                      Per i pezzi personalizzati: 7-14 giorni lavorativi a seconda
                      della complessità del lavoro richiesto.
                    </div>
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
export default ContactPage
