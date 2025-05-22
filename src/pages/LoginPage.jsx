import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/auth/authSlice'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error } = useSelector((state) => state.auth)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        // Error is handled in the slice
      })
  }
  
  return (
    <div className="container py-5">
      <div className="auth-form">
        <h2>Accedi</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
          
          <div className="text-center mt-3">
            <p>Non hai un account? <Link to="/register">Registrati</Link></p>
          </div>
        </form>
        
        <div className="mt-4">
          <div className="alert alert-info" role="alert">
            <h5>Credenziali Demo</h5>
            <p className="mb-1"><strong>Admin:</strong> admin@coccibelli.com / admin123</p>
            <p className="mb-0"><strong>Utente:</strong> user@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage