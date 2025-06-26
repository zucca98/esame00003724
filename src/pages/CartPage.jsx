/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/cart/cartSlice'
import { addOrder } from '../store/orders/ordersSlice'
import { toast } from 'react-toastify'

function CartPage() {
  const { items, total } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }
  
  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }))
  }
  
  const handleCheckout = () => {
    if (!user) {
      toast.info('Effettua il login per procedere con l\'acquisto')
      navigate('/login')
      return
    }
    
    setIsCheckingOut(true)
    
    const order = {
      id: Date.now(),
      userId: user.id,
      items: [...items],
      total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 5,
      date: new Date().toISOString(),
      status: 'pending'
    }
    
    dispatch(addOrder(order))
    dispatch(clearCart())
    toast.success('Ordine completato con successo! Grazie per il tuo acquisto.')
    navigate('/profile')
  }
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Il Tuo Carrello</h1>
      
      {items.length === 0 ? (
        <div>
          <p>Il tuo carrello è vuoto.</p>
          <Link to="/shop" className="btn btn-primary">
            Continua lo Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="row align-items-center">
                  <div className="col-md-2 col-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-4 col-8">
                    <h5>{item.name}</h5>
                    <p className="text-muted small">{item.category}</p>
                  </div>
                  <div className="col-md-2 col-4">
                    <span>{(item.price).toFixed(2)} €</span>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="quantity-control">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 col-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                      <button 
                        className="btn btn-sm text-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Riepilogo Ordine</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotale:</span>
                  <span>{items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)} €</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Spedizione:</span>
                  <span>5.00 €</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Totale:</strong>
                  <strong>{(items.reduce((acc, item) => acc + (item.price * item.quantity), 0) + 5).toFixed(2)} €</strong>
                </div>
                
                <button 
                  className="btn btn-primary w-100"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Elaborazione...
                    </>
                  ) : (
                    'Procedi al Checkout'
                  )}
                </button>
                
                <div className="d-flex justify-content-between mt-3">
                  <Link to="/shop" className="btn btn-outline-secondary btn-sm">
                    Continua lo Shopping
                  </Link>
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch(clearCart())}
                  >
                    Svuota Carrello
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage