import React from "react"
import { graphql } from "gatsby"
import BlogList from "../components/blog/blog-list"
import Layout from "../components/layout"
import EventListItem from "../components/events/event-list-item"
import SEO from "../components/seo"

export default function IndexPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const dateToday = new Date()
  const featuredPost = data.allMarkdownRemark.edges && new Date(data.allMarkdownRemark.edges[0].node.frontmatter.date) >= dateToday
    ? data.allMarkdownRemark.edges[0]
    : null

  return (
    <Layout>
      <SEO title="Home" />
      { featuredPost && <EventListItem path={featuredPost.node.fields.slug} info={featuredPost.node} />}
      <BlogList />
    </Layout>
  )
}

/**
 * This query retrieves all featured events
 */
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
            date
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
