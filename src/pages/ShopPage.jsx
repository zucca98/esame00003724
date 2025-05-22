import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/products/productsSlice'
import ProductCard from '../components/ProductCard'

function ShopPage() {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)
  const [searchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Get category from URL if present
  const categoryParam = searchParams.get('category')
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])
  
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])
  
  useEffect(() => {
    if (products.length > 0) {
      if (activeCategory === 'all') {
        setFilteredProducts(products)
      } else {
        setFilteredProducts(products.filter(product => product.category === activeCategory))
      }
    }
  }, [products, activeCategory])
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }
  
  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-5 mb-4">I Nostri Articoli</h1>
          <p className="lead text-muted">
            Scopri le nostre creazioni artigianali
          </p>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group d-flex flex-wrap justify-content-center" role="group" aria-label="Filtri categoria">
            <button
              type="button"
              className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
              onClick={() => handleCategoryClick('all')}
            >
              Tutti
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'collane' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
              onClick={() => handleCategoryClick('collane')}
            >
              Collane
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'anelli' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
              onClick={() => handleCategoryClick('anelli')}
            >
              Anelli
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'orecchini' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
              onClick={() => handleCategoryClick('orecchini')}
            >
              Orecchini
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === 'accessori' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
              onClick={() => handleCategoryClick('accessori')}
            >
              Accessori
            </button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
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
        ) : filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p>Nessun prodotto trovato in questa categoria.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default ShopPage