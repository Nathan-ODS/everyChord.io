import { useState } from 'react'
import { FaUserCircle, FaLock, FaExclamationTriangle } from 'react-icons/fa'
import './RegisterForm.css'
import { toast } from 'react-toastify'

const RegisterForm = ({ onLoginRedirect, closeModal }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      if (!res.ok) {
        const error = await res.json()
        setErrorMessage(error.message)
        return
      } else {
        toast.success('Registration Successful')
        onLoginRedirect()
      }
    } catch (error) {
      setErrorMessage('Error while submitting data')
    }

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

      <button className='submit-button' type='submit'><b>Register</b></button>
      <span>Already registered ? <u className='log-in' onClick={onLoginRedirect}><b>Log in</b></u></span>
    </form>
  )
}

export default RegisterForm