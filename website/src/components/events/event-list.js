import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import Post from "../components/post"
import { Typography } from "@material-ui/core"

class EventList extends React.Component {

  /**
   * Our GraphQL query will fetch every event post. This method
   * will take those posts and filter them to return only those events
   * that will occur on today's date and beyond. 
   * 
   * The date for each post is also set in UTC, so passing them into a new Date object 
   * will convert them to the local time zone, and we will use the toLocaleTimeString and 
   * toLocalDateString methods to format the date. This is not as elegant as
   * it might have been with a Javascript date library like moment.js, however
   * using native Javascript functions avoids the overhead of importing an external
   * dependency.
   * 
   * This method also breaks the single responsibility principle, however the filter is
   * currently simple enough to justify its inclusion here. Should we need to filter
   * the posts on other criteria in the future, and be unable to do so in the query itself,
   * it would be worthwhile to refactor that into its own method.
   * 
   * @param { Array } posts The array of posts returned by the GraphQL query.
   * @returns { Array } The filtered and formatted array of posts.
   */
  filterAndFormatPosts = (posts) => {
    const dateToday = new Date()
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true}
    return posts
      .filter(post => new Date(post.node.frontmatter.date) >= dateToday)
      .map(post => { 
        const time = new Date(post.node.frontmatter.date).toLocaleTimeString('en-US', timeOptions)
        const date = new Date(post.node.frontmatter.date).toLocaleDateString('en-US', dateOptions)
        return { 
          ...post, 
          node: { 
            ...post.node,
            frontmatter: {
              ...post.node.frontmatter,
              date: time + ' ' + date
            }
          },
        }
      })
  }

  render() {
    const { data } = this.props

    // // We only want events that haven't happened yet.
    // const dateToday = new Date()
    const posts = data.allMarkdownRemark.edges
      //.filter(post => new Date(post.node.frontmatter.date) >= dateToday)

    // We use Array.prototype.find() here because
    // we are only expecting one featured post.
    const featuredPost =
      posts &&
      posts.find(({ node }) => {
        return node.frontmatter.featured
      })

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
          filter: {
            frontmatter: {
              templateKey: { eq: "event-post" }
            }
          }
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
                date
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
