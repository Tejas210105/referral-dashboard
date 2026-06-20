import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>Go Business</h3>

        <nav className="footer-nav">
          <a href="/">About</a>
          <a href="/">Privacy</a>
        </nav>
      </div>

      <p className="footer-copy">
        © 2024 Go Business
      </p>
    </footer>
  )
}

export default Footer