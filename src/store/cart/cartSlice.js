import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// Initial state
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0
}

// Calculate total from items
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// Save cart to localStorage
const saveCartToStorage = (items) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, imageUrl } = action.payload
      const quantity = action.payload.quantity || 1
      
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem) {
        existingItem.quantity += quantity
        toast.info(`Quantità aggiornata: ${name}`)
      } else {
        state.items.push({ id, name, price, quantity, imageUrl })
        toast.success(`Aggiunto al carrello: ${name}`)
      }
      
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload
      const itemToRemove = state.items.find(item => item.id === id)
      
      if (itemToRemove) {
        state.items = state.items.filter(item => item.id !== id)
        toast.info(`Rimosso dal carrello: ${itemToRemove.name}`)
      }
      
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id)
        toast.info('Articolo rimosso dal carrello')
      } else {
        const item = state.items.find(item => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      }
      
      state.total = calculateTotal(state.items)
      saveCartToStorage(state.items)
    },
    
    clearCart: (state) => {
      state.items = []
      state.total = 0
      saveCartToStorage([])
      toast.info('Carrello svuotato')
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer