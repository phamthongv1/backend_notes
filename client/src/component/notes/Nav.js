/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header className="container-note header">
      <div className="logo">
        <Link to="/">Your notes</Link>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Note</Link>
          </li>
          <li onClick={logoutSubmit}>
            <button className="btnLogout">
              <span>
                <i className="fas fa-sign-out-alt"></i>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
