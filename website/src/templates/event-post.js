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

/**
 * We store the date and time for each event in UTC, so this method converts that
 * to local time. 
 * 
 * Passing it into a new Date object will convert it to the local time zone, 
 * and we will use the toLocaleTimeString and toLocalDateString methods to format the date. 
 * This is not as elegant as it might have been with a Javascript date library like moment.js, 
 * however using native Javascript functions avoids the overhead of importing an external
 * dependency.
 * 
 * @param {string} dateUtc The event date in UTC.
 * @returns {string} The converted and formatted date to be presented in the post.
 */
const formatDate = (dateUtc) => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true }
  const time = new Date(dateUtc).toLocaleTimeString('en-US', timeOptions)
  const date = new Date(dateUtc).toLocaleDateString('en-US', dateOptions)
  return time + ' ' + date
}

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
  if (!path) path = frontmatter.where

  function checkLink(param) {
    const someDomain = ["http", "twitch", "www", ".ca", ".com"]

    if (!param.includes(" ") && someDomain.some(val => param.includes(val))) {
      if (!param.includes("http")) param = "http://" + param
      return param.includes("http") ? <Typography variant="a" component={Link} to={param}>{param}</Typography> : param;
    } else return param;
  }

  return (
    <Layout>
      <Typography variant="overline">
        {frontmatter.type === "The New Developers"
          ? "TND Workshop"
          : "Community Event"}
      </Typography>
      <Typography variant="h2" className={classes.title}>
        <Link to={markdownRemark.fields.slug}>{frontmatter.title}</Link>
      </Typography>
      <div className={classes.meta}>
        <Typography variant="h6" className={classes.eventInfo}>
          When: {formatDate(frontmatter.date)}
        </Typography>
        <Typography variant="h6" className={classes.eventInfo}>
          Where: {checkLink(path)}
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
          className={classes.button}>
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
        date
        where
        link
        type
      }
    }
  }
`
