import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearCurrentProduct } from '../store/products/productsSlice'
import { addToCart } from '../store/cart/cartSlice'

function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentProduct, status, error } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)
  
  useEffect(() => {
    // Convert id to number to match database
    dispatch(fetchProductById(Number(id)))
    
    // Cleanup function to clear the current product when unmounting
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, id])
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= (currentProduct?.stock || 1)) {
      setQuantity(value)
    }
  }
  
  const handleIncrement = () => {
    if (quantity < (currentProduct?.stock || 1)) {
      setQuantity(quantity + 1)
    }
  }
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({
        ...currentProduct,
        quantity
      }))
    }
  }
  
  if (status === 'loading') {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    )
  }
  
  if (error || !currentProduct) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Prodotto non trovato'}
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate('/shop')}
        >
          Torna al negozio
        </button>
      </div>
    )
  }
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <img 
            src={currentProduct.imageUrl} 
            alt={currentProduct.name} 
            className="product-detail-img img-fluid"
          />
        </div>
        <div className="col-md-6">
          <span className={`badge mb-2 badge-${currentProduct.category}`}>
            {currentProduct.category}
          </span>
          <h1 className="mb-3">{currentProduct.name}</h1>
          <p className="fs-4 fw-bold mb-3">{currentProduct.price.toFixed(2)} €</p>
          <p className="mb-4">{currentProduct.description}</p>
          
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label">Quantità</label>
            <div className="input-group" style={{ width: '150px' }}>
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                className="form-control text-center" 
                id="quantity" 
                value={quantity} 
                onChange={handleQuantityChange}
                min="1"
                max={currentProduct.stock}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={handleIncrement}
                disabled={quantity >= currentProduct.stock}
              >
                +
              </button>
            </div>
            <small className="text-muted">
              Disponibilità: {currentProduct.stock} pezzi
            </small>
          </div>
          
          <button 
            className="btn btn-primary btn-lg w-100 mb-3" 
            onClick={handleAddToCart}
            disabled={currentProduct.stock === 0}
          >
            Aggiungi al Carrello
          </button>
          
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate('/shop')}
          >
            Torna al Negozio
          </button>
          
          <hr className="my-4" />
          
          <div>
            <h5>Dettagli</h5>
            <ul className="list-unstyled">
              <li><strong>Categoria:</strong> {currentProduct.category}</li>
              <li><strong>Materiali:</strong> Frammento di porcellana, metallo anallergico</li>
              <li><strong>Lavorazione:</strong> Artigianale</li>
              <li><strong>Unicità:</strong> Pezzo unico</li>
            </ul>
            
            <p className="fst-italic mt-3">
              Ogni bijoux è un pezzo unico realizzato a mano, quindi potrebbero esserci piccole 
              differenze rispetto all'immagine mostrata.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products Section could be added here */}
    </div>
  )
}

export default ProductDetailPage