const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const essayTemplate = path.resolve("./src/templates/essay-template.js")

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    fragment MarkdownRemarkFieldsFragment on MarkdownRemarkEdge {
      node {
        fields {
          abstract
          authors
          category
          cover {
            childImageSharp {
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
              )
            }
          }
          date
          id
          published
          slug
          tags
          title
        }
      }
    }

    query {
      books: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/(books)/"  }}
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          ...MarkdownRemarkFieldsFragment
        }
      }

      essays: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/(essays)/"  }}
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          ...MarkdownRemarkFieldsFragment
        }
      }

    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const essays = result.data.essays.edges

  essays.forEach((essay, index) => {
    const previous = index === essays.length - 1 ? null : essays[index + 1].node
    const next = index === 0 ? null : essays[index - 1].node

    console.log(`/essays${essay.node.fields.slug}`)
    actions.createPage({
      path: `/essays${essay.node.fields.slug}`,
      component: essayTemplate,
      context: {
        slug: essay.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const books = result.data.books.edges

  books.forEach((book, index) => {
    const previous = index === books.length - 1 ? null : books[index + 1].node
    const next = index === 0 ? null : books[index - 1].node

    console.log(`/books${book.node.fields.slug}`)
    actions.createPage({
      path: `/books${book.node.fields.slug}`,
      component: essayTemplate,
      context: {
        slug: book.node.fields.slug,
        previous,
        next,
      },
    })
  })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === "MarkdownRemark") {
    actions.createNodeField({ name: "id", node, value: node.id })
    actions.createNodeField({ name: "type", node, value: node.frontmatter.type || "" })

    actions.createNodeField({ name: "abstract", node, value: node.frontmatter.abstract })
    actions.createNodeField({ name: "authors", node, value: node.frontmatter.authors })
    actions.createNodeField({ name: "category", node, value: node.frontmatter.category })
    actions.createNodeField({ name: "cover", node, value: node.frontmatter.cover })
    actions.createNodeField({ name: "date", node, value: node.frontmatter.date ? node.frontmatter.date.split(" ")[0] : "" })
    actions.createNodeField({ name: "images", node, value: node.frontmatter.images })
    actions.createNodeField({ name: "published", node, value: node.frontmatter.published })
    actions.createNodeField({ name: "slug", node, value: createFilePath({ node, getNode }) })
    actions.createNodeField({ name: "tags", node, value: node.frontmatter.tags })
    actions.createNodeField({ name: "title", node, value: node.frontmatter.title })
  }
}
