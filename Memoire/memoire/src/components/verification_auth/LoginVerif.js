import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom/dist'
import { useAuth } from '../../hooks/useAuth'

function LoginVerif() {
    const navigate=useNavigate()
    const {user}=useAuth()
  return user?navigate(-1):<Outlet/>
}

export default LoginVerif