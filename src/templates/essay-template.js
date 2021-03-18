import React from "react"
import { graphql } from "gatsby"

import { useSiteMetadata } from "../hooks/site-metadata"

import Layout from "../components/layout"
import NewsletterCard from "../components/newsletter-card"
import EssayCommentsCard from "../components/essay-comments-card"
import EssayAuthorCard from "../components/essay-author-card"
import EssayShareCard from "../components/essay-share-card"

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
            <header className="mb-5">
              <h2 className="mb-2">{post.frontmatter.title}</h2>
              <EssayAuthorCard author={author.name} date={post.frontmatter.date} />
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <EssayShareCard url={location.href} />
          <NewsletterCard />
          <EssayCommentsCard
            title={post.frontmatter.title}
            url={location.href}
            id={post.frontmatter.slug}
          />
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
        slug
      }
    }
  }
`
