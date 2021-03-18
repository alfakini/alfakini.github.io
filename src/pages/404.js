import React from "react"

import sheepsImage from "../../assets/sheeps.png"
import Layout from "../components/layout"

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location} title="404 Not Found">
      <div style={{ textAlign: "center", marginBottom: "30px" }}>

        <h1>404 Not Found</h1>

        <p style={{ marginBottom: "20px" }}>
          The time is so little, the time belongs to us. <br />
          Why is everybody in such a fucking rush?
        </p>

        <img src={sheepsImage} alt="404 Not Found" />
      </div>
    </Layout>
  )
}

export default NotFoundPage
