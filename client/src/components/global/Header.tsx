import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import Menu from './Menu'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark p-3">
        <Link className=" navbar-brand text-light fw-bold" to="/">QT BLOG</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i className="bi bi-list-ul text-light"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <Search />
          <Menu />
        </div>
    </nav>
  )
}

export default Header
