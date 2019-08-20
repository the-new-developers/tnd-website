import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(7),
  },
  meta: {
    marginTop: theme.spacing(5),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.75em",
    },
  },
}))

export default function BlogPost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles()
  return (
    <Layout>
      <Typography variant="h2" className={classes.title}>
        <Link to={markdownRemark.fields.slug}>{frontmatter.title}</Link>
      </Typography>
      <div className={classes.meta}>
        <Typography variant="h6">Written by {frontmatter.author}</Typography>
        <Typography variant="overline">{frontmatter.date}</Typography>
      </div>
      <Typography variant="body" className={classes.body}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
