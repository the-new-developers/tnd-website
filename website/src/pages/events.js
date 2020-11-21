import React from "react"
import EventList from "../components/events/event-list"
import Layout from "../components/layout"
import SEO from "../components/seo"

const EventsPage = () => (
  <Layout>
    <SEO title="Events" />
    <EventList />
  </Layout>
)

export default EventsPage
