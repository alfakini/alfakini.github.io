import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const EssayAbstractCard = ({ data }) => (
  <article className="post-card card border-0" key={data.fields.slug}>
    <div className="card-body">
      <div className="row gx-4 gy-3">
        <div className="col-sm-3 col-md-3">
          <div className="row gy-1 card-text">
            <div className="col-6 col-sm-12">
              <time
                className="post-date float-start text-muted"
                datetime={data.frontmatter.date}
                title={data.frontmatter.date}>
                {data.frontmatter.date}
              </time>
            </div>
            <div className="col-6 col-sm-12">
              <span className="post-category float-end float-sm-start text-uppercase text-muted">
                {data.frontmatter.category}
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <h2 className="post-title card-title h6">
            <Link className="stretched-link" to={data.fields.path}>
              {data.frontmatter.title}
            </Link>
          </h2>
          <p className="card-text line-clamp-sm-3">
            {data.frontmatter.abstract}
          </p>
        </div>
        <div className="col-sm-3 col-md-3">
          <GatsbyImage
            image={getImage(data.fields.cover)}
            alt={data.frontmatter.title}
            className="img-fluid float-end"
          />
        </div>
      </div>
    </div>
  </article>
)

export default EssayAbstractCard
