import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../store/products/productsSlice'
import { toast } from 'react-toastify'

function AdminDashboardPage() {
  const dispatch = useDispatch()
  const { products, status, error } = useSelector((state) => state.products)
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: 'collane',
    imageUrl: '',
    stock: ''
  })
  
  const [isEditing, setIsEditing] = useState(false)
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? 
        (value === '' ? '' : parseFloat(value)) : 
        value
    })
  }
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Il nome è obbligatorio')
      return false
    }
    if (!formData.description.trim()) {
      toast.error('La descrizione è obbligatoria')
      return false
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Il prezzo deve essere maggiore di 0')
      return false
    }
    if (!formData.imageUrl.trim()) {
      toast.error('L\'URL dell\'immagine è obbligatorio')
      return false
    }
    if (!formData.stock || formData.stock < 0) {
      toast.error('La disponibilità deve essere almeno 0')
      return false
    }
    return true
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (isEditing) {
      // Update existing product
      dispatch(updateProduct({
        id: formData.id,
        productData: formData
      }))
      .unwrap()
      .then(() => {
        toast.success('Prodotto aggiornato con successo')
        resetForm()
      })
      .catch((error) => {
        toast.error(`Errore: ${error}`)
      })
    } else {
      // Create new product
      dispatch(createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success('Prodotto creato con successo')
        resetForm()
      })
      .catch((error) => {
        toast.error(`Errore: ${error}`)
      })
    }
  }
  
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock
    })
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      dispatch(deleteProduct(id))
      .unwrap()
      .then(() => {
        toast.success('Prodotto eliminato con successo')
      })
      .catch((error) => {
        toast.error(`Errore: ${error}`)
      })
    }
  }
  
  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'collane',
      imageUrl: '',
      stock: ''
    })
    setIsEditing(false)
  }
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Dashboard Admin</h1>
      
      {/* Product Form */}
      <div className="admin-controls mb-5">
        <h3 className="mb-3">{isEditing ? 'Modifica Prodotto' : 'Aggiungi Nuovo Prodotto'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nome Prodotto</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="category" className="form-label">Categoria</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="collane">Collane</option>
                <option value="anelli">Anelli</option>
                <option value="orecchini">Orecchini</option>
                <option value="accessori">Accessori</option>
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrizione</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Prezzo (€)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="stock" className="form-label">Disponibilità</label>
              <input
                type="number"
                min="0"
                className="form-control"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="imageUrl" className="form-label">URL Immagine</label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Aggiorna' : 'Aggiungi'} Prodotto
            </button>
            {isEditing && (
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={resetForm}
              >
                Annulla
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Products Table */}
      <h3 className="mb-3">Prodotti ({products.length})</h3>
      
      {status === 'loading' ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover admin-table">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Immagine</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Prezzo</th>
                <th>Disp.</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width="50"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price.toFixed(2)} €</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(product)}
                      >
                        Modifica
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Elimina
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboardPage