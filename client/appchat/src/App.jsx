import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/chat/Chat'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap"  
import Menu from './components/menu/Menu' 
function App() {

  return (
    <>
      <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<Chat/>} />
          <Route path="/auth/signin" element={<Login/>} />
          <Route path="/auth/signup" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      

     
    </>
  )
}

export default App
