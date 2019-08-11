import { Link } from "gatsby"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
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
  divider: {
    background: theme.palette.secondary,
    marginTop: theme.spacing(5),
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

export default function Post(props) {
  // We can use this to insert the styles defined above.
  const classes = useStyles()

  // This will hold all of our post info.
  const info = props.info.frontmatter

  // We need different information depending on the type of post.
  const isEvent = info.templateKey === "event-post"

  // If the post is an event that has a link, default to that.
  const path = info.link ? info.link : info.path

  // This is the text above event posts.
  let eventType
  if (info.featured) {
    eventType = "Next Workshop"
  } else if (info.type === "TND") {
    eventType = "TND Workshop"
  } else {
    eventType = "Community Event"
  }

  // The button text will vary depending on the post type.
  let buttonText
  if (isEvent && info.link) {
    buttonText = "More Info"
  } else if (isEvent) {
    buttonText = "Register"
  } else {
    buttonText = "Read more"
  }

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.content}>
        {isEvent ? (
          <Typography variant="overline">{eventType}</Typography>
        ) : null}
        <Typography
          variant={isEvent ? "h3" : "h4"}
          component="h3"
          className={classes.title}
        >
          <Link to={props.path}>{info.title}</Link>
        </Typography>
        {isEvent ? (
          <div>
            <Typography variant="h6" className={classes.eventInfo}>
              When: {info.date}
            </Typography>
            <Typography variant="h6" className={classes.eventInfo}>
              Where: {info.where}
            </Typography>
          </div>
        ) : (
          <Typography variant="overline" className={classes.date}>
            {info.date}
          </Typography>
        )}
        <Typography variant="subtitle1" className={classes.excerpt}>
          {props.info.excerpt}
        </Typography>
        <Button
          variant={isEvent && !info.link ? "contained" : "outlined"}
          href={path}
          color="secondary"
          className={classes.button}
        >
          {buttonText}
        </Button>
      </CardContent>
      {info.featured ? <Divider className={classes.divider} /> : null}
    </Card>
  )
}
