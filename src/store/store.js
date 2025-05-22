import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './products/productsSlice'
import cartReducer from './cart/cartSlice'
import authReducer from './auth/authSlice'
import ordersReducer from './orders/ordersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer
  }
})