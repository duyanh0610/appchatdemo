import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/chat/Chat'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import Menu from './components/menu/Menu'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import { ChatContextProvider } from './contexts/ChatContext'
function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
        <ChatContextProvider user ={user}>
          <Menu />
          <Container  className='bg-dark'>
            <Routes>
              <Route path="/" element={user ? <Chat /> : <Navigate to="/auth/signin" />} />
              <Route path="/auth/signin" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/auth/signup" element={user ? <Navigate to="/" /> : <Register />} />
              <Route path="auth/logout" />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </ChatContextProvider>

    </>
  )
}

export default App
