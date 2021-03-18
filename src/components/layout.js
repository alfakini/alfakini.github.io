import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"

import { useSiteMetadata } from "../hooks/site-metadata"

const Layout = ({ location, title, description, children }) => {
  const siteMetadata = useSiteMetadata()

  return (
    <>
      <SEO location={location} title={`${siteMetadata.title} - ${title}`} description={description} />
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <Header />
          </div>
        </div>
      </div>

      <main className="container-lg">
        <div className="row">
          <div className="col-12">
            {children}
          </div>
        </div>
      </main>

      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
