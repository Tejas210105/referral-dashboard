import {useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const token = Cookies.get('jwt_token')

  if (token) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const userDetails = {
      email,
      password,
    }

    try {
      const response = await fetch(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        },
      )

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.data.token)

        navigate('/', {replace: true})
      } else {
        setErrorMsg(data.message || 'Login failed')
      }
    } catch {
      setErrorMsg('Something went wrong')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="brand-name">Go Business</h1>

        <p className="login-text">
          Sign in to access your referral dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="field-container">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="error-message">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login