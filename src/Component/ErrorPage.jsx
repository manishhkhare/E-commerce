import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return  <div className="error-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! Page not found.</p>
      <Link to="/Home" className="back-home">Go to Home</Link>
    </div>
}
