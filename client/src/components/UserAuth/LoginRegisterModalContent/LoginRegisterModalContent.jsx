import { useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

const LoginRegisterModalContent = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      <span onClick={() => setShowLogin(true)}>Login</span>
      <span onClick={() => setShowLogin(false)}>Register</span>
      {
        showLogin
        ? <LoginForm />
        : <RegisterForm />
      }
    </>
  )
}

export default LoginRegisterModalContent