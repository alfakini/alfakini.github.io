import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
          description
          keywords
          rssUrl
          siteUrl
          title
          socialLinks {
            github
            goodreads
            instagram
            linkedin
            stackoverflow
            twitter
          }
          socialUsers {
            facebook
            facebook_app_id
            facebook_admins
            twitter
          }
        }
      }
    }
  `)

  return site.siteMetadata
}
