import { useState } from 'react'

const RegisterForm = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    console.log('trying to register ', userName, password)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName, password}),
      });

      if(res.ok) {

      }
    } catch (error) {
      setErrorMessage('Error while submitting data')
    }

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

      <button type="submit">Register</button>
    </form>
  )
}

export default RegisterForm