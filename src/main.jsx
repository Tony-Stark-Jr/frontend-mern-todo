import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'



export const server = 'https://nodejs-todoapp-saw4.onrender.com/api/v1'


export const Context = createContext({ isAuthenticated: false });

const AppWarpper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWarpper />
  </React.StrictMode>,
)
