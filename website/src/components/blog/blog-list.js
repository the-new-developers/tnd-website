import { Divider, Typography } from "@material-ui/core"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Pagination from "../../common/pagination"
import BlogListItem from "./blog-list-item"

const BlogList = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const { data } = props;
  const posts = data.allMarkdownRemark.edges

  return (<div>
    <Divider style={{ marginTop: 45, color: "#709255" }} />
    <Typography
      variant="h5"
      component="h2"
      style={{ fontWeight: "300", color: "#FAFFF7" }}
    >Latest Posts</Typography>

    <Pagination count={posts.length}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      setCurrentPage={setCurrentPage}
      setRowsPerPage={setRowsPerPage} />

    {posts && posts.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
      .map(({ node }) => {
        return (
          <div key={node.id} style={{ marginTop: "50px" }}>
            <BlogListItem path={node.fields.slug} info={node} />
          </div>
        )
      })}
  </div>);
}

// propTypes allows us to define what type we expect the props to be.
// If the props do not conform to their expected type, we will be able
// to see a warning in the browser's developers tools.
BlogList.propTypes = {
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
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => <BlogList data={data} />}
  />
)
