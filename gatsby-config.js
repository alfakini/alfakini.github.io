module.exports = {
  siteMetadata: {
    title: "alfakini.com",
    author: {
      name: "Alan R. Fachini",
      summary: "Essays about software development, blockchain and entrepreneurship.",
    },
    description: "Essays about software development, blockchain and entrepreneurship.",
    siteUrl: "https://alfakini.com",
    rssUrl: "https://alfakini.com/rss.xml",
    keywords:
      "software development,software engineering,software,tecnology,blockchain,bitcoin,ethereum,polkadot,kusama,web3,decentralization,rust,python,ruby,rails,data science,machine learning,management,entrepreneurship,entrepreneur",
    socialUsers: {
      twitter: "alfakini",
      instagram: "alfachini",
      facebook: "alfakini",
      facebook_app_id: "2341370742766461",
      facebook_admins: "100000496399542",
      github: "alfakini",
      linkedin: "alfachini",
      goodreads: "10157034-alan",
      stackoverflow: "732973/alfakini",
    },
    socialLinks: {
      twitter: "https://twitter.com/alfakini",
      instagram: "https://instagram.com/alfachini",
      github: "https://github.com/alfakini",
      linkedin: "https://www.linkedin.com/in/alfachini",
      goodreads: "https://www.goodreads.com/user/show/10157034-alan",
      stackoverflow: "https://stackoverflow.com/users/732973/alfakini",
    },
  },


  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/notes`,
        name: "Notes",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/essays`,
        name: "Essays",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/books`,
        name: "Books",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/papers`,
        name: "Papers",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/talks`,
        name: "Talks",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "alfakini.com RSS Feed",
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-check-links",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-numbered-footnotes",
          "gatsby-remark-responsive-iframe",
           {
              resolve: "gatsby-remark-external-links",
              options: {
                target: "_blank",
                rel: "nofollow noopener noreferrer"
              }
          },
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: "alfakini",
              gistDefaultCssInclude: true,
              gistCssPreload: false,
            }
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: true,
            }
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          includePaths: [
            "src/styles",
            "node_modules/bootstrap/scss"
          ],
        }
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-9281876-3",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.alfakini.com",
        sitemap: "https://www.alfakini.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "alfakini.com",
        short_name: "alfakini",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#181818",
        display: "browser",
        icon: "assets/logo.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    {
      resolve: "gatsby-plugin-disqus",
      options: {
          shortname: "alfakini"
      }
    },
  ],
};
