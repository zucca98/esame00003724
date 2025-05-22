import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <div className="py-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Pagina Non Trovata</h2>
        <p className="lead mb-5">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link to="/" className="btn btn-primary">
          Torna alla Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage