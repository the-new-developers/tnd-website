/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Container } from "@material-ui/core"
import { createMuiTheme, makeStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import Header from "./header"

import "./layout.css"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "#0c0a05",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        "background-color": "#0c0a05",
      },
    },
    MuiTypography: {
      h1: {
        "font-family": "Roboto Slab",
      },
      h2: {
        "font-family": "Roboto Slab",
      },
      h3: {
        "font-family": "Roboto Slab",
      },
      h4: {
        "font-family": "Roboto Slab",
      },
      h5: {
        "font-family": "Roboto Slab",
      },
      h6: {
        "font-family": "Roboto Slab",
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      light: "#FAFFF7", // white touched by green
      main: "#0c0a05", // black touched by brown
    },
    secondary: {
      main: "#3E5622", // green
    },
  },
})

/**
 * This is the Layout component, which will be called in all child components to provide
 * a unified style to the website.
 */

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header />
        <div>
          <Container>
            <main className={classes.content}>{children}</main>
          </Container>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
