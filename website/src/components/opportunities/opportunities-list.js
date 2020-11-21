import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import OpportunitiesListItem from "./opportunities-list-item"
import Axios from "axios"

class OpportunitiesList extends React.Component {
    state = {
        opportunities: []
    }

    /**
     * Maps a job post from the Software Hamilton jobs api to an object 
     * that shares the same structure as an opportunities post
     * @param {The Software Hamilton job post} shJob 
     */
    mapSHJobToNode(shJob) {
        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric'}
        return {
            node: {
                id: shJob.id,
                fields: {
                    slug: shJob.link
                },
                frontmatter: {
                    title: shJob.title.rendered,
                    templateKey: 'external-opportunity',
                    date: new Date(shJob.date).toLocaleDateString('en-US', dateOptions),
                    location: shJob.meta._job_location,
                    organization: shJob.meta._company_name,
                    show: true
                }
            }
        }
    }

    componentDidMount() {
        const { data } = this.props
        const fromFiles = data === undefined ? [] : data.allMarkdownRemark.edges

        Axios.get(`https://softwarehamilton.com/wp-json/wp/v2/job-listings`)
            .then(result => {
                const shJobs = result.data.map(job => this.mapSHJobToNode(job))
                const opportunities = fromFiles
                    .concat(shJobs)
                    .filter(opp => opp.node.frontmatter.show === true)
                    .sort((a, b) => { return new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)})
                this.setState({ opportunities })
            })
    }

    render() {
        return (
            <div>
                <Typography
                    variant="h4"
                    component="h2"
                    style={{ fontWeight: "300", color: "#FAFFF7" }}>
                        Opportunities
                </Typography>
                { this.state.opportunities &&
                    this.state.opportunities.map(({ node }) => {
                        return (
                            <div key={node.id} style={{marginTop: "50px"}}>
                                <OpportunitiesListItem path={node.fields.slug} info={node}/>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

OpportunitiesList.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`query OpportunitiesListQuery {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
              filter: {
                frontmatter: {
                  templateKey: { eq: "opportunities-post" }
                }
              }
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    templateKey
                    date(formatString: "MMMM DD, YYYY")
                    organization
                    location
                    show
                  }
                }
              }
            }
          }`}
        render={data => <OpportunitiesList data={data}/>}
    />
)

