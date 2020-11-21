import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import EventListItem from "./event-list-item"
import { Typography, Divider } from "@material-ui/core"

class EventList extends React.Component {

  /**
   * Partitions the given events into two arrays: upcoming events and past events.
   * @param {Array} events The events to partition.
   * @returns {Array} The partitioned events.
   */
  partitionEvents(events){
    let upcomingEvents = [], pastEvents = []
    const dateToday = new Date()

    for (let i = 0; i < events.length; i++){
      if (new Date(events[i].node.frontmatter.date) >= dateToday)
        upcomingEvents.push(events[i])
      else
        pastEvents.push(events[i])
    }

    return [upcomingEvents, pastEvents]
  }

  render() {
    const { data } = this.props

    const [upcomingEvents, pastEvents] = this.partitionEvents(data.allMarkdownRemark.edges)

    // We use Array.prototype.find() here because
    // we are only expecting one featured post.
    const featuredPost =
      upcomingEvents &&
      upcomingEvents.find(({ node }) => {
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
            <EventListItem
              path={featuredPost.node.fields.slug}
              info={featuredPost.node}
            />{" "}
            { upcomingEvents.length > 1 
              ? 
              <div>
                <Divider style={{ marginTop: "50px", color: "#709255"}} /> 
                <Typography
                  variant="h5"
                  component="h3"
                  style={{ fontWeight: "300", color: "#FAFFF7" }}
                >
                  Upcoming Events
                </Typography>
              </div>
              : null 
            }
          </div>
        ) : null}
        
        {upcomingEvents &&
          upcomingEvents.map(({ node }) => {
            return (
              <div key={node.id}>
                {node.frontmatter.featured ? null : (
                  <EventListItem path={node.fields.slug} info={node} />
                )}
              </div>
            )
        })}
        { upcomingEvents.length === 0 
          ? <Typography variant="body1" style={{ fontStyle: "italic", marginTop: "50px" }}>There are no upcoming events currently scheduled.</Typography> 
          : null}
        <Divider style={{ marginTop: "50px", color: "#709255"}} />
        {pastEvents ? 
          <Typography
            variant="h5"
            component="h3"
            style={{ fontWeight: "300", color: "#FAFFF7" }}
          >
            Past Events
          </Typography> 
          : null
        }
          {pastEvents &&
            pastEvents.map(({ node }) => {
              return (
                <div key={node.id}>
                  <EventListItem path={node.fields.slug} info={node} />
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
EventList.propTypes = {
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
      query EventListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
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
    render={data => <EventList data={data} />}
  />
)
