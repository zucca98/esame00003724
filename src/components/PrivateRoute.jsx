import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.auth)
  
  if (!user) {
    return <Navigate to="/login" />
  }
  
  return children
}

export default PrivateRoute