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
  let path = info.link ? info.link : props.path

  // For some reason, if the link points to an external source, it must
  // start with http:// or https:// or else Gatsby will assume it should
  // navigate to an internal page - even when using the href prop of the
  // MUI Button component. Until we can figure out another way around it,
  // it's easiest for now to simply add the protocol if the string does
  // not already contain it.
  if (info.link && !path.includes("http")) {
    path = "http://" + path
  }

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
  if (isEvent && info.type === "COM") {
    buttonText = "More Info"
  } else if (isEvent && info.type === "TND") {
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
        {/* TODO: Declare a single MUI Button that uses the Link component when 
        routing internally, and href when info.link is not null. */}
        {info.link ? (
          <Button
            variant={isEvent && info.type === "TND" ? "contained" : "outlined"}
            href={path}
            color="secondary"
            className={classes.button}
          >
            {buttonText}
          </Button>
        ) : (
          <Button
            variant={isEvent && !info.link ? "contained" : "outlined"}
            component={Link}
            to={path}
            color="secondary"
            className={classes.button}
          >
            {buttonText}
          </Button>
        )}
        {/* <Button
            variant={isEvent && info.type === "TND" ? "contained" : "outlined"}
            component={Link}
            to={path}
            color="secondary"
            className={classes.button}
          >
            {buttonText}
          </Button> */}
      </CardContent>
      {info.featured ? <Divider className={classes.divider} /> : null}
    </Card>
  )
}
