import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { checkLink } from "../common/check-link"

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(7)
  },
  meta: {
    marginTop: theme.spacing(5)
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.75em",
    },
  },
}))

export default function OpportunitiesPost({
  data
}) {
  const classes = useStyles()

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <Typography variant="h2">{frontmatter.title}</Typography>
      <Typography variant="h6" className={classes.meta}>Organization: {frontmatter.organization}</Typography>
      <Typography variant="h6">Location: {frontmatter.location}</Typography>
      <Typography variant="h6">Compensation: {frontmatter.compensation}</Typography>
      <Typography variant="h6">Contact: {checkLink(frontmatter.contactInfo)}
      </Typography>
      <Typography variant="h6">Website: <a href={frontmatter.organizationWebsite} target="_blank" rel="noreferrer">{frontmatter.organizationWebsite}</a></Typography>
      <Typography variant="body1" component="div" className={classes.body}>
        <span dangerouslySetInnerHTML={{ __html: html }} />
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
        title
        location
        organization
        compensation
        contactInfo
        organizationWebsite
      }
    }
  }
`