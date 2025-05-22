import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/auth/authSlice'

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleToggle = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Coccibelli
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleToggle}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/')}`} 
                to="/" 
                onClick={() => setIsNavCollapsed(true)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/about')}`} 
                to="/about" 
                onClick={() => setIsNavCollapsed(true)}
              >
                Chi Siamo
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/shop')}`} 
                to="/shop" 
                onClick={() => setIsNavCollapsed(true)}
              >
                Articoli
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/contact')}`} 
                to="/contact" 
                onClick={() => setIsNavCollapsed(true)}
              >
                Contatti
              </Link>
            </li>
            
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/admin')}`} 
                  to="/admin" 
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Admin
                </Link>
              </li>
            )}
            
            {user ? (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${isActive('/profile')}`} 
                    to="/profile" 
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    Profilo
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn-link nav-link" 
                    onClick={() => {
                      handleLogout()
                      setIsNavCollapsed(true)
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${isActive('/login')}`} 
                  to="/login" 
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Accedi
                </Link>
              </li>
            )}
            
            <li className="nav-item">
              <Link 
                className="cart-link" 
                to="/cart" 
                onClick={() => setIsNavCollapsed(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                {cartItemCount > 0 && (
                  <span className="cart-badge">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

