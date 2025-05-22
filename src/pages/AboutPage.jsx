
function AboutPage() {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="display-5 mb-4">Chi Siamo</h1>
            <p className="lead text-muted">
              Scopri la storia e le persone dietro a Coccibelli
            </p>
          </div>
        </div>
        
        {/* Elisabetta Section */}
        <div className="row align-items-center mb-5 fade-in">
          <div className="col-md-5 mb-4 mb-md-0">
            <img 
              src="https://placehold.co/600x400?text=Elisabetta" 
              alt="Elisabetta" 
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-7">
            <h2>Elisabetta</h2>
            <p>
              Ciao a tutti, sono Elisabetta. Da sempre ho manifestato una profonda passione per manualità e creazione: 
              creo oggetti unici usando tessuti, elementi naturali, sassi, cortecce, pietre e cristalli.
            </p>
            <p>
              Amo ridare vita a ciò che è scartato, trasformando oggetti dimenticati in creazioni originali. 
              Nei mercatini scopro tesori vintage—piatti e tazze di porcellana—che diventano ispirazione per i &apos;cocci belli&apos;: 
              bijoux simbolo di rinascita e bellezza imperfetta.
            </p>
          </div>
        </div>
        
        {/* Greta Section */}
        <div className="row align-items-center mb-5 fade-in">
          <div className="col-md-7 order-md-1 order-2">
            <h2>Greta</h2>
            <p>
              Mi chiamo Greta e ho conosciuto Elisabetta grazie a una foto dei suoi anelli in ceramica. 
              È stato amore a prima vista: quell&apos;arte autentica meritava di essere valorizzata e raccontata.
            </p>
            <p>
              Da circa un anno la affianco nella comunicazione e cura dei social, 
              scoprendo ogni giorno passione, dedizione e bellezza in ogni creazione.
            </p>
          </div>
          <div className="col-md-5 mb-4 mb-md-0 order-md-2 order-1">
            <img 
              src="https://placehold.co/600x400?text=Greta" 
              alt="Greta" 
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
        
        {/* Creative Process */}
        <div className="row mt-5 pt-3 fade-in">
          <div className="col-12 text-center mb-4">
            <h2>Il Nostro Processo Creativo</h2>
            <p className="text-muted">
              Ogni bijoux racchiude una storia e un processo artigianale
            </p>
          </div>
          
          <div className="col-md-8 mx-auto">
            <div className="process-step">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <div className="process-content">
                <h5>Ricerca di un piatto vintage nei mercatini</h5>
                <p>Ogni creazione inizia con la ricerca di piatti, tazze e servizi in porcellana vintage nei mercatini dell&apos;antiquariato.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
                </svg>
              </div>
              <div className="process-content">
                <h5>Frantumazione controllata</h5>
                <p>Ogni piatto viene rotto con una tecnica precisa: ogni rottura è unica e offre frammenti diversi.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-scissors" viewBox="0 0 16 16">
                  <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
                </svg>
              </div>
              <div className="process-content">
                <h5>Taglio e limatura del frammento</h5>
                <p>I pezzi più promettenti vengono selezionati, tagliati e limati con attrezzi appositi fino a ottenere la forma desiderata.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                  <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                </svg>
              </div>
              <div className="process-content">
                <h5>Decorazione e rifinitura dei bordi</h5>
                <p>I bordi vengono rifiniti e decorati per garantire sicurezza e bellezza estetica.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                  <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                </svg>
              </div>
              <div className="process-content">
                <h5>Montaggio in anello, collana o orecchini</h5>
                <p>Il frammento viene montato su supporti di qualità per creare il bijoux finale.</p>
              </div>
            </div>
          </div>
          
          <div className="col-12 text-center mt-4">
            <p className="fst-italic">
              &quot;Ogni gioiello è un pezzo artigianale che ridà vita a materiali del passato.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage