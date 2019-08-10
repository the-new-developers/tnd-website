import React from "react"
import { Link } from "gatsby"
import BlogRoll from "../components/blogroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <BlogRoll />
  </Layout>
)

export default IndexPage
