import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import PrivateRoutes from './components/PrivateRoutes'
import Register from './pages/Register'
import Student from './pages/Student'
import { backendConfig } from './config'
import Teacher from './pages/Teacher'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false)
  const [role, setRole] = useState(backendConfig.userDetails?.role || '')
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      role === "teacher" ? navigate('/teacher') : navigate('/student')
    }
    // console.log(backendConfig.userDetails.role)
  }, [])

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Student />} path="/student" exact />
          <Route element={<Teacher />} path="/teacher" exact />
        </Route>
        <Route element={<Login setRole={setRole} />} path="/login" />
        <Route element={<Register setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} path="/register" />
      </Routes>

    </>
  )
}

export default App
