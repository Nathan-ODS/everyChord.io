import { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext'

const RegisterForm = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)
  const { login } = useAuth()

  async function handleSubmit(event) {

    event.preventDefault(); // Prevent default form submission behavior

    console.log('trying to login ', userName, password)
    await login(userName, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">UserName :</label>
      <input
        type="text"
        id="userName"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />

      <label htmlFor="password">Password :</label>
      <input
        type="text"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {
        errorMessage && <p className='error-message'>{errorMessage}</p>
      }

      <button type="submit">Login</button>
    </form>
  )
}

export default RegisterForm