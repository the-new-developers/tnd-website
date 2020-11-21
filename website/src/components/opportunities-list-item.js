import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
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
    title: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.75em",
      },
    },
  }))

export default function OpportunitiesListItem(props) {
    const classes = useStyles()
    const opportunityInfo = props.info.frontmatter
    return (
        <Card className={classes.card} elevation={0}>
            <CardContent className={classes.content}>
            <Typography 
                    variant="h4"
                    component="h4"
                    className={classes.title}>
                    { opportunityInfo.templateKey === 'opportunities-post' ? (
                        <Link to={props.path}>{opportunityInfo.title}</Link>
                    ) : (
                        <a href={props.path}>{opportunityInfo.title}</a>
                    )}
            </Typography>
            <Typography variant="subtitle1">
                Date posted: <b>{opportunityInfo.date}</b>
            </Typography>
            <Typography variant="subtitle1">
                Organization: <b>{opportunityInfo.organization}</b>
            </Typography>
            <Typography variant="subtitle1">
                Location: <b>{opportunityInfo.location}</b>
            </Typography>
            { opportunityInfo.templateKey === 'opportunities-post' ? (
                <Button
                    variant="outlined"
                    component={Link}
                    to={props.path}
                    color="secondary"
                    className={classes.button}
                >
                    Read more
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    href={props.path}
                    color="secondary"
                    className={classes.button}
                    target="_blank"
                >
                    Go to external posting
                </Button>
            )}
            </CardContent>
        </Card>
    )
}