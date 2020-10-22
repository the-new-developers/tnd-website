import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import OpportunitiesList from "../components/opportunities-list"

const OpportunitiesPage = () => (
    <Layout>
        <SEO title="Opportunities" />
        <OpportunitiesList />
    </Layout>
)

export default OpportunitiesPage