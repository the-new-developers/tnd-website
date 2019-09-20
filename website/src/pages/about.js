import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  body: {
    marginTop: theme.spacing(10),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.75em",
    },
  },
  entry: {
    marginTop: theme.spacing(10),
  },
}))

export default function AboutPage() {
  const classes = useStyles()
  return (
    <Layout>
      <Typography variant="h2" className={classes.title}>
        About Us
      </Typography>
      <div className={classes.body}>
        <Typography variant="body1">
          We're a group of software development students at Mohawk College who
          are hell-bent on helping others in our program get a start in this
          industry. We run <Link to="/events">workshops, social events</Link>,
          make connections between students and industry, and offer support and
          resources (and pizza, when we can).
        </Typography>
        <Typography variant="body1">
          Email us at{" "}
          <a
            href="mailto:contact@thenewdevelopers.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            contact@thenewdevelopers.com
          </a>{" "}
          if you have any questions, are interested in getting involved, or
          would like a link to the (unofficial) CSAIT Discord server.
        </Typography>
        <Typography variant="body1">
          And now, a word from the presidents.
        </Typography>
      </div>
      <div className={classes.entry}>
        <Typography variant="h4">Andrew Lister</Typography>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0,
          }}
        >
          <iframe
            title="Andrew Lister"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/tNXG6h875pA"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className={classes.entry}>
        <Typography variant="h4">Jen Armstrong</Typography>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0,
          }}
        >
          {/* <iframe
            title="Jen Armstrong"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/PpUYNhSU_nM"
            frameBorder="0"
            allowFullScreen
          ></iframe> */}
          Jen took a video that was too awesome to be seen by human eyes. Luckily, her dog is qualified to work on the editing.
        </div>
      </div>
      <div className={classes.entry}>
        <Typography variant="h4">Rodney Barnes</Typography>
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0,
          }}
        >
          <iframe
            title="Rodney Barnes"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/pWgfBoAyfGE"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}
