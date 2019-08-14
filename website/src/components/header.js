import { Link } from "gatsby"
import React from "react"
import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core"
import { Menu, OpenInNew } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  card: {
    maxWidth: drawerWidth,
  },
  cardMedia: {
    height: 55,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: 0,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    flexGrow: 1,
  },
  image: {
    display: "block",
    margin: "20px auto 0 auto",
  },
  list: {
    marginTop: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  paper: {
    background: "#0c0a05",
  },
}))

/**
 * This component contains the logic for the top app bar and the navigation drawer.
 *
 * Much of this component has been drawn from the Material UI documentation for a responsive drawer,
 * which has a permanent drawer for tablet- and desktop-sized pages, and then a temporary drawer
 * for mobile pages.
 *
 * Reference: https://material-ui.com/components/drawers/#responsive-drawer
 */
const Header = () => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Hidden xsDown implementation="css">
        <Link to="/">
          <img
            src={require("../images/logo-braces50.png")}
            className={classes.image}
          />
          <Typography variant="h5" component="h1" align="center">
            THE NEW DEVELOPERS<span style={{ color: "#CC522C" }}>_</span>
          </Typography>
        </Link>
      </Hidden>
      <List className={classes.list}>
        <ListItem button component={Link} to="/events">
          <ListItemText
            primary="Events"
            primaryTypographyProps={{
              variant: "h6",
              color: "secondary",
            }}
          />
        </ListItem>
        <ListItem button component="a" href="https://www.surveymonkey.com/r/XNR88XG" target="_blank">
          <ListItemText
            primary="Join Our Mailing List"
            primaryTypographyProps={{
              variant: "h6",
              color: "secondary",
            }}
          /> <OpenInNew color="secondary"/>
        </ListItem>
      </List>
      <div>
      <footer className={classes.footer}>
        <Typography variant="overline">
        © {new Date().getFullYear()} The New Developers
        </Typography>
      </footer>
      </div>
    </div>
  )

  return (
    <div>
      <Hidden smUp implementation="css">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/">THE NEW DEVELOPERS</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.paper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            border={0}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default Header
