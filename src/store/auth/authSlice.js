import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

// API base URL
const API_URL = 'http://localhost:3001'

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/users?email=${email}`)
      
      if (!response.ok) {
        throw new Error('Authentication failed')
      }
      
      const users = await response.json()
      const user = users.find(u => u.email === email && u.password === password)
      
      if (!user) {
        throw new Error('Email o password non validi')
      }
      
      // Create a user object without the password
      const authenticatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
      
      // Return the user object and a fake token
      return {
        user: authenticatedUser,
        token: `fake-jwt-token-${Math.random().toString(36).substring(2)}`
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Check if user already exists
      const checkResponse = await fetch(`${API_URL}/users?email=${userData.email}`)
      const existingUsers = await checkResponse.json()
      
      if (existingUsers.length > 0) {
        throw new Error('Questa email è già registrata')
      }
      
      // Add role to user data
      const newUser = {
        ...userData,
        role: 'user' // Default role for new users
      }
      
      // Create new user
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      
      if (!response.ok) {
        throw new Error('Registrazione fallita')
      }
      
      const user = await response.json()
      
      // Create a user object without the password
      const registeredUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
      
      // Return the user object and a fake token
      return {
        user: registeredUser,
        token: `fake-jwt-token-${Math.random().toString(36).substring(2)}`
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      
      if (token && user) {
        state.token = token
        state.user = user
      }
    },
    logoutUser: (state) => {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.info('Logout effettuato')
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        toast.success('Login effettuato con successo')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Handle registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        toast.success('Registrazione effettuata con successo')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { checkAuth, logoutUser } = authSlice.actions
export default authSlice.reducer