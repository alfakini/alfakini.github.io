import React from "react"
import { graphql } from "gatsby"

import avatarImage from "../../assets/avatar.png"
import { useSiteMetadata } from "../hooks/site-metadata"

import Layout from "../components/layout"
import NewsletterCard from "../components/newsletter-card"

const EssayAuthorCard = ({ author, date }) => {
  return (
    <div className="card border-0">
      <div className="row g-2">
        <div className="col-auto">
          <img
            src={avatarImage}
            alt={author}
            width="40"
            style={{ marginTop: "4px", borderRadius: "100%" }}
          />
        </div>
        <div className="col">
            <span className="card-title">
              Written by <span className="fw-bold">{author}</span>
            </span>
            <br />
            <span className="card-text">
              <time
                className="post-date float-start text-muted"
                datetime={date}
                title={date}>
                {date}
              </time>
            </span>
        </div>
      </div>
    </div>
  )
}

const EssayTemplate = ({ data, _pageContext, location }) => {
  const siteMetadata = useSiteMetadata()
  const { author } = siteMetadata

  const post = data.markdownRemark
  // const { _previous, _next } = pageContext

  return (
    <Layout location={location} title={post.frontmatter.title} description={post.frontmatter.abstract || post.excerpt}>
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-10 col-md-10 col-lg-8">
          <article className="post">
            <header className="mb-4">
              <h2 className="mb-2">{post.frontmatter.title}</h2>
              <EssayAuthorCard author={author.name} date={post.frontmatter.date} />
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <NewsletterCard />
        </div>
      </div>
    </Layout>
  )
}

export default EssayTemplate

export const pageQuery = graphql`
  query EssayBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        abstract
        date(formatString: "MMM DD, YYYY")
        title
      }
    }
  }
`
