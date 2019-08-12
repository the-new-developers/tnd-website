import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(7),
  },
  button: {
    marginTop: theme.spacing(5),
  },
  meta: {
    marginTop: theme.spacing(5),
  },
  eventInfo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.75em",
    },
  },
}))

export default function EventPost({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const classes = useStyles()
  let path = frontmatter.link

  // Gatsby seems to hijack all <a> tags and, if they do not begin with http://
  // or https://, appends the path to the domain instead of setting the URL as
  // expected.
  if (path && !path.includes("http://")) path = "http://" + path

  return (
    <Layout>
      <Typography variant="overline">
        {frontmatter.type === "TND" ? "TND Workshop" : "Community Event"}
      </Typography>
      <Typography variant="h2" className={classes.title}>
        <Link to={markdownRemark.fields.slug}>{frontmatter.title}</Link>
      </Typography>
      <div className={classes.meta}>
        <Typography variant="h6" className={classes.eventInfo}>
          When: {frontmatter.date}
        </Typography>
        <Typography variant="h6" className={classes.eventInfo}>
          Where: {frontmatter.where}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.body}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Typography>
      {frontmatter.link ? (
        <Button
          variant="contained"
          href={path}
          color="secondary"
          className={classes.button}
        >
          Register
        </Button>
      ) : null}
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
        title
        date(formatString: "h:mma dddd, MMMM Do YYYY")
        where
        link
        type
      }
    }
  }
`
