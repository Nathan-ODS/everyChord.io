import { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { FaUserCircle, FaLock, FaExclamationTriangle } from 'react-icons/fa'
import './LoginForm.css'

const LoginForm = ({ onRegisterRedirect, closeModal }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)
  const { login } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    await login(userName, password, setErrorMessage, closeModal)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group'>
        <label htmlFor="userName"><FaUserCircle /> Your user name :</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div className='input-group'>
        <label htmlFor="password"><FaLock /> Your password :</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <span className='error-message'>
        {
          errorMessage && <><FaExclamationTriangle />{errorMessage}</>
        }
      </span>

      <button className='submit-button' type='submit'><b>Login</b></button>
      <span>New here ? <u className='signup' onClick={onRegisterRedirect}><b>Sign Up</b></u></span>
    </form>
  )
}

export default LoginForm