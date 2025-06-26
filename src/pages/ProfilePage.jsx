/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { selectUserOrders, selectAllOrders, updateOrderStatus } from '../store/orders/ordersSlice'

function ProfilePage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const orders = useSelector((state) => 
    user.role === 'admin' ? selectAllOrders(state) : selectUserOrders(state, user.id)
  )
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })
  
  const [isEditing, setIsEditing] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Profilo aggiornato con successo')
    setIsEditing(false)
  }

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }))
    toast.success(`Stato dell'ordine aggiornato a: ${newStatus}`)
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning'
      case 'processing':
        return 'bg-info'
      case 'shipped':
        return 'bg-primary'
      case 'delivered':
        return 'bg-success'
      case 'cancelled':
        return 'bg-danger'
      default:
        return 'bg-secondary'
    }
  }
  
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="card-title h3">Il Tuo Profilo</h1>
                {!isEditing && (
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifica
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
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
                    <label htmlFor="address" className="form-label">Indirizzo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label">Città</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="postalCode" className="form-label">CAP</label>
                      <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Telefono</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Salva Modifiche
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Annulla
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-3">
                    <h5>Dettagli Personali</h5>
                    <p className="mb-1"><strong>Nome:</strong> {formData.name}</p>
                    <p className="mb-1"><strong>Email:</strong> {formData.email}</p>
                    <p className="mb-0"><strong>Ruolo:</strong> {user.role === 'admin' ? 'Amministratore' : 'Utente'}</p>
                  </div>
                  
                  <hr />
                  
                  <div className="mb-3">
                    <h5>Indirizzo di Spedizione</h5>
                    {formData.address ? (
                      <>
                        <p className="mb-1">{formData.address}</p>
                        <p className="mb-1">{formData.city}, {formData.postalCode}</p>
                        <p className="mb-0">{formData.phone}</p>
                      </>
                    ) : (
                      <p className="text-muted">
                        Nessun indirizzo di spedizione salvato. Clicca "Modifica" per aggiungerne uno.
                      </p>
                    )}
                  </div>
                  
                  <hr />
                  
                  <h5>{user.role === 'admin' ? 'Tutti gli Ordini' : 'I Tuoi Ordini'}</h5>
                  {orders.length === 0 ? (
                    <p className="text-muted">
                      {user.role === 'admin' ? 'Non ci sono ordini da visualizzare.' : 'Non hai ancora effettuato ordini.'}
                    </p>
                  ) : (
                    <div className="list-group">
                      {orders.map((order) => (
                        <div key={order.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <small className="text-muted">
                              Ordine #{order.id} - {new Date(order.date).toLocaleDateString()}
                            </small>
                            {user.role === 'admin' ? (
                              <select
                                className={`form-select form-select-sm w-auto ${getStatusBadgeClass(order.status)}`}
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              >
                                <option value="pending">In attesa</option>
                                <option value="processing">In lavorazione</option>
                                <option value="shipped">Spedito</option>
                                <option value="delivered">Consegnato</option>
                                <option value="cancelled">Annullato</option>
                              </select>
                            ) : (
                              <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                {order.status === 'pending' && 'In attesa'}
                                {order.status === 'processing' && 'In lavorazione'}
                                {order.status === 'shipped' && 'Spedito'}
                                {order.status === 'delivered' && 'Consegnato'}
                                {order.status === 'cancelled' && 'Annullato'}
                              </span>
                            )}
                          </div>
                          {order.items.map((item) => (
                            <div key={item.id} className="d-flex align-items-center mb-2">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="me-2" 
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                              <div>
                                <p className="mb-0">{item.name}</p>
                                <small className="text-muted">
                                  Quantità: {item.quantity} - {(item.price * item.quantity).toFixed(2)} €
                                </small>
                              </div>
                            </div>
                          ))}
                          <div className="d-flex justify-content-end">
                            <strong>Totale: {order.total.toFixed(2)} €</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage