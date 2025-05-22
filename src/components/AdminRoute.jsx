import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth)
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/" />
  }
  
  return children
}

export default AdminRoute