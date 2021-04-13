import React from "react"
import { Link } from "gatsby"

import { useSiteMetadata } from "../hooks/site-metadata"

import logo from "../../assets/logo.png"

const Header = () => {
  const { title } = useSiteMetadata()

  return (
    <header className="bg-body d-flex flex-column flex-md-row align-items-center pb-3 px-md-4 mt-3 mb-5">
      <Link className="nav-logo my-2 me-md-auto h4" to="/">
        <img src={logo} alt={title} className="align-middle" style={{width: "50px"}} />

        <span className="mx-2">alfakini</span>
      </Link>
      <nav className="my-2 mb-3 my-md-0 me-md-3">
        <Link to="/" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">Essays</Link>
        {/* <Link to="/about" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">About</Link>
        <Link to="/notes" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">Notes</Link> */}
        <a href="http://magrathealabs.com" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">Magrathea</a>
        <a href="http://makersnetwork.cc" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">Makers Network</a>
        <a href="http://www.fablabjoinville.com.br/" className="p-2 nav-link text-weigth-500 text-decoration-none text-dark">Fab Lab</a>
      </nav>
      <Link to="#newsletter" className="btn btn-outline-primary py-2 px-4 me-md-2" role="button">Newsletter</Link>
    </header>
  )
}

export default Header
