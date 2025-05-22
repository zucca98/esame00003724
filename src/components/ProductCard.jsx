/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cart/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    <div className="col">
      <div className="product-card card h-100 slide-up">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.imageUrl} 
            className="card-img-top" 
            alt={product.name} 
          />
        </Link>
        <div className="card-body">
          <span className={`badge mb-2 badge-${product.category}`}>
            {product.category}
          </span>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <p className="fw-bold">{product.price.toFixed(2)} €</p>
        </div>
        <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-outline-primary btn-sm"
          >
            Dettagli
          </Link>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleAddToCart}
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard