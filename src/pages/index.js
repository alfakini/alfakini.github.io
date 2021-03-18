import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostCard from "../components/post-card"
import NewsletterCard from "../components/newsletter-card"

const IndexPage = ({ location, data }) => {
  const essays = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title="Essays">
      <div className="row align-items-center justify-content-center">
        <div className="col-sm-10 col-md-10 col-lg-8">
          <h2>Essays</h2>

          <hr className="mt-5" />

          {essays.map(post =>  {
            return (
              <>
                <PostCard data={post.node} />
                <hr />
              </>
            )
          })}

          <NewsletterCard />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 800
                  placeholder: BLURRED
                )
              }
            }
          }
          frontmatter {
            abstract
            category

            date(formatString: "DD MMM, YYYY")
            title
          }
        }
      }
    }
  }
`
