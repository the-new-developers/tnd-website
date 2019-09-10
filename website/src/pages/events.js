import React from "react"
import EventRoll from "../components/eventroll"
import Layout from "../components/layout"
import SEO from "../components/seo"

const EventsPage = () => (
  <Layout>
    <SEO title="Events" />
    <EventRoll />
  </Layout>
)

export default EventsPage
