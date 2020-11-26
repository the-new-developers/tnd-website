import { Link } from "gatsby"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
  card: {
    flexGrow: 1,
    padding: 0,
    marginTop: 50,
  },
  content: {
    padding: 0,
  },
  date: {
    marginTop: theme.spacing(1),
  },
  excerpt: {
    marginTop: theme.spacing(2),
  },
  eventInfo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.75em",
    },
  },
}))

/**
 * We store the date and time for each event in UTC, so this method converts that
 * to local time. 
 * 
 * Passing it into a new Date object will convert it to the local time zone, 
 * and we will use the toLocaleTimeString and toLocalDateString methods to format the date. 
 * This is not as elegant as it might have been with a Javascript date library like moment.js, 
 * however using native Javascript functions avoids the overhead of importing an external
 * dependency.
 * 
 * @param {string} dateUtc The event date in UTC.
 * @returns {string} The converted and formatted date to be presented in the post.
 */
const formatDate = (dateUtc) => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true }
  const time = new Date(dateUtc).toLocaleTimeString('en-US', timeOptions)
  const date = new Date(dateUtc).toLocaleDateString('en-US', dateOptions)
  return time + ' ' + date
}

export default function EventListItem(props) {
  // We can use this to insert the styles defined above.
  const classes = useStyles()

  // This will hold all of our post info.
  const info = props.info.frontmatter

  // It makes sense to give our own events priority.
  const isTNDWorkshop = info.type === "The New Developers"

  // Only TND workshops can have a register button that leads to an external link on
  // blog or event rolls.
  let path = props.path

  const dateToday = new Date()

  // This is the text above event posts.
  let eventType
  if (info.featured && new Date(info.date) >= dateToday) {
    eventType = "Next Workshop"
  } else if (isTNDWorkshop) {
    eventType = "TND Workshop"
  } else {
    eventType = "Community Event"
  }

  // Gatsby seems to hijack all <a> tags and, if they do not begin with http://
  // or https://, appends the path to the domain instead of setting the URL as
  // expected.  
  let link = info.link
  if (!link) link = info.where

  // show link if there is a url available 
  // TODO: is (.) dot sufficient to match any url? 
  if (link.includes(".")) {
    if (!link.includes("http")) link = "http://" + link
    link = <Link to={link}>{info.where}</Link>
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.content}>
        <Typography variant="overline" style={{ color: isTNDWorkshop ? "#CC522C" : "#FAFFF7" }}>{eventType}</Typography>
        <Typography
          variant="h3"
          component="h3"
          className={classes.title}>
          <Link to={props.path}>{info.title}</Link>
        </Typography>
        <div>
          <Typography variant="h6" className={classes.eventInfo}>
            When: {formatDate(info.date)}
          </Typography>
          <Typography variant="h6" className={classes.eventInfo}>
            Where: {link}
          </Typography>
        </div>
        <Typography variant="subtitle1" className={classes.excerpt}>
          {props.info.excerpt}
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          to={path}
          color="secondary"
          className={classes.button}
        >
          More Info
        </Button>
      </CardContent>
    </Card>
  )
}
