import React from "react"
import { graphql } from "gatsby"
import BlogList from "../components/blog/blog-list"
import Layout from "../components/layout"
import EventListItem from "../components/events/event-list-item"
import SEO from "../components/seo"

export default function IndexPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const today = new Date();
  const mostRecentFeaturedEvent = data.allMarkdownRemark.edges &&
    data.allMarkdownRemark.edges.sort((firstEdge, secondEdge) => new Date(secondEdge.node.frontmatter.date) - new Date(firstEdge.node.frontmatter.date))[0];
  const featuredPost = new Date(mostRecentFeaturedEvent.node.frontmatter.date) >= today 
    ? mostRecentFeaturedEvent 
    : null;

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
