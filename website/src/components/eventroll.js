import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import Post from "../components/post"
import { Typography, Divider } from "@material-ui/core"

class EventRoll extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    // We use Array.prototype.find() here because
    // we are only expecting one featured post.
    const featuredPost =
      posts &&
      posts.find(({ node }) => {
        return node.frontmatter.featured
      })
    console.log(featuredPost)
    return (
      <div>
        <Typography
          variant="h4"
          component="h2"
          style={{ fontWeight: "300", color: "#FAFFF7" }}
        >
          Events
        </Typography>
        {featuredPost ? (
          <div>
            <Post
              path={featuredPost.node.fields.slug}
              info={featuredPost.node}
            />{" "}
          </div>
        ) : null}
        {posts &&
          posts.map(({ node }) => {
            return (
              <div key={node.id}>
                {node.frontmatter.featured ? null : (
                  <Post path={node.fields.slug} info={node} />
                )}
              </div>
            )
          })}
      </div>
    )
  }
}

// propTypes allows us to define what type we expect the props to be.
// If the props do not conform to their expected type, we will be able
// to see a warning in the browser's developers tools.
EventRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

// StaticQuery must be used in all components outside the pages directory.
// These static GraphQL queries can be placed anywhere in the codebase.
export default () => (
  <StaticQuery
    query={graphql`
      query EventRollQuery {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "event-post" } } }
        ) {
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
            }
          }
        }
      }
    `}
    render={data => <EventRoll data={data} />}
  />
)
