/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Container, Hidden, Toolbar } from "@material-ui/core"
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
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(5),
      padding: theme.spacing(3),
    },
  },
}))

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        "background-color": "#0c0a05",
      },
    },
    MuiDivider: {
      root: {
        "background-color": "#3e5622",
      },
    },
    MuiTypography: {
      // There must be a way to do this programmatically
      // Also having that layout.css is starting to be a pain :(
      h1: {
        "font-family": "Roboto Slab",
      },
      h2: {
        "font-family": "Roboto Slab",
      },
      h3: {
        "font-family": "Roboto Slab",
        "font-weight": 300,
      },
      h4: {
        "font-family": "Roboto Slab",
        "font-weight": 300,
      },
      h5: {
        "font-family": "Roboto Slab",
      },
      h6: {
        "font-family": "Open Sans",
        color: "#fafff7",
        fontWeight: 300,
      },
      body: {
        "font-family": "Open Sans",
        fontWeight: 300,
      },
      overline: {
        "font-family": "Open Sans",
        fontWeight: 300,
      },
      subtitle1: {
        "font-family": "Open Sans",
        fontWeight: 300,
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
      main: "#709255", // green
      dark: "#CC522C", // red
    },
    error: {
      main: "#CC522C", // red
    }
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
          <Hidden smUp implementation="css">
            <Toolbar />
          </Hidden>
          <Container>
            <main className={classes.content}>{children}</main>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
