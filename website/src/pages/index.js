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

// Gatsby seems to hijack all <a> tags and, if they do not begin with http://
// or https://, appends the path to the domain instead of setting the URL as
// expected.
export const checkLink = function (param) {
  const linkElements = ["http", "twitch", "www", ".ca", ".com"]

  if (!param.includes(" ") && linkElements.some(e => param.includes(e))) {
    if (!param.includes("http")) {
      param = "http://" + param
    }
    return <a href={param} target="_blank" rel="noreferrer">{param}</a>;
  } else {
    return param;
  }
};
