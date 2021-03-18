const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const essayTemplate = path.resolve("./src/templates/essay-template.js")

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    fragment MarkdownRemarkFieldsFragment on MarkdownRemarkEdge {
      node {
        fileAbsolutePath
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
          path
          published
          slug
          tags
          title
          type
        }
      }
    }

    query {
      contents: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
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

  const contents = result.data.contents.edges

  contents.forEach((content, index) => {
    const previous = index === contents.length - 1 ? null : contents[index + 1].node
    const next = index === 0 ? null : contents[index - 1].node

    console.log(content.node.fields.path)
    actions.createPage({
      path: content.node.fields.path,
      component: essayTemplate,
      context: {
        slug: content.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === "MarkdownRemark") {
    actions.createNodeField({ name: "id", node, value: node.id })

    const slug = createFilePath({ node, getNode })
    const [found] = node.fileAbsolutePath.match(/content\/(\w+)\//g)
    const type = found.split('/')[1]
    const path = `/${type}${slug}`
    actions.createNodeField({ name: "type", node, value: type })
    actions.createNodeField({ name: "path", node, value: path })

    actions.createNodeField({ name: "abstract", node, value: node.frontmatter.abstract })
    actions.createNodeField({ name: "authors", node, value: node.frontmatter.authors })
    actions.createNodeField({ name: "category", node, value: node.frontmatter.category })
    actions.createNodeField({ name: "cover", node, value: node.frontmatter.cover })
    actions.createNodeField({ name: "date", node, value: node.frontmatter.date ? node.frontmatter.date.split(" ")[0] : "" })
    actions.createNodeField({ name: "images", node, value: node.frontmatter.images })
    actions.createNodeField({ name: "published", node, value: node.frontmatter.published })
    actions.createNodeField({ name: "slug", node, value: slug })
    actions.createNodeField({ name: "tags", node, value: node.frontmatter.tags })
    actions.createNodeField({ name: "title", node, value: node.frontmatter.title })
  }
}
