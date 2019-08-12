import React from "react"
import { graphql } from "gatsby"
import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

export default function IndexPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const featuredPost = data.allMarkdownRemark.edges[0] // There should only be one featured event.
  return (
    <Layout>
      <SEO title="Home" />
      <Post path={featuredPost.node.fields.slug} info={featuredPost.node} />
      <div style={{ marginTop: 50 }} />
      <BlogRoll />
    </Layout>
  )
}

export const pageQuery = graphql`
  query FeaturedEventQuery {
    allMarkdownRemark(filter: { frontmatter: { featured: { eq: true } } }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "h:mma dddd, MMMM Do YYYY")
            where
            link
            featured
            type
          }
          html
        }
      }
    }
  }
`
