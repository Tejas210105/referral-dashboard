import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Go Business
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </nav>
  )
}

export default Navbar