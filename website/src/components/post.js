import { Link } from "gatsby"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Card, CardContent, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
  },
  card: {
    flexGrow: 1,
    padding: 0,
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
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.75em",
    },
  },
}))

export default function Post(props) {
  const classes = useStyles()
  return (
    <Card className={classes.card} elevation={0}>
      <CardContent className={classes.content}>
        <Typography variant="h4" component="h3" className={classes.title}>
          <Link to={props.path}>{props.title}</Link>
        </Typography>
        <Typography variant="subtitle2" className={classes.date}>
          {props.date}
        </Typography>
        <Typography variant="subtitle1" className={classes.excerpt}>
          {props.excerpt}
        </Typography>
        <Button
          variant="outlined"
          href={props.path}
          color="secondary"
          className={classes.button}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  )
}
