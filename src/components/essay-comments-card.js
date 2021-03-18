import React from "react"
import { Disqus } from "gatsby-plugin-disqus"

const EssayCommentsCard = ({ title, url, id }) => (
  <div className="card my-5 border-0">
    <div className="card-body">
      <Disqus config={{url: url, identifier: id, title: title}} />
    </div>
  </div>
)

export default EssayCommentsCard
