import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Shopping</h4>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>

      <div className="footer-section">
        <h5>Quick Links</h5>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h5>Follow Us</h5>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
