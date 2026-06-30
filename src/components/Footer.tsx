import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Get in touch</h2>
          <p className="footer-email">cxu429 at wisc dot edu</p>
          <div className="footer-links" aria-label="Footer links">
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/Luc4xz" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer">
              Scholar
            </a>
            <a href="https://www.linkedin.com/in/cxu429" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="/cv/CV.pdf" target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </div>
        </div>
        <a className="visitor-map" href="https://mapmyvisitors.com/web/1c62b" title="Visit tracker">
          <img
            className="visitor-map-light"
            src="https://mapmyvisitors.com/map.png?cl=1e1a17&w=300&t=n&d=o_R7wTqz9IRTFt595mF9P2e9w4F4akfhD_NWgqIPOEc&co=ffffff&ct=1e1a17"
            alt="MapMyVisitors visitor tracker"
            loading="lazy"
          />
          <img
            className="visitor-map-dark"
            src="https://mapmyvisitors.com/map.png?cl=ffffff&w=300&t=n&d=o_R7wTqz9IRTFt595mF9P2e9w4F4akfhD_NWgqIPOEc&co=1e1a17&ct=1e1a17"
            alt="MapMyVisitors visitor tracker"
            loading="lazy"
          />
        </a>
      </div>
      <p className="copyright">@ 2026 Chengran Xu</p>
    </footer>
  );
}
