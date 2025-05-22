import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/products/productsSlice'
import ProductCard from '../components/ProductCard'

function HomePage() {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  // Get featured products (just the first 3 for this demo)
  const featuredProducts = products.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.etsystatic.com/6084487/r/il/daf48b/2033134345/il_570xN.2033134345_f5m4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Coccibelli</h1>
          <p className="lead">
            Immerigiti in un mondo di gioielli artigianali.
            Un e-commerce per la vendita di gioielli artigianali realizzati con frammenti di porcellana.
            Ogni pezzo è unico e racconta una storia.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2>Le Nostre Creazioni</h2>
              <p className="text-muted">
                Scopri alcune delle nostre creazioni più recenti
              </p>
            </div>
          </div>
          
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {status === 'loading' ? (
              <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Caricamento...</span>
                </div>
              </div>
            ) : error ? (
              <div className="col-12">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-primary">
              Vedi Tutti
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.pexels.com/photos/7605954/pexels-photo-7605954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Processo creativo" 
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2>Frammenti di Storie</h2>
              <p>
                Ogni bijoux nasce da un frammento di ceramica selezionato con cura nei mercatini vintage, 
                lavorato a mano per dargli nuova vita e trasformarlo in un gioiello unico.
              </p>
              <p>
                La nostra filosofia è quella di ridare bellezza a ciò che è considerato rotto, 
                creando pezzi che portano con sé storie e ricordi.
              </p>
              <Link to="/about" className="btn btn-secondary">
                Scopri di Più
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2>Categorie</h2>
              <p className="text-muted">
                Esplora le diverse categorie di bijoux che realizziamo
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <Link to="/shop?category=collane" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h3 className="h5">Collane</h3>
                    <p className="text-muted small">23–30 €</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/shop?category=anelli" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h3 className="h5">Anelli</h3>
                    <p className="text-muted small">15–18 €</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/shop?category=orecchini" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h3 className="h5">Orecchini</h3>
                    <p className="text-muted small">17–20 €</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/shop?category=accessori" className="text-decoration-none">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h3 className="h5">Accessori</h3>
                    <p className="text-muted small">13–18 €</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage