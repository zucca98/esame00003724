import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  status: 'idle',
  error: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload
      const order = state.orders.find(order => order.id === orderId)
      if (order) {
        order.status = status
      }
    },
    clearOrders: (state) => {
      state.orders = []
    }
  }
})

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions

// Selettore per filtrare gli ordini in base all'utente
export const selectUserOrders = (state, userId) => {
  return state.orders.orders.filter(order => order.userId === userId)
}

// Selettore per gli admin che possono vedere tutti gli ordini
export const selectAllOrders = (state) => state.orders.orders

export default ordersSlice.reducer