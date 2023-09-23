import { useState } from 'react'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import './LoginRegisterModalContent.css'

const LoginRegisterModalContent = ({ closeModal }) => {
  const [showLogin, setShowLogin] = useState(true)

  function handleRegisterRedirect() {
    setShowLogin(false)
  }

  function handleLoginRedirect() {
    setShowLogin(true)
  }

  return (
    <div className='modal'>
      <div className='modal-navigation'>
        <h3 className={showLogin ? 'modal-navigation__login selected-tab' : 'modal-navigation__login'} onClick={() => setShowLogin(true)}>Login</h3>
        <h3 className={showLogin ? 'modal-navigation__register' : 'modal-navigation__register selected-tab'} onClick={() => setShowLogin(false)}>Register</h3>
      </div>
      <div className='modal-form'>
        {
          showLogin
            ? <LoginForm onRegisterRedirect={handleRegisterRedirect} closeModal={closeModal} />
            : <RegisterForm onLoginRedirect={handleLoginRedirect} closeModal={closeModal} />
        }
      </div>
    </div>
  )
}

export default LoginRegisterModalContent