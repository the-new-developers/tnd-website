import { Divider, Typography } from "@material-ui/core"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import EventListItem from "./event-list-item"
import Pagination from "../../common/pagination";

const EventList = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  /**
   * Partitions the given events into two arrays: upcoming events and past events.
   * @param {Array} events The events to partition.
   * @returns {Array} The partitioned events.
   */
  const partitionEvents = (events) => {
    let upcomingEvents = [], pastEvents = []
    const dateToday = new Date()

    for (let i = 0; i < events.length; i++) {
      if (new Date(events[i].node.frontmatter.date) >= dateToday)
        upcomingEvents.push(events[i])
      else
        pastEvents.push(events[i])
    }

    return [upcomingEvents, pastEvents]
  }

  const { data } = props

  const [upcomingEvents, pastEvents] =
    partitionEvents(data.allMarkdownRemark.edges)

  // We use Array.prototype.find() here because
  // we are only expecting one featured post.
  const featuredPost = upcomingEvents && upcomingEvents
    .find(({ node }) => node.frontmatter.featured)

  return (
    <div>
      <Typography
        variant="h4"
        component="h2"
        style={{ fontWeight: "300", color: "#FAFFF7" }}
      >Events</Typography>

      {featuredPost ? (
        <div>
          <EventListItem
            path={featuredPost.node.fields.slug}
            info={featuredPost.node}
          />{" "}
          {upcomingEvents.length > 1 ? <div>
            <Divider style={{ marginTop: "50px", color: "#709255" }} />
            <Typography
              variant="h5"
              component="h3"
              style={{ fontWeight: "300", color: "#FAFFF7" }}
            >Upcoming Events</Typography>
          </div> : null}
        </div>) : null}

      <Pagination count={pastEvents.length}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage} />

      {upcomingEvents && upcomingEvents.map(({ node }) => {
        return (
          <div key={node.id}>
            {node.frontmatter.featured ? null : (
              <EventListItem path={node.fields.slug} info={node} />
            )}
          </div>
        )
      })}

      {upcomingEvents.length === 0
        ? <Typography variant="body1" style={{ fontStyle: "italic", marginTop: "50px" }}>There are no upcoming events currently scheduled.</Typography> : null}

      <Divider style={{ marginTop: "50px", color: "#709255" }} />

      {pastEvents ? <Typography
        variant="h5"
        component="h3"
        style={{ fontWeight: "300", color: "#FAFFF7" }}
      >Past Events</Typography> : null}

      {pastEvents && pastEvents.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
        .map(({ node }) => {
          return (<div key={node.id}>
            <EventListItem path={node.fields.slug} info={node} />
          </div>)
        })}
    </div>
  )
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
const Query = () => (
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
);

export default Query;
