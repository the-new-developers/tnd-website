module.exports = {
  siteMetadata: {
    title: `The New Developers`,
    description: `We're a student club at Mohawk College in Hamilton, Ontario, Canada, focused on creating a bridge between software development students and industry`,
    author: `TND`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/images`,
        name: "uploads",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `the-new-developers`,
        short_name: `tnd`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-braces50.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-lodash`,
  ],
}
